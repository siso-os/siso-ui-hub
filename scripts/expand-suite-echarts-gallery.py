#!/usr/bin/env python3
"""Generate searchable ECharts preset metadata from its package barrel."""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BARREL = ROOT / "packages/siso-charts/src/echarts/index.ts"
OUTPUT = ROOT / "examples/package-suite/echarts-presets.json"
EXPORT = re.compile(
    r'^export \{\s*([A-Za-z_$][\w$]*)\s+as\s+([A-Za-z_$][\w$]*)\s*\} '
    r'from ["\']\./((?:examples|blocks)/echarts/[^"\']+?)(?:\.tsx)?["\'];$'
)
FAMILY = re.compile(r"-echarts-([a-z0-9-]+)-chart$")


def words(slug: str) -> str:
    return " ".join(part.capitalize() for part in slug.split("-") if part)


def main() -> None:
    entries = []
    for line in BARREL.read_text(encoding="utf-8").splitlines():
        match = EXPORT.match(line)
        if not match:
            continue
        _source_export, exported_as, module = match.groups()
        if not exported_as.startswith(("EChartsExample", "EChartsBlock")):
            continue
        stem = Path(module).name
        family_match = FAMILY.search(stem)
        if not family_match:
            raise SystemExit(f"cannot derive chart family from barrel source: {module}")
        family_slug = family_match.group(1)
        scenario = stem.removeprefix("ex-").removeprefix("b-")
        scenario = FAMILY.sub("", scenario).strip("-")
        title = words(family_slug) + " Chart"
        if scenario and scenario != "echarts":
            title = f"{words(scenario)} · {title}"
        entries.append({
            "id": f"echarts:{module}",
            "title": title,
            "family": words(family_slug),
            "export": exported_as,
            "source": f"packages/siso-charts/src/echarts/{module}.tsx",
        })

    if len(entries) != 135:
        raise SystemExit(f"expected 135 ECharts preset aliases, found {len(entries)}")
    if len({entry["id"] for entry in entries}) != len(entries):
        raise SystemExit("duplicate engine-qualified ECharts preset id")
    if len({entry["export"] for entry in entries}) != len(entries):
        raise SystemExit("duplicate ECharts preset export alias")

    data = (json.dumps(entries, indent=2, ensure_ascii=False) + "\n").encode()
    if OUTPUT.exists() and OUTPUT.read_bytes() == data:
        print(f"unchanged: {OUTPUT.relative_to(ROOT)} ({len(entries)} ECharts presets)")
        return
    OUTPUT.write_bytes(data)
    print(f"wrote: {OUTPUT.relative_to(ROOT)} ({len(entries)} ECharts presets)")


if __name__ == "__main__":
    main()
