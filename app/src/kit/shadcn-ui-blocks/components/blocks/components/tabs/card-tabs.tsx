import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";

export default function CardTabs() {
  return (
    <div className="p-6">
      <Tabs defaultValue="account" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 bg-card shadow-sm border rounded-lg p-1">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="account"
          className="p-6 border rounded-lg shadow-sm mt-4 bg-card"
        >
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent
          value="password"
          className="p-6 border rounded-lg shadow-sm mt-4 bg-card"
        >
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </TabsContent>
        <TabsContent
          value="settings"
          className="p-6 border rounded-lg shadow-sm mt-4 bg-card"
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
