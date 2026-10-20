import { openSite, api } from "./preview-host";
// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { ToastStack, ToastStackProvider, useToastStack } from "@siso/ui/blocks/source";

function PublishButton() {
  const { toast, update } = useToastStack();
  async function publish() {
    const id = toast({ type: "loading", title: "Publishing" });
    await api.publish();
    update(id, { type: "success", title: "Published", action: { label: "View", onClick: openSite } });
  }
  return <button type="button" onClick={publish}>Publish</button>;
}

export function App() {
  return <ToastStackProvider><PublishButton /><ToastStack /></ToastStackProvider>;
}
