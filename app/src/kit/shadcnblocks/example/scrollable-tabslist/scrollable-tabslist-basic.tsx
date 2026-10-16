import { ScrollableTabsList } from "../../components/shadcnblocks/scrollable-tabslist";
import { ScrollBar } from "../../../shadcn/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "../../../shadcn/ui/tabs";

const ScrollableTabslistExample = () => {
  return (
    <Tabs
      defaultValue="efficiency"
      className="grid grid-cols-1 gap-8 rounded-4xl border border-border p-4 lg:grid-cols-2 lg:p-8 xl:gap-20"
    >
      <ScrollableTabsList>
        <TabsList className="mx-auto h-12 rounded-4xl p-2 lg:mx-0">
          <TabsTrigger
            value="efficiency"
            className="h-full rounded-4xl px-4 py-2"
          >
            Efficiency
          </TabsTrigger>
          <TabsTrigger
            value="collaboration"
            className="h-full rounded-4xl px-4 py-2"
          >
            Collaboration
          </TabsTrigger>
          <TabsTrigger
            value="insights"
            className="h-full rounded-4xl px-4 py-2"
          >
            Insights
          </TabsTrigger>
          <TabsTrigger value="vision" className="h-full rounded-4xl px-4 py-2">
            Vision
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollableTabsList>
    </Tabs>
  );
};

export default ScrollableTabslistExample;
