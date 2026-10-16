import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";

export default function OutlineTabs() {
  return (
    <div className="p-6">
      <Tabs defaultValue="account" className="w-full max-w-3xl mx-auto">
        <TabsList className="flex w-full justify-center gap-2 bg-transparent h-auto p-0">
          <TabsTrigger
            value="account"
            className="border-2 border-muted bg-transparent px-6 py-2 rounded-md data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="border-2 border-muted bg-transparent px-6 py-2 rounded-md data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="border-2 border-muted bg-transparent px-6 py-2 rounded-md data-[state=active]:bg-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="mt-6 p-6 border-2 rounded-md">
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent value="password" className="mt-6 p-6 border-2 rounded-md">
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </TabsContent>
        <TabsContent value="settings" className="mt-6 p-6 border-2 rounded-md">
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Configure your application preferences and settings.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
