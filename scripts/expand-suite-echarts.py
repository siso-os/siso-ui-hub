#!/usr/bin/env python3
"""Generate the portable ECharts leaf from the held Evil Charts source."""
import hashlib
import json
import re
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "app/src/kit/evilcharts"
TARGET = ROOT / "packages/siso-charts/src/echarts"
PROVENANCE = ROOT / "packages/siso-charts/echarts-provenance.json"
MARKER = "// uihub: siso:charts"


def sha(data):
    return hashlib.sha256(data).hexdigest()


def write(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    generated_barrel = path == TARGET / "index.ts"
    if path.exists() and path.read_bytes() != data and path != PROVENANCE and not generated_barrel:
        prior = data.replace(("\n\n" + MARKER + "\n").encode(), b"").rstrip() + b"\n"
        source_copy = SOURCE / path.relative_to(TARGET) if path.is_relative_to(TARGET) else None
        if path.is_relative_to(TARGET) and (path.read_bytes() == prior or (source_copy and source_copy.is_file() and path.read_bytes() == source_copy.read_bytes())):
            path.write_bytes(data)
        else:
            raise RuntimeError(f"refusing to overwrite changed file: {path.relative_to(ROOT)}")
    if not path.exists() or path == PROVENANCE or generated_barrel:
        path.write_bytes(data)


def pascal(value):
    return "".join(part[:1].upper() + part[1:] for part in re.split(r"[^A-Za-z0-9]+", value) if part)


def main():
    srcs = []
    for pattern in ("charts/echarts-*.tsx", "ui/echarts-*.tsx", "examples/echarts/*.tsx", "blocks/echarts/*.tsx"):
        srcs.extend(sorted(SOURCE.glob(pattern)))
    if len(srcs) != 148:
        raise RuntimeError(f"expected 148 held ECharts files, found {len(srcs)}")
    provenance = {
        "sourceRepository": "https://github.com/legions-developer/evilcharts",
        "heldSourceCommit": subprocess.check_output(["git", "rev-parse", "HEAD"], cwd=ROOT, text=True).strip(),
        "upstreamSourceCommit": None,
        "upstreamCommitNote": "Held app source is recorded; no upstream commit-to-file match was verified.",
        "license": {"name": "MIT", "source": "existing packages/siso-charts/source-provenance.json (Evil Charts attribution)"},
        "echartsDependency": {
            "package": "echarts", "version": "6.1.0", "upstreamRepository": "https://github.com/apache/echarts",
            "upstreamLicenseCommit": "c5a48f5f97d23e5379720870b8444cd05b50ffb4",
            "license": "Apache-2.0", "licenseFile": "packages/siso-charts/licenses/echarts-Apache-2.0.txt",
            "licenseFileSha256": sha((ROOT / "packages/siso-charts/licenses/echarts-Apache-2.0.txt").read_bytes()),
        },
        "files": [],
    }
    presets = []
    for source in srcs:
        relative = source.relative_to(SOURCE)
        original = source.read_bytes()
        text = original.decode("utf-8")
        if '@/arc-shims/kit-utils' in text:
            dest = TARGET / relative
            spec = re.sub(r"/", "/", "../" * len(dest.relative_to(TARGET).parts[:-1]) + "utils")
            text = text.replace('"@/arc-shims/kit-utils"', json.dumps(spec))
            text = text.replace("'@/arc-shims/kit-utils'", json.dumps(spec))
        if source.parts[-3] in ("examples", "blocks") or source.parts[-2] in ("charts", "ui"):
            text = text.rstrip() + "\n\n" + MARKER + "\n"
        adapted = text.encode()
        dest = TARGET / relative
        write(dest, adapted)
        exports = re.findall(r"export\s+(?:default\s+)?(?:function|const|class)\s+(\w+)", text)
        if source.parts[-3] in ("examples", "blocks"):
            if not exports:
                raise RuntimeError(f"no named component export found in {relative}")
            family = "EChartsExample" if source.parts[-3] == "examples" else "EChartsBlock"
            alias = family + pascal(source.stem)
            presets.append((relative, exports[0], alias))
        provenance["files"].append({
            "sourcePath": str(source.relative_to(ROOT)),
            "sourceSha256": sha(original),
            "targetPath": str(dest.relative_to(ROOT)),
            "adaptedSha256": sha(adapted),
            "adaptations": (["replace @/arc-shims/kit-utils with local cn helper"] if "@/arc-shims/kit-utils" in original.decode() else []) + ["append uihub marker"],
        })
    if len(presets) != 135 or len({alias for _, _, alias in presets}) != 135:
        raise RuntimeError("preset count or engine-qualified export uniqueness failed")
    lines = [MARKER, "// Modular ECharts chart components, presentation helpers, and source presets."]
    for rel in sorted(TARGET.glob("charts/echarts-*.tsx")):
        names = re.findall(r"export\s+(?:function|const|class)\s+(ECharts\w+)", rel.read_text())
        for name in names:
            lines.append(f'export {{ {name} }} from "./{rel.relative_to(TARGET).with_suffix("")}";')
    for rel in sorted(TARGET.glob("ui/echarts-*.tsx")):
        text = rel.read_text()
        module = rel.relative_to(TARGET).with_suffix("")
        names = re.findall(r"export\s+(?:function|const|class)\s+(\w+)", text)
        for name in names:
            lines.append(f'export {{ {name} as EChartsUI{pascal(rel.stem)}{name} }} from "./{module}";')
        type_names = re.findall(r"export\s+(?:type|interface)\s+(\w+)", text)
        for name in type_names:
            lines.append(f'export type {{ {name} as EChartsUI{pascal(rel.stem)}{name} }} from "./{module}";')
    lines.append('export { cn as echartsCn } from "./utils";')
    for rel, original, alias in presets:
        lines.append(f'export {{ {original} as {alias} }} from "./{rel.with_suffix("")}";')
    write(TARGET / "index.ts", ("\n".join(lines) + "\n").encode())
    util = ("import { clsx, type ClassValue } from \"clsx\";\n"
            "import { twMerge } from \"tailwind-merge\";\n\n"
            "export function cn(...inputs: ClassValue[]): string {\n  return twMerge(clsx(inputs));\n}\n\n" + MARKER + "\n")
    write(TARGET / "utils.ts", util.encode())
    provenance["files"].extend([
        {"sourcePath": "app/src/arc-shims/kit-utils.ts", "sourceSha256": sha((ROOT / "app/src/arc-shims/kit-utils.ts").read_bytes()), "targetPath": "packages/siso-charts/src/echarts/utils.ts", "adaptedSha256": sha(util.encode()), "adaptations": ["retain cn behavior using existing clsx and tailwind-merge peers"]},
    ])
    write(PROVENANCE, (json.dumps(provenance, indent=2) + "\n").encode())
    aliases = sum("kit-utils" in x["adaptations"][0] for x in provenance["files"] if x["adaptations"])
    print(f"copied {len(srcs)} source files; exported {len(presets)} unique presets; adapted {aliases} utility aliases")


if __name__ == "__main__":
    main()
