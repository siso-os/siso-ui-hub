// uihub: siso:package-workbench
// Hand-wired: Arc's docs example plus the state and sample data it references
// From Arc's docs page (Usage), imports pointed at the copied source
import { JsonViewer } from "@siso/ui/blocks/source";

export function WebhookPayload({ payload }: { payload: unknown }) {
  return (
    <JsonViewer
      data={payload}
      rootName="event"
      defaultExpandDepth={2}
      maxHeight={360}
      onCopy={({ kind }) => toast(kind === "path" ? "Path copied" : "Value copied")}
    />
  );
}

function toast(message: string) {
  console.info(`json-viewer: ${message}`);
}

const payload = {
  id: "evt_3PqR8sT2bZk9mLp",
  type: "invoice.paid",
  created: "2026-10-14T09:12:44Z",
  livemode: true,
  data: {
    object: "invoice",
    id: "in_1Q2w3eR4tY5u6i",
    amount_paid: 480000,
    amount_due: 0,
    currency: "usd",
    status: "paid",
    customer: { id: "cus_NffrFeUfNV2Hib", email: "maya@northwind.co", name: "Northwind Studio" },
    lines: [
      { id: "il_1", description: "Studio retainer — October", quantity: 1, amount: 400000 },
      { id: "il_2", description: "Extra render passes", quantity: 4, amount: 20000 },
    ],
    metadata: { plan: "scale", seat_count: 12, region: "eu-west-2" },
    paid_at: "2026-10-14T09:12:41Z",
  },
};

export default function JsonViewerDemo() {
  return <WebhookPayload payload={payload} />;
}
