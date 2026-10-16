import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";

export default function ShadowTabs() {
  return (
    <div className="p-6">
      <Tabs defaultValue="account" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-transparent gap-4">
          <TabsTrigger
            value="account"
            className="bg-background shadow-sm hover:shadow transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="bg-background shadow-sm hover:shadow transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="bg-background shadow-sm hover:shadow transition-all data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-lg"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="account"
          className="p-6 bg-background rounded-lg shadow-md"
        >
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent
          value="password"
          className="p-6 bg-background rounded-lg shadow-md"
        >
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </TabsContent>
        <TabsContent
          value="settings"
          className="p-6 bg-background rounded-lg shadow-md"
        >
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Configure your application preferences and settings.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
