#!/usr/bin/env python3
"""Exercise the installed package consumer through the repository's headless Camofox API."""
import argparse
import json
import pathlib
import re
import time
import urllib.parse
import urllib.request

p = argparse.ArgumentParser()
p.add_argument("url")
p.add_argument("--out", required=True)
args = p.parse_args()
out = pathlib.Path(args.out)
out.mkdir(parents=True, exist_ok=True)
API = "http://localhost:9377"
USER = "siso-package-acceptance"
SESSION = "suite-v01"
checks = []
tab = None


def call(method, route, body=None):
    if body is not None:
        body = {"userId": USER, "sessionKey": SESSION, **body}
    request = urllib.request.Request(API + route, data=json.dumps(body).encode() if body is not None else None,
                                    method=method, headers={"content-type": "application/json"})
    with urllib.request.urlopen(request, timeout=45) as response:
        raw = response.read()
        return raw if "image" in response.headers.get("content-type", "") else json.loads(raw or "{}")


def ev(expression):
    result = call("POST", f"/tabs/{tab}/evaluate", {"expression": expression})
    if result.get("ok") is False:
        raise AssertionError(result)
    return result.get("result")


def wait(expression, message):
    for _ in range(30):
        if ev(expression):
            return
        time.sleep(.15)
    raise AssertionError(message)


def check(condition, message):
    if not condition:
        raise AssertionError(message)
    checks.append(message)
    print("PASS", message, flush=True)


def click(selector):
    return call("POST", f"/tabs/{tab}/click", {"selector": selector})


def named(label):
    snapshot = call("GET", f"/tabs/{tab}/snapshot?userId={USER}")["snapshot"]
    match = re.search(r'- button "' + re.escape(label) + r'" \[(e\d+)\]', snapshot)
    if not match:
        raise AssertionError(f"Button missing: {label}")
    return call("POST", f"/tabs/{tab}/click", {"ref": match.group(1)})


def press(key):
    return call("POST", f"/tabs/{tab}/press", {"key": key})


def shot(name):
    out.joinpath(name + ".png").write_bytes(call("GET", f"/tabs/{tab}/screenshot?userId={USER}"))


def navigate(page):
    call("POST", f"/tabs/{tab}/navigate", {"url": args.url.rstrip("/") + "/#" + page})
    wait(f'location.hash === "#{page}" && !!document.querySelector("h1")', f"Route {page} did not render")


try:
    tab = call("POST", "/tabs", {"url": args.url})["tabId"]
    call("POST", f"/tabs/{tab}/viewport", {"width": 1440, "height": 1000})
    wait('document.querySelector("h1")?.textContent === "The SISO package"', "Overview missing")
    check(ev('document.documentElement.dataset.suiteErrors === "0"'), "Consumer initializes with zero recorded browser errors")
    check(ev('[...document.querySelectorAll("[data-band]")].map(e=>e.dataset.band).join(",") === "glance,work,detail"'), "Dashboard bands preserve glance, work, detail order")
    check(ev('document.querySelectorAll("[data-widget]").length === 4'), "Four registered widgets render from installed packages")
    check(ev('document.body.scrollWidth <= innerWidth + 1'), "Desktop frame has no page-width overflow")
    shot("overview-desktop")

    root = "#root > .siso-shell"
    before = ev(f'document.querySelector({json.dumps(root + " .siso-shell__content")}).clientWidth')
    click(root + ' > aside button[aria-label="Collapse navigation"]')
    wait(f'document.querySelector({json.dumps(root)}).dataset.collapsed === "true"', "Collapse failed")
    check(ev(f'document.querySelector({json.dumps(root + " .siso-shell__content")}).clientWidth') > before, "Shell collapse releases content width")
    click(root + ' button[aria-label="Expand navigation"]')
    ev(f'document.querySelector({json.dumps(root + " .siso-shell__resize")}).focus()')
    press("Home")
    wait('document.querySelector(".siso-shell__resize").getAttribute("aria-valuenow") === "216"', "Minimum resize failed")
    press("End")
    wait('document.querySelector(".siso-shell__resize").getAttribute("aria-valuenow") === "400"', "Maximum resize failed")
    check(True, "Sidebar keyboard resize respects 216–400px bounds")
    call("POST", f"/tabs/{tab}/click", {"selector": root + " .siso-shell__resize", "doubleClick": True})
    wait('document.querySelector(".siso-shell__resize").getAttribute("aria-valuenow") === "256"', "Width reset failed")

    navigate("widgets")
    wait('!!document.querySelector("select[aria-label=\"Widget data state\"]")', "Widget controls missing")
    shot("widgets-desktop")
    click('[data-widget="coverage"] .siso-widget-actions > button')
    wait('document.querySelector("[data-widget=coverage] .siso-widget-actions > button").getAttribute("aria-expanded") === "true"', "Widget detail failed")
    check(ev('!document.querySelector("[data-widget=coverage] .siso-widget-detail").hidden'), "Widget detail opens in place")
    click('[data-widget="coverage"] .siso-widget-actions > button')
    click('select[aria-label="Widget data state"]')
    press("Home")
    for _ in range(3):
        press("ArrowDown")
    press("Enter")
    wait('document.querySelector("[data-widget=coverage] [data-state]").dataset.state === "error"', "Error preview state failed")
    click('[data-widget="coverage"] .siso-widget-body button')
    wait('document.querySelector("[data-widget=coverage] [data-state]").dataset.state === "ready"', "Retry failed")
    check(True, "Widget error and retry follow caller-owned data state")
    click('[data-widget="coverage"] summary')
    click('[data-widget="coverage"] select')
    press("End")
    press("Enter")
    wait('document.querySelector("[data-widget=coverage]").style.gridColumn.includes("span 12")', "XL resize failed")
    check(True, "Allowed XL widget size changes the board placement")
    click('[data-widget="coverage"] summary')
    click('[data-widget="ready"] summary')
    click('[data-widget="ready"] .siso-widget-menu button:last-child')
    wait('!document.querySelector("[data-widget=ready]")', "Widget hide failed")
    click('.siso-widget-gallery summary')
    click('.siso-widget-gallery button')
    wait('!!document.querySelector("[data-widget=ready]")', "Widget restore failed")
    check(True, "A hidden widget returns through the Add widgets gallery")
    named("Export this layout")
    exported = ev('document.querySelector("output[aria-label=\"Exported widget layout\"]").textContent')
    check(json.loads(exported)["version"] == 1, "Layout export contains versioned, parseable JSON")

    navigate("atoms")
    wait('!!document.querySelector("input[aria-label=\"Example password\"]")', "Atom examples missing")
    named("Show password")
    check(ev('document.querySelector("input[aria-label=\"Example password\"]").type === "text"'), "Password reveal changes a real native control")
    named("Confirm example action")
    named("Confirm")
    wait('document.querySelector("output[aria-label=\"Confirmed actions\"]").textContent.includes("1 times")', "Confirm callback failed")
    check(True, "Confirmation executes the consumer callback once")
    click('button[role="tab"][value="contract"], button[role="tab"][id$="trigger-contract"]')
    wait('document.body.textContent.includes("value + onChange")', "Tabs failed")
    check(True, "Atom tabs expose the selected content")
    shot("atoms-desktop")

    navigate("blocks")
    wait('!!document.querySelector("table")', "Package table missing")
    before = ev('[...document.querySelectorAll("tbody tr")].map(r=>r.textContent).join("|")')
    click('th:nth-child(3) button')
    after = ev('[...document.querySelectorAll("tbody tr")].map(r=>r.textContent).join("|")')
    check(before != after, "Sortable table changes displayed row order")
    named("Open dialog")
    wait('!!document.querySelector("[role=dialog][data-state=open]")', "Dialog failed")
    press("Escape")
    wait('!document.querySelector("[role=dialog][data-state=open]")', "Dialog Escape failed")
    check(ev('document.activeElement?.textContent === "Open dialog"'), "Dialog Escape restores focus to its trigger")
    shot("blocks-desktop")

    navigate("charts")
    wait('!!document.querySelector(".chart-preview svg")', "Lazy chart examples missing")
    names = ev('[...document.querySelectorAll(".chart-tabs button")].map(b=>b.textContent)')
    for name in names:
        named(name)
        wait(f'document.querySelector(".demo-surface h2")?.textContent === {json.dumps(name)}', f"Chart switch failed: {name}")
        check(ev('!!document.querySelector(".chart-preview svg, .chart-preview [role=grid]")'), f"Chart example renders: {name}")
    named("Range area")
    shot("charts-desktop")
    check(ev('document.documentElement.dataset.suiteErrors === "0"'), "Chart switching records zero browser errors")

    navigate("shells")
    wait('document.querySelectorAll(".siso-shell").length === 2', "Embedded shell missing")
    named("Rail + panel")
    wait('document.querySelector(".embedded-shell .siso-shell")?.dataset.layout === "rail-panel"', "Rail preset failed")
    check(True, "Rail-plus-panel preset composes inside the hub shell")
    shot("shells-desktop")

    navigate("tokens")
    named("Light theme")
    wait('document.documentElement.dataset.sisoTheme === "light"', "Theme switch failed")
    check(ev('document.documentElement.classList.contains("light") && !document.documentElement.classList.contains("dark")'), "Theme helper synchronizes token and compatibility scopes")
    shot("tokens-light")
    named("Dark theme")

    call("POST", f"/tabs/{tab}/viewport", {"width": 390, "height": 844})
    navigate("widgets")
    wait('!!document.querySelector(".siso-widget-board")', "Mobile board missing")
    check(ev('document.body.scrollWidth <= innerWidth + 1'), "Phone frame has no page-width overflow")
    wait('[...document.querySelectorAll("[data-widget]")].every(e=>e.style.gridColumn.includes("span 12"))', "Phone stacking failed")
    check(True, "Widgets fit the actual narrow container as full-width rows")
    shot("widgets-mobile")
    click(root + ' button[aria-label="Open navigation"]')
    wait('!!document.querySelector("dialog[open]")', "Mobile navigation failed")
    press("Escape")
    wait('!document.querySelector("dialog[open]")', "Mobile Escape failed")
    check(ev('document.activeElement?.getAttribute("aria-label") === "Open navigation"'), "Mobile navigation closes on Escape and returns focus")
    check(ev('document.documentElement.dataset.suiteErrors === "0"'), "Completed interaction run records zero browser errors")
    out.joinpath("browser-proof.json").write_text(json.dumps({"url": args.url, "checks": checks, "passed": len(checks), "viewports": [1440,390]}, indent=2))
    print(f"PASS {len(checks)} browser assertions; artifacts: {out}", flush=True)
except Exception:
    if tab:
        try:
            shot("failure")
            out.joinpath("failure-snapshot.json").write_text(json.dumps(call("GET", f"/tabs/{tab}/snapshot?userId={USER}"), indent=2))
        except Exception:
            pass
    raise
finally:
    if tab:
        call("DELETE", f"/tabs/{tab}?userId={USER}")
