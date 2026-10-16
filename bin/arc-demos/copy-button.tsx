// Hand-wired: Arc's docs example plus the state and sample data it references
// From Arc's docs page (Usage), imports pointed at the copied source
import { CopyButton } from "../copy-button/copy-button";

export function ApiKeyRow({ apiKey }: { apiKey: string }) {
  return (
    <div className="row">
      <code>{apiKey}</code>
      <CopyButton value={apiKey} label="Copy key" iconOnly />
    </div>
  );
}

const keys: { name: string; apiKey: string }[] = [
  { name: "Production", apiKey: "demo-prod-0000-0000" },
  { name: "Staging", apiKey: "demo-stage-0000-0000" },
  { name: "Webhooks", apiKey: "demo-hook-0000-0000" },
];

export default function CopyButtonDemo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {keys.map(key => (
        <ApiKeyRow key={key.name} apiKey={key.apiKey} />
      ))}
    </div>
  );
}
