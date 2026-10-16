import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Badge } from "../../../ui/badge";
import {
  AlertCircle,
  Copy,
  Key,
  RefreshCw,
  Settings,
  Terminal,
  Webhook,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";

const apiKeys = [
  {
    name: "Production API Key",
    key: "pk_live_12345678",
    created: "Mar 1, 2024",
    lastUsed: "2 hours ago",
  },
  {
    name: "Development API Key",
    key: "pk_test_87654321",
    created: "Feb 15, 2024",
    lastUsed: "5 days ago",
  },
];

const webhooks = [
  {
    url: "https://api.example.com/webhooks/orders",
    events: ["order.created", "order.updated"],
    status: "Active",
    lastDelivery: "Successful (2 min ago)",
  },
  {
    url: "https://api.example.com/webhooks/users",
    events: ["user.created", "user.deleted"],
    status: "Failed",
    lastDelivery: "Failed (10 min ago)",
  },
];

export default function DeveloperSettings() {
  return (
    <div className="container mx-auto px-4 py-6 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <h1 className="text-2xl font-semibold">Developer Settings</h1>
            <p className="text-muted-foreground text-sm">
              Manage your API keys, webhooks, and developer tools
            </p>
          </div>
          <Button variant="outline">
            <Terminal className="mr-2 size-4" />
            View Documentation
          </Button>
        </div>

        {/* API Keys */}
        <Card className="mb-8 p-0">
          <CardContent className="p-6">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div>
                <h2 className="text-lg font-semibold">API Keys</h2>
                <p className="text-muted-foreground text-sm">
                  Manage your API keys for authentication
                </p>
              </div>
              <Button>
                <Key className="mr-2 size-4" />
                Generate New Key
              </Button>
            </div>

            <div className="space-y-4">
              {apiKeys.map((apiKey) => (
                <div
                  key={apiKey.name}
                  className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{apiKey.name}</h3>
                      <Badge variant="secondary">Active</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <code className="bg-muted rounded px-2 py-1 text-sm">
                        {apiKey.key}
                      </code>
                      <Button variant="ghost" size="sm" className="h-8">
                        <Copy className="size-3" />
                      </Button>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Created {apiKey.created} • Last used {apiKey.lastUsed}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 size-4" />
                      Rotate
                    </Button>
                    <Button variant="destructive" size="sm">
                      Revoke
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Webhooks */}
        <Card className="mb-8 p-0">
          <CardContent className="p-6">
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
              <div>
                <h2 className="text-lg font-semibold">Webhooks</h2>
                <p className="text-muted-foreground text-sm">
                  Configure webhook endpoints for real-time updates
                </p>
              </div>
              <Button>
                <Webhook className="mr-2 size-4" />
                Add Webhook
              </Button>
            </div>

            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <div
                  key={webhook.url}
                  className="flex flex-col items-start justify-between gap-4 rounded-lg border p-4 sm:flex-row"
                >
                  <div className="min-w-0 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-medium break-all">{webhook.url}</h3>
                      <Badge
                        variant={
                          webhook.status === "Active"
                            ? "default"
                            : "destructive"
                        }
                      >
                        {webhook.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event) => (
                        <Badge key={event} variant="secondary">
                          {event}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Last delivery: {webhook.lastDelivery}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Settings className="mr-2 size-4" />
                    Configure
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Alert>
          <AlertCircle className="size-4" />
          <AlertTitle>Security Notice</AlertTitle>
          <AlertDescription>
            Keep your API keys secure and never share them publicly. Rotate keys
            immediately if they&apos;re compromised.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
