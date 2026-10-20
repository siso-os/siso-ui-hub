# @siso/site — private source package, 0.2.0

The actual accepted SISO Labs landing footer, blog components, product glyphs and
docs pieces. The source motion, SVG geometry, CSS and composition are retained.
The restricted shader is an application-provided effect slot. See `source-manifest.json` for
original and final hashes, and `inventory.json` for exact adaptations.

```tsx
import { SisoLandingFooter, SisoBlogSkin, BlogCard, DocsFooter } from '@siso/site';
import '@siso/site/styles.css';
// Optional source docs skin, scoped base/theme under .siso-docs-skin:
import '@siso/site/docs.css';

<SisoLandingFooter config={{
  copyright: '© Your organisation',
  // Optional caller-provided observed metrics; omit to show no metric values.
  stats: { stats: [], updated: '', social: { counts: {}, read: '' } },
}} />
```

`SiteProvider` exposes the same configuration to standalone footer parts. Set
products, Company/Agency/Resources links, AI prompt/label, homepage/mark source,
all-projects link, social account URLs/avatar overrides and optional counters.
The original SISO public link defaults are retained. Supply complete replacement
links when embedding elsewhere. No Next router, auth provider, private data import,
API polling, global singleton or required host service remains. `NativeLink` is
an ordinary HTML anchor with real browser navigation.

The landing composition exports all original parts: `FooterProducts`,
`FooterLinks`, `FooterNumbers`, `FooterSocial`, `FooterAskAI`, `FooterLights`,
`FooterRail`, `FooterSignature` and `RuixenGradientFooter`. Its
marquee pause-on-hover, offscreen observers, warm neon rims, social previews,
partition sparks, contour animation and scroll gradient are retained. Supply
`config.beam` for a licensed application effect in the original signature slot.
No metrics/social counts are bundled. Explicit `tokensLive` input opts into the
source rate-model counter; the consumer owns its factual basis.

Blog exports are `BlogCard`, `PostMeta`, `BlogHeader`, `ArticleRail`, `CopyPage`,
`TopicPill`, `LiveSection`, `markdownForPost`, `readingMinutes`, topic helpers and
seven `ProductGlyph` variants. Supply `SisoBlogPost` values; no source posts are
included. `BlogCard` accepts an `href` override. `ArticleRail` accepts `relatedPosts`,
`articleId` and `blogHref`; it does not import the production post collection.
Wrap blog content in `SisoBlogSkin` to inject the original complete blog CSS.

Docs exports retain the actual `DocsFooter`, `DocsRail`, `DocsLive`, `DocsSocials`,
`DocsProductHero`, `DocsPageKicker` and `LionTile`. The original docs global skin is
shipped as `docs.css`, with framework imports removed and the root/body base scoped
to `.siso-docs-skin` (add `.dark` there for dark mode). Existing original selectors
and source motion remain. `SisoDocsArticle`, `SisoDocsCode`, `SisoDocsSource` are thin
markup adapters onto the source prose, code frame and provenance-note styles.
Code text is plain escaped text; syntax highlighting is not claimed. The source
Next/Fumadocs header, router, search, MDX interpreter and OpenAPI client are excluded.

## Assets and host integration

`assets.json` enumerates **251 exact asset URLs**, each with its source-relative
public path and SHA-256. Copy those to the consumer public directory preserving
URL paths. The background manifest is the original asset manifest, not post data.
Required groups: `/brand/siso-mark.png`, `/brand/social/*`, `/siso-img/blog-bg/*`, `/art/*`,
`/fonts/InterDisplay-SemiBold.woff2` and `/fonts/GeistMono-Regular.woff2`.
The host also provides Inter 400/500/600, as on the source site. The repository does
not duplicate those assets; the release build verifies and packs them under
`assets/`. Copy that directory's contents into the host public root. The `/art/*`
entries serve docs ProductInfo defaults. Footer does not render them.

CategorySection retains its real Tailwind utilities; the suite host must scan this
package's TSX or provide compiled utilities. Most source visuals use inline CSS;
`styles.css` carries the source shared footer globals, `SisoBlogSkin` injects blog
CSS, and `docs.css` carries the source docs skin. Do not replace these with generic
package styles. The source landing/footer is intentionally dark; docs supports the
source warm light/dark palettes. Source IntersectionObserver/WebGL/clipboard behavior
needs a modern browser, with reduced-motion and visibility paths retained.

## Distribution boundary

**Keep this SISO package private.** SISO source/artwork is not offered under a new
public licence. The original React Bits LaserFlow shader permits application use
and restricts component redistribution. It is excluded from the package graph and
tarball, and supplied only by the workbench website. NOTICE records this boundary.

## Host-owned beam effect
The signature keeps its original layout, contours, horizon and mark. Pass `config.beam` to supply a licensed application effect. The original React Bits-derived shader runs only in the workbench website and is excluded from the package artifacts; its licence restricts standalone component redistribution.
