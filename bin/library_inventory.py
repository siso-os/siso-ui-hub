#!/usr/bin/env python3
"""Offline library inventory. Reads metadata only; never fetches or reads HALO code.

Run: python3 bin/library_inventory.py [--bank /path/to/index.jsonl]
     python3 bin/library_inventory.py --check
Parent: page_inventory(public=public, private_pattern=PRIVATE) -> meta.library_inventory.
load_inventory() retains full identity/provenance and bank patches for index joins.
The bank is read-only. Attribution patches are returned under bank.attributions, keyed
by the bank's row id; the parent applies them when joining bank items in hubindex.
Author handles are attribution, never evidence of collection membership or a licence.
"""
from __future__ import annotations

import argparse
import collections
import copy
import hashlib
import json
import os
from pathlib import Path
import re
from urllib.parse import urlsplit, urlunsplit

HUB = Path(__file__).resolve().parent.parent
WORKSPACE = Path.home() / "SISO_Workspace"
UNKNOWN = "unknown — no verified licence in the inspected metadata"
EMPTY_LABELS = {"", "unknown", "none", "null", "n/a"}
LIBRARY_KINDS = {"library", "registry", "block-library", "asset-library"}
# A permissive licence recorded in metadata is an ingestion candidate, not permission
# to redistribute every item or paid tier at that URL.
PERMISSIVE = re.compile(r"^(MIT|Apache-2\.0|BSD-[23]-Clause|ISC|CC0|OFL|Zlib)(?:\s*\(|$)", re.I)


def url_key(value):
    """Identity from a complete URL; never merge all repositories on github.com."""
    if not isinstance(value, str) or not value.strip():
        return ""
    value = value.strip()
    if "://" not in value:
        value = "https://" + value
    try:
        u = urlsplit(value)
        if u.scheme not in {"http", "https"} or not u.hostname or u.username or u.password:
            return ""
        host = u.hostname.lower()
        if host.startswith("www."):
            host = host[4:]
        port = f":{u.port}" if u.port and u.port not in {80, 443} else ""
        path = u.path.rstrip("/")
        if host == "github.com":
            path = path.removesuffix(".git").lower()
        return urlunsplit(("https", host + port, path, "", ""))
    except ValueError:
        return ""


def _json(path, default):
    return json.loads(path.read_text()) if path.exists() else default


def read_rows(path):
    """Foundry may be writing live: count malformed lines, never hide incomplete reads."""
    rows, bad = [], 0
    if path.exists():
        for line in path.read_text().splitlines():
            if not line.strip():
                continue
            try:
                row = json.loads(line)
                if isinstance(row, dict):
                    rows.append(row)
                else:
                    bad += 1
            except ValueError:
                bad += 1
    return rows, bad


def count_in_text(text):
    m = re.search(r"(\d[\d,]*)\s+(?:React\s+)?(?:components?|items?)\b", text or "", re.I)
    return int(m[1].replace(",", "")) if m else None


def licence_status(licence):
    if PERMISSIVE.search(licence or ""):
        return "permissive-recorded"
    return "terms-review"


def _bank_lookup(libraries):
    names = collections.defaultdict(set)
    urls = collections.defaultdict(set)
    for lib in libraries:
        for name in [lib["id"], lib["name"], *lib.get("aliases", [])]:
            if name:
                names[str(name).strip().lower()].add(lib["id"])
        for url in [lib.get("homepage"), *lib.get("identity_urls", [])]:
            if key := url_key(url):
                urls[key].add(lib["id"])
    return names, urls


def has_recorded_library(row):
    for field in ("library", "library_id", "library_name"):
        value = row.get(field)
        if isinstance(value, dict):
            value = value.get("name") or value.get("id") or value.get("url")
        if isinstance(value, str) and value.strip().lower() not in EMPTY_LABELS:
            return True
    return False


def resolve_bank_row(row, libraries, lookup=None):
    """Resolve explicit library/collection fields or unambiguous upstream URLs.

    A 21st component URL yields its author only. Even a lone collection for that
    author does not prove the component belongs to it. Preserve ambiguous cases.
    """
    names, urls = lookup or _bank_lookup(libraries)
    author = row.get("author") or row.get("author_username") or row.get("username")
    if isinstance(author, dict):
        author_meta = author
        author = author.get("username") or author.get("name") or author.get("handle")
    else:
        author_meta = {}
    result = {"id": str(row.get("id") or row.get("component_id") or ""),
              "author": author if isinstance(author, str) else None,
              "library_id": None, "method": "unresolved",
              "why": "No explicit collection or unambiguous library URL; an author is not a library."}
    fields = {k: row.get(k) for k in ("library", "library_id", "library_name", "library_url", "collection", "collection_url")}
    for k in ("library", "library_url"):
        if author_meta.get(k):
            fields[f"author.{k}"] = author_meta[k]
    # Conflicting evidence remains unresolved; explicit fields outrank fallback URLs.
    explicit = set()
    evidence = []
    for field, value in fields.items():
        if isinstance(value, dict):
            value = value.get("url") or value.get("id") or value.get("name")
        if isinstance(value, str) and value.strip().lower() not in EMPTY_LABELS:
            candidates = urls.get(url_key(value), set()) if "://" in value else names.get(value.strip().lower(), set())
            explicit.update(candidates)
            evidence.append(field)
    if explicit:
        if len(explicit) == 1:
            result.update(library_id=next(iter(explicit)), method="explicit-library", why="Matched recorded library metadata.", fields=evidence)
        else:
            result["why"] = "Conflicting or ambiguous explicit library metadata."
        return result
    if evidence:
        result["why"] = "Recorded library metadata does not match the inventory; review it before overriding from a URL."
        return result
    inferred = set()
    matches = []
    for field in ("url", "source_url", "upstream_url", "component_url", "registry_url", "install_url", "library_url", "github"):
        value = row.get(field)
        key = url_key(value)
        if not key:
            continue
        u = urlsplit(key)
        if u.hostname == "21st.dev":
            m = re.match(r"/@?([^/]+)/(?:components|library)/", u.path)
            if not result["author"] and m:
                result["author"] = m[1]
            if "/library/" not in u.path:
                continue
        # Use the most specific registered URL prefix. Domain-only identity must be
        # unique; shared platforms with no collection/repo path cannot identify a lib.
        prefixes = [k for k in urls if key == k or key.startswith(k + "/")]
        if prefixes:
            best = max(prefixes, key=len)
            if urlsplit(best).hostname in {"github.com", "21st.dev", "registry.directory"} and not urlsplit(best).path:
                continue
            inferred.update(urls[best])
            matches.append(field)
    if len(inferred) == 1:
        result.update(library_id=next(iter(inferred)), method="upstream-url", why="Matched an unambiguous recorded library URL.", fields=matches)
    elif inferred:
        result["why"] = "Upstream URLs point to multiple libraries; review needed."
    return result


def build_inventory(hub=HUB, foundry=None, bank=None, agent_base=None, site=None):
    foundry = Path(foundry or os.environ.get("UIHUB_FOUNDRY", WORKSPACE / "Great_Library_of_SISO/foundry"))
    bank = Path(bank or os.environ.get("UIHUB_COMPONENT_BANK") or
                (WORKSPACE / "Great_Library_of_SISO/banks/siso-component-bank/index.jsonl" if (WORKSPACE / "Great_Library_of_SISO/banks/siso-component-bank/index.jsonl").exists() else WORKSPACE / "_data/ui-hub/bank/index.jsonl"))
    agent_base = Path(agent_base or WORKSPACE / "SISO_Agency/apps/siso-internal-labs/siso-internal-labs-agent-base")
    site = Path(site or WORKSPACE / "_data/siso-landing")
    libraries, identity, scans = {}, {}, []

    def scan(id_, path, rows, bad=0, why=""):
        scans.append({"id": id_, "status": "partial" if bad else "inspected" if path.exists() else "unavailable",
                      "records": len(rows) if path.exists() else None, "invalid_lines": bad,
                      "why": why or ("Malformed JSON lines were excluded; rerun after the source writer settles." if bad else
                                     "Local metadata snapshot inspected." if path.exists() else "Source is absent on this machine; supply a local metadata snapshot and rerun.")})

    def add(row):
        keys = [url_key(u) for u in [row.get("homepage"), *row.get("identity_urls", [])] if url_key(u)]
        existing = {identity[k] for k in keys if k in identity}
        target = next(iter(existing)) if len(existing) == 1 else row["id"]
        if target in libraries:
            old = libraries[target]
            old["provenance"].extend(row["provenance"])
            old["origins"] = sorted(set(old["origins"] + row["origins"]))
            old["identity_urls"] = sorted(set(old["identity_urls"] + row["identity_urls"]))
            old["aliases"] = sorted(set(old["aliases"] + row["aliases"] + [row["name"], row["id"]]))
            if old["licence"] == UNKNOWN and row["licence"] != UNKNOWN:
                old["licence"] = row["licence"]
                old["licence_status"] = licence_status(row["licence"])
            for field in ("reported", "metadata", "local_files"):
                if old["counts"][field] is None and row["counts"][field] is not None:
                    old["counts"][field] = row["counts"][field]
            if row["counts"]["catalogued"] > old["counts"]["catalogued"]:
                old["counts"]["catalogued"] = row["counts"]["catalogued"]
                old["items"] = row["counts"]["catalogued"]
                old["status"] = row["status"]
                old["browse_source"] = row.get("browse_source")
                old["why"] = row["why"]
            if row.get("registry"):
                old["registry"] = row["registry"]
            if not old.get("author") and row.get("author"):
                old["author"] = row["author"]
        else:
            libraries[target] = row
        for key in keys:
            identity.setdefault(key, target)
        return target

    def record(id_, name, homepage, origin, source, source_id, *, licence=UNKNOWN, reported=None,
               catalogued=0, metadata=1, local_files=None, role="intake", status="not-ingested", why="",
               verdict="", author=None, browse_source=None, private=False, kind="library", identity_urls=None, aliases=None):
        return {"id": id_, "name": name, "homepage": url_key(homepage) or None,
                "site": url_key(homepage).removeprefix("https://"), "author": author,
                "licence": licence or UNKNOWN, "licence_status": licence_status(licence),
                "items": catalogued, "counts": {"catalogued": catalogued, "reported": reported, "metadata": metadata, "local_files": local_files},
                "role": role, "status": status, "why": why, "verdict": verdict or why,
                "kind": kind, "origins": [origin], "browse_source": browse_source, "private": private,
                "identity_urls": sorted(set([url_key(homepage), *(url_key(u) for u in identity_urls or [])]) - {""}),
                "aliases": aliases or [], "provenance": [{"source": source, "record": source_id}]}

    round_path = hub / "sources/libraries.json"
    reviewed = _json(round_path, {}).get("libraries", [])
    items, bad = read_rows(hub / "sources/items.cat.jsonl")
    item_counts = collections.Counter(r.get("lib") for r in items)
    scan("reviewed", round_path, reviewed)
    for l in reviewed:
        add(record(l["id"], l["name"], l["site"], "reviewed", "sources/libraries.json", l["id"],
                   licence=l["licence"], reported=l["items"], catalogued=item_counts[l["id"]], metadata=None,
                   role=l["role"], status="catalogued", why="Round-1 catalogue metadata is indexed; paid and unlicensed items remain reference only.",
                   verdict=l["verdict"], browse_source=l["id"]))

    extra_path = hub / "sources/21st/extras.jsonl"
    extras, bad = read_rows(extra_path)
    collections_21st = [r for r in extras if r.get("kind") == "library"]
    scan("21st-collections", extra_path, collections_21st, bad)
    corpus, corpus_bad = read_rows(hub / "sources/21st/corpus.jsonl")
    scan("21st-components", hub / "sources/21st/corpus.jsonl", corpus, corpus_bad)
    for r in collections_21st:
        title = re.split(r"\s*[—–]\s*\d+ React Components", r.get("title") or r["slug"])[0]
        title = re.sub(r"\s*\| 21st$", "", title)
        add(record("21st-library:" + r["id"], title, r["url"], "21st-collections", "sources/21st/extras.jsonl", r["id"],
                   author=r.get("owner"), reported=count_in_text(r.get("title")), status="metadata-only",
                   why="Collection page and preview catalogued. Component membership and each item's licence are not present in this snapshot; author totals do not establish membership.",
                   kind="collection"))

    registry_path = hub / "intake/shadcn-registries-2026-10-06.json"
    regs = _json(registry_path, [])
    scan("shadcn-registries", registry_path, regs)
    for r in regs:
        row = record("registry:" + r["name"], r["name"], r.get("homepage"), "shadcn-registries", str(registry_path.relative_to(hub)), r["name"],
                     reported=(r.get("ranking") or {}).get("itemCount"), kind="registry",
                     why="Registry directory entry is held; its component manifest and per-item licences have not been ingested. Directory health and a free label do not grant redistribution rights.")
        row["registry"] = {k: r.get(k) for k in ("name", "url", "description")}
        add(row)

    # The laptop's registry/shadcn checkout is not present here. The committed
    # reference snapshot is separately countable without reading component code.
    reference_path = hub / "_reference/shadcn/manifest.json"
    reference = _json(reference_path, {}).get("items", [])
    held_reference = [r for r in reference if r.get("ok")]
    scan("shadcn-reference", reference_path, held_reference)
    if reference_path.exists():
        add(record("shadcn-ui", "shadcn/ui", "https://ui.shadcn.com", "shadcn-reference",
                   "_reference/shadcn/manifest.json", "items", licence="MIT (snapshot licence recorded in AGENTS.md)",
                   catalogued=len(held_reference), reported=len(held_reference), metadata=len(held_reference),
                   local_files=len(list((hub / "_reference/shadcn").rglob("*.tsx"))), role="base", status="catalogued", browse_source="shadcn-ui",
                   why="Held MIT primitive, block and chart manifests are indexed with install commands, source attribution and available local preview thumbnails."))

    foundry_path = foundry / "research/ui/records.jsonl"
    research, bad = read_rows(foundry_path)
    selected = [r for r in research if r.get("domain") == "ui" and r.get("kind") in LIBRARY_KINDS]
    audit, audit_bad = read_rows(foundry / "research/ui/curation/licence-audit.jsonl")
    audited = {r["id"]: r for r in audit if r.get("id")}
    scan("foundry-ui", foundry_path, selected, bad)
    if audit_bad:
        scan("foundry-licence-audit", foundry / "research/ui/curation/licence-audit.jsonl", audit, audit_bad)
    for r in selected:
        a = audited.get(r["id"], {})
        licence = a.get("licence") or r.get("licence") or UNKNOWN
        if licence.strip().lower() in {"unknown", "none", "per registry", "mixed", "21st.dev community (per author)"}:
            licence = UNKNOWN if licence.lower() == "unknown" else licence
        permissive = licence_status(licence) == "permissive-recorded"
        named_21st = urlsplit(url_key(r.get("url"))).hostname == "21st.dev" and "/library/" in url_key(r.get("url"))
        row = record("foundry:" + r["id"], r.get("title") or r["id"], r.get("url"), "foundry-ui", "foundry:research/ui/records.jsonl", r["id"],
                     licence=licence, author=r.get("by") or None, kind="collection" if named_21st else r["kind"],
                     reported=count_in_text(r.get("title")) or count_in_text(r.get("why")),
                     role="intake" if permissive else "reference", status="metadata-only" if named_21st else "not-ingested",
                     why=("Permissive licence recorded; ingestion candidate pending component-manifest extraction and item-level terms checks." if permissive else
                          "Research metadata is held; component manifest is not ingested and licence terms require review."),
                     verdict=r.get("why") or r.get("desc") or "Research metadata only.",
                     identity_urls=["https://github.com/" + r["github"]] if r.get("github") else [])
        if a:
            row["provenance"].append({"source": "foundry:research/ui/curation/licence-audit.jsonl", "record": r["id"]})
        if named_21st:
            row["origins"].append("21st-collections")
        add(row)

    shell_path = hub / "sources/shells/templates.json"
    shells = _json(shell_path, {}).get("templates", [])
    scan("siso-shell", shell_path, shells)
    add(record("siso-shell", "SISO Shell", "https://siso-shell.pages.dev", "siso-shell", "sources/shells/templates.json", "templates",
               catalogued=len(shells), reported=len(shells), kind="template-bank", role="internal", status="metadata-only",
               why="Page-family metadata is indexed. These are specifications, not a count of completed reusable HTML partials. No reusable-code licence was inspected.", browse_source="siso-shell", private=True))

    census_path = hub / "inventory/agent-base.jsonl"
    census, bad = read_rows(census_path)
    scan("agent-base", census_path, census, bad)
    src = agent_base / "apps/web/src"
    local_files = sum(1 for p in src.rglob("*") if p.suffix in {".tsx", ".jsx"} and not {"__tests__", "tests"}.intersection(p.parts)
                      and not p.name.endswith((".test.tsx", ".spec.tsx"))) if src.exists() else None
    package = _json(agent_base / "package.json", {})
    add(record("siso-agent-base", "SISO Agent Base", None, "siso-owned", "inventory/agent-base.jsonl", "agent-base",
               licence=package.get("license") or UNKNOWN, catalogued=0, reported=len(census) if census_path.exists() else None,
               local_files=local_files, role="internal", status="not-ingested", private=True,
               why="Project census records component/page names and origin, not an installable library. Local JSX file count is separate and may be from a different revision; register reusable components with individual rights before ingestion."))
    dna = site / "DNA.md"
    scan("siso-site", dna, ["DNA"] if dna.exists() else [], why="Design DNA is held; no component manifest or reusable-code licence was inspected." if dna.exists() else "Site metadata is absent locally.")
    add(record("siso-site", "SISO Site", None, "siso-owned", "siso-site:DNA.md", "design-dna",
               reported=None, metadata=1 if dna.exists() else None, role="internal", status="not-ingested", private=True,
               why="Design DNA is held, but it is not a component library. Component count and reusable-code licence remain unknown until the site owner supplies a manifest."))

    bank_rows, bank_bad = read_rows(bank)
    scan("component-bank", bank, bank_rows, bank_bad)
    # Library names recorded only in the bank are real intake entries. Never make
    # an entry from an author, CDN host or an unclassified component URL.
    lookup = _bank_lookup(libraries.values())
    for r in bank_rows:
        value = r.get("library") or r.get("library_name")
        if not value:
            continue
        obj = value if isinstance(value, dict) else {}
        name = (obj.get("name") or obj.get("id")) if obj else value
        if not isinstance(name, str) or name.strip().lower() in EMPTY_LABELS:
            continue
        homepage = obj.get("url") or r.get("library_url")
        probe = resolve_bank_row(r, [], lookup)
        if probe["library_id"]:
            continue
        bank_id = "bank-library:" + hashlib.sha256((name.strip().casefold() + "|" + url_key(homepage)).encode()).hexdigest()[:16]
        add(record(bank_id, name.strip(), homepage, "component-bank", "component-bank:index.jsonl", str(r.get("id") or ""),
                   licence=obj.get("licence") or obj.get("license") or UNKNOWN,
                   status="not-ingested", role="intake", metadata=None,
                   why="Library explicitly recorded by component-bank metadata. Its component manifest and rights have not been verified.", aliases=[name.strip()]))
        lookup = _bank_lookup(libraries.values())
    attribution = [resolve_bank_row(r, [], lookup) for r in bank_rows]
    for row, match in zip(bank_rows, attribution):
        host = urlsplit(url_key(row.get("url"))).hostname
        if host == "21st.dev":
            match["source_registry"] = "21st.dev"
            match["source_evidence"] = "upstream-url-host"
    if len({a["id"] for a in attribution}) != len(attribution) or any(not a["id"] for a in attribution):
        raise ValueError("Bank rows need nonempty unique ids before attribution can be joined safely.")
    missing = [a for r, a in zip(bank_rows, attribution) if not has_recorded_library(r)]
    bank_libs = collections.Counter(a["library_id"] for a in attribution if a["library_id"])
    for id_, n in bank_libs.items():
        libraries[id_]["counts"]["bank_attributed"] = n
    result = {"schema_version": 1,
              "policy": "Metadata inventory only. Authors are not libraries. Reported counts are snapshot claims, not locally held components, and overlap across sources. No code is copied or newly licensed by this inventory.",
              "libraries": sorted(libraries.values(), key=lambda l: (l["status"] != "catalogued", l["name"].casefold(), l["id"])),
              "sources": scans,
              "bank": {"status": "partial" if bank_bad else "inspected" if bank.exists() else "unavailable",
                       "rows": len(bank_rows) if bank.exists() else None, "source_attributed": sum(bool(a.get("source_registry")) for a in attribution), "missing_library": len(missing) if bank.exists() else None,
                       "resolved_missing_library": sum(bool(a["library_id"]) for a in missing) if bank.exists() else None,
                       "unresolved_missing_library": sum(not a["library_id"] for a in missing) if bank.exists() else None,
                       "attributions": attribution},
              "author_count": len({r.get("author") for r in corpus if r.get("author")})}
    author_path = hub / "legacy/siso-ui-base/registry/21st/authors-union.json"
    author_directory = _json(author_path, [])
    scan("21st-author-directory", author_path, author_directory)
    result["author_directory_count"] = len(author_directory) if author_path.exists() else None
    result["summary"] = summary(result["libraries"])
    return result


def summary(libraries):
    return {"libraries": len(libraries), "by_status": dict(sorted(collections.Counter(l["status"] for l in libraries).items())),
            "by_origin": dict(sorted(collections.Counter(o for l in libraries for o in l["origins"]).items())),
            "permissive_recorded": sum(l["licence_status"] == "permissive-recorded" for l in libraries),
            "terms_review": sum(l["licence_status"] == "terms-review" for l in libraries)}


def load_inventory(public=False, private_pattern=None, path=None):
    """Parent exporter uses this; public allowlist removes bank patches and private data.

    Pass hubindex.PRIVATE so new private terms use the existing privacy gate. There
    are no absolute machine paths in this artifact. Apply privacy-check to output.
    """
    data = _json(Path(path or HUB / "sources/library-inventory.json"), {})
    if not public or not data:
        return data
    pattern = private_pattern or re.compile(r"\bHALO\b|\bOracle\b|\bCam\b|\bBYK\b|Kikas", re.I)
    out = copy.deepcopy(data)
    out.pop("bank", None)
    out["sources"] = [s for s in out["sources"] if s["id"] not in {"agent-base", "siso-site", "siso-shell", "component-bank"}]
    safe = []
    for lib in out["libraries"]:
        if lib.get("private") or pattern.search(f"{lib['id']} {lib['name']} {lib.get('homepage') or ''}"):
            continue
        for field in ("author", "why", "verdict", "licence"):
            if isinstance(lib.get(field), str) and pattern.search(lib[field]):
                lib[field] = UNKNOWN if field == "licence" else None if field == "author" else "See the upstream library for details."
        lib["aliases"] = [x for x in lib["aliases"] if not pattern.search(x)]
        lib["identity_urls"] = [x for x in lib["identity_urls"] if not pattern.search(x)]
        lib["provenance"] = [p for p in lib["provenance"] if not pattern.search(json.dumps(p))]
        if lib.get("registry") and pattern.search(json.dumps(lib["registry"])):
            lib.pop("registry")
        lib["counts"].pop("bank_attributed", None)
        safe.append(lib)
    out["libraries"] = safe
    out["summary"] = summary(safe)
    return out


def page_inventory(public=False, private_pattern=None, path=None):
    """Small page contract; identity aliases and per-component patches stay off meta.

    Use load_inventory() for attribution joins, this function for the meta export.
    The page never needs a second fetch for full component-bank attribution rows.
    """
    data = copy.deepcopy(load_inventory(public=public, private_pattern=private_pattern, path=path))
    if not data:
        return data
    for lib in data["libraries"]:
        for key in ("aliases", "identity_urls", "registry", "items", "private", "kind"):
            lib.pop(key, None)
    if data.get("bank"):
        data["bank"].pop("attributions", None)
    return data


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--bank", type=Path, help="Read-only component-bank index.jsonl snapshot")
    parser.add_argument("--foundry", type=Path)
    parser.add_argument("--agent-base", type=Path)
    parser.add_argument("--site", type=Path)
    parser.add_argument("--out", type=Path, default=HUB / "sources/library-inventory.json")
    parser.add_argument("--check", action="store_true", help="Check snapshot matches current local metadata; writes nothing")
    args = parser.parse_args()
    data = build_inventory(foundry=args.foundry, bank=args.bank, agent_base=args.agent_base, site=args.site)
    if args.check:
        if data != _json(args.out, {}):
            raise SystemExit("Inventory snapshot differs from current metadata; regenerate explicitly.")
    else:
        args.out.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps({"summary": data["summary"], "authors": data["author_count"], "bank": {k: v for k, v in data["bank"].items() if k != "attributions"}}, indent=2))


if __name__ == "__main__":
    main()
