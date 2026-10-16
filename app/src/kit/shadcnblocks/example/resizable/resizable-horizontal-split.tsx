import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../../shadcn/ui/resizable";

export const title = "Horizontal split";

const Example = () => (
  <ResizablePanelGroup
    className="min-h-[200px] max-w-md rounded-lg border"
    orientation="horizontal"
  >
    <ResizablePanel defaultSize="50%">
      <div className="flex h-full items-center justify-center p-6">
        <span className="text-sm font-medium">One</span>
      </div>
    </ResizablePanel>
    <ResizableHandle />
    <ResizablePanel defaultSize="50%">
      <div className="flex h-full items-center justify-center p-6">
        <span className="text-sm font-medium">Two</span>
      </div>
    </ResizablePanel>
  </ResizablePanelGroup>
);

export default Example;
