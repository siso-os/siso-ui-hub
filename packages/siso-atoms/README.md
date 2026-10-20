# @siso/atoms

The compatibility root offers 35 independently implemented reusable atomic families for React 19. No consumer Tailwind, router, auth provider, app aliases or hub runtime dependency. That compatibility root uses Arc for family coverage only. The separate source subpath below contains actual MIT Arc free source. See NOTICE and inventory.json for exact provenance, aliases and deferred families.

```tsx
import '@siso/tokens/styles.css'; // optional shared tokens
import '@siso/atoms/styles.css';
import { Button, Field, Input, Tabs, TabsList, TabsTrigger, TabsContent } from '@siso/atoms';

<Field label="Display name" hint="Visible to your team">
  {control => <Input {...control} value={name} onChange={e => setName(e.target.value)} />}
</Field>
<Button loading={saving} onClick={save}>Save</Button>
<Tabs defaultValue="overview">
  <TabsList aria-label="Details"><TabsTrigger value="overview">Overview</TabsTrigger></TabsList>
  <TabsContent value="overview">Content</TabsContent>
</Tabs>
```

Native inputs retain native props/ref, form submission and keyboard handling. NumberField, OTPInput, TagInput, InlineEdit, RadioGroup and SegmentedControl expose value/onValueChange; Switch/Checkbox use checked/onChange. Provide a visible Field label or aria-label to every control. MultiSelect uses native multiple-select interaction and an array value; read event.currentTarget.selectedOptions. PasswordStrength takes a caller-computed score, not a security assessment.

Use TooltipProvider around Tooltip/TooltipTrigger/TooltipContent. Pass asChild to TooltipTrigger to use an existing Button; interactive tooltip content belongs in a popover. Tabs forwards Radix controlled/uncontrolled, orientation, activationMode and keyboard APIs. SplitButton accepts actions {id,label,onSelect,disabled} and uses Radix menu focus management. ConfirmButton requires explicit second activation and awaits onConfirm; rejected callbacks keep the confirmation visible with an error. CopyButton reports actual clipboard success/failure and requires a secure browser context.

CSS classes use siso-a- prefixes and CSS variables with fallbacks: --siso-text, --siso-muted, --siso-background, --siso-surface, --siso-surface-raised, --siso-border, --siso-accent, --siso-accent-foreground, --siso-danger, --siso-focus, --siso-radius, --siso-font-sans, --siso-font-mono. Consumers can theme per ancestor; portals inherit document-level variables. Dark fallback styling is intentional; set tokens for other themes. Motion respects prefers-reduced-motion. Component refs are React 19 ref props.

Source exports are provided for workspace integration; the suite owner produces distribution builds. Runtime dependencies: react/react-dom peers and MIT radix-ui. Deferred complex editors, dates, uploads, animations and composite workflows are explicitly enumerated in inventory.json. Browser interaction/assistive technology validation remains a release check.

Verification: `node scripts/check.cjs` checks all 51 exported names against inventory and renders 16 semantic/state assertions with React server rendering. It requires TypeScript and runtime dependencies in the test environment. This does not simulate pointer, clipboard, focus or keyboard events.

## Original Arc free source

`@siso/atoms/source` exports 35 actual MIT free Arc families with their original CSS modules, Motion animations, Radix behavior and transitive helpers. `import { Button, Checkbox, ConfirmMorph } from '@siso/atoms/source'` or `import { sourceAtoms } from '@siso/atoms'`. The compatibility root API above is preserved. These APIs have different original props; source components do not replace root names.

Import `@siso/atoms/source.css` and use `<div className="arc-scope" data-theme="dark" data-accent="orange">`. Foundation and CSS modules retain original bytes; foundation includes upstream document-level focus rules. Ensure theme tokens reach portal content (Radix portals mount to document.body). Required dependencies are declared in package.json. Builds must process CSS modules. Source foundation does not require Tailwind; the suite separately supplies utility CSS for examples.

`source-provenance.json` records original/copied file hashes, upstream paths, tier and changes. Source files retain every original byte with an appended catalogue marker; CSS modules are byte-identical. No Arc Pro source is included. `examples/package-suite/source-atoms.tsx` offers all 35 families grouped in a picker and renders one complete original docs demo. Demo component import paths target the installed source subpath.

Demo-only images retain the existing hub files under examples/package-suite/atom-demos/assets, byte-identical and outside the npm package. Their provenance is separate from the Arc code MIT licence. The demo wiring adds the missing docs-only alert track and OTP verify helpers; verification never sends a request or logs the entered code.
