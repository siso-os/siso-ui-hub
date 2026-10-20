You label UI components for SISO's UI Hub. Work alone; do not ask questions; do not use git; write only the one output file named below.

INPUT
- Cards: ~/SISO_Workspace/_data/ui-types/batches/{B}.jsonl. One JSON line per part: n (its number), id, name, cat (current category, often wrong), sub, says (its library's description), deps, lines, exports, props, shows (text it renders), tw (notable Tailwind classes), tags, and sheet ("{B}-K.jpg tile n") when it has a picture.
- Pictures: ~/SISO_Workspace/_data/ui-types/sheets/{B}-K.jpg. Each sheet holds up to 20 pictures, each labelled with its card number n in yellow at the top-left. Open EVERY sheet of this batch with the Read tool and use the pictures, especially for the rating.
- The vocabulary: ~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-code/types/vocab.json. Read it first.
- 20 worked examples, written by hand: ~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-code/types/labels/hand-ecosystem.jsonl. Read them and match their style.

FIRST, SETTLE THE PATTERNS
Before writing any label, read every card. For each category in this batch, decide its list of patterns: vocab.patterns[cat] if it has one, otherwise 6 to 12 short lowercase kinds that together cover this batch's parts of that category (for example, for about sections: "mission and values", "story with photo", "timeline or history"). Then label using only those lists. The pattern is the KIND of part, never a description of one part. A good pattern is shared by at least 5 parts.

OUTPUT
Write ~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-code/types/labels/{B}.jsonl. It has one JSON line for EVERY card, in card order, with exactly these keys:
{"id": "<card id>", "what": "...", "level": "...", "cat": "...", "pattern": "...", "slots": ["surface:slot"], "look": ["..."], "motion": "...", "fits": ["..."], "rating": 1-5, "why": "..."}

- what: one plain sentence of at most 18 words, saying what you SEE and what it does. Be concrete ("Three pricing tiers with a monthly or yearly switch"). Never marketing words like "beautiful", "stunning" or "modern".
- level: one key of vocab.levels. Use "demo" when the card only shows a state, size or variant of a basic part (a disabled input, button sizes, an outlined badge).
- cat: keep the card's cat unless it is clearly wrong. Then choose the right one from this list ONLY: actions/button actions/copy-button actions/link actions/segmented-control actions/switch ai-agent/ai-agent ai-agent/composer data-display/accordion data-display/avatar data-display/badge data-display/calendar data-display/card data-display/code-block data-display/diff data-display/empty-state data-display/gamification data-display/json-viewer data-display/kanban data-display/list data-display/profile data-display/stat data-display/table data-display/timeline data-display/tree data-display/typography data-viz/chart data-viz/flow data-viz/gauge data-viz/map data-viz/progress-bar flows/settings flows/sign-in inputs/checkbox inputs/color-picker inputs/combobox inputs/date-picker inputs/date-range inputs/file-upload inputs/form-field inputs/number-input inputs/otp-input inputs/radio inputs/rating inputs/search inputs/select inputs/slider inputs/tag-input inputs/textarea inputs/time-picker layout/bento-grid layout/dashboard layout/page-shell layout/scroll-area layout/split-pane lib/hook lib/utility marketing/about marketing/announcement marketing/comparison marketing/cta marketing/faq marketing/features marketing/footer marketing/hero marketing/logos marketing/marketing marketing/pricing marketing/team marketing/testimonials media/card-stack media/carousel media/gallery media/image-compare media/mockup media/player motion/ascii motion/background motion/border motion/cursor motion/globe motion/gradient motion/marquee motion/number-ticker motion/shader motion/text-effect motion/tilt-3d navigation/breadcrumb navigation/command-palette navigation/dock navigation/menu navigation/pagination navigation/sidebar navigation/table-of-contents navigation/tabs navigation/top-nav navigation/wizard-steps other/other overlays/alert-banner overlays/context-menu overlays/dialog overlays/hover-card overlays/lightbox overlays/notifications overlays/popover overlays/sheet overlays/toast overlays/tooltip pages/templates status/loader status/skeleton status/status-dot themes/style themes/theme
- pattern: if vocab.patterns has a list for the cat, pick the closest entry. Otherwise write a short lowercase phrase of 1 to 4 words naming the kind, and reuse the SAME phrase for the same kind across this batch.
- slots: 1 to 3 entries "surface:slot", from vocab.slots ONLY (for example landing:hero, dashboard:kpi, ai:composer, any:action).
- look: 0 to 3 entries from vocab.looks. motion: exactly one key of vocab.motion. fits: 1 to 3 entries from vocab.fits ("general" if nothing specific).
- slots: a section's own slot (an about section is landing:about, not landing:hero). Only a hero is landing:hero.
- rating: an integer against vocab.rating. Judge the picture first (polish, completeness, whether it looks good), then the code (props, size, accessibility). A blank, flat, one-colour or broken picture means the part did not draw. Rate it on its code, at most 3. Use 5 rarely, for the standouts. There is no quota and no target spread: rate each card on its own tile. A batch of plain, similar parts may have no 5 and many 2s; a batch of polished effects may have many 4s. Ratings in round blocks (exactly 10, 30, 80 ...) are rejected and redone.
- why: at most 8 words.

NO TEMPLATES (the last batches failed this and were redone). Each "what" describes THAT card's own picture and code: what it shows, how it is laid out, what stands out. Two cards share a "what" only if they are truly identical. Each "why" gives the specific reason for THIS rating (for example "crisp gradient, but static and generic"). Never generate labels with a loop or script, never copy a line and change only the id, and never rate a whole group the same without looking. A file where fewer than 80% of the "what" lines are distinct is rejected and redone.

A DARK PICTURE IS NOT BLANK (checked on g052: dark-mode dialogs were rated 1 as "blank tile"). Many parts are drawn in dark mode: light text on a near-black page inside a light frame on the grey sheet. Look closely before you call a tile blank, and never rate a part down for its picture alone; if a tile truly shows nothing, rate from the code.

NO PICTURE IS NOT A FAULT (checked on g014: "code only" was given as the reason for a 1). A card with no "sheet" has simply not been drawn yet. Rate it from its code as a builder would judge it: what it renders (shows, exports, props), how much it does (lines, states, variants), its motion and dependencies, and whether it is finished or a stub. A well-made 150-line date picker with no picture is a 3 or 4; an 8-line wrapper is a 1 or 2. Never write "code only", "no picture" or "no visual" as a "why"; name what in the code earned the rating ("keyboard nav, 3 sizes, controlled and uncontrolled" / "re-exports Radix with one class").

LOOK BEFORE YOU WRITE (checked on b100 and b119: the misses were these). Write "what" from the tile and the code, never by copying or trimming the card's "says" (that is its library's blurb). Rate each card from its own tile: if most of a batch gets the same number, you did not look. A tile that shows anything drawn (cards, colours, text, a grid) is not empty; only a blank, black or error tile is. "why" names something visible in that tile ("crisp gradient, but static" / "half the frame is a cookie banner").

HOW TO WRITE
Append in chunks of about 40 lines with the Bash tool, for example:
cat >> ~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-code/types/labels/{B}.jsonl <<'JSONL'
{...}
JSONL
Each line must be valid JSON. Use plain ASCII quotes inside strings and no apostrophes that break the heredoc (the quoted 'JSONL' heredoc keeps apostrophes safe).

When done, run: python3 -c "import json;r=[json.loads(l) for l in open('$HOME/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-code/types/labels/{B}.jsonl')];print(len(r), 'distinct what', len(set(x['what'] for x in r)))"
The count must equal the number of cards. Fix any line that fails to parse and any missing card.

Your final reply must be ONE line only: DONE {B}: <count> labelled. Do not reply with anything else.

IDS. Copy every "id" exactly from its card line; never write an id that is not in the cards file (long batches drifted into invented ids, and those labels were thrown away). Before your final reply run:
python3 -c "import json,os;c=[json.loads(l)['id'] for l in open(os.path.expanduser('~/SISO_Workspace/_data/ui-types/batches/{B}.jsonl'))];r=[json.loads(l)['id'] for l in open(os.path.expanduser('~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-code/types/labels/{B}.jsonl'))];print('cards',len(c),'labels',len(r),'missing',[x for x in c if x not in set(r)][:5],'unknown',[x for x in r if x not in set(c)][:5])"
Both lists must be empty; fix the file until they are.
