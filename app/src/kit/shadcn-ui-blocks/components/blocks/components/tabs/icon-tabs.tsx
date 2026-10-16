import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";
import { User, Lock, Settings } from "lucide-react";

export default function IconTabs() {
  return (
    <div className="p-6">
      <Tabs defaultValue="account" className="w-full max-w-3xl mx-auto">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Account</span>
          </TabsTrigger>
          <TabsTrigger value="password" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            <span>Password</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="p-4 border rounded-md">
          <h3 className="text-lg font-medium">Account</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Manage your account settings and preferences.
          </p>
        </TabsContent>
        <TabsContent value="password" className="p-4 border rounded-md">
          <h3 className="text-lg font-medium">Password</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </TabsContent>
        <TabsContent value="settings" className="p-4 border rounded-md">
          <h3 className="text-lg font-medium">Settings</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Configure your application preferences and settings.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
