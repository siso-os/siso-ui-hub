import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";

export default function GradientTabs() {
  return (
    <div className="p-6">
      <Tabs defaultValue="account" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 p-1">
          <TabsTrigger
            value="account"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
          >
            Account
          </TabsTrigger>
          <TabsTrigger
            value="password"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white"
          >
            Password
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="account"
          className="p-4 border rounded-md bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/10 dark:to-purple-950/10"
        >
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent
          value="password"
          className="p-4 border rounded-md bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/10 dark:to-pink-950/10"
        >
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </TabsContent>
        <TabsContent
          value="settings"
          className="p-4 border rounded-md bg-gradient-to-r from-pink-50 to-red-50 dark:from-pink-950/10 dark:to-red-950/10"
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
