---
id: P0083
title: The footer is the site map and the contact desk
rule: The footer groups links under four to six headed columns, shows how to reach a person, carries the legal lines, and is marked as the page's contentinfo.
layer: page
applies_to: [landing:footer]
nodes: [section/footer]
strength: must
status: draft
shaan: [hub-0006]
papers: []
clusters: [C1219, C2210, C2445]
sources:
  - uxpin-website-footer-design-best-practices-6- | Organize footer links into 4–6 logical columns with clear headers grouping by user intent. | https://www.uxpin.com/studio/blog/footer-design-basics/
  - entropik-a-guide-to-website-footers-best-design- | Provide footer navigation links to important sections so users can explore without scrolling back up. | https://www.entropik.io/blog/a-guide-to-website-footers-best-design-practices-examples
  - entropik-a-guide-to-website-footers-best-design- | Include essential contact details in footers to build trust and let users reach the organization. | https://www.entropik.io/blog/a-guide-to-website-footers-best-design-practices-examples
  - nngroup-hamburger-menu-icon-recognizability | Provide additional navigation methods alongside the hamburger menu: inline links, related links lists, visible search, and footer links reduce interaction cost. | https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/
  - wai-page-regions | Use HTML5 footer element or role=contentinfo to mark site-wide footer information. | https://www.w3.org/WAI/tutorials/page-structure/regions/
  - govuk-footer | Include a copyright notice in the footer to clarify who owns the copyright. | https://design-system.service.gov.uk/components/footer/
corpus:
  - siso-ui-code/types.jsonl | section/footer: 732 parts (mean 2.75): dark rates 3.13 vs minimal 2.38; micro motion 3.09 vs none 2.68 (model-rated) | 2026-10-11
check: One footer element (or role=contentinfo) per page, with 4 to 6 headed link groups and at least one contact route.
updated: 2026-10-12
---

## Why

People who reach the bottom are looking for something the page did not give them; the footer is the last place to find it without scrolling back.

## Do / Don't

- **Do:** Use Product, Company, Resources and Legal columns, a support email, and the copyright line, in a footer element.
- **Don't:** Ship a single row of thirty unlabelled links, or a footer with no way to contact anyone.

## Evidence

Backing: 5 independent organisations across 6 quoted claims (2 expert, 3 guideline, 1 study). Clusters: C1219, C2210, C2445.


- **UXPin** (expert, [uxpin-website-footer-design-best-practices-6-](https://www.uxpin.com/studio/blog/footer-design-basics/)): Organize footer links into 4–6 logical columns with clear headers grouping by user intent.
- **Entropik** (study, [entropik-a-guide-to-website-footers-best-design-](https://www.entropik.io/blog/a-guide-to-website-footers-best-design-practices-examples)): Provide footer navigation links to important sections so users can explore without scrolling back up.
- **Entropik** (expert, [entropik-a-guide-to-website-footers-best-design-](https://www.entropik.io/blog/a-guide-to-website-footers-best-design-practices-examples)): Include essential contact details in footers to build trust and let users reach the organization.
- **Nielsen Norman Group** (guideline, [nngroup-hamburger-menu-icon-recognizability](https://www.nngroup.com/articles/hamburger-menu-icon-recognizability/)): Provide additional navigation methods alongside the hamburger menu: inline links, related links lists, visible search, and footer links reduce interaction cost.
- **W3C** (guideline, [wai-page-regions](https://www.w3.org/WAI/tutorials/page-structure/regions/)): Use HTML5 footer element or role=contentinfo to mark site-wide footer information.
- **GOV.UK** (guideline, [govuk-footer](https://design-system.service.gov.uk/components/footer/)): Include a copyright notice in the footer to clarify who owns the copyright.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/footer: 732 parts (mean 2.75): dark rates 3.13 vs minimal 2.38; micro motion 3.09 vs none 2.68 (model-rated)

## Check

One footer element (or role=contentinfo) per page, with 4 to 6 headed link groups and at least one contact route.
