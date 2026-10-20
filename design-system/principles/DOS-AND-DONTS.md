# Do and don't

Read this before you build a dashboard, an app screen or a landing page. One line per rule: what to do, what not to do, and the rule id. **must** rules are not optional; **should** rules need a written reason to skip. Each id links to the rule with its evidence and its check.

One set: Shaan's 15 house rules first, then the 92 research rules. 107 rules in all.

## Shaan's rules (first, and they win)

The 15 house rules, in Shaan's words, live in the UI hub (`banks/siso-ui-hub/principles/`). Where a line below disagrees with one of these, these win.

- **Hover shows more; click commits.** Do give every object a read-only hover card (opens after 300–500 ms). Don't put anything important only in the hover. hub-0001
- **Space comes before components.** Do decide each piece's use, frequency, volume and neighbours before drawing; the work gets 55%+ of the first screen. Don't pick components first and squeeze them in. hub-0002
- **A page is bands: glance, then work, then detail.** Do use full-width bands, one 16 px gutter, at most 3 type sizes per band. Don't put a box in a box. hub-0003
- **Widgets are data, drawn in one frame.** Do describe a page's widgets in a data file with S/M/L/Full spans, each with loading, empty, source-down and stale states. Don't let one broken widget take the page down. hub-0004
- **Open detail in place.** Do expand the row or slide in a sheet, with its own URL. Don't jump to a new page that loses the user's place. hub-0005
- **Say it once, in fewer words.** Do give one best sentence, then "more"; labels one or two words, numbers with units. Don't repeat the page title in widgets, show raw logs by default, or show metadata nobody acts on. hub-0006
- **Cards are for things, not for wrapping text.** Do use a card for an object you act on (an agent, task, machine) and get emphasis from type. Don't box text or logs, and never put a coloured accent line on a card's left edge. hub-0007
- **A list beats a pile of cards; what's live is on top.** Do show many of a kind as one list, one line each (face, name, state word, time), working ones at the top. Don't use a grid of cards, or make groups folders you must open. hub-0008
- **Tell the truth about state.** Do design four states for every widget and list, and show unknown as a dash with the reason on hover. Don't fake data or fill in zeros, or lay warnings on top of the work. hub-0009
- **The shell loads once; the data streams in.** Do draw nav and frame at once, skeletons at real sizes, last good data first with its age. Don't reload the shell or let layout shift pass 0.05. hub-0010
- **Take before you build.** Do run `uihub find` first and record where each component came from. Don't build what the catalogue has, or ignore its licence. hub-0011
- **Decide; show only the real forks.** Do decide everything that isn't taste, and show a taste fork as two or three live versions with your pick. Don't ask about choices you could make. hub-0012
- **Motion has a job.** Do animate arrivals, openings and work (enter 150–250 ms, exit 100–150 ms, hover under 100 ms). Don't animate anything idle forever. hub-0013
- **One set of tokens, real type, real icons.** Do take every colour, size and timing from tokens and one icon set. Don't use emoji or hard-coded colours. hub-0014
- **Fixed anchors, split buttons, one bell.** Do keep what's used every visit in one place, use split buttons (body acts, chevron opens the menu), one bell whose ping lasts about 4 s. Don't stack notifications on screen or hand-edit screens per task. hub-0015

## Base

- **Speed is a feature: meet Core Web Vitals and reserve space.** Do set width and height on images and charts and render the shell before data. Don't let a late banner push the table down as the user clicks. [P0070](P0070-speed-is-a-feature.md) must
- **Meet WCAG 2.2 AA, with semantic HTML first.** Do use a real table with th scope=col for data and a real button for actions. Don't build a table from divs with role attributes, or a button from a span. [P0074](P0074-wcag-aa-semantic-html.md) must
- **One system: take an existing component before building a new one.** Do pick the table, KPI card and side nav from the bank (ui-pick) and extend them through props. Don't copy a component into the page and edit the copy. [P0075](P0075-one-system-take-before-build.md) should

## Shell

- **The shell loads once; each region fills on its own.** Do render the side nav and page header from the cache, then stream each widget into its slot with its own skeleton. Don't hold the whole dashboard behind a full-screen spinner until every query returns. [P0002](P0002-shell-loads-once-content-streams.md) should
- **One persistent side nav for an app with five or more sections.** Do show all top-level sections in a left rail with group headings, collapse deeper levels under their parent, and keep the rail the same on every page. Don't change the order or contents of the nav between pages, or nest a second sidebar inside the first. [P0003](P0003-one-persistent-side-nav.md) should
- **Fixed anchors: the same things in the same place on every page.** Do place logo, search, the one notification bell and the account menu in fixed header slots shared by every page. Don't move search into the page body on some screens or swap the order of regions at a breakpoint. [P0004](P0004-fixed-anchors.md) should

## Navigation

- **Every screen says where you are and how to leave.** Do set the document title and H1 to the page name and tint the active nav item (a tint, not a solid fill, per hub-0014). Don't use the same title on every page or show breadcrumbs for a flat two-level app. [P0005](P0005-say-where-you-are.md) must
- **Primary navigation is visible, not hidden behind a menu.** Do show the full side nav on desktop and a bottom tab bar with up to five items on mobile. Don't put all sections behind a hamburger icon on a 1440 px screen. [P0006](P0006-primary-nav-visible.md) should
- **Search is a visible field, with recent and suggested queries.** Do put a search field in the header with a placeholder naming what it searches, a clear (X) button and a keyboard shortcut hint. Don't hide search behind a magnifying-glass icon that opens a blank overlay. [P0007](P0007-search-is-a-visible-field.md) must
- **Links go somewhere; buttons do something.** Do make a row's name a link to its detail page and its Archive control a button. Don't navigate with a div or button onClick, or style an action as plain body text. [P0008](P0008-links-go-buttons-do.md) should
- **Back and the URL restore exactly what was open.** Do write the open sheet and active filters into the query string so a reload or shared link lands in the same view. Don't reset filters and scroll position when the user comes back from a detail page. [P0009](P0009-back-and-url-restore-state.md) must
- **Everything works from the keyboard, with shortcuts shown where they apply.** Do show the shortcut beside each menu item and in the command palette results. Don't keep shortcuts only in a help page, or use positive tabindex values that scramble the order. [P0010](P0010-keyboard-first-shortcuts-shown.md) must

## Page layout

- **Most important first: top-left, then down.** Do put the page's key status or KPI in the top-left band, the main work area below it, and supporting detail last. Don't lead with a decorative banner or put the key number bottom-right. [P0011](P0011-most-important-top-left.md) must
- **Show only what this task needs.** Do show five columns that answer the task and let users add the other twelve. Don't fill the first screen with welcome text, tips and secondary widgets. [P0012](P0012-show-only-what-the-task-needs.md) must
- **One spacing scale; proximity shows what belongs together.** Do use the space tokens (4, 8, 12, 16, 24, 32) with the 16 px gutter of hub-0003, and separate sections with space instead of borders. Don't hand-tune 13 px and 22 px gaps, or wrap a card in a panel in a card. [P0013](P0013-one-spacing-scale-proximity.md) should
- **One primary action per view.** Do make Save the only filled button and put Cancel and Export as quiet buttons; group extra actions in a split button (hub-0015). Don't show three filled buttons side by side in one toolbar. [P0014](P0014-one-primary-action-per-view.md) must
- **Layouts reflow to small screens without losing anything.** Do collapse a three-column dashboard to one column at narrow widths and let wide tables scroll inside their own container. Don't fix the page at 1280 px wide or hide features on mobile. [P0015](P0015-layouts-reflow.md) must
- **Open detail in place.** Do open a clicked table row in a side sheet with its own URL, leaving the table and its filters in view. Don't navigate to a separate detail page and lose the user's place in a filtered list. [P0016](P0016-open-detail-in-place.md) must
- **Use the conventions people already know.** Do use a standard table, date picker and settings layout taken from the component bank (hub-0011). Don't invent a custom scroll gesture or rename Settings to something clever. [P0017](P0017-use-known-conventions.md) must
- **One column, in the order people think.** Do group billing fields together under a heading in one column. Don't place unrelated fields side by side to save height. [P0035](P0035-one-column-task-order.md) must

## Type

- **Hierarchy from size, weight and order, with few sizes.** Do use one size for the KPI value, one for labels, one for supporting text in the glance band. Don't mix five font sizes and three weights in one card. [P0018](P0018-hierarchy-from-few-sizes.md) should
- **Text is readable: line length and size.** Do cap descriptive text at a max-width of about 70ch inside wide panels. Don't run paragraph text the full width of a 1440 px screen, or drop body text to 11 px to fit a card. [P0019](P0019-readable-text.md) should
- **Left-align text; right-align numbers in tabular figures.** Do use font-variant-numeric: tabular-nums and right alignment on every numeric column and KPI. Don't centre numbers in a table or justify paragraph text. [P0020](P0020-align-text-left-numbers-right.md) should

## Colour

- **Text and controls meet contrast minimums.** Do check every text and border token pair in both themes against the ratios before shipping. Don't use light grey placeholder-style text for real content. [P0021](P0021-contrast-minimums.md) must
- **Never use colour alone to carry meaning.** Do show a status as an icon plus a word (Failed) in red, and label chart series directly. Don't mark an error only by turning a border red, or tell series apart only by hue. [P0022](P0022-never-colour-alone.md) must
- **Colour has a job: one accent for action, reserved colours for status.** Do keep the dashboard neutral grey, with the accent only on the primary action and selection, and red only on real failures. Don't colour-code every card, or use red for a brand accent. [P0023](P0023-colour-has-a-job.md) should
- **Dark UI uses dark grey surfaces and softened colours.** Do use a near-black base surface, step raised surfaces lighter, and use softened tints of the accent. Don't invert the light theme to #000 and #fff with the same saturated brand colours. [P0024](P0024-dark-ui-grey-not-black.md) should
- **Colours come from tokens, and selection is a tint.** Do style a selected nav item with the accent at low opacity over the surface, from a token. Don't hard-code #3B82F6 in a component, or fill the selected row with solid brand blue. [P0025](P0025-colours-from-tokens-selection-tint.md) should

## Controls

- **Every control has all its states.** Do tint the rest colour for hover (per hub-0014: a tint, not a solid fill), draw a focus ring only for keyboard focus, and shrink pressed controls to about 98% (hub-0013). Don't use `outline: none` without a replacement, rely on hover alone for anything a touch user needs, or hard-code a state colour. [P0001](P0001-every-control-has-all-its-states.md) must
- **Targets are big enough to hit.** Do give 16 px icon buttons a 32 px hit area on desktop and 44 px on touch. Don't ship a 16 px close icon with no padding. [P0026](P0026-targets-big-enough.md) must
- **Icons carry a text label.** Do show icon plus label in the side nav and collapse to icons only with tooltips and aria-labels. Don't fill a toolbar with eight unlabelled icons, or use emoji as icons (hub-0014). [P0027](P0027-icons-carry-labels.md) must
- **Pick the control that fits the choice.** Do use a segmented control for a 3-option time range and a typeahead for choosing one of 200 customers. Don't use a toggle that needs a Save button, or a dropdown for two options. [P0028](P0028-pick-the-right-control.md) must
- **Buttons say what they do.** Do write Delete project on the destructive button in a confirm dialog. Don't use Yes / No or Submit as the only labels. [P0029](P0029-buttons-say-what-they-do.md) must
- **Hover shows more; it is never the only way in.** Do show a hover card after about 300 to 500 ms (hub-0001) that also opens on focus and closes on Escape. Don't hide row actions so they appear only on mouse hover with no keyboard or touch route. [P0030](P0030-hover-shows-more-never-only-way.md) must
- **Labels sit above fields and never vanish.** Do use a 1 to 3 word label above the input and put format hints in helper text below the label. Don't rely on a grey placeholder such as Email address inside an unlabelled field. [P0032](P0032-labels-above-fields.md) must
- **Good defaults and forgiving input.** Do accept 4242 4242 4242 4242 and 4242424242424242 alike, and make a postcode field short. Don't reject a phone number because it has spaces, or make a 4-digit field full width. [P0034](P0034-good-defaults-forgiving-input.md) must
- **Buttons come in three sizes, and the main action is the largest.** Do use small 32 px for table rows, medium 40 px for forms, large 48 px for the hero; the full padded area responds to the click. Don't mix six button heights on one page, or ship a full-width 80 px button on desktop. [P0088](P0088-button-sizes-from-one-scale.md) must
- **Badges only for what changes a decision.** Do show "Online now" beside a seller, or "Failed" on the one run that failed. Don't stack "Free shipping", "Quality", "Secure" and "New" on every card. [P0089](P0089-badges-only-for-what-changes-a-decision.md) should
- **Tooltips add detail; they never hold what you need.** Do put a dotted underline on "APR" that explains it on hover or focus, with the password rules shown under the field. Don't put "Password must be 12 characters" only in a tooltip on an info icon. [P0090](P0090-tooltips-are-extra-never-vital.md) must
- **A switch acts at once, and its label names the setting.** Do label it "Email alerts" and save the moment it flips, with a brief "Saved". Don't flip the label between "Turn on" and "Turn off", or put the switch in a form with a Save button. [P0091](P0091-switches-act-at-once.md) should
- **Avatars come from one size scale and are named for screen readers.** Do use 24 px avatars in lists and 40 px in headers, alt="Priya Shah" when the name is not printed next to it, initials on a neutral tint when there is no photo. Don't mix 27, 30 and 35 px avatars on one screen, or stack faces with no names for screen readers. [P0092](P0092-avatars-sized-and-named.md) should

## State and feedback

- **Validate on blur, next to the field, and keep what was typed.** Do show Enter a date in the past under the date field after it loses focus, and link each summary item to its field. Don't flash red errors on the first keystroke or wipe the form after a failed submit. [P0033](P0033-validate-on-blur-next-to-field.md) must
- **Respond in 0.1 s; show progress past 1 s; show percent and cancel past 10 s.** Do disable and show a spinner on Save immediately, and show a progress bar with Cancel for a 30 s export. Don't leave the button idle for 2 s with no response, or show an endless spinner for a long job. [P0036](P0036-response-time-limits.md) should
- **Skeletons when the layout is known; spinners when it is not.** Do render table rows and KPI tiles as grey blocks of the same size as the real content. Don't put a centred spinner in every widget, or flash a loader for 50 ms. [P0037](P0037-skeleton-when-layout-known.md) must
- **An empty state says why it is empty and offers the next step.** Do write No invoices yet with a Create invoice button, and for a search with no results show the query and a way to clear filters. Don't show an empty table with only column headers, or a full-page illustration with no action. [P0038](P0038-empty-state-says-why-and-next.md) should
- **Errors say what happened and how to fix it, in plain words.** Do write Could not load revenue: the billing service is not responding. Retry, with the code in a details line. Don't show Error 504 or Invalid input with no next step. [P0039](P0039-errors-plain-and-fixable.md) should
- **Never say there is nothing while it is still loading.** Do show a skeleton while fetching, then either the rows or No orders this week. Don't render No data first and replace it with rows a second later. [P0040](P0040-never-empty-while-loading.md) should
- **Prefer undo to are-you-sure; confirm only what cannot be undone.** Do archive a row at once with an Undo toast, and confirm Delete workspace by naming it and the item count. Don't ask Are you sure? before every archive or status change. [P0041](P0041-undo-over-confirm.md) should
- **Every action gets feedback, sized to what happened.** Do tick a checkbox and see the row update in place with a quiet Saved marker. Don't pop a modal for a routine save, or save silently with no sign. [P0042](P0042-every-action-gets-feedback.md) should
- **An agent previews, asks before consequential acts, and can be undone.** Do show the agent's planned edits as a diff with Apply and Discard, and an activity log with Revert. Don't let an agent send emails or delete records without a preview or a record. [P0073](P0073-agent-previews-and-asks.md) should

## Motion

- **Motion is short and eased, scaled to distance.** Do slide a side sheet in over 200 ms ease-out and out over 120 ms ease-in. Don't use linear 600 ms transitions on menus. [P0043](P0043-motion-short-and-eased.md) should
- **Respect reduced motion; never flash.** Do wrap non-essential transitions in a prefers-reduced-motion: no-preference media query. Don't autoplay a looping animated background with no pause control. [P0044](P0044-reduced-motion-no-flashing.md) must
- **Motion explains a change; it never competes for attention.** Do animate a new row sliding into a list so people see where it landed. Don't pulse every KPI tile or animate several widgets at once on load. [P0045](P0045-motion-explains-change.md) should

## Words

- **Write for scanning: say it once, most important words first.** Do write Payment failed: card expired, not We are sorry, but there seems to have been a problem processing your payment. Don't repeat the page title in the card title and again in the description. [P0046](P0046-write-for-scanning.md) must
- **Use the user's words, not the system's.** Do call it Invoices everywhere if customers say invoices, and write Get paid faster, not Accounts receivable automation. Don't show internal names (sync_job_v2), or call the same thing Projects on one page and Workspaces on another. [P0047](P0047-users-words-not-systems.md) must
- **Say what the AI can do, and help people start.** Do show three example prompts tied to the user's own data and a one-line note on limits under the input. Don't open on an empty chat box with only Ask me anything. [P0071](P0071-ai-says-what-it-can-do.md) must
- **AI answers show their sources and say they are AI.** Do put a numbered citation after each sentence of a summary, linking to the record it came from. Don't present a generated summary as fact with no sources or AI label. [P0072](P0072-ai-shows-sources.md) must

## Landing pages: hero, proof, pricing, FAQ, footer

UI hub nodes `section/hero` … `section/footer`. Most evidence here is A/B tests on live traffic (GoodUI's write-ups of Netflix, Airbnb, Zalando and Etsy tests, plus Intuit, Meta and Optimizely); GoodUI keeps its effect sizes behind a paywall, so its lines give the direction of a result, not its size.

- **The hero says the outcome, and its one action is above the fold.** Do write "Close your books in a day" with Start free trial beside it, on a hero that ends before the first screen does. Don't open with a full-height photo and the product name, with the button below the fold. [P0076](P0076-hero-says-the-outcome-cta-above-fold.md) must
- **One call to action, repeated down the page.** Do put Start free trial in the hero, after the features, after the testimonials and in the closing band, in the one reserved action colour. Don't offer Book a demo, Watch video, Sign in and Start trial as equal buttons in the hero. [P0077](P0077-one-cta-repeated-down-the-page.md) should
- **Proof sits beside the ask.** Do under the hero button: "Used by 4,200 teams" and a row of five customer logos; card logos beside Pay. Don't keep every logo in a band halfway down the page and leave the signup button bare. [P0078](P0078-proof-sits-beside-the-ask.md) should
- **Pricing: a few plans side by side, each with its whole price.** Do show three plans with the monthly price large, "billed yearly, VAT included" under it, and five included features each. Don't show one "recommended" plan and add a setup fee on the payment step. [P0079](P0079-pricing-few-plans-whole-price.md) should
- **Plans compare row by row.** Do use a comparison table with feature names down the left and a tick, dash or number in each plan column; "£12/month, billed £144 yearly". Don't use three cards with differently ordered bullet lists, or features hidden in accordions on desktop. [P0080](P0080-plans-compare-row-by-row.md) should
- **The FAQ answers the last objections, near the action.** Do answer "Can I cancel any time?" in one sentence, above the closing call to action. Don't put forty questions in tabs, written as the company would phrase them. [P0081](P0081-faq-answers-the-last-objections.md) should
- **Signup and checkout drop the site nav and footer.** Do show checkout with only the logo, a help link, the order summary and Pay. Don't wrap the card form in the full mega-menu and a four-column footer. [P0082](P0082-conversion-pages-drop-nav-and-footer.md) should
- **The footer is the site map and the contact desk.** Do use Product, Company, Resources and Legal columns, a support email, and the copyright line, in a footer element. Don't ship a single row of thirty unlabelled links, or a footer with no way to contact anyone. [P0083](P0083-footer-is-the-site-map.md) must
- **At most one announcement, and it never looks like an ad.** Do show one slim bar, "New: invoices in 30 currencies. See what changed", dismissible, gone on checkout. Don't stack two banners and a flashing discount strip above the payment form. [P0084](P0084-one-announcement-never-like-an-ad.md) must
- **How it works shows the few steps, and what happens after the click.** Do write "1. Connect your bank. 2. We sort the transactions. 3. You approve the return." After the form: "Check your inbox; the link expires in 30 minutes." Don't write a paragraph about the platform's architecture, or end a form on a blank "Thanks". [P0085](P0085-how-it-works-says-what-happens-next.md) should
- **Features lead with the outcome, then the feature.** Do title it "Never miss a renewal: Smart reminders" and show the reminder. Don't title a grid "AI Engine", "Workflows", "Integrations" with stock icons. [P0086](P0086-features-lead-with-the-outcome.md) should
- **Contact is a short form and a real address.** Do ask for name, email and message, with support@ and a phone number beside the form. Don't use an eight-field form with a required phone number and no address anywhere. [P0087](P0087-contact-is-short-and-real.md) must

## Data: dashboards, charts, tables, KPIs

- **A dashboard has one audience, one purpose and few views.** Do write the audience and the question at the top of the spec (Ops lead: is anything on fire right now?) and pick views that answer it. Don't put every available metric on one page because the data exists. [P0048](P0048-dashboard-one-audience-few-views.md) must
- **The key number is biggest and top-left.** Do lead the KPI row with Revenue this month in the largest type, followed by three smaller supporting KPIs. Don't give eight KPI tiles equal size and weight. [P0049](P0049-key-number-biggest-top-left.md) should
- **A KPI shows its comparison, trend and timeframe.** Do show Revenue, last 30 days, 42.1k, up 8% vs previous 30 days, with a small sparkline. Don't show a lone 42,103 with no label of period or comparison. [P0050](P0050-kpi-shows-context.md) should
- **Pick the chart by the question; encode with position and length.** Do show monthly signups as a line and signups by channel as a sorted horizontal bar chart. Don't use a 3D pie with nine slices to compare channels. [P0051](P0051-pick-chart-by-question.md) should
- **Bars start at zero and are sorted.** Do sort the revenue-by-region bars from largest to smallest with the axis at zero. Don't start the axis at 90 to make a 2% difference look like a doubling. [P0052](P0052-bars-zero-and-sorted.md) should
- **Every mark is data: label directly, few gridlines, no chart junk.** Do label each line at its end in the series colour and use about four light horizontal gridlines. Don't draw a bordered chart with a shaded background, dark gridlines and a legend box in the corner. [P0053](P0053-every-mark-is-data.md) should
- **Highlight one thing in colour and grey the rest.** Do show all regions in grey and the selected region in the accent. Don't give twelve categories twelve saturated colours. [P0054](P0054-highlight-one-grey-rest.md) must
- **Tables: numbers right, headers fixed, rows that respond.** Do use the bank's data table with a sticky header, sortable columns, row hover and a density toggle. Don't build a grid of divs with centred numbers and headers that scroll away. [P0055](P0055-tables-built-for-scanning.md) must
- **Repeated items are a list or table, not a pile of cards.** Do show 40 deployments as a table with status, branch and time columns, most recent on top (hub-0008). Don't show the same 40 deployments as a wall of identical cards. [P0056](P0056-list-not-card-pile.md) should
- **Filters sit next to what they filter and show what is applied.** Do show Status: Failed and Last 7 days as chips above the table, each with an x, and 23 results. Don't hide filters in a drawer with no sign that the view is filtered. [P0057](P0057-filters-near-and-visible.md) must
- **Every number shows its source and how fresh it is.** Do show Updated 2 min ago, Stripe in the widget footer and switch to a Stale label after the refresh window passes. Don't keep showing yesterday's numbers as if they were live when a source fails. [P0058](P0058-show-source-and-freshness.md) must
- **Every chart has a text title and a text alternative.** Do title a chart Signups doubled after the March launch and offer View as table. Don't title it Chart 3, or ship an SVG chart with no accessible name. [P0059](P0059-chart-title-states-finding.md) must

## Behaviour: choice, motivation, trust, and the dark-pattern line

- **Ask for less: every field earns its place.** Do ask for email and password at signup and collect company size later, inside the product. Don't ask for phone, address and job title before the user has seen any value. [P0031](P0031-ask-for-less.md) must
- **The default is the choice most people should make.** Do default notification settings to the important events only and the date range to the last 30 days. Don't pre-tick a paid add-on or a marketing opt-in. [P0060](P0060-default-is-the-good-choice.md) must
- **Fewer choices, faster decisions.** Do offer three plans with one marked Recommended. Don't show twelve equal options with no guidance. [P0061](P0061-fewer-choices.md) must
- **Show progress toward a goal.** Do show a setup checklist at 2 of 5 with the account already counted as done. Don't show a fake progress bar that jumps to 90% and stalls. [P0062](P0062-show-progress-to-goal.md) must
- **Proof is real: numbers, names and faces you can check.** Do show 1,240 teams use this with three named customer quotes and their companies. Don't use stock-photo testimonials, invented counts or anonymous five-star quotes. [P0063](P0063-proof-is-real.md) must
- **No dark patterns: decline is as easy as accept, prices are whole, urgency is true.** Do give Accept and Decline equal-weight buttons and show tax and fees in the first price. Don't write No thanks, I hate saving money, add a fake countdown, or bury cancel behind a phone call. [P0064](P0064-no-dark-patterns.md) must
- **Design the peak and the ending.** Do end onboarding on a success screen that shows the first result and the next useful action. Don't end a long flow on a bare redirect or a survey. [P0065](P0065-design-peak-and-end.md) should
- **Interrupt rarely: notify only when it matters to the user.** Do notify on a failed payment; batch comments into a daily digest by default. Don't push a notification for every new feature or every like. [P0066](P0066-interrupt-rarely.md) must
- **Polish matters, and it is tested.** Do use real type, real icons and consistent spacing from tokens, then run the task test after a visual refresh. Don't ship a redesign because it looks better without checking task completion. [P0067](P0067-polish-is-tested.md) must
- **First run reaches value fast; teach in context, not upfront.** Do open a new workspace with sample data and one prompt: Connect your first source. Don't show a ten-slide product tour before the first screen. [P0068](P0068-first-run-to-value.md) must
- **Ask for data and permissions in context, after value, with a reason.** Do ask for notification permission when the user turns on alerts, with one line on what they will get. Don't ask for location, contacts and notifications on first launch. [P0069](P0069-ask-in-context-with-reason.md) must
