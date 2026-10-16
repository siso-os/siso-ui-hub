// From Arc's docs page (Usage), imports pointed at the copied source
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../tabs/tabs";

export function ProjectTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Project">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Summary and stats</TabsContent>
      <TabsContent value="activity">Recent events</TabsContent>
    </Tabs>
  );
}
