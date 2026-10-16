import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";

export default function VerticalTabs() {
  return (
    <div className="p-6">
      <Tabs
        defaultValue="account"
        className="w-full max-w-3xl mx-auto flex flex-col sm:flex-row gap-6"
      >
        <TabsList className="flex flex-col h-auto bg-muted p-1 rounded-md w-full sm:w-48 sm:min-w-48">
          <TabsTrigger
            value="account"
            className="justify-center w-full py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="justify-center w-full py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="justify-center w-full py-3 px-4 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <div className="flex-1">
          <TabsContent value="account" className="p-4 border rounded-md mt-0">
            <h3 className="text-lg font-medium">Account</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Manage your account settings and preferences.
            </p>
          </TabsContent>
          <TabsContent value="password" className="p-4 border rounded-md mt-0">
            <h3 className="text-lg font-medium">Password</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Change your password here. After saving, you&apos;ll be logged
              out.
            </p>
          </TabsContent>
          <TabsContent value="settings" className="p-4 border rounded-md mt-0">
            <h3 className="text-lg font-medium">Settings</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Configure your application preferences and settings.
            </p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
