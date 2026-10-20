---
id: P0087
title: Contact is a short form and a real address
rule: Keep contact forms to three fields or fewer and show real ways to reach a person (email, phone or address), visible without signing in.
layer: page
applies_to: [landing:contact, landing:footer]
nodes: [section/contact, section/footer, page/contact-page]
strength: must
status: draft
shaan: [hub-0006]
papers: []
clusters: [C0154, C1074, C1875]
sources:
  - formkeep-best-practices-to-designing-contact-form | Limit contact forms to three fields maximum to increase completion rates. (measured: 50% increase in form completion when reducing from 4 to 3 fields) | https://blog.formkeep.com/best-practices-to-designing-contact-forms-that-convert/
  - fogg-2002-stanford-web-credibility | Make contact information prominent: phone, address, and email. | https://credibility.stanford.edu/guidelines
  - nngroup-edge-cases | Make support contact information accessible to users who are not logged in. | https://www.nngroup.com/articles/edge-cases/
  - entropik-a-guide-to-website-footers-best-design- | Include essential contact details in footers to build trust and let users reach the organization. | https://www.entropik.io/blog/a-guide-to-website-footers-best-design-practices-examples
  - govuk-pattern-phone | Only collect phone numbers when genuinely needed; offer alternative contact methods. | https://design-system.service.gov.uk/patterns/phone-numbers/
corpus:
  - siso-ui-code/types.jsonl | section/contact: 436 parts (mean 2.83): dark rates 3.3 vs minimal 2.6; micro motion 3.33 vs none 2.6 (model-rated) | 2026-10-11
  - siso-ui-code/types.jsonl | section/footer: 732 parts (mean 2.75): dark rates 3.13 vs minimal 2.38; micro motion 3.09 vs none 2.68 (model-rated) | 2026-10-11
check: Contact forms have at most 3 required fields; the contact page and footer show at least one direct contact route to a signed-out visitor.
updated: 2026-10-12
---

## Why

Every field costs completions, and a site with no visible way to reach a person reads as less credible.

## Do / Don't

- **Do:** Ask for name, email and message, with support@ and a phone number beside the form.
- **Don't:** Use an eight-field form with a required phone number and no address anywhere.

## Evidence

Backing: 5 independent organisations across 5 quoted claims (2 expert, 1 guideline, 2 study). Clusters: C0154, C1074, C1875.


- **FormKeep** (study, [formkeep-best-practices-to-designing-contact-form](https://blog.formkeep.com/best-practices-to-designing-contact-forms-that-convert/)): Limit contact forms to three fields maximum to increase completion rates. Measured: 50% increase in form completion when reducing from 4 to 3 fields.
- **Stanford Behavior Design Lab** (study, [fogg-2002-stanford-web-credibility](https://credibility.stanford.edu/guidelines)): Make contact information prominent: phone, address, and email.
- **Nielsen Norman Group** (expert, [nngroup-edge-cases](https://www.nngroup.com/articles/edge-cases/)): Make support contact information accessible to users who are not logged in.
- **Entropik** (expert, [entropik-a-guide-to-website-footers-best-design-](https://www.entropik.io/blog/a-guide-to-website-footers-best-design-practices-examples)): Include essential contact details in footers to build trust and let users reach the organization.
- **GOV.UK** (guideline, [govuk-pattern-phone](https://design-system.service.gov.uk/patterns/phone-numbers/)): Only collect phone numbers when genuinely needed; offer alternative contact methods.

Our corpus (siso-ui-code, ratings by a model classifier, not people) for these nodes:
- section/contact: 436 parts (mean 2.83): dark rates 3.3 vs minimal 2.6; micro motion 3.33 vs none 2.6 (model-rated)
- section/footer: 732 parts (mean 2.75): dark rates 3.13 vs minimal 2.38; micro motion 3.09 vs none 2.68 (model-rated)

## Check

Contact forms have at most 3 required fields; the contact page and footer show at least one direct contact route to a signed-out visitor.
