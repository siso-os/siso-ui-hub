"""hubindex: the one index of everything UI Hub holds. `uihub find|show|stats|export`, the MCP (bin/uihub-mcp) and the
site (app/) all read through `build()`, so their numbers never disagree.

Sources, in the order they are merged (an id appears once; later sources add facts to it, never a second row):
  sources/items.cat.jsonl        the 11 libraries' 1,182 items (round 1, 7 Oct)
  sources/21st/corpus.jsonl      the 21st.dev corpus: 7,984 harvested 19 Aug, 3,039 more 10 Oct (siso-ui-base registry/21st)
  sources/21st/extras.jsonl      21st.dev's templates, themes, shaders, gradients, ASCII art and libraries (1,514, same harvest)
  sources/shells/templates.json  siso-shell's page families U0-U23 (shells and page templates)
  catalogue/tools.json           tools that make UI (image generation, checks, pickers)
  catalogue/custom.json          ours (siso:*)
  catalogue/picks.json           best-in-category picks (round 1)
  catalogue/curated/picks.jsonl  his 138 hand-picked 21st items with his words; bookmarked
  catalogue/curated/scout/candidates.jsonl   303 rubric-rated 21st candidates (the scout lanes)
  catalogue/bookmarks.json       bookmarks made since (site, CLI or MCP); his picks are bookmarks too
  RESEARCH's map (foundry research/ui/records.jsonl, frontier.jsonl): sites, videos, assets, people; read, not copied

Status, best first: curated (his bookmark) > picked (best in category) > ours > rated (scout score) > reviewed (round 1
library review) > indexed (not yet gone through). Assets (previews, live bundles, demo code) are not in git: they live
in $UIHUB_ASSETS (default ~/SISO_Workspace/_data/ui-hub/21st)."""
import hashlib, json, os, re, sys, importlib.machinery, importlib.util, subprocess, collections
sys.dont_write_bytecode = True  # loading bin/categorise must not leave __pycache__ in bin/
from hubpreviews import PreviewDelivery, may_copy, archive_unused
from library_inventory import load_inventory
HUB = os.path.dirname(os.path.dirname(os.path.realpath(__file__)))
ASSETS = os.environ.get("UIHUB_ASSETS", os.path.expanduser("~/SISO_Workspace/_data/ui-hub/21st"))
FOUNDRY = os.environ.get("UIHUB_FOUNDRY", os.path.realpath(os.path.join(HUB, "../../library/foundry")))

def _load(p): return json.load(open(f"{HUB}/{p}"))
def _jl(p): return [json.loads(l) for l in open(f"{HUB}/{p}") if l.strip()]
def _rules():
    loader = importlib.machinery.SourceFileLoader("categorise", f"{HUB}/bin/categorise")
    spec = importlib.util.spec_from_loader("categorise", loader); m = importlib.util.module_from_spec(spec); loader.exec_module(m)
    return m.RULES

# 21st tags that are page sections (21st's "Marketing blocks") or motion; the rest are components
SECTION_TAGS = {"hero", "features", "cta", "pricing-section", "testimonials", "footer", "faq", "team", "clients", "comparison", "announcement"}
MOTION_TAGS = {"background", "border", "text", "cursor", "marquee", "globe"}
LAYOUT_TAGS = {"dashboard", "sidebar"}
# The side nav as 21st.dev has it (8 Oct): "Marketing Blocks" and "UI Components", plural names, counts. Ours adds
# "AI & agents", "Motion" and "SISO". category -> (section, label); anything unlisted goes to UI Components, titled.
NAV = {
 "assets/icon": ("Assets", "Icons"), "assets/logo": ("Assets", "Logos"), "assets/sound": ("Assets", "Sounds"), "assets/font": ("Assets", "Fonts"),
 "assets/illustration": ("Assets", "Illustrations"), "assets/og-image": ("Assets", "Social images"), "data-display/typography": ("UI Components", "Typography"),
 "lib/utility": ("UI Components", "Utilities"), "themes/theme": ("Templates & Themes", "Themes"), "themes/style": ("Templates & Themes", "Styles"),
 "marketing/announcement": ("Marketing Blocks", "Announcements"), "motion/background": ("Marketing Blocks", "Backgrounds"),
 "motion/border": ("Marketing Blocks", "Borders"), "marketing/cta": ("Marketing Blocks", "Calls to Action"),
 "marketing/logos": ("Marketing Blocks", "Clients"), "marketing/comparison": ("Marketing Blocks", "Comparisons"),
 "navigation/dock": ("Marketing Blocks", "Docks"), "marketing/faq": ("Marketing Blocks", "FAQs"), "marketing/features": ("Marketing Blocks", "Features"),
 "marketing/footer": ("Marketing Blocks", "Footers"), "media/gallery": ("Marketing Blocks", "Galleries"), "marketing/hero": ("Marketing Blocks", "Heroes"),
 "lib/hook": ("Marketing Blocks", "Hooks"), "data-viz/map": ("Marketing Blocks", "Maps"), "motion/marquee": ("Marketing Blocks", "Marquees"),
 "navigation/top-nav": ("Marketing Blocks", "Navigation Menus"), "marketing/pricing": ("Marketing Blocks", "Pricing Sections"),
 "layout/scroll-area": ("Marketing Blocks", "Scroll Areas"), "data-display/stat": ("Marketing Blocks", "Stats & KPIs"),
 "navigation/wizard-steps": ("Marketing Blocks", "Steppers"), "marketing/team": ("Marketing Blocks", "Team Sections"), "marketing/about": ("Marketing Blocks", "About sections"),
 "marketing/testimonials": ("Marketing Blocks", "Testimonials"), "motion/text-effect": ("Marketing Blocks", "Texts"),
 "data-display/timeline": ("Marketing Blocks", "Timelines"), "media/player": ("Marketing Blocks", "Videos"), "marketing": ("Marketing Blocks", "Other blocks"),
 "data-display/accordion": ("UI Components", "Accordions"), "overlays/alert-banner": ("UI Components", "Alerts"), "data-display/avatar": ("UI Components", "Avatars"),
 "data-display/badge": ("UI Components", "Badges"), "actions/button": ("UI Components", "Buttons"), "data-display/calendar": ("UI Components", "Calendars"),
 "data-display/card": ("UI Components", "Cards"), "media/carousel": ("UI Components", "Carousels"), "data-viz/chart": ("UI Components", "Charts & Data Viz"),
 "inputs/checkbox": ("UI Components", "Checkboxes"), "motion/cursor": ("UI Components", "Cursors"), "layout/dashboard": ("UI Components", "Dashboards"),
 "inputs/date-picker": ("UI Components", "Date Pickers"), "inputs/date-range": ("UI Components", "Date Ranges"), "overlays/dialog": ("UI Components", "Dialogs / Modals"),
 "navigation/menu": ("UI Components", "Dropdowns & Menus"), "data-display/empty-state": ("UI Components", "Empty States"),
 "data-display/tree": ("UI Components", "File Trees"), "inputs/file-upload": ("UI Components", "File Uploads"), "inputs/form-field": ("UI Components", "Forms"),
 "motion/globe": ("UI Components", "Globes"), "layout/bento-grid": ("UI Components", "Grids & Bento"),
 "actions/link": ("UI Components", "Links"), "data-display/list": ("UI Components", "Lists"), "overlays/toast": ("UI Components", "Notifications & Toasts"),
 "overlays/notifications": ("UI Components", "Notification Centres"), "motion/number-ticker": ("UI Components", "Numbers"),
 "navigation/pagination": ("UI Components", "Paginations"), "overlays/popover": ("UI Components", "Popovers"), "data-display/profile": ("UI Components", "Profiles"),
 "data-viz/progress-bar": ("UI Components", "Progress"), "inputs/radio": ("UI Components", "Radio Groups"), "inputs/search": ("UI Components", "Search Bars"),
 "inputs/select": ("UI Components", "Selects"), "navigation/sidebar": ("UI Components", "Sidebars"), "flows/sign-in": ("UI Components", "Sign Ins & Sign Ups"),
 "inputs/slider": ("UI Components", "Sliders"), "status/loader": ("UI Components", "Spinner Loaders"), "data-display/table": ("UI Components", "Tables"),
 "navigation/tabs": ("UI Components", "Tabs"), "inputs/textarea": ("UI Components", "Text Areas"), "actions/switch": ("UI Components", "Toggles & Switches"),
 "overlays/tooltip": ("UI Components", "Tooltips"), "overlays/hover-card": ("UI Components", "Hover Cards"), "overlays/sheet": ("UI Components", "Sheets & Drawers"),
 "overlays/context-menu": ("UI Components", "Context Menus"), "overlays/lightbox": ("UI Components", "Lightboxes"),
 "navigation/command-palette": ("UI Components", "Command Palettes"), "navigation/breadcrumb": ("UI Components", "Breadcrumbs"),
 "navigation/table-of-contents": ("UI Components", "Tables of Contents"), "data-display/kanban": ("UI Components", "Kanban Boards"),
 "data-display/code-block": ("UI Components", "Code Blocks"), "data-display/json-viewer": ("UI Components", "JSON Viewers"), "data-display/diff": ("UI Components", "Diffs"),
 "data-display/gamification": ("UI Components", "Leaderboards & Rewards"), "data-viz/gauge": ("UI Components", "Gauges"),
 "status/skeleton": ("UI Components", "Skeletons"), "status/status-dot": ("UI Components", "Status Dots"), "inputs/color-picker": ("UI Components", "Color Pickers"),
 "inputs/combobox": ("UI Components", "Comboboxes"), "inputs/number-input": ("UI Components", "Number Inputs"), "inputs/otp-input": ("UI Components", "OTP Inputs"),
 "inputs/period-filter": ("UI Components", "Period Filters"), "inputs/rating": ("UI Components", "Ratings"), "inputs/tag-input": ("UI Components", "Tag Inputs"),
 "inputs/time-picker": ("UI Components", "Time Pickers"), "inputs/tuning-panel": ("UI Components", "Tuning Panels"), "actions/copy-button": ("UI Components", "Copy Buttons"),
 "actions/segmented-control": ("UI Components", "Segmented Controls"), "layout/split-pane": ("UI Components", "Split Panes"),
 "layout/page-shell": ("UI Components", "Page Shells"), "media/card-stack": ("UI Components", "Card Stacks"), "media/image-compare": ("UI Components", "Image Compare"),
 "flows/settings": ("UI Components", "Settings"), "data-display/chat-thread": ("AI & Agents", "Chat Threads"),
 "ai-agent": ("AI & Agents", "AI Components"), "ai-agent/composer": ("AI & Agents", "AI Chats & Composers"), "ai-agent/response": ("AI & Agents", "AI Responses"),
 "ai-agent/run": ("AI & Agents", "Agent Runs"), "motion/tilt-3d": ("Motion", "Tilt & 3D"), "ours": ("SISO", "Ours"),
 "tools/image-gen": ("SISO", "Image Generation"), "tools/check": ("SISO", "Checks"), "tools/pick": ("SISO", "Pickers"), "tools/compose": ("SISO", "Compose"),
 "pages/templates": ("Templates & Themes", "Templates"), "themes/shadcn": ("Templates & Themes", "Themes"),
 "motion/shader": ("Marketing Blocks", "Shaders"), "motion/gradient": ("Marketing Blocks", "Gradients"), "motion/ascii": ("Marketing Blocks", "ASCII Art"),
 "other": ("UI Components", "Unsorted"), "unsorted": ("UI Components", "Unsorted"),
 # the catch-alls and the code bank's own places (10 Oct: the fallback made "Ai Agents", "Marketings", "Others")
 "ai-agent/ai-agent": ("AI & Agents", "AI agents"), "marketing/marketing": ("Marketing Blocks", "Other sections"),
 "other/other": ("UI Components", "Other"), "assets/flag": ("Assets", "Flags"), "media/mockup": ("UI Components", "Mockups"),
 "data-viz/flow": ("UI Components", "Flow diagrams"), "assets/shape": ("Assets", "Shapes"), "assets/avatar": ("Assets", "Avatar art"),
}
NAV_SECTIONS = ["Templates & Themes", "Marketing Blocks", "UI Components", "AI & Agents", "Motion", "Assets", "SISO"]
def nav_of(cat):
    if cat in NAV: return NAV[cat]
    if cat.startswith("discover/"): return ("Discover", cat.split("/", 1)[1].replace("-", " ").title())
    return ("UI Components", cat.split("/")[-1].replace("-", " ").title() + "s")

# 21st's 75 tags onto our categories (taxonomy.json groups; new ones keep the group before the slash)
TAG_CAT = {"accordion": "data-display/accordion", "ai-chat": "ai-agent/composer", "alert": "overlays/alert-banner",
  "announcement": "marketing/announcement", "avatar": "data-display/avatar", "background": "motion/background", "badge": "data-display/badge",
  "border": "motion/border", "button": "actions/button", "calendar": "data-display/calendar", "card": "data-display/card",
  "carousel": "media/carousel", "checkbox": "inputs/checkbox", "chip": "data-display/badge", "clients": "marketing/logos",
  "comparison": "marketing/comparison", "cta": "marketing/cta", "cursor": "motion/cursor", "dashboard": "layout/dashboard",
  "data-visualization": "data-viz/chart", "date-picker": "inputs/date-picker", "dock": "navigation/dock", "dropdown": "navigation/menu",
  "empty-state": "data-display/empty-state", "faq": "marketing/faq", "features": "marketing/features", "file-tree": "data-display/tree",
  "footer": "marketing/footer", "form": "inputs/form-field", "gallery": "media/gallery", "globe": "motion/globe", "grid": "layout/bento-grid",
  "hero": "marketing/hero", "hook": "lib/hook", "icon": "assets/icon", "image": "media/gallery", "input": "inputs/form-field",
  "link": "actions/link", "list": "data-display/list", "map": "data-viz/map", "marquee": "motion/marquee", "menu": "navigation/menu",
  "modal": "overlays/dialog", "navigation-menu": "navigation/top-nav", "notification": "overlays/toast", "number": "motion/number-ticker",
  "onboarding": "navigation/wizard-steps", "pagination": "navigation/pagination", "popover": "overlays/popover",
  "pricing-section": "marketing/pricing", "profile": "data-display/profile", "progress": "data-viz/progress-bar", "radio-group": "inputs/radio",
  "scroll-area": "layout/scroll-area", "search": "inputs/search", "select": "inputs/select", "sidebar": "navigation/sidebar",
  "sign-in": "flows/sign-in", "sign-up": "flows/sign-in", "slider": "inputs/slider", "spinner": "status/loader", "stat": "data-display/stat",
  "steps": "navigation/wizard-steps", "table": "data-display/table", "tabs": "navigation/tabs", "team": "marketing/team",
  "testimonials": "marketing/testimonials", "text": "motion/text-effect", "textarea": "inputs/textarea", "timeline": "data-display/timeline",
  "toast": "overlays/toast", "toggle": "actions/switch", "tooltip": "overlays/tooltip", "upload-download": "inputs/file-upload", "video": "media/player"}
# his types on his picks (curated/picks.jsonl `type`, head/sub): a few heads decide on their own, a few are the fallback
TYPE_CAT = {"auth": "flows/sign-in", "card": "data-display/card", "gamification": "data-display/gamification", "chart": "data-viz/chart", "ai": "ai-agent", "chat": "ai-agent/composer"}
TYPE_FALLBACK = {"dashboard": "layout/dashboard", "card": "data-display/card", "media": "media/gallery", "nav": "navigation/menu"}
LIB_KIND = {"block": "section", "template": "page", "component": "component", "motion": "motion", "interaction": "interaction",
            "primitive": "primitive", "toy": "toy", "lib": "lib"}
KINDS = ["component", "section", "page", "theme", "shell", "layout", "motion", "interaction", "primitive", "toy", "lib", "tool", "asset", "resource"]
KIND_LABEL = {"component": "Components", "section": "Sections", "page": "Pages & templates", "theme": "Themes", "shell": "Shells",
              "layout": "Layouts & dashboards", "motion": "Motion & backgrounds", "interaction": "Interactions",
              "primitive": "Primitives", "toy": "Toys", "lib": "Hooks & libs", "tool": "Tools", "asset": "Assets", "resource": "Discover"}
STATUS = ["curated", "picked", "ours", "rated", "reviewed", "indexed"]
# the code bank's registry names that round 1 knows as another library
REG_AS_LIB = {"uiarc": "arc"}
# our apps' inventory categories that the library names differently (inventory/<app>.jsonl -> the hub's categories)
OURS_CAT = {"composite/card": "data-display/card", "composite/list": "data-display/list", "composite/chrome": "layout/page-shell",
            "composite/section": "layout/page-shell", "ai-agent": "ai-agent/composer", "composite/other": "ours", "marketing": "marketing/hero"}
# a part with no category yet (named in code the inventory hasn't read): its name says what it is, first match wins
OURS_NAME = [(r"HoverCard", "overlays/hover-card"), (r"Palette|Command", "navigation/command-palette"), (r"Tabs?$|TabBar", "navigation/tabs"),
             (r"Rail|SideNav|Sidebar|Nav$|NavGroup|WorkspaceNav", "navigation/sidebar"), (r"Breadcrumb", "navigation/breadcrumb"), (r"Menu", "navigation/menu"),
             (r"Dialog|Modal", "overlays/dialog"), (r"Sheet|Drawer", "overlays/sheet"), (r"Toast", "overlays/toast"), (r"Tooltip", "overlays/tooltip"),
             (r"Popover|Peek", "overlays/popover"), (r"Composer|Prompt", "ai-agent/composer"), (r"Chat|Thread|Message", "data-display/chat-thread"),
             (r"Table|Grid$", "data-display/table"), (r"Chart|Graph|Trend|Spark", "data-viz/chart"), (r"Progress", "data-viz/progress-bar"),
             (r"Stat|Metric|Kpi", "data-display/stat"), (r"Timeline|Activity|Feed", "data-display/timeline"), (r"Tree|OrgChart", "data-display/tree"),
             (r"Avatar|Face", "data-display/avatar"), (r"Badge|Pill|Chip|Tag", "data-display/badge"), (r"Empty", "data-display/empty-state"),
             (r"Skeleton", "status/skeleton"), (r"Spinner|Loader|Loading", "status/loader"), (r"Search", "inputs/search"), (r"Select|Picker", "inputs/select"),
             (r"Toggle|Switch", "actions/switch"), (r"Button", "actions/button"), (r"Input|Field|Form", "inputs/form-field"),
             (r"Card|Tile", "data-display/card"), (r"List|Row$", "data-display/list"), (r"Shell|Frame|Layout|TopBar|Header|Footer|Panel", "layout/page-shell")]
# licence of the 21st corpus: each component is its author's; we view and install it through 21st's own registry line
LICENCE_21ST = "author's terms (21st.dev); install through 21st's registry, never copy"

EXTRA = {"templates": ("page", "pages/templates"), "themes": ("theme", "themes/shadcn"), "shaders": ("motion", "motion/shader"),
         "gradients": ("motion", "motion/gradient"), "ascii": ("motion", "motion/ascii"), "library": ("resource", "discover/21st-libraries")}
PRE_RULES = [(r"profile", "data-display/profile"), (r"prompt|composer|chat-?input", "ai-agent/composer"),
             (r"sign-?in|log-?in|sign-?up|(^|-)auth", "flows/sign-in")]  # before bin/categorise's rules ("profile" is not a file upload)
def categorise(text, rules):
    for pat, c in PRE_RULES + list(rules):
        if re.search(pat, text): return c
    return "other"

def research():
    """RESEARCH's UI map, read from the foundry checkout: the working copy (it writes there live; a half-written line is
    skipped), else its last commit. Never written to."""
    def rows(txt):
        out = []
        for l in txt.splitlines():
            try: out.append(json.loads(l))
            except Exception: pass
        return out
    out = {}
    for name in ("records", "frontier"):
        p = f"{FOUNDRY}/research/ui/{name}.jsonl"
        got = rows(open(p).read()) if os.path.exists(p) else []
        if not got:
            got = rows(subprocess.run(["git", "-C", FOUNDRY, "show", f"HEAD:research/ui/{name}.jsonl"], capture_output=True, text=True).stdout)
        out[name] = [r for r in got if isinstance(r, dict) and r.get("id" if name == "records" else "lead")]
    return out

def choose_tag(tags, slug, tag_n):
    """The tag an item is filed under: the one its own name says (a 'hero-section' is a hero even when 21st also tags
    it footer and cta), else the most specific one (fewest items)."""
    if not tags: return None
    words = slug.lower()
    named = [t for t in tags if t.replace("-section", "").replace("-menu", "") in words]
    return (named or sorted(tags, key=lambda t: tag_n.get(t, 0)))[0]

def industries():
    """The 17 researched industries (foundry intelligence/agency/industries, N1 records): read only."""
    import glob
    out = []
    for f in sorted(glob.glob(f"{FOUNDRY}/intelligence/agency/industries/*.json")):
        try: d = json.load(open(f))
        except Exception: continue
        out.append({"id": d.get("industry_id"), "name": d.get("industry_name"), "summary": str(d.get("summary") or "")[:400],
                    "software": [x.get("name") for x in d.get("software") or [] if isinstance(x, dict)][:12],
                    "modules": [x.get("repository") for x in d.get("modules") or [] if isinstance(x, dict)][:12],
                    "processes": [{"name": x.get("process") or x.get("id"), "boundary": str(x.get("automation_boundary") or "")[:300],
                                   "software": x.get("current_software") or [], "modules": x.get("github_modules") or []}
                                  for x in d.get("processes") or [] if isinstance(x, dict)],
                    "status": d.get("status"), "as_of": d.get("as_of")})
    return out

def industry_kits(inds, ui):
    """Each industry: the screens its processes need (UI_RULES), each with the best items we hold, plus the shell."""
    by = collections.defaultdict(list)
    for i in ui: by[i["category"]].append(i)
    for ind in inds:
        for pr in ind["processes"]:
            cats = []  # the process name decides; the boundary only when the name says nothing (it is full of "do not ...")
            for text in (pr["name"].lower(), pr["boundary"].lower()):
                for pat, cs in UI_RULES:
                    if re.search(pat, text): cats += [c for c in cs if c not in cats]
                if cats: break
            pr["ui"] = [{"category": c, "label": nav_of(c)[1], "best": best_in(by, c)} for c in cats[:4]]
        ind["shell"] = [{"category": c, "label": nav_of(c)[1], "best": best_in(by, c)} for c in ("layout/dashboard", "navigation/sidebar", "data-display/stat")]
        screens = {}  # each screen once, with the processes that need it (the process blocks repeated them)
        for n, pr in enumerate(ind["processes"]):
            for u in pr["ui"]:
                sc = screens.setdefault(u["category"], dict(u, best=best_in(by, u["category"], 6), processes=[]))
                sc["processes"].append(n)
        ind["screens"] = sorted(screens.values(), key=lambda x: -len(x["processes"]))
    return inds

def build():
    rules = _rules(); items = {}; order = []
    tag_n = collections.Counter(t for l in open(f"{HUB}/sources/21st/corpus.jsonl") for t in json.loads(l).get("tags") or [])
    def put(r):
        if r["id"] not in items: order.append(r["id"])
        items.setdefault(r["id"], {}).update(r)
    group_of = {c["category"]: c["group"] for c in _load("catalogue/taxonomy.json")["categories"]}
    libs = {l["id"]: l for l in _load("sources/libraries.json")["libraries"]}
    for r in _jl("sources/items.cat.jsonl"):
        lib = libs.get(r["lib"], {})
        put({"id": r["id"], "name": r["name"], "title": r.get("title") or r["name"], "desc": r.get("desc") or "",
             "kind": LIB_KIND.get(r["kind"], "component"), "source": r["lib"], "category": r["cat"], "author": lib.get("name", r["lib"]),
             "url": r.get("url"), "install": r.get("install"), "licence": lib.get("licence", "unknown"), "tier": r.get("tier"),
             "deps": r.get("deps") or [], "status": "reviewed", "live": r.get("url"),
             **{k: r[k] for k in ("preview_url", "upstream_preview", "preview_file", "preview_licence", "shot") if k in r}})
    # MIT registry snapshots already held for fingerprinting also belong in the catalogue.
    reference = _load("_reference/shadcn/manifest.json")
    preview_index = {(r["kind"], r["name"]): r for r in _load("_reference/shadcn/previews/index.json") if r.get("ok")}
    for r in reference["items"]:
        if not r.get("ok"): continue
        name, kind = r["name"], r["kind"]
        preview = preview_index.get((kind, name), {})
        file = preview.get("file") or (f"{name}.png" if kind == "blocks" else f"{kind}/{name}.png")
        style = r.get("style") or reference.get("style") or "base-nova"
        cat = "data-viz/chart" if kind == "charts" else "layout/dashboard" if name == "dashboard-01" else "navigation/sidebar" if name.startswith("sidebar-") else "flows/sign-in" if name.startswith(("login-", "signup-")) else categorise(name, rules)
        put({"id": f"shadcn-ui:{name}", "name": name, "title": name.replace("-", " ").capitalize(),
             "desc": r.get("description") or "", "kind": "layout" if kind == "blocks" else "component", "source": "shadcn-ui",
             "category": cat, "author": "shadcn", "url": preview.get("source") or f"https://ui.shadcn.com/blocks/{name}",
             "install": f"npx shadcn@latest add https://ui.shadcn.com/r/styles/{style}/{name}.json",
             "licence": "MIT", "preview_licence": "MIT", "tier": "free", "status": "reviewed",
             "reference_preview": file, "licence_url": "https://github.com/shadcn-ui/ui/blob/main/LICENSE.md",
             "deps": r.get("registryDependencies") or []})
    bank = bank_classifier()
    # 21st's own studio tools (ASCII editor, Shader Builder, Gradient Builder) say in the description what a part is,
    # whatever its name ("aa") or tags ("video"): 666 of them on 10 Oct were spread over backgrounds, other and video
    # players. The tool's named style ("in the Silk style") is the subcategory when 5 or more parts share it.
    corpus = list(_jl("sources/21st/corpus.jsonl"))
    def studio(r):
        d = r.get("desc") or ""; m = STUDIO.search(d); s = STYLE_OF.search(d)
        return (STUDIO_CAT[m.group(1).lower()], s.group(1).strip() if s else None) if m else (None, None)
    made = {r["id"]: studio(r) for r in corpus}
    # a reader's call outranks the rules: sources/21st/sorted.jsonl, {"id", "cat"} or {"id", "junk": true} (tests and
    # gibberish, left out of the index; the corpus keeps them). Haiku agents, 10 Oct: the 741 no rule could place.
    sorted21 = {o["id"]: o for o in _jl("sources/21st/sorted.jsonl")} if os.path.exists(os.path.join(HUB, "sources/21st/sorted.jsonl")) else {}
    style_n = collections.Counter(v for v in made.values() if v[0])
    for r in corpus:
        tags = r.get("tags") or []; weak = r.get("tags_weak") or []
        t = choose_tag(tags or weak[:2], r.get("slug") or "", tag_n)
        kind = ("section" if t in SECTION_TAGS else "layout" if t in LAYOUT_TAGS else "motion" if t in MOTION_TAGS
                else "lib" if t == "hook" else "component")
        slug = (r.get("slug") or "").lower()
        pre = next((c for pat, c in PRE_RULES if re.search(pat, slug)), None)  # the name beats a generic tag
        cat = pre or (TAG_CAT.get(t) if t else categorise(slug, rules))
        if pre: kind = "component"
        sub = None
        scat, style = made[r["id"]]
        if scat:  # made in 21st's studio: the tool says what it is
            cat, kind, sub = scat, "motion", style if style_n[(scat, style)] >= 5 else None
        # The code bank's reader files a part by what its name says it is (10 Oct: of 40 parts where it and 21st's tags
        # disagreed, it was right 32 times). 21st's own tag stays where it is the stronger word: icons, shaders, ASCII,
        # gradients, text effects, and the backgrounds 21st's studios make.
        desc = (r.get("desc") or "").lower()
        if bank and not pre and cat not in KEEP_21ST and "made with the 21st" not in desc:
            bcat, bsub, *_ = bank.classify({"reg": "21st", "name": slug, "title": (r.get("name") or "").replace("-", " "),
                                            "description": "", "type": ""}, set(), set(), set())
            if bcat != "other/other" and not (cat == "motion/background" and re.search(r"shader|webgl|background", desc)):
                cat, sub, kind = bcat, bsub, GROUP_KIND.get(bcat.split("/")[0], "component")
            elif bcat == "other/other" and not tags and desc.strip():
                # a weak tag is 21st's guess, not the author's word: what the description says the part is beats it
                # (10 Oct: of 30 where they disagreed, the description was right 21 times and the guess 4)
                ws = bank.head_words(bank.desc_head(desc).replace(" ", "-"))
                hc = (bank.by_head(ws) or bank.by_head([bank.singular(w) for w in ws])) if ws else None
                if hc: cat, sub, kind = hc, None, GROUP_KIND.get(hc.split("/")[0], "component")
        o = sorted21.get(r["id"])
        if o and o.get("junk"): continue
        if o and o.get("cat"):
            cat, sub, kind = o["cat"], None, GROUP_KIND.get(o["cat"].split("/")[0], "component")
        if bank and not sub:  # the bank's finer places for the category it kept (its name and 21st's tags)
            text = " ".join([slug.replace("-", " "), (r.get("name") or "").replace("-", " "), *tags, *weak]).lower()
            sub = next((s for rx, s in bank.SUBS.get(cat, []) if rx.search(text)), None)
            if not sub and desc.strip():  # else what its description says it is (10 Oct: 845 of 3,523 placed, 22 of 25 right)
                head = bank.desc_head(desc).lower()
                sub = next((s for rx, s in bank.SUBS.get(cat, []) if rx.search(head)), None) if head else None
        put({"id": r["id"], "name": r.get("slug") or r["name"], "title": (r.get("name") or "").replace("-", " ").strip().capitalize(),
             "desc": r.get("desc") or "", "kind": kind, "source": "21st", "category": cat, "sub": sub, "author": r.get("author"), "url": r.get("url"),
             "install": r.get("install"), "licence": r.get("licence") or LICENCE_21ST,
             "preview_licence": r.get("preview_licence"), "tier": r.get("tier") or "free", "tags": tags, "tags_weak": weak, "uses": r.get("uses") or 0,
             "video": r.get("video"), "bundle_url": r.get("bundle_url"), "preview_url": r.get("preview_url"), "status": "indexed", "has": {"preview": r.get("preview"), "bundle": r.get("bundle"), "demo": r.get("demo")}})
    # 21st's other shelves (21st.dev's top nav: Templates, Themes; Marketing Blocks: Shaders, Gradients, ASCII Art; and
    # its libraries, which are collections of components and so go to Discover). Previews only: no code was harvested.
    for r in _jl("sources/21st/extras.jsonl"):
        kind, cat = EXTRA[r["kind"]]
        title = re.sub(r"\s*(shadcn theme preview|[|—–-]\s*(Community (Shader|Gradient)|ASCII Art Effect|\d* ?React Components|Preview & Copy|21st)).*$", "", r.get("title") or "").strip()
        put({"id": f"21st-{r['kind'].rstrip('s')}:{r['id']}", "name": r["slug"], "title": title or r["slug"], "desc": r.get("description") or "",
             "kind": kind, "source": "21st", "category": cat, "author": r.get("owner"), "url": r.get("url"), "licence": r.get("licence") or LICENCE_21ST,
             "preview_licence": r.get("preview_licence"), "tier": r.get("tier") or "free", "status": "indexed", "preview_url": r.get("ogImage"),
             "xp": f"{r['dir']}/{r['preview_file']}" if r.get("preview_file") else None, "has": {"preview": bool(r.get("preview_file"))}})
    for t in _load("sources/shells/templates.json")["templates"]:
        u = t["id"]; shell = u == "U0"
        put({"id": f"shell:{u}", "name": u, "title": t["family"], "desc": (t.get("source_data") or "")[:300], "kind": "shell" if shell else "page",
             "source": "siso-shell", "category": "layout/page-shell", "author": "SISO", "url": f"https://siso-shell.pages.dev/t/{u}/",
             "live": f"https://siso-shell.pages.dev/t/{u}/example/", "install": f"bin/compose {u} data.json --out page.html  (siso-shell)",
             "licence": "ours", "status": "ours", "sections": t.get("sections")})
    if os.path.exists(f"{HUB}/catalogue/tools.json"):
        for k, v in _load("catalogue/tools.json").items():
            if k.startswith("_"): continue
            put({"id": k, "name": k.split(":", 1)[1], "kind": "tool", "source": "siso", "category": v.get("category", "tools"),
                 "author": v.get("by", "SISO"), "status": "ours", **{x: v[x] for x in ("title", "desc", "install", "url", "licence", "where") if x in v}})
    for k, v in _load("catalogue/custom.json").items():
        if k.startswith("_"): continue
        put({"id": k, "name": k.split(":", 1)[1], "title": k.split(":", 1)[1].replace("-", " ").capitalize(), "desc": v["reason"], "kind": "component",
             "source": "siso", "category": v.get("category", "ours"), "author": "SISO", "from": v["from"], "licence": "ours",
             "status": "ours", "since": v.get("since")})
    for cat, v in _load("catalogue/picks.json").items():
        if cat.startswith("_"): continue
        for pid in [v["pick"]] + [a for a in v.get("also", []) if ":" in a and " " not in a]:
            if pid in items:
                items[pid]["pick"] = {"category": cat, "why": v["why"], "main": pid == v["pick"]}
                items[pid]["category"] = cat; items[pid]["status"] = "picked"
    marks = bookmarks(); og = _load("sources/21st/previews-extra.json")
    for r in _jl("catalogue/curated/picks.jsonl"):
        iid = "21st:" + r["harvest_id"]
        if iid not in items:  # four of his picks were never in the corpus harvest
            put({"id": iid, "name": r["slug"], "title": r["slug"].replace("-", " ").capitalize(), "desc": "", "kind": "component",
                 "source": "21st", "category": "other", "author": r["author"], "url": r["url"], "licence": LICENCE_21ST,
                 "install": f'npx shadcn@latest add "https://21st.dev/r/{r["author"]}/{r["slug"]}"', "status": "indexed",
                 "preview_url": og.get(iid), "has": {"preview": os.path.exists(f"{ASSETS}/harvest/{r['harvest_id']}/preview.png")}})
        it = items[iid]
        it["curated"] = {"n": r["n"], "signal": r["signal"], "note": r["feedback"], "targets": r.get("targets") or [],
                         "type": r.get("type"), "form": r.get("form"), "session": r.get("session")}
        it["status"] = "curated"
        it.setdefault("has", {})["source"] = bool(r.get("has_source"))
        if r.get("type"):  # his own type for the pick wins over 21st's tags
            head, _, sub = r["type"].partition("/")
            it["category"] = TYPE_CAT.get(head) or categorise(sub, rules)
            if it["category"] == "other": it["category"] = TYPE_FALLBACK.get(head) or categorise(head, rules)
            if it["kind"] in ("motion", "lib"): it["kind"] = "component"
    for r in _jl("catalogue/curated/scout/candidates.jsonl"):
        iid = "21st:" + r["id"]
        if iid in items:
            items[iid]["score"] = {"bank": r.get("bank_score"), "lane": r.get("lane"), "why": r.get("why")}
            if items[iid]["status"] == "indexed": items[iid]["status"] = "rated"
    for iid, m in marks.items():
        if iid in items: items[iid]["bookmark"] = m
    res = research()
    for r in res["records"]:
        iid = "res:" + r["id"]
        put({"id": iid, "name": r.get("key") or r["id"], "title": r.get("title") or r.get("key"), "desc": r.get("why") or "",
             "kind": "resource", "source": "research", "category": "discover/" + r.get("area", "other"), "author": r.get("by") or "",
             "url": r.get("url"), "licence": r.get("licence") or "unknown", "tags": r.get("tags") or [], "res_kind": r.get("kind"),
             "status": "indexed", "free": r.get("free"), "stars": r.get("stars")})
    out = [items[i] for i in order]
    for it in out:
        c = it.get("category") or "other"
        if c.endswith("?"): c = it["category"] = c[:-1]; it["category_unsure"] = True
        # one name per place (10 Oct: "ai-agent" sat beside "ai-agent/ai-agent"): a bare group is its catch-all, and
        # what round 1 left "unsorted" or "other" gets the bank's reader (name, then description), else the bank's Other
        c = it["category"] = BARE_CAT.get(c, c)
        if c in ("other", "unsorted") and bank:
            c = it["category"] = bank.classify({"reg": it.get("source") or "", "name": it["name"], "title": it.get("title") or "",
                                                "description": it.get("desc") or "", "type": ""}, set(), set(), set())[0]
        if bank and not it.get("sub"):  # the bank's finer places, for every library's parts (shadcn's "chart area step" is Area)
            text = " ".join([it["name"].replace("-", " "), (it.get("title") or ""), *(it.get("tags") or [])]).lower()
            it["sub"] = next((s for rx, s in bank.SUBS.get(c, []) if rx.search(text)), None)
        it["group"] = group_of.get(c) or c.split("/")[0]
        it["bookmarked"] = bool((it.get("curated") or it.get("bookmark")) and not (it.get("bookmark") or {}).get("off"))
    return {"items": out, "frontier": res["frontier"], "libraries": list(libs.values())}

def bookmarks():
    p = f"{HUB}/catalogue/bookmarks.json"
    return {k: v for k, v in json.load(open(p)).get("items", {}).items()} if os.path.exists(p) else {}

def stats(idx=None):
    idx = idx or build(); it = idx["items"]; C = collections.Counter
    ui = [i for i in it if i["kind"] not in ("resource", "asset")]
    return {
        "total": len(it), "ui_items": len(ui), "resources": sum(1 for i in it if i["kind"] == "resource"),
        "assets": sum(1 for i in it if i["kind"] == "asset"),
        "by_kind": dict(C(i["kind"] for i in it).most_common()),
        "by_source": dict(C(i["source"] for i in it).most_common()),
        "by_status": {s: sum(1 for i in it if i["status"] == s) for s in STATUS},
        "by_group": dict(C(i["group"] for i in ui).most_common()),
        "by_signal": dict(C(i["curated"]["signal"] for i in it if i.get("curated")).most_common()),
        "bookmarked": sum(1 for i in it if i["bookmarked"]),
        "gone_through": sum(1 for i in ui if i["status"] != "indexed"),
        "left_in_corpus": sum(1 for i in ui if i["status"] == "indexed"),
        "with_live_preview": sum(1 for i in it if (i.get("has") or {}).get("bundle") or i.get("live")),
        "frontier_open": sum(1 for f in idx["frontier"] if f.get("status") == "open"),
        "frontier_by_area": dict(C(f["area"] for f in idx["frontier"] if f.get("status") == "open").most_common()),
        "categories": len({i["category"] for i in ui}),
        "typed": sum(1 for i in it if i.get("type")),
        "by_rating": dict(sorted(C((i.get("type") or {}).get("rating") for i in it if (i.get("type") or {}).get("rating")).items())),
        "coverage": coverage(ui),
        "good_not_curated": [i["id"] for i in sorted((i for i in ui if i.get("score") and i["status"] == "rated"), key=lambda i: -(i["score"].get("bank") or 0))[:12]],
        "left_to_find": [c["category"] for c in coverage(ui) if not c["curated"] and not c["picked"]][:24],
        "authors": len({i.get("author") for i in it if i["source"] == "21st"}),
    }

def coverage(ui):
    """Per category: how many items, how many gone through, his picks, best-in-category picks. Biggest first."""
    rows = collections.defaultdict(lambda: {"total": 0, "gone": 0, "curated": 0, "picked": 0})
    for i in ui:
        r = rows[i["category"]]; r["total"] += 1
        r["gone"] += i["status"] != "indexed"; r["curated"] += i["status"] == "curated"; r["picked"] += bool(i.get("pick"))
    out = [{"category": c, "section": nav_of(c)[0], "label": nav_of(c)[1], **r} for c, r in rows.items()]
    return sorted(out, key=lambda r: -r["total"])

RANK = {s: n for n, s in enumerate(STATUS)}
def best_in(items_by_cat, cat, n=3):
    return [i["id"] for i in sorted(items_by_cat.get(cat, []), key=lambda i: (RANK[i["status"]], -(i.get("uses") or 0)))[:n]]

# what an industry's process needs on screen: rules over the process name and its automation boundary
UI_RULES = [
 (r"inquir|intake|capture|application|lead|request|onboard|enrol", ["inputs/form-field"]),
 (r"schedul|appointment|booking|reservation|arrival|calendar|shift|visit", ["data-display/calendar", "inputs/date-picker"]),
 (r"task|rout|work.?order|maintenance|ticket|dispatch|queue|pipeline|triage", ["data-display/kanban", "data-display/table"]),
 (r"follow.?up|remind|notif|outreach|messag|communicat|update", ["overlays/toast", "data-display/chat-thread"]),
 (r"invoice|billing|payment|collect|reconcil|expense|bookkeep|payroll|close", ["data-display/table", "data-display/stat"]),
 (r"report|metric|kpi|performance|forecast|analytic", ["data-viz/chart", "data-display/stat"]),
 (r"document|contract|file|complian|record|evidence|disclos", ["inputs/file-upload", "data-display/list"]),
 (r"status|track|shipment|progress|timeline|milestone|renewal", ["data-display/timeline", "data-viz/progress-bar"]),
 (r"listing|propert|catalog|product|inventory|course|content", ["data-display/card", "media/gallery"]),
 (r"candidate|recruit|match|screen|profile", ["data-display/profile", "data-display/table"]),
]

def search(idx, words, kind=None, source=None, limit=20):
    q = [w.lower() for w in words if w and (len(w) > 2 or len(words) == 1)]; hits = []
    rank = {s: n for n, s in enumerate(STATUS)}
    for i in idx["items"]:
        if kind and i["kind"] != kind: continue
        if source and i["source"] != source: continue
        name = (i.get("name") or "").lower()
        hay = " ".join(str(x) for x in (i.get("name"), i.get("title"), i.get("category"), i.get("desc"), " ".join(i.get("tags") or []),
                                         (i.get("pick") or {}).get("why"), (i.get("curated") or {}).get("note"), (i.get("curated") or {}).get("type"),
                                         i.get("author"))).lower()
        s = sum((6 if w in name else 2) for w in q if w in hay)
        if q and not s: continue
        if q and not all(w in hay for w in q): s -= 4
        s += (6 - rank[i["status"]]) * 0.6 + min((i.get("uses") or 0) / 2000, 2)
        if i.get("tier") not in ("free", None): s -= 2
        if "remix" in name and not any("remix" in w for w in q): s -= 3  # 21st themes: the original before its remixes
        hits.append((s, i))
    return [i for s, i in sorted(hits, key=lambda h: -h[0])[:limit]]

def get(idx, iid):
    for i in idx["items"]:
        if i["id"] == iid or i["id"].endswith(":" + iid) or i["id"].endswith("__" + iid): return i
    return None

def code(item):
    """The code we hold for an item: real TSX source (curated, 21st-source-harvest), else the demo TSX. Library code
    is installed with its line, never copied here."""
    if item["source"] != "21st": return None
    h = item["id"].split(":", 1)[1]
    for p, label in ((f"{ASSETS}/source/{h}/code.tsx", "component.tsx"), (f"{ASSETS}/harvest/{h}/demo.tsx", "demo.tsx")):
        if os.path.exists(p): return {"file": label, "code": open(p).read()}
    return None

def nav_tree(idx):
    """The side nav: sections in NAV_SECTIONS order, rows A-Z by label like 21st, with counts and his picks per row."""
    rows = collections.defaultdict(lambda: {"n": 0, "his": 0})
    for i in idx["items"]:
        if i["kind"] in ("resource", "asset"): continue
        sec, lab = nav_of(i["category"]); r = rows[(sec, lab)]; r["n"] += 1; r["his"] += i["status"] == "curated"
        r.setdefault("cats", set()).add(i["category"])
    out = []
    for sec in NAV_SECTIONS:
        items = [{"label": lab, "categories": sorted(r["cats"]), "n": r["n"], "his": r["his"]} for (sc, lab), r in rows.items() if sc == sec]
        if items: out.append({"section": sec, "items": sorted(items, key=lambda x: (x["label"] in ("Unsorted", "Other blocks"), x["label"]))})
    return out

def fnv(s):
    """Shard of an id: FNV-1a 32-bit mod 64. app/src/data.ts computes the same."""
    h = 0x811C9DC5
    for ch in s.encode():
        h = ((h ^ ch) * 0x01000193) & 0xFFFFFFFF
    return h % 64

def files(item):
    """Every code file we hold for a 21st item (real source for his picks, the demo for all). Library code is
    installed with its line, never copied here."""
    if item["source"] != "21st": return []
    h = item["id"].split(":", 1)[1]; out = []
    for p, label in ((f"{ASSETS}/source/{h}/code.tsx", "component.tsx"), (f"{ASSETS}/harvest/{h}/demo.tsx", "demo.tsx")):
        if os.path.exists(p): out.append({"file": label, "code": open(p).read()})
    return out

# The public build (A0 relaying Shaan, 9 Oct 00:12: "strip everything HALO and every private item; his notes and private
# bookmarks stay private; the public picks are fine"). Case matters: HALO and Oracle are product names; "halo" is a glow.
PRIVATE = re.compile(r"\bHALO\b|\bHalo (CRM|Streaming)\b|\bOracle\b|\bCam\b|Cam's|\bBYK\b|Caf[eé] ?89|Kikas|[Dd]ispensar|[Oo]perator[- ](login|dashboard|onboarding|app|ui|UI|shell)|AgentNotificationStack|AgentHoverCard|SISO ?CRM|models?-app")

def publicise(idx):
    """A copy of the index with nothing private in it: his curation (notes, signals, targets) and bookmarks removed,
    ours (siso:*, built inside HALO and Agent Base) left out, and any text that names HALO or a client dropped."""
    import copy
    out = []
    for i in copy.deepcopy(idx["items"]):
        if i["id"].startswith("siso:"): continue
        if PRIVATE.search(f"{i['id']} {i.get('title') or ''} {i.get('name') or ''}"): continue
        i.pop("curated", None); i.pop("bookmark", None); i["bookmarked"] = False
        if i["status"] == "curated": i["status"] = "rated" if i.get("score") else "indexed"
        if i.get("pick") and PRIVATE.search(i["pick"].get("why") or ""): i["pick"]["why"] = ""
        if i.get("score") and PRIVATE.search(i["score"].get("why") or ""): i["score"]["why"] = ""
        for k in ("desc", "from", "reason", "where"):
            if isinstance(i.get(k), str) and PRIVATE.search(i[k]): i[k] = ""
        if i.get("sections") and PRIVATE.search(json.dumps(i["sections"])): i["sections"] = None
        out.append(i)
    front = [dict(f, why="" if PRIVATE.search(f.get("why") or "") else f.get("why")) for f in idx["frontier"]
             if not PRIVATE.search(f.get("lead") or "")]
    return {"items": out, "frontier": front, "libraries": [dict(l, verdict="" if PRIVATE.search(l.get("verdict") or "") else l.get("verdict")) for l in idx["libraries"]]}

def private_texts():
    """His words that must never appear in the public build: every note on his picks and bookmarks (24+ characters)."""
    t = [r.get("feedback") or "" for r in _jl("catalogue/curated/picks.jsonl")] + [v.get("note") or "" for v in bookmarks().values()]
    return [x for x in t if len(x) >= 24]

def privacy_check(out):
    """Fail (return the hits) when anything private is in OUT: a PRIVATE term or any of his note texts."""
    hits = []; notes = private_texts()
    for root, _, fs in os.walk(out):
        for f in fs:
            if not f.endswith((".json", ".html", ".js", ".css", ".svg", ".txt", ".map")): continue
            txt = open(os.path.join(root, f), encoding="utf-8", errors="ignore").read()
            sensitive = {
                "private filesystem path": r"(?:(?<![A-Za-z0-9.:/])/(?:Users|home)/|file:///(?:Users|home)/|SISO_Workspace/|\\Users\\)",
                "credential material": r"(?:-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|\bAKIA[0-9A-Z]{16}\b|\bgh[pousr]_[A-Za-z0-9]{30,}|\bgithub_pat_[A-Za-z0-9_]{30,}|\bsk-(?:proj-)?[A-Za-z0-9_-]{32,})",
                "credential assignment": r"(?i)(?:api[_-]?key|password|secret[_-]?key|access[_-]?token)\s*[\"']?\s*[:=]\s*[\"'][A-Za-z0-9_+/=-]{24,}[\"']",
            }
            for label, pattern in sensitive.items():
                if re.search(pattern, txt): hits.append(f"{os.path.relpath(os.path.join(root, f), out)}: {label} (value redacted)")
            # library locale tables carry ordinary words that collide with names (Portuguese "Dispensar" = dismiss)
            txt = re.sub(r"dismiss:\s*[`\"']Dispensar[`\"']", "dismiss:``", txt)
            for m in list(PRIVATE.finditer(txt))[:3]: hits.append(f"{os.path.relpath(os.path.join(root, f), out)}: private term (value redacted)")
            for n in notes:
                if n[:60] in txt: hits.append(f"{os.path.relpath(os.path.join(root, f), out)}: private note (value redacted)"); break
    return hits

def pext(h):
    """A 21st preview is preview.webp from the harvest; the few fetched since are PNG (no webp encoder here)."""
    return "png" if os.path.exists(f"{ASSETS}/harvest/{h}/preview.png") and not os.path.exists(f"{ASSETS}/harvest/{h}/preview.webp") else "webp"

CODE = os.environ.get("UIHUB_CODE", os.path.expanduser("~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-code"))


BARE_CAT = {"ai-agent": "ai-agent/ai-agent", "marketing": "marketing/marketing"}
STUDIO = re.compile(r"(?:made with|generated by|created with|built with) (?:the )?21st(?:\.dev)? (ascii editor|shader builder|gradient builder)", re.I)
STUDIO_CAT = {"ascii editor": "motion/ascii", "shader builder": "motion/shader", "gradient builder": "motion/gradient"}
STYLE_OF = re.compile(r"in the ([\w' -]{2,30}?) style")
KEEP_21ST = {"assets/icon", "motion/shader", "motion/ascii", "motion/gradient", "motion/text-effect"}

def bank_classifier():
    """the code bank's name reader (siso-ui-code bin/classify) as a module, or None when the bank is not on disk"""
    path = os.path.join(CODE, "bin", "classify")
    if not os.path.exists(path): return None
    import importlib.machinery, importlib.util
    loader = importlib.machinery.SourceFileLoader("bank_classify", path)
    mod = importlib.util.module_from_spec(importlib.util.spec_from_loader("bank_classify", loader))
    loader.exec_module(mod)
    return mod

THUMBS = os.environ.get("UIHUB_THUMBS", os.path.expanduser("~/SISO_Workspace/_data/ui-hub/thumbs"))
GROUP_KIND = {"marketing": "section", "pages": "page", "layout": "layout", "flows": "layout", "motion": "motion", "themes": "theme", "lib": "lib", "assets": "asset"}  # 11 Oct: icons, logos, sounds are assets, not RESEARCH's Discover links


def _key(name):
    return "/".join(re.sub(r"[^A-Za-z0-9._@+-]", "_", p) for p in name.split("/") if p not in ("", ".", ".."))


def bank_rows(cat):
    """the code bank's parts: its registries' (catalog.jsonl), then the parts of the libraries with no registry, which are
    their pages (sites.jsonl, from bin/sites: view only, no code)"""
    for path in (cat, f"{CODE}/sites.jsonl"):
        if os.path.exists(path):
            for l in open(path):
                if not l.strip(): continue
                x = json.loads(l)
                for k in ("deps", "devDeps", "uses", "files", "categories"):  # a GitHub registry may give these as an object or a string
                    v = x.get(k)
                    if v is not None and not isinstance(v, list):
                        x[k] = list(v) if isinstance(v, dict) else [v] if isinstance(v, str) else []
                yield x

def clean_types(typed):
    """The library's clean types (catalogue/schema/types-map/, 11 Oct: "a more higher intelligent way of organizing them").
    A reader's pattern becomes its category's clean type; a look or motion word that had been used as a type moves to the
    part's look or motion; a part that plainly belongs elsewhere moves category; a demo becomes level demo. In place."""
    tf = f"{HUB}/catalogue/schema/types-map/types.json"  # bin/types-clean build
    if not os.path.exists(tf): return
    maps = json.load(open(tf))
    for t in typed.values():
        m = maps.get(t.get("cat") or "none")
        if not m: continue
        to = m["map"].get(t.get("pattern") or "none")
        if not to: continue
        if to.get("look") and to["look"] not in (t.get("look") or []): t["look"] = [to["look"]] + (t.get("look") or [])[:2]
        if to.get("motion") and (t.get("motion") or "none") == "none": t["motion"] = to["motion"]
        if to.get("to") == "demo": t["level"] = "demo"; continue
        name = next((x["name"] for x in m["types"] if x["id"] == to.get("to")), None)
        if name: t["pattern"] = name[0].lower() + name[1:]
        if to.get("move"): t["cat"] = to["move"]


def code_bank_items(have):
    """every base part in the code bank (sisodias/siso-ui-code) as a hub item: bin/classify's category, subcategory,
    framework and style, its picture (bin/shoot) and its own page on its library's site (bin/previews). Variants and
    examples ride on their base. Parts the hub already holds under the same id are left to the hub's own row."""
    cat, cls = f"{CODE}/catalog.jsonl", f"{CODE}/classified.jsonl"
    if not (os.path.exists(cat) and os.path.exists(cls)): return []
    sort = {r["id"]: r for r in (json.loads(l) for l in open(cls))}
    # each part's detailed type (the bank's types/, bin/types merge): what it is in a sentence, its level, pattern, slots,
    # look, motion, fits and a 1-5 rating. A reader's category wins over the rules' (11 Oct: 5 of 20 read by hand were wrong)
    typed = {r["id"]: r for r in (json.loads(l) for l in open(f"{CODE}/types.jsonl"))} if os.path.exists(f"{CODE}/types.jsonl") else {}
    clean_types(typed)
    sites ={r["reg"]: r for r in (json.loads(l) for l in open(f"{CODE}/previews.jsonl"))} if os.path.exists(f"{CODE}/previews.jsonl") else {}
    pages, variants, by_page = {}, collections.defaultdict(list), {}
    for r in sort.values():
        if r.get("base"): variants[r["base"]].append(r["id"])
    # exact copies (bin/dupes): the same code in two or more libraries; each group names its original
    copy_of, copies, copy_sim, near_copies = {}, collections.defaultdict(list), {}, collections.defaultdict(list)
    hub_id = lambda i: i.split("/", 1)[0] + ":" + i.split("/", 1)[1] if "/" in i else i
    shown = lambda i: (sort.get(i) or {}).get("base") or i  # an original that is an example shows as its base part
    if os.path.exists(f"{CODE}/dupes.jsonl"):
        for l in open(f"{CODE}/dupes.jsonl"):
            g = json.loads(l); o = shown(g["original"])
            for i in g["ids"]:
                if i != g["original"] and i != o:
                    copy_of[i] = hub_id(o); copies[o].append(hub_id(i))
    # near copies (bin/dupes --near): edited forks, nearly the same code as a better-ranked part in another library
    if os.path.exists(f"{CODE}/near.jsonl"):
        for l in open(f"{CODE}/near.jsonl"):
            r = json.loads(l); o = shown(r["near_of"])
            if r["id"] in copy_of or r["id"] == o: continue
            copy_of[r["id"]] = hub_id(o); copy_sim[r["id"]] = r["sim"]; near_copies[o].append(hub_id(r["id"]))
    # parts with no page to photograph are drawn from their own code (siso-ui-code bin/render, on the Mac mini)
    drawn = {}
    if os.path.exists(f"{THUMBS}/_rendered.jsonl"):
        for l in open(f"{THUMBS}/_rendered.jsonl"):
            try: r = json.loads(l); drawn[r["key"]] = r.get("how")
            except (ValueError, KeyError): pass
    items = []
    for x in bank_rows(cat):
        c = sort.get(x["id"])
        if not c or c.get("base") or c.get("junk") or x["reg"] == "registrydirectory": continue  # junk: tests, gibberish
        reg = x["reg"]
        if reg not in pages:
            pv = f"{CODE}/previews/{reg}.json"; pages[reg] = json.load(open(pv)) if os.path.exists(pv) else {}
            by_page[reg] = collections.defaultdict(list)
            for nm, u in pages[reg].items(): by_page[reg][u].append(nm)
        # a registry the code bank names differently from round 1's library (uiarc is Arc: 12 Oct, Arc showed no pictures)
        hid = f"{REG_AS_LIB.get(reg, reg)}:{x['name']}"
        # our photo of its page (bin/shoot), else the drawing from its own SVG (bin/icons: icons, logos, flags); a part with
        # neither takes a variant's picture and page (11 Oct: react-bits' four flavours share one page, photographed once)
        names = [x["name"]] + [v.split("/", 1)[1] for v in variants.get(x["id"], [])]
        page = next((pages[reg][nm] for nm in names if pages[reg].get(nm)), None)
        thumb = next((t for nm in names for t in (f"{THUMBS}/{reg}/{_key(nm)}.{e}" for e in ("webp", "svg")) if os.path.exists(t)), "")
        if not thumb and page and len(by_page[reg][page]) <= 6:  # a few parts on one page (canvas-ui's React, Vue and Svelte
            # versions of a part) share its photo, taken once; a gallery of many is no part's picture
            thumb = next((t for nm in by_page[reg][page] for t in (f"{THUMBS}/{reg}/{_key(nm)}.webp",) if os.path.exists(t)), "")
        thumb_of = None
        if not thumb and x["id"] in copy_of and not copy_sim.get(x["id"]):  # an exact copy shows its original's picture, one file for both
            oreg, oname = copy_of[x["id"]].split(":", 1)
            thumb = next((t for t in (f"{THUMBS}/{oreg}/{_key(oname)}.{e}" for e in ("webp", "svg")) if os.path.exists(t)), "")
            thumb_of = f"{oreg}/{oname}" if thumb else None
        how = drawn.get(thumb[len(THUMBS) + 1:].rsplit(".", 1)[0], "photo") if thumb.endswith(".webp") else "svg" if thumb else None
        # a drawing re-framed around the part (bin/recrop, 12 Oct: a button was a speck in a 480 px frame) sits in _crop/ beside
        # it, and gets its own address so a browser that kept the old picture fetches the new one
        crop = f"{THUMBS}/_crop/{thumb[len(THUMBS) + 1:]}" if thumb.endswith(".webp") else ""
        if crop and os.path.exists(crop):
            thumb, thumb_of = crop, (thumb_of or f"{reg}/{x['name']}") + "#crop1"
        picture_from = {"photo": "A photo of its page", "svg": "Drawn from its SVG", "shadcn demo": "Drawn from its code, in shadcn's demo",
                        "sample text": "Drawn from its code, with sample text",
                        None: None}.get(how, "Drawn from its code")
        if hid in have:
            # round 1 read some of these libraries too (opensourceui, easyui, bencho: the same ids, no pictures): the
            # hub's row keeps its facts and takes our photo of the part's page when it has no picture of its own
            own = have.get(hid) if isinstance(have, dict) else None
            if own is not None and thumb and not own.get("reg") and not own.get("thumb"):
                own["thumb"], own["thumb_key"] = thumb, f"{reg}/{x['name']}"
            continue
        t = typed.get(x["id"])
        # a repository found on GitHub (bin/pull-github: 46,743 parts, 11 Oct) joins the index only with something to show:
        # not a copy, and a picture or a reader's rating of 3+; every part of it stays on its library's page (data/lib)
        if reg.startswith("gh-") and (x["id"] in copy_of or not (thumb or (t and (t.get("rating") or 0) >= 3))): continue
        ccat = t["cat"] if t and t.get("cat") else c["cat"]
        g = ccat.split("/")[0]
        items.append({"id": hid, "name": x["name"], "title": c.get("dn") or x.get("title") or x["name"], "desc": x.get("description") or "",
            "kind": GROUP_KIND.get(g, "component"), "source": reg, "category": ccat, "group": g, "author": gh_owner(reg, x), "status": "indexed",
            "uses": 0, "bookmarked": False, "tags": (c.get("style") or [])[:3], "reg": reg, "sub": c.get("sub") if ccat == c["cat"] else None,
            "type": {k: t[k] for k in ("what", "level", "pattern", "slots", "look", "motion", "fits", "rating", "why", "from") if t.get(k)} if t else None, "fw": c.get("fw"), "style": c.get("style"),
            "domain": c.get("domain"), "page": page, "frame": (sites.get(reg) or {}).get("frameable"), "thumb": thumb if os.path.exists(thumb) else None, "thumb_of": thumb_of,
            "install": f"npx shadcn@latest add {x['install']}" if x.get("install") else None, "deps": x.get("deps") or [], "registry_uses": x.get("uses") or [], "files": x.get("files") or [], "held": bool(x.get("code")),
            "code_path": x.get("code"), "refused": None if x.get("code") else x.get("status"), "variants": variants.get(x["id"], []),
            "copy_of": copy_of.get(x["id"]), "copy_sim": copy_sim.get(x["id"]), "copies": copies.get(x["id"]) or None,
            "near_copies": near_copies.get(x["id"]) or None, "picture_from": picture_from,
            "audio_from": f"{CODE}/{x['code']}" if c["cat"].startswith("assets/sound") and x.get("code") else None})
    # a copy link both ways only between parts the hub shows (an example's example is not one)
    known = set(have) | {i["id"] for i in items}
    for i in items:
        if i.get("copy_of") and i["copy_of"] not in known: i["copy_of"] = i["copy_sim"] = None
        for k in ("copies", "near_copies"):
            if i.get(k): i[k] = [c for c in i[k] if c in known] or None
    return items


INDEX_CHUNK = 25000  # rows a chunk of index.json: ~7 MB, well under Pages' 25 MB a file
LIB_SHARDS = 64  # libraries packed into this many files (Pages allows 20,000 a site; 1,890 libraries were 7,560 files)


def lib_shard(reg):
    """FNV-1a of the library's name, as src/lib/codebank.ts libShard computes it"""
    h = 0x811C9DC5
    for b in reg.encode("utf-8"):
        h = ((h ^ b) * 0x01000193) & 0xFFFFFFFF
    return h % LIB_SHARDS


def gh_owner(reg, x):
    """a repository found on GitHub (the bank's bin/pull-github, r/gh-<owner>-<repo>) is credited to its owner"""
    m = reg.startswith("gh-") and re.search(r"github\.com/([^/]+)/", x.get("homepage") or "")
    return m.group(1) if m else None


def code_bank(out, public=False):
    """every registry's parts, from the code bank (sisodias/siso-ui-code): data/lib/index.json lists the libraries,
    data/lib/shard-<n>.json their parts (a library is in shard lib_shard(name)), each with its own preview page and install line (Shaan, 10 Oct: "leverage these
    guys for the preview urls and just take the code and own the code"). Nothing is written when the bank isn't here."""
    cat = f"{CODE}/catalog.jsonl"
    if not os.path.exists(cat): return
    regs = {r["name"].lstrip("@"): r for r in json.load(open(f"{CODE}/registries.json"))}
    sites = {r["reg"]: r for r in (json.loads(l) for l in open(f"{CODE}/previews.jsonl"))} if os.path.exists(f"{CODE}/previews.jsonl") else {}
    parts = collections.defaultdict(list)
    for x in bank_rows(cat):
        parts[x["reg"]].append(x)
    os.makedirs(f"{out}/data/lib", exist_ok=True)
    libs, shards = [], collections.defaultdict(dict)
    for reg, xs in sorted(parts.items()):
        pv = f"{CODE}/previews/{reg}.json"
        pages = json.load(open(pv)) if os.path.exists(pv) else {}
        site = sites.get(reg, {})
        rows = [{k: v for k, v in {"n": x["name"], "t": x.get("title"), "k": (x.get("type") or "").replace("registry:", ""), "d": (x.get("description") or "")[:160],
                 "p": pages.get(x["name"]), "h": 1 if x.get("code") else 0, "s": None if x.get("code") else x.get("status"), "i": x.get("install"),
                 "dp": (x.get("deps") or [])[:6], "u": len(x.get("uses") or []), "c": x.get("categories")}.items() if v not in (None, "", [], 0)} for x in xs]
        if public:  # a part whose words match a private name ("Oracle" logo, "HALO" effect) stays out of the public build
            rows = [r for r in rows if not PRIVATE.search(json.dumps(r, ensure_ascii=False))]
        shards[lib_shard(reg)][reg] = {"reg": reg, "home": site.get("home") or (xs[0].get("homepage") if xs else None), "frame": site.get("frameable"), "parts": rows}
        libs.append({"id": reg, "home": site.get("home") or (xs[0].get("homepage") if xs else None), "d": (regs.get(reg, {}).get("description") or "")[:200],
                     "parts": len(xs), "held": sum(1 for x in xs if x.get("code")), "pages": sum(1 for x in xs if pages.get(x["name"])), "frame": site.get("frameable"),
                     "kinds": dict(collections.Counter((x.get("type") or "").replace("registry:", "") for x in xs).most_common(6))})
    json.dump({"libraries": sorted(libs, key=lambda l: -l["parts"]), "parts": sum(l["parts"] for l in libs), "held": sum(l["held"] for l in libs),
               "pages": sum(l["pages"] for l in libs), "shards": LIB_SHARDS}, open(f"{out}/data/lib/index.json", "w"), ensure_ascii=False, separators=(",", ":"))
    for n, v in shards.items():
        json.dump(v, open(f"{out}/data/lib/shard-{n}.json", "w"), ensure_ascii=False, separators=(",", ":"))


SOUND = re.compile(r'dataUri:\s*"data:audio/([a-z0-9.+-]+);base64,([A-Za-z0-9+/=]+)"')
SOUND_EXT = {"mpeg": "mp3", "mp3": "mp3", "wav": "wav", "x-wav": "wav", "ogg": "ogg", "webm": "webm", "aac": "aac", "mp4": "m4a"}
PEAKS = os.path.join(os.path.dirname(THUMBS), "sound-peaks.json")  # waveforms by the recording's hash, so a rebuild is free
_peaks = {}


def peaks(data, bars=40):
    """a recording's waveform as BARS digits 0-9 (the loudest bar 9), decoded by ffmpeg"""
    import array
    if not _peaks: _peaks.update(json.load(open(PEAKS)) if os.path.exists(PEAKS) else {"_": ""})
    key = hashlib.md5(data).hexdigest()
    if key in _peaks: return _peaks[key] or None
    try:
        pcm = subprocess.run(["ffmpeg", "-v", "error", "-i", "pipe:0", "-ac", "1", "-ar", "8000", "-f", "s16le", "pipe:1"],
                             input=data, capture_output=True, timeout=60).stdout
    except (OSError, subprocess.TimeoutExpired):
        return None
    a = array.array("h"); a.frombytes(pcm[: len(pcm) // 2 * 2])
    step = len(a) // bars
    if not step: _peaks[key] = ""; return None
    vals = [max(abs(v) for v in a[k * step:(k + 1) * step]) for k in range(bars)]
    top = max(vals) or 1
    _peaks[key] = "".join(str(min(9, round(9 * (v / top) ** 0.8))) for v in vals)
    return _peaks[key]


def sound_file(i, out):
    """a sound part's own recording (soundcn and elements keep it in the part's code as a data URI), written once to
    OUT/a/s/<hash>.<ext> for the hub's play button, with its length, licence, author and waveform"""
    try: files = json.load(open(i["audio_from"])).get("files") or []
    except (OSError, ValueError): return None
    for f in files:
        txt = f.get("content") or ""; m = SOUND.search(txt)
        if not m: continue
        import base64
        data = base64.b64decode(m.group(2))
        th = hashlib.md5(f"{i['reg']}/{i['name']}".encode()).hexdigest()
        path = f"/a/s/{th[:2]}/{th}.{SOUND_EXT.get(m.group(1), 'mp3')}"; dst = f"{out}{path}"
        if not os.path.exists(dst):
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            with open(dst, "wb") as fh: fh.write(data)
        word = lambda k: (re.search(rf'\b{k}:\s*"([^"]{{1,80}})"', txt) or [None, None])[1]
        d = re.search(r"\bduration:\s*([\d.]+)", txt)
        return {"audio": path, "audio_len": round(float(d.group(1)), 1) if d else None, "audio_licence": word("license"),
                "audio_author": word("author"), "audio_wave": peaks(data)}
    return None


def library_coverage(out):
    """every library we know of, pulled or not (Shaan, 11 Oct: "I want to see how many libraries have we not actually like
    pulled from"): shadcn's index of registries (the bank's registries.json) and every GitHub repository holding a shadcn
    registry.json (the bank's bin/find-registries, _data/ui-hub/registries-github.jsonl). A repository is counted as held
    when its owner or name is one of our libraries' names; one named like a template, starter or test is set apart."""
    import datetime
    if not os.path.exists(f"{CODE}/catalog.jsonl"): return
    pulled = collections.Counter(json.loads(l)["reg"] for l in open(f"{CODE}/catalog.jsonl"))
    norm = lambda x: re.sub(r"[^a-z0-9]", "", x.lower())
    held = {norm(r) for r in pulled}
    index = json.load(open(f"{CODE}/registries.json")) if os.path.exists(f"{CODE}/registries.json") else []
    homes = {}
    for r in index:
        n = r["name"].lstrip("@")
        held_n = n in pulled
        m = re.search(r"github\.com/([^/]+)/([^/#?]+)", r.get("homepage") or "")
        if m: homes[f"{m.group(1)}/{m.group(2)}".lower()] = held_n
    gh_path = os.path.expanduser("~/SISO_Workspace/_data/ui-hub/registries-github.jsonl")
    repos = collections.OrderedDict()
    for l in open(gh_path) if os.path.exists(gh_path) else []:
        try: r = json.loads(l)
        except ValueError: continue
        e = repos.setdefault(r["repo"], {"r": r["repo"], "f": 0, "u": r.get("url")})
        e["f"] += 1
    for e in repos.values():
        owner, name = e["r"].split("/", 1)
        if ("gh-" + re.sub(r"[^a-z0-9]+", "-", e["r"].lower()).strip("-")) in pulled or homes.get(e["r"].lower()) or norm(owner) in held or norm(name) in held or any(norm(name) == h or (len(h) > 5 and h in norm(name)) for h in held):
            e["s"] = "held"
        elif re.search(r"template|starter|boilerplate|example|demo|test|fixture|playground|sandbox", e["r"], re.I):
            e["s"] = "template"
        else:
            e["s"] = "new"
    gh = list(repos.values())
    data = {"generated": datetime.datetime.now().isoformat(timespec="minutes"),
            "pulled": sorted(([r, n] for r, n in pulled.items()), key=lambda x: -x[1]),
            "index": [{"n": r["name"].lstrip("@"), "h": r.get("homepage"), "d": (r.get("description") or "")[:140], "p": 1 if r["name"].lstrip("@") in pulled else 0} for r in index],
            "github": gh,
            "counts": {"pulled": len(pulled), "parts": sum(pulled.values()), "index": len(index), "index_missing": sum(1 for r in index if r["name"].lstrip("@") not in pulled),
                       "github": len(gh), "github_new": sum(1 for e in gh if e["s"] == "new"), "github_held": sum(1 for e in gh if e["s"] == "held"),
                       "github_template": sum(1 for e in gh if e["s"] == "template")}}
    json.dump(data, open(f"{out}/data/coverage.json", "w"), ensure_ascii=False, separators=(",", ":"))


# a principle's applies_to words -> ontology nodes ("<scale>/<id>", catalogue/schema/ontology.json). A word that is a node's
# own id at one scale maps there; the rest are named here. Words for a whole scale (page, component) apply to all of it.
RULE_NODES = {
    "form": ["component/form", "component/field"], "input": ["atom/text-input", "component/field"], "textarea": ["atom/text-input"],
    "label": ["atom/text"], "text": ["atom/text"], "heading": ["atom/text"], "paragraph": ["atom/text"], "page-title": ["section/page-header"],
    "nav-item": ["section/sidebar", "section/nav"], "side-nav": ["section/sidebar"], "app-shell": ["section/shell"], "header": ["section/top-bar", "section/nav"],
    "nav": ["section/nav", "section/top-bar"], "tab-bar": ["component/dock"], "tab": ["component/tabs"], "toolbar": ["section/page-header"],
    "row": ["component/list", "component/table"], "row-detail": ["section/detail"], "data-grid": ["component/table"], "kpi": ["component/stat", "section/kpis"],
    "kpi-row": ["section/kpis"], "metric-card": ["component/stat"], "sparkline": ["component/chart"], "bar-chart": ["component/chart"],
    "column-chart": ["component/chart"], "legend": ["component/chart"], "widget": ["component/stat", "component/chart", "section/kpis"],
    "dashboard": ["page/dashboard"], "toggle": ["atom/switch"], "checkbox": ["atom/choice"], "radio": ["atom/choice"], "chip": ["atom/badge"],
    "combobox": ["component/select"], "date-picker": ["component/picker"], "menu-item": ["component/menu"], "hover-card": ["component/popover"],
    "spinner": ["atom/loader"], "skeleton": ["atom/loader"], "progress-bar": ["atom/progress"], "icon-button": ["atom/button", "atom/icon"],
    "status": ["atom/status-dot"], "inline-status": ["atom/status-dot"], "notification": ["component/toast", "component/inbox"],
    "notifications": ["component/inbox"], "bell": ["component/inbox"], "error-summary": ["component/alert"], "error": ["component/alert"],
    "empty-state": ["component/empty"], "success-state": ["component/empty"], "command-palette": ["component/command"],
    "search-results": ["component/search", "section/filters"], "filter": ["section/filters"], "stepper": ["component/steps"],
    "checklist": ["section/onboarding"], "onboarding": ["section/onboarding", "page/onboarding-flow"], "settings": ["section/settings-panel", "page/settings"],
    "signup": ["section/auth", "page/auth-screen"], "pricing": ["section/pricing", "page/pricing-page"], "testimonial": ["section/testimonials"],
    "landing": ["page/home"], "chat": ["section/chat", "component/message"], "assistant": ["component/message", "component/agent-parts"],
    "agent": ["component/agent-parts"], "prompt-input": ["component/composer"], "diff": ["component/code"], "video": ["component/player"],
    "image": ["atom/image"], "approval": ["component/agent-parts"], "checkout": ["component/form"], "cancel-flow": ["component/dialog"],
    "summary": ["component/card"], "kpi-cards": ["section/kpis"],
}
SCALE_WORDS = {"page": "page", "component": "component", "surface": "page"}
# the hub's 15 house rules carry no applies_to: placed here by what they govern
HOUSE_NODES = {"hub-0001": ["component/popover"], "hub-0002": ["page"], "hub-0003": ["page"], "hub-0004": ["section/kpis", "component/stat", "component/chart"],
               "hub-0005": ["section/detail", "component/sheet"], "hub-0006": ["atom/text"], "hub-0007": ["component/card"], "hub-0008": ["component/list"],
               "hub-0009": ["component/empty", "atom/loader"], "hub-0010": ["section/shell", "atom/loader"], "hub-0013": ["look"],
               "hub-0015": ["section/top-bar", "component/inbox", "atom/button"]}

def node_rules(rules):
    """{"rules": [{id, title, rule, strength, set, check, src: [[says, url]], nodes, scales}]} for the hub's node pages"""
    onto = json.load(open(f"{HUB}/catalogue/schema/ontology.json"))
    ids = {}
    for a in onto["atoms"]: ids.setdefault(a["id"], f"atom/{a['id']}")
    for g in onto["components"]:
        for c in g["items"]: ids.setdefault(c["id"], f"component/{c['id']}")
    for l in onto["sections"].values():
        for x in l: ids.setdefault(x["id"], f"section/{x['id']}")
    out = []
    for r in rules:
        nodes, scales = [], []
        for w in r.get("applies_to") or []:
            for n in RULE_NODES.get(w) or ([ids[w]] if w in ids else []):
                if n not in nodes: nodes.append(n)
            if w in SCALE_WORDS and SCALE_WORDS[w] not in scales: scales.append(SCALE_WORDS[w])
        for n in HOUSE_NODES.get(r["id"], []):
            if "/" in n: nodes.append(n)
            else: scales.append(n)
        for n in r.get("nodes") or []:  # the principles' own ontology ids, when they carry them
            if n not in nodes: nodes.append(n)
        src = [[s.get("says", ""), s["url"]] for s in (r.get("sources") or []) if s.get("url", "").startswith("http")][:3]
        out.append({"id": r["id"], "title": r["title"], "rule": r.get("rule", ""), "strength": r.get("strength"), "set": r.get("set"),
                    "check": r.get("check"), "src": src, "nodes": nodes, "scales": scales})
    import datetime
    return {"generated": datetime.date.today().isoformat(), "rules": out}

def export(out, assets=True, public=False):
    """Write the site's data (and, with assets, previews and live bundles) into OUT. The site reads only this. With
    public, the publicised index: no private text or hosted code. Previews are bounded local thumbnails only
    with permission to copy; uncertain licences keep an attributed upstream link, never an embed."""
    import shutil, datetime
    idx = build()
    idx["items"] += code_bank_items({i["id"]: i for i in idx["items"]})  # the code bank's parts beside the hub's own
    if public: idx = publicise(idx)
    st = stats(idx); os.makedirs(f"{out}/data/item", exist_ok=True)
    os.makedirs(f"{out}/licences", exist_ok=True)
    shutil.copy(f"{HUB}/_reference/shadcn/LICENSE.md", f"{out}/licences/shadcn.txt")
    # the App Factory around the hub reads his projects from data/factory/; the public build gets none (client names stay off it)
    if not public and os.path.exists(f"{HUB}/factory/data/projects.json"):
        os.makedirs(f"{out}/data/factory/projects", exist_ok=True)
        shutil.copy(f"{HUB}/factory/data/projects.json", f"{out}/data/factory/projects.json")
        # and each project's parts, for UI's Projects tab
        pdir = f"{HUB}/factory/data/projects"
        for f in sorted(os.listdir(pdir)) if os.path.isdir(pdir) else []:
            if f.endswith(".json"):
                shutil.copy(f"{pdir}/{f}", f"{out}/data/factory/projects/{f}")
    # the SISO set (/siso): the shell schema (catalogue/schema/) and what our own apps already have, by category
    # (inventory/<project>.jsonl; HALO CRM by name only). Private build only: app and client names stay off the public one
    if not public:
        os.makedirs(f"{out}/data/siso", exist_ok=True)
        sdir = f"{HUB}/catalogue/schema"
        for f in sorted(os.listdir(sdir)) if os.path.isdir(sdir) else []:
            if f.endswith(".json"): shutil.copy(f"{sdir}/{f}", f"{out}/data/siso/{f}")
        ours = collections.defaultdict(list)
        for f in sorted(os.listdir(f"{HUB}/inventory")):
            if not f.endswith(".jsonl"): continue
            for r in _jl(f"inventory/{f}"):
                if r.get("kind") in ("page", "barrel", "root") or r.get("devOnly") or not r.get("category") or r.get("grade") == "dead": continue
                ours[r["category"]].append({"p": r["project"], "n": r["name"], "g": r.get("grade"), "u": r.get("pages") or 0, "to": r.get("swapTo")})
        for l in ours.values(): l.sort(key=lambda x: -x["u"])
        json.dump({"generated": datetime.date.today().isoformat(), "by_category": ours}, open(f"{out}/data/siso/ours.json", "w"), separators=(",", ":"))
    # the rules for each node (UI-PRINCIPLES' siso-design-system principles/index.json, 12 Oct: "roll that in"): a node's
    # page shows the rules whose applies_to names it. Rule text and public source links only, in both builds
    rules_index = os.path.join(os.path.dirname(os.path.dirname(HUB)), "knowledge/design-system/principles/index.json")
    if os.path.exists(rules_index):
        json.dump(node_rules(json.load(open(rules_index))["rules"]), open(f"{out}/data/rules.json", "w"), ensure_ascii=False, separators=(",", ":"))
    # what the library knows about each node, for both builds (no private names): the variations SISO needs (bin/variations-merge),
    # first-principles notes (catalogue/schema/node-notes.json), which looks and motion rate best there (UI-PRINCIPLES'
    # research/corpus-nodes.json, a model's 1-5 ratings) and the white papers (catalogue/schema/papers.json)
    know = {}
    for k, f in (("variations", f"{HUB}/catalogue/schema/variations.json"), ("notes", f"{HUB}/catalogue/schema/node-notes.json"), ("papers", f"{HUB}/catalogue/schema/papers.json"), ("use_cases", f"{HUB}/catalogue/schema/use-cases.json")):
        if os.path.exists(f): know[k] = json.load(open(f))
    # each library part read for the job it does (Haiku, 12 Oct), for head to head: id -> [node, variation, job, same_as]
    lm = f"{HUB}/catalogue/schema/lib-map"
    if os.path.isdir(lm):
        know["libmap"] = {o["id"]: [o.get("node"), o.get("variation"), o.get("job") or "", o.get("same_as")]
                          for f in sorted(os.listdir(lm)) if f.endswith(".jsonl") for o in _jl(f"catalogue/schema/lib-map/{f}")}
    cn = os.path.join(os.path.dirname(rules_index), "..", "research", "corpus-nodes.json")
    if os.path.exists(cn):
        c = json.load(open(cn))
        know["taste"] = {"about": c.get("source"), "nodes": {k: {"n": v.get("n"), "mean": v.get("mean"), "looks": (v.get("looks") or [])[:4], "motion": (v.get("motion") or [])[:3]}
                                                          for k, v in c["nodes"].items()}}
    json.dump(know, open(f"{out}/data/knowledge.json", "w"), ensure_ascii=False, separators=(",", ":"))
    previews = PreviewDelivery(ASSETS, hub=HUB)
    docs = {r["id"]: r for r in _jl("sources/items.cat.jsonl")}
    rows, shards = [], collections.defaultdict(dict)
    kept_assets = set()
    # a typed part's row carries its type as numbers into four word tables (index.json "types"): rating, level, pattern, motion
    words = {k: {} for k in ("levels", "patterns", "motions", "slots", "looks", "fits")}  # looks, fits: the page's filter chips
    num = lambda k, w: -1 if not w else words[k].setdefault(w, len(words[k]))
    for i in idx["items"]:
        h = i["id"].split(":", 1)[1] if i["source"] == "21st" else None
        if i.get("reg"):
            # a code-bank part: our picture of its own page (his build only), and that page live where the site allows a frame
            prev = None
            if i.get("thumb") and assets and not public:
                # named by a hash, like /a/p: the hosted hub keeps these on their own Pages projects, unlisted
                th = hashlib.md5((i.get("thumb_of") or f"{i['reg']}/{i['name']}").encode()).hexdigest()
                prev = f"/a/t/{th[:2]}/{th}.{i['thumb'].rsplit('.', 1)[-1]}"; dst = f"{out}{prev}"
                if not os.path.exists(dst):
                    os.makedirs(os.path.dirname(dst), exist_ok=True)
                    try: os.link(i["thumb"], dst)
                    except OSError: shutil.copy(i["thumb"], dst)
                kept_assets.add(prev)
            delivery = {"preview": prev, "preview_link": i.get("page"), "preview_credit": i["source"], "preview_licence": "per registry", "preview_status": "link" if i.get("page") else "unavailable"}
            live = i.get("page") if i.get("page") and i.get("frame") is not False and not public else None
            au = sound_file(i, out) if i.get("audio_from") and assets and not public else None
            if au: delivery.update(au)
        else:
            delivery = previews.deliver(i, out, assets=assets, private_reference=not public)
            prev = delivery["preview"]
            if not prev and i.get("thumb") and assets and not public:  # no picture of its own: the code bank's photo
                th = hashlib.md5(i["thumb_key"].encode()).hexdigest()
                prev = f"/a/t/{th[:2]}/{th}.{i['thumb'].rsplit('.', 1)[-1]}"; dst = f"{out}{prev}"
                if not os.path.exists(dst):
                    os.makedirs(os.path.dirname(dst), exist_ok=True)
                    try: os.link(i["thumb"], dst)
                    except OSError: shutil.copy(i["thumb"], dst)
                delivery["preview"] = prev
            if prev: kept_assets.add(prev)
            live = (i.get("bundle_url") if public else f"/a/b/{h}.html" if assets and os.path.exists(f"{ASSETS}/harvest/{h}/bundle.html") else i.get("bundle_url")) if h else i.get("live")
            if (public or i.get("source") != "21st") and not may_copy(i.get("licence"), i.get("tier")):
                live = None  # unknown terms are a link out, not an iframe
        # a code-bank part's row stays short (the index must stay under Pages' 25 MB a file): its page link and credit
        # live in its item file, its description is cut to a card's line
        cb = bool(i.get("reg"))
        ty = i.get("type")
        rows.append({k: v for k, v in {"id": i["id"], "t": i.get("title") or i["name"], "d": (i.get("desc") or "")[:(90 if cb else 180)], "k": i["kind"],
            "s": i["source"], "c": i.get("category"), "g": i["group"], "a": i.get("author"), "st": i["status"], "u": i.get("uses") or 0,
            "p": prev, "pl": None if cb else delivery["preview_link"], "pc": None if cb else delivery["preview_credit"], "b": 1 if i["bookmarked"] else 0, "sig": (i.get("curated") or {}).get("signal"), "tg": (i.get("tags") or [])[:4], "nt": ((i.get("curated") or {}).get("note") or "")[:160], "sc": (i.get("score") or {}).get("bank"),
            "lv": 1 if live else 0, "sb": i.get("sub"), "fw": i.get("fw") if i.get("fw") not in (None, "React") else None, "sy": (i.get("style") or [])[:3],
            "vn": len(i.get("variants") or []), "hc": 1 if i.get("held") else 0, "ph": 1 if i.get("picture_from") == "A photo of its page" else 0,
            # drawn again with sample text because it drew nothing alone: often only the text shows, so it ranks below real pictures
            "ps": 1 if i.get("picture_from") == "Drawn from its code, with sample text" else 0, "cp": (2 if i.get("copy_sim") else 1) if i.get("copy_of") else 0,
            "au": delivery.get("audio"), "du": delivery.get("audio_len"), "w": delivery.get("audio_wave"),
            "ty": [ty.get("rating") or 0, num("levels", ty.get("level")), num("patterns", ty.get("pattern")), num("motions", ty.get("motion"))] if ty else None,
            "sl": [num("slots", x) for x in (ty or {}).get("slots") or []],
            "lk": [num("looks", x) for x in ((ty or {}).get("look") or [])[:3]], "ft": [num("fits", x) for x in ((ty or {}).get("fits") or [])[:3] if x != "general"]}.items() if v not in (None, [], 0, "")})
        # the usual values are left out and filled in by the site (src/lib/data.ts loadIndex): the group is the
        # category's first word, the status "indexed", the kind "component" (10 Oct: 3 MB off a 23 MB file)
        r = rows[-1]
        if r.get("c") and r.get("g") == r["c"].split("/")[0]: r.pop("g")
        if r.get("st") == "indexed": r.pop("st")
        if r.get("k") == "component": r.pop("k")
        full = {k: v for k, v in i.items() if k not in ("xp", "preview_file", "shot", "reference_preview")}; full.update(delivery); full["live"] = live
        if (public or i.get("source") != "21st") and not may_copy(i.get("licence"), i.get("tier")):
            for key in ("video", "bundle_url", "preview_url"):
                full.pop(key, None)
        d = docs.get(i["id"])
        if d: full["docs"] = d.get("docs"); full["files_lib"] = d.get("files")
        full["files"] = [] if public or i.get("source") == "kinetics" or i.get("reg") else files(i)
        full.pop("thumb", None); full.pop("thumb_key", None); full.pop("audio_from", None); full.pop("audio_wave", None)
        shards[fnv(i["id"])][i["id"]] = full
    # our own apps' parts, pictured from their real screens (bin/ours-capture on the Mac mini; Shaan, 12 Oct: "pull out comps
    # that I like from certain apps"): ours/<app>.jsonl. Private build only: app names and screens stay off the public one.
    # A part sits on the same node as the library's candidates, so the pick deck shows it beside them
    if not public and os.path.isdir(f"{HUB}/ours"):
        for f in sorted(os.listdir(f"{HUB}/ours")):
            if not f.endswith(".jsonl"): continue
            app = f[:-6]
            for o in _jl(f"ours/{f}"):
                if o.get("kind") in ("page", "barrel", "root", "dev") or o.get("category") in ("page", "barrel", "dev", "root"): continue
                src = f"{HUB}/{o['pic']}"
                if not os.path.exists(src): continue
                dst = f"{out}/data/ours/{app}/{os.path.basename(src)}"
                os.makedirs(os.path.dirname(dst), exist_ok=True)
                shutil.copy(src, dst)
                oid = f"ours:{app}:{o['name']}"
                title = re.sub(r"(?<=[a-z0-9])(?=[A-Z])", " ", o["name"])
                cat = OURS_CAT.get(o.get("category"), o.get("category") or "ours")
                if cat == "ours": cat = next((c for rx, c in OURS_NAME if re.search(rx, o["name"])), "ours")
                rows.append({"id": oid, "t": title, "d": f"From {app}: {o.get('file') or ''}"[:120], "s": app, "c": cat, "a": "SISO", "st": "ours",
                             "p": f"/data/ours/{app}/{os.path.basename(src)}", "g": cat.split("/")[0]})
                if rows[-1]["g"] == cat.split("/")[0]: rows[-1].pop("g")
                shards[fnv(oid)][oid] = {"id": oid, "name": o["name"], "title": title, "desc": rows[-1]["d"], "kind": "component", "source": app,
                                         "category": cat, "author": "SISO", "status": "ours", "licence": "ours", "from": o.get("file"),
                                         "screen": o.get("route"), "preview": rows[-1]["p"], "files": []}
    st["with_live_preview"] = sum(bool(row.get("lv")) for row in rows)
    for n, v in shards.items(): json.dump(v, open(f"{out}/data/item/{n}.json", "w"), ensure_ascii=False, separators=(",", ":"))
    if _peaks: json.dump(_peaks, open(PEAKS, "w"), separators=(",", ":"))
    groups = collections.defaultdict(collections.Counter)
    for i in idx["items"]: groups[i["group"]][i["category"]] += 1
    regs = json.load(open(f"{HUB}/intake/shadcn-registries-2026-10-06.json"))
    verts = [json.load(open(f"{HUB}/verticals/{f}")) for f in sorted(os.listdir(f"{HUB}/verticals")) if f.endswith(".json")]
    authors = collections.Counter(i.get("author") for i in idx["items"] if i["source"] == "21st")
    json.dump({"generated": datetime.datetime.now().isoformat(timespec="minutes"), "stats": st, "kinds": KINDS, "kind_labels": KIND_LABEL,
               "statuses": STATUS, "public": public, "hub_path": None if public else HUB, "nav": nav_tree(idx), "groups": {g: dict(c.most_common()) for g, c in groups.items()},
               "types": {k: list(v) for k, v in words.items()},
               # the library's shape (catalogue/schema/ontology.json): the top pill picks a scale, the side nav its nodes
               "ontology": json.load(open(f"{HUB}/catalogue/schema/ontology.json")), "chunks": (len(rows) + INDEX_CHUNK - 1) // INDEX_CHUNK},
              open(f"{out}/data/index.json", "w"), ensure_ascii=False, separators=(",", ":"))
    # the rows in chunks (11 Oct: one file passed Pages' 25 MB once GitHub's registries came in); the app fetches them
    # side by side (src/lib/data.ts loadIndex), so a bigger hub loads as fast
    for k in range(0, len(rows), INDEX_CHUNK):
        json.dump(rows[k:k + INDEX_CHUNK], open(f"{out}/data/index-{k // INDEX_CHUNK + 1}.json", "w"), ensure_ascii=False, separators=(",", ":"))
    # the headline numbers on their own (functions/api/stats.ts serves them to any site; Shaan, 11 Oct: "the landing page
    # numbers are out of date ... make it so there's an API we can ping to update them")
    json.dump({"generated": datetime.datetime.now().isoformat(timespec="minutes"), "parts": len(rows),
               "components": st["ui_items"], "assets": st.get("assets"), "libraries": len({i["source"] for i in idx["items"]}),
               "with_picture": sum(1 for r in rows if r.get("p")), "categories": st["categories"], "typed": st.get("typed"),
               "by_rating": st.get("by_rating")}, open(f"{out}/data/stats.json", "w"), separators=(",", ":"))
    library_coverage(out)
    inventory = load_inventory(public=public, private_pattern=PRIVATE)
    if inventory.get("bank"): inventory["bank"].pop("attributions", None)
    json.dump({"frontier": idx["frontier"], "libraries": idx["libraries"], "library_inventory": inventory,
               "registries": [{k: r.get(k) for k in ("name", "homepage", "url", "description")} for r in regs],
               "verticals": [] if public else verts, "industries": industry_kits(industries(), [i for i in idx["items"] if i["kind"] not in ("resource", "asset")]),
               "industry_index": None if public else {"count": 3665, "url": "https://siso-ecosystem.siso-agency-showcase.pages.dev/industries/", "by": "SISO-LANDING"},
               "fit": [] if public else _load("surfaces/fit.json")["fit"], "surfaces": sorted(f[:-3] for f in os.listdir(f"{HUB}/surfaces") if f.endswith(".md") and f != "README.md"),
               "authors": [{"name": a, "items": n} for a, n in authors.most_common()]},
              open(f"{out}/data/meta.json", "w"), ensure_ascii=False, separators=(",", ":"))
    code_bank(out, public)
    if assets and not public:
        os.makedirs(f"{out}/a/b", exist_ok=True)
        for i in idx["items"]:
            if i["source"] != "21st": continue
            h = i["id"].split(":", 1)[1]
            src, dst = f"{ASSETS}/harvest/{h}/bundle.html", f"{out}/a/b/{h}.html"
            if os.path.exists(src):
                if not os.path.exists(dst) or not os.path.samefile(src, dst): shutil.copy(src, dst)
                kept_assets.add(f"/a/b/{h}.html")
    archive_unused(out, kept_assets)
    return st
