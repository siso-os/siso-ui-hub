# Verified rules

Checked 17 Oct 2026. Every source each of the 92 rules cites was opened (curl, `--compressed`) and read by a Haiku
checker: does the page load, does it say what the rule claims, does it back the rule. A rule's grade is from the sources
that said yes and backed yes.

- **verified** (71): solid (two or more independent sources) or ok (backed, with a caveat in Why).
  Agents follow these.
- **lead** (17): one source only. Use as a hint; never cite as a rule; never fail a build on it.
- **out** (4): no source backs it as written. Do not use until it is rewritten with a real source.

The raw rows (every source, its quote and note) are in `verify-2026-10-17/result-*.jsonl`; the counts:
40 solid, 31 ok, 17 weak, 4 unsupported.

## Verified

| Rule | What it says | Grade | Sources that back it | Why |
|---|---|---|---|---|
| [P0002](P0002-shell-loads-once-content-streams.md) | shell loads once content streams | ok | 2 | onething.design and Steve Kinney back progressive, frame-first loading; the NN/g subsecond source is weak for per-region loading. |
| [P0005](P0005-say-where-you-are.md) | say where you are | solid | 3 | IBM Carbon (breadcrumbs only past two levels), USWDS (active state marks current page) and W3C 2.4.2 (title changes per view) are all yes/yes/yes; GOV.UK and the Booking leak are weak. |
| [P0006](P0006-primary-nav-visible.md) | primary nav visible | ok | 2 | Apple WWDC21 (hamburger hides features, tab bar instead) and NN/g (do not hide menus when there is room) are yes/yes/yes; the Bol leak is about sort options, weak. |
| [P0007](P0007-search-is-a-visible-field.md) | search is a visible field | solid | 3 | Baymard (search always visible in header), MeasuringU (missing search cut completion) and Apple WWDC26 (recent searches inline on focus) are yes/yes/yes; scope or filter of results is thinly sourced (NN/g weak). |
| [P0008](P0008-links-go-buttons-do.md) | links go buttons do | ok | 2 | Carbon (use links for navigation) and Laws of UX (differentiate links visually) are yes/yes/yes; covers link-vs-button and link styling only; GoodUI icon labels is off-topic. |
| [P0009](P0009-back-and-url-restore-state.md) | back and url restore state | ok | 2 | NN/g (Back goes to previous screen) and GOV.UK (Back link keeps answers changeable) are yes/yes/yes; the Smashing pushState source backs it but says partly (its 90% is e-commerce only); the URL-per-state half is thin. |
| [P0010](P0010-keyboard-first-shortcuts-shown.md) | keyboard first shortcuts shown | solid | 3 | USWDS (form order follows screen), W3C 2.4.3 (focus order preserves meaning; two rows, one org) and the Raycast guide (shortcuts inline) are yes/yes/yes; 2.1.1 reachability is not sourced and Raycast is one personal b... |
| [P0011](P0011-most-important-top-left.md) | most important top left | solid | 3 | Tableau (most important view upper-left), Apple WWDC22 (purpose at top) and a GoodUI Google leak (primary results above recommended questions, second-hand) are yes/yes/yes; Odown is prominence, not position. |
| [P0012](P0012-show-only-what-the-task-needs.md) | show only what the task needs | solid | 3 | Laws of UX (4-7 chunks, necessary and relevant), MarketingSherpa/Intuit (overwhelming info with FAQs and tabs lost, landing-page test) and Uber (show only what is relevant now) are yes/yes/yes; the 55% work-area figur... |
| [P0013](P0013-one-spacing-scale-proximity.md) | one spacing scale proximity | solid | 3 | Carbon (2/4/8 scale), Atlassian and Spectrum (proximity) all yes/yes; Fluent 4px is partly; MeasuringU is generic whitespace |
| [P0015](P0015-layouts-reflow.md) | layouts reflow | ok | 2 | W3C 1.4.10 (320 CSS px, no two-way scroll) and Primer 320px/256px minimums; checkout, nngroup and Microsoft are partly or generic |
| [P0017](P0017-use-known-conventions.md) | use known conventions | solid | 4 | NN/G, Laws of UX, W3C (navigation order) and Apple all yes/yes; Growth.design familiarity is about ads, Amazon is one test |
| [P0018](P0018-hierarchy-from-few-sizes.md) | hierarchy from few sizes | ok | 2 | IBM Carbon (weight and size hierarchy) and NN/G (3 type sizes) yes/yes; Apple covers line length, not hierarchy |
| [P0019](P0019-readable-text.md) | readable text | ok | 2 | Atlassian (60-80) and Salesforce (under 66) yes/yes; Apple and W3C 1.4.12 do not back size or length limits |
| [P0020](P0020-align-text-left-numbers-right.md) | align text left numbers right | solid | 3 | GOV.UK (numbers right), GitHub Primer and IBM (text left) all yes/yes; no source covers tabular figures or right-aligned column headers |
| [P0021](P0021-contrast-minimums.md) | contrast minimums | solid | 6 | W3C, WebAIM, Salesforce, IBM, Stripe and Microsoft all yes/yes on 4.5:1 text and 3:1 large text and controls; rule's 19px-bold figure is a rounding of WCAG 14pt |
| [P0022](P0022-never-colour-alone.md) | never colour alone | solid | 5 | W3C, Adobe Spectrum, Laws of UX, Apple and Salesforce all yes/yes; Carbon 8%/0.4% stat is partly |
| [P0025](P0025-colours-from-tokens-selection-tint.md) | colours from tokens selection tint | solid | 3 | Chakra and Fluent (semantic tokens) and Arc (tinted washes over borders) yes/yes; Arc source is a third-party plugin page; Carbon is partly |
| [P0026](P0026-targets-big-enough.md) | targets big enough | solid | 3 | W3C 2.5.5 (44px), accessibilitychecker.org (44px) and Primer (24px AA, 44px AAA) yes/yes; the 24px AA figure is backed only by Primer |
| [P0028](P0028-pick-the-right-control.md) | pick the right control | solid | 3 | PatternFly (typeahead over 10), IBM Carbon (no free text for fixed choices) and Ant (radio for one choice) yes/yes; 'up to six' radios and the toggle rule have no yes source |
| [P0029](P0029-buttons-say-what-they-do.md) | buttons say what they do | solid | 5 | GoodUI (verb prefix), IBM Carbon (verb+noun), GOV.UK (action text), Eleken (same style for same function) and W3C APG (ellipsis) all yes/yes |
| [P0030](P0030-hover-shows-more-never-only-way.md) | hover shows more never only way | ok | 2 | W3C 1.4.13 (dismissible, hoverable, persistent) and NN/G (keyboard-hover activation) yes/yes; no source on the reachability-by-click rule |
| [P0031](P0031-ask-for-less.md) | ask for less | solid | 3 | CleanCommit (5.9% lift from fewer steps and fields), NN/G (remove derivable fields) and GOV.UK (fewest steps) all yes/yes; the 'defer optional questions' half has no source |
| [P0032](P0032-labels-above-fields.md) | labels above fields | solid | 4 | GoodUI (labels above), IBM Carbon and GOV.UK (no placeholder as label) and W3C (label element) all yes/yes |
| [P0033](P0033-validate-on-blur-next-to-field.md) | validate on blur next to field | ok | 2 | Elastic (summary, highlight, no lost input) and W3C 3.3.1 yes/yes; the 27% Baymard figure is not on its page; 'on blur' timing is unsourced |
| [P0035](P0035-one-column-task-order.md) | one column task order | solid | 4 | IBM Carbon (logical order), Abstracta (logical order), USWDS and GOV.UK (fieldset grouping) all yes/yes; single column is on the Carbon page but not in any row's says |
| [P0036](P0036-response-time-limits.md) | response time limits | ok | 2 | NN/G (0.1 s response) and onething (spinner for short blocking actions) yes/yes; no source for percent-done, time-left or cancel past 10 s |
| [P0037](P0037-skeleton-when-layout-known.md) | skeleton when layout known | ok | 3 | Carbon (after redirect), onething and PatternFly back skeleton-for-known-layout yes/yes. NN/g says full-page loads use a progress indicator, and the 30% in Steve Kinney is a different claim. The 200 ms show-delay has ... |
| [P0038](P0038-empty-state-says-why-and-next.md) | empty state says why and next | solid | 6 | Six yes/yes: 5-word title limit (GitLab), extra content costs attention (Carbon), CTA specific (Salesforce), state what the user can do (PatternFly), primary action first (EUI), system status (NN/g). 'Explain in one s... |
| [P0039](P0039-errors-plain-and-fixable.md) | errors plain and fixable | solid | 5 | Five yes/yes: plain language over raw codes (EUI, with its 504 example), use plain language (Carbon), what went wrong and how to fix it (GOV.UK, NHS), human-readable and not blaming the user (NN/g video). Abstracta is... |
| [P0041](P0041-undo-over-confirm.md) | undo over confirm | solid | 3 | Undo offered (NN/g, Apple WWDC26 250 with its 'confirmation for destructive actions') and confirm for legal and financial (WCAG 3.3.4) are all yes/yes. 'Name exactly what will happen' has no source; Cline and Figma de... |
| [P0042](P0042-every-action-gets-feedback.md) | every action gets feedback | ok | 3 | Shneiderman (modest for frequent or minor, substantial for major), the NN/g toggle (immediate effect, no Save) and GOV.UK (changes shown straightaway) are yes/yes. The inline, toast and page-message mechanisms have no... |
| [P0043](P0043-motion-short-and-eased.md) | motion short and eased | ok | 3 | Ease-out for entrances (Emil, Flavio) and longer for larger moves (Fluent) are yes/yes. The hub-0013 durations (150-250, 100-150, under 100 ms) and ease-in for exits have no external source; Carbon's 500 ms cap and NN... |
| [P0044](P0044-reduced-motion-no-flashing.md) | reduced motion no flashing | solid | 4 | prefers-reduced-motion honoured (svg-animations-dev, modern-svg), cross-fade replacing slides (WWDC20), pause for auto-playing motion (modern-svg), avoid flashing (Carbon, whose cited line is captions). Four yes/yes; ... |
| [P0045](P0045-motion-explains-change.md) | motion explains change | ok | 2 | Motion explains a change (Fluent) and too many animations compete for attention (WWDC19 211) are yes/yes. Airbnb and Doherty are generic or loading-only; OpenAI is about display modes. 'Loop decoration' has no source |
| [P0046](P0046-write-for-scanning.md) | write for scanning | solid | 4 | Most important first (NN/g 'first two paragraphs', Decision Lab), chunking (Laws of UX), headings (WWDC17 819) and 'cut unnecessary content' (NN/g) are yes/yes. GoodUI and the OpenAI carousel count are off target |
| [P0047](P0047-users-words-not-systems.md) | users words not systems | solid | 3 | Familiar words over jargon (NN/g), word lists for consistency (WWDC25 404) and end-goal headline (GoodUI 22, one experiment) are yes/yes. Meta on terminology is unreached; the mental-model and AI-explanation sources a... |
| [P0048](P0048-dashboard-one-audience-few-views.md) | dashboard one audience few views | solid | 3 | Two dashboards and drop-off beyond (Linear), two or three views and split when it grows (Tableau), specific audience and context (Bach) are yes/yes. Odown is executive-only and weak |
| [P0049](P0049-key-number-biggest-top-left.md) | key number biggest top left | ok | 2 | Tableau (most important view upper-left) and ODown (primary metrics most prominent) are yes/yes; Apple WWDC22 says titles as headings, which is not placement. |
| [P0050](P0050-kpi-shows-context.md) | kpi shows context | ok | 2 | Elastic (title and value never hidden) and ODown (baseline comparisons) are yes/yes; Linear says no to pairing with context charts; CDC sparkline is about grouped sparklines. |
| [P0051](P0051-pick-chart-by-question.md) | pick chart by question | ok | 2 | Elastic (line chart for precise time series) and ODown (line for trends, bar for quantities) are yes/yes; Carbon and Apple say zero-axis and categories, not chart choice. |
| [P0052](P0052-bars-zero-and-sorted.md) | bars zero and sorted | solid | 4 | Carbon (zero axis), Apple WWDC22 (fix lower bound to 0), FT (ordered bars) and Nast (larger to smaller) are yes/yes across IBM, Apple, FT and Nast. |
| [P0053](P0053-every-mark-is-data.md) | every mark is data | ok | 2 | Data School and Carbon (labels directly, avoid legends) are yes/yes; Tufte describes sparklines only, so partly. |
| [P0054](P0054-highlight-one-grey-rest.md) | highlight one grey rest | solid | 3 | ODown (8% men, 0.5% women; colour-blind palettes), Atlassian (limit to 5-6 colours) and Laws of UX (not colour alone) are yes/yes across three organisations. |
| [P0055](P0055-tables-built-for-scanning.md) | tables built for scanning | solid | 3 | GOV.UK (numbers right-aligned), IBM Carbon (medium 40 default) and NN/g (sticky headers over one screen) are yes/yes across three organisations. |
| [P0056](P0056-list-not-card-pile.md) | list not card pile | ok | 2 | PatternFly (never a card for dense repetitive content) and Apple WWDC25 (list over grid) are yes/yes. |
| [P0057](P0057-filters-near-and-visible.md) | filters near and visible | solid | 3 | Baymard (result counts next to filters), PatternFly (applied filter labels) and Playfair (filter next to its view) are yes/yes across three organisations. |
| [P0058](P0058-show-source-and-freshness.md) | show source and freshness | solid | 3 | Stanford (show review dates), NN/g (last-updated indicator) and CDC (show data source) are yes/yes across three organisations. |
| [P0059](P0059-chart-title-states-finding.md) | chart title states finding | solid | 5 | W3C (1.1.1 text alternative for charts), Apple, NN/g (long description), Salesforce and Microsoft are yes/yes across five organisations; Carbon covers the title only partly. |
| [P0062](P0062-show-progress-to-goal.md) | show progress to goal | ok | 2 | Laws of UX and Growth.Design are yes/yes, but both cite the same Zeigarnik effect. |
| [P0063](P0063-proof-is-real.md) | proof is real | ok | 2 | Stanford (citations) and CDC (data source) are yes/yes; the social-proof and credibility sources are weak. |
| [P0064](P0064-no-dark-patterns.md) | no dark patterns | ok | 2 | NN/g (costs shown where the decision is made) and Growth.Design (GoDaddy selected-by-default, fear tactics) are yes/yes; GoodUI and Deceptive Design are partly. |
| [P0065](P0065-design-peak-and-end.md) | design peak and end | ok | 2 | Laws of UX and DecisionLab both say attend to peak and end; no primary Kahneman source read. |
| [P0066](P0066-interrupt-rarely.md) | interrupt rarely | ok | 2 | Growth.Design (Clubhouse 20+ notifications) and Apple WWDC17 (notify only when important) are yes/yes; the PKU source is unreached. |
| [P0067](P0067-polish-is-tested.md) | polish is tested | solid | 3 | Laws of UX (aesthetic-usability), NN/g (50 ms first impression) and Tognazzini (no loss of learnability or productivity) are yes/yes across three organisations. |
| [P0068](P0068-first-run-to-value.md) | first run to value | solid | 4 | Koji (time-to-value benchmark), W3C (context-sensitive help), NN/g (contextual tips) and Apple (remove obstacles) are yes/yes; the Laws of UX homepage has no such text. |
| [P0069](P0069-ask-in-context-with-reason.md) | ask in context with reason | solid | 3 | Growth.Design (easy asks first), Apple WWDC26 (wait for the right moment) and NN/g (justify sensitive questions) are yes/yes. |
| [P0070](P0070-speed-is-a-feature.md) | speed is a feature | ok | 2 | web.dev (Rakuten 61.13% LCP, T-Mobile 42% LCP) and WPOStats (three cases on one listing) are yes/yes across two organisations; Amazon's 1% per 100 ms is a latency claim via a third-party blog. |
| [P0074](P0074-wcag-aa-semantic-html.md) | wcag aa semantic html | ok | 2 | W3C (nav element) and GOV.UK (table scope) are yes/yes; the focus and IBM sources back accessibility only in general. |
| [P0075](P0075-one-system-take-before-build.md) | one system take before build | solid | 4 | Shopify Polaris, W3C (consistent identification), NN/g (design systems) and GOV.UK (pre-built components) are yes/yes. |
| [P0076](P0076-hero-says-the-outcome-cta-above-fold.md) | hero says the outcome cta above fold | ok | 2 | GoodUI headline and above-the-fold tests plus NN/g scrolling data are yes/yes; GoodUI is one organisation, and the OptiMonk headline test is weak. |
| [P0078](P0078-proof-sits-beside-the-ask.md) | proof sits beside the ask | ok | 2 | GoodUI (social counts, logos near the CTA, integration logos) and Optimizely (card logos at checkout) are yes/yes. |
| [P0082](P0082-conversion-pages-drop-nav-and-footer.md) | conversion pages drop nav and footer | solid | 3 | Growth.Design (Zapier, 28%), GoodUI (checkout links removed) and Optimizely (cart promotion removed, +5.5M) are yes/yes. |
| [P0083](P0083-footer-is-the-site-map.md) | footer is the site map | solid | 3 | Entropik (contact details), W3C (footer region) and GOV.UK (copyright notice) are yes/yes. |
| [P0084](P0084-one-announcement-never-like-an-ad.md) | one announcement never like an ad | solid | 3 | GOV.UK (one banner, task info in main content), NN/g (banner blindness) and Optimizely (cart banner removed) are yes/yes. |
| [P0085](P0085-how-it-works-says-what-happens-next.md) | how it works says what happens next | ok | 2 | GoodUI (How It Works, personalised next step) and CleanCommit (checkout step indicators) are yes/yes; the Beehiiv reorder is weak. |
| [P0087](P0087-contact-is-short-and-real.md) | contact is short and real | solid | 4 | Formkeep (three fields), Stanford (contact info), NN/g (findable without login) and Entropik (footer contact) are yes/yes; the GOV.UK phone page does not say it. |
| [P0088](P0088-button-sizes-from-one-scale.md) | button sizes from one scale | ok | 2 | GoodUI (larger CTA, rejected small and wide buttons, full clickable area) and USWDS (large selectable surface) are yes/yes. |
| [P0089](P0089-badges-only-for-what-changes-a-decision.md) | badges only for what changes a decision | ok | 2 | Baymard (reserve badges for purchase info, avoid universal ones) and GoodUI (online-status badge, Walmart popular picks) are yes/yes. |
| [P0090](P0090-tooltips-are-extra-never-vital.md) | tooltips are extra never vital | solid | 4 | NN/g (vital info not in tooltips), W3C (Escape, focus stays on trigger), Baymard (define jargon) and GoodUI (hover explanations) are yes/yes. |
| [P0091](P0091-switches-act-at-once.md) | switches act at once | solid | 3 | NN/g (immediate results), W3C (constant switch and button labels) and IBM Carbon (label clickable) are yes/yes. |

## Leads (one source)

| Rule | What it says | Grade | Sources that back it | Why |
|---|---|---|---|---|
| [P0014](P0014-one-primary-action-per-view.md) | one primary action per view | weak | 1 | Only GOV.UK is yes/yes; NHS and LukeW are partly; GoodUI measures a dismiss option, not the number of primary buttons |
| [P0016](P0016-open-detail-in-place.md) | open detail in place | weak | 1 | Only Odown drill-down is yes/yes; Tableau is cross-highlighting, Slack and Figma are marketing |
| [P0023](P0023-colour-has-a-job.md) | colour has a job | weak | 1 | Only Atlassian is yes/yes; Baymard uses red for sale and green for stock, which contradicts 'reserve red, amber and green for status' |
| [P0024](P0024-dark-ui-grey-not-black.md) | dark ui grey not black | weak | 1 | Only IxDF is yes/yes on dark grey over black; Apple supports dark mode in general, not the surface, elevation or desaturation specifics |
| [P0027](P0027-icons-carry-labels.md) | icons carry labels | weak | 1 | Only Apple Label views is yes/yes; the icon-only exception and the tooltip requirement have no clean source; GoodUI figure is a placeholder |
| [P0034](P0034-good-defaults-forgiving-input.md) | good defaults forgiving input | weak | 1 | Only NN/G (19-character field, 99.9%) is yes/yes; GoodUI preselect is partly; no source for accepting and normalising formats |
| [P0040](P0040-never-empty-while-loading.md) | never empty while loading | weak | 1 | Only NN/g backs the loading vs error vs genuinely-empty split yes/yes; Apple WWDC26 292 is partly (no-results view and search text). 'Stale' as a fourth state and 'never show empty until data arrives empty' have no so... |
| [P0061](P0061-fewer-choices.md) | fewer choices | weak | 1 | Only DecisionLab (22-option threshold) is yes/yes; Laws of UX is partly, and the decoy and expectation sources do not back fewer choices. |
| [P0071](P0071-ai-says-what-it-can-do.md) | ai says what it can do | weak | 1 | Only Shape of AI (blank-canvas suggestions) is yes/yes; nothing read says to state what the AI can and cannot do or how often it is wrong. |
| [P0072](P0072-ai-shows-sources.md) | ai shows sources | weak | 1 | Only Fogg (citations) is yes/yes; NN/g says sources are seldom clicked (weak), Elicit is a vendor self-description, DecisionLab is a memory article. |
| [P0073](P0073-agent-previews-and-asks.md) | agent previews and asks | weak | 1 | Only Apple WWDC25 (snapshot undo) is yes/yes; Cody and Elicit are vendor pages and the rest cover scope or migrations. |
| [P0077](P0077-one-cta-repeated-down-the-page.md) | one cta repeated down the page | weak | 1 | Only GoodUI (sticky checkout, repeated bottom CTA) is yes/yes; Zalando, Facebook and Netflix back colour or size only. |
| [P0079](P0079-pricing-few-plans-whole-price.md) | pricing few plans whole price | weak | 1 | Only GoodUI (Netflix three-plan comparison) is yes/yes; the hidden-fee study is yes/weak and the decoy and ordering tests back ordering, not side by side. |
| [P0080](P0080-plans-compare-row-by-row.md) | plans compare row by row | weak | 1 | Only GoodUI (monthly price framing) is yes/yes; the feature-row test is partly. |
| [P0081](P0081-faq-answers-the-last-objections.md) | faq answers the last objections | weak | 1 | Only GoodUI (FAQ near the bottom of a short lead gen form) is yes/yes; footer and purchase-reassurance tests back the idea weakly. |
| [P0086](P0086-features-lead-with-the-outcome.md) | features lead with the outcome | weak | 1 | Only the Growth.Design paywall (lead with the reader's fear, 23%) is yes/yes; Apple and onboarding back benefit-first copy weakly. |
| [P0092](P0092-avatars-sized-and-named.md) | avatars sized and named | weak | 1 | Only Primer's alt-text rule is yes/yes; Apple's pronouns and customisation and the AI avatar back neutral defaults only weakly. |

## Out

| Rule | What it says | Grade | Sources that back it | Why |
|---|---|---|---|---|
| [P0001](P0001-every-control-has-all-its-states.md) | every control has all its states | unsupported | 0 | Recheck with --compressed: M3 states page is still a JS-only shell (14 chars of text), so unreached and unverified, not disproven. WCAG 2.4.7 says 'Ensure each item receiving focus has a visible indicator' (focus only... |
| [P0003](P0003-one-persistent-side-nav.md) | one persistent side nav | unsupported | 0 | Recheck with --compressed, all 200: Apple WWDC21 says 'too many tabs reduces the tappable area' (weak, argues against many tabs, no side-nav threshold). USWDS says 'Avoid org-structure navigation ... structure it acco... |
| [P0004](P0004-fixed-anchors.md) | fixed anchors | unsupported | 0 | Recheck with --compressed, all 200: Nature 2006 news aside says 'the company logo should go' top-left and 'most users also expect to see a search function in the top right' (direct but a journalist's aside, weak). WAI... |
| [P0060](P0060-default-is-the-good-choice.md) | default is the good choice | unsupported | 0 | No source is yes/yes/yes: DecisionLab and Growth.Design support the keep-the-default premise only partly; GoodUI's preselect claim is not on its page; Apple WWDC24 is about sensible defaults in games. |
