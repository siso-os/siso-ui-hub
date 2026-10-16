import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";

export default function PillTabs() {
  return (
    <div className="p-6">
      <Tabs defaultValue="account" className="w-full max-w-3xl mx-auto">
        <TabsList className="flex w-full justify-start gap-2 bg-transparent p-0 h-auto">
          <TabsTrigger
            value="account"
            className="rounded-full bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="rounded-full bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="rounded-full bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-2"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="p-4 border rounded-md mt-4">
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent value="password" className="p-4 border rounded-md mt-4">
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </TabsContent>
        <TabsContent value="settings" className="p-4 border rounded-md mt-4">
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Configure your application preferences and settings.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
