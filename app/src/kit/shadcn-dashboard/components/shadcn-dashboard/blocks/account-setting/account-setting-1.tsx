"use client";

import { useState } from "react";
import { toast, Toaster } from "@/components/ui/toast";
import {
  KeyRound,
  Plus,
  Copy,
  RefreshCcw,
  Trash2,
  MoreHorizontal,
  GitBranch,
  MessagesSquare,
  Webhook,
  Landmark,
  CreditCard,
} from "lucide-react";
import { Button } from "../../../../../shadcn/ui/button";
import { Badge } from "../../../../../shadcn/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../../../../../shadcn/ui/card";
import { Progress } from "../../../../../shadcn/ui/progress";
import { Switch } from "../../../../../shadcn/ui/switch";
import { Separator } from "../../../../../shadcn/ui/separator";
import { Field, FieldLabel } from "../../../../../shadcn/ui/field";
import { Input } from "../../../../../shadcn/ui/input";
import {
  Item,
  ItemGroup,
  ItemMedia,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
  ItemSeparator,
} from "../../../../../shadcn/ui/item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../shadcn/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../shadcn/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../../shadcn/ui/tabs";

const apiKeys = [
  {
    name: "Production key",
    key: "sk_live_51N••••••••••••••••8f2k",
    created: "Created Jan 12, 2026",
    lastUsed: "Last used 2 hours ago",
  },
  {
    name: "Staging key",
    key: "sk_test_4hP••••••••••••••••a91x",
    created: "Created Nov 3, 2025",
    lastUsed: "Last used 3 days ago",
  },
  {
    name: "CI / automation key",
    key: "sk_test_9zQ••••••••••••••••c47r",
    created: "Created Sep 21, 2025",
    lastUsed: "Never used",
  },
];

const integrations = [
  {
    name: "GitHub",
    description: "Sync deployments and issues with your repositories.",
    icon: GitBranch,
    connected: true,
  },
  {
    name: "Slack",
    description: "Get usage alerts and billing notifications in Slack.",
    icon: MessagesSquare,
    connected: true,
  },
  {
    name: "Webhooks",
    description: "Send real-time events to your own endpoints.",
    icon: Webhook,
    connected: false,
  },
  {
    name: "Accounting sync",
    description: "Export invoices and usage to your ledger automatically.",
    icon: Landmark,
    connected: false,
  },
];

const AccountSetting1 = () => {
  const [hasCard, setHasCard] = useState(true);

  const copyKey = (key: string) => {
    navigator.clipboard?.writeText(key);
    toast.add({ title: "API key copied to clipboard", type: "success" });
  };

  return (
    <div className="w-full max-w-3xl">
      {/* <Toaster /> */}
      <Card className="gap-0">
        <CardHeader className="gap-1 border-b border-border">
          <CardTitle className="text-base font-medium">Account Settings</CardTitle>
          <CardDescription>
            Manage your API keys, integrations, and billing details.
          </CardDescription>
        </CardHeader>

        <CardContent className="py-6">
          <Tabs defaultValue="api-keys">
            <TabsList className="mb-6">
              <TabsTrigger value="api-keys">API Keys</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>

            {/* ---------------- API Keys ---------------- */}
            <TabsContent value="api-keys" className="flex flex-col gap-6">
              <Card className="flex flex-col gap-2 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">API usage this month</p>
                  <span className="text-sm text-muted-foreground">8,420 / 10,000 requests</span>
                </div>
                <Progress value={84} className="h-1.5" />
                <p className="text-xs text-muted-foreground">Usage resets on Aug 1, 2026.</p>
              </Card>

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">Your API keys</p>
                  <Button size="sm" className="gap-1.5">
                    <Plus className="size-3.5" />
                    New key
                  </Button>
                </div>

                <Card className="p-0">
                <ItemGroup>
                  {apiKeys.map((item, index) => (
                    <div key={item.name}>
                      <Item className="p-4">
                        <ItemMedia variant="icon">
                          <KeyRound className="size-4 text-muted-foreground" />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle className="gap-2">
                            {item.name}
                            <Badge variant="outline" className="text-xs ">
                              Active
                            </Badge>
                          </ItemTitle>
                          <ItemDescription className="font-mono">
                            {item.key}
                          </ItemDescription>
                          <ItemDescription >
                            {item.created} · {item.lastUsed}
                          </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button variant="ghost" size="icon" className="size-8">
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              }
                            />
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="cursor-pointer" onClick={() => copyKey(item.key)}>
                                <Copy className="size-4" />
                                Copy key
                              </DropdownMenuItem>
                              <DropdownMenuItem className="cursor-pointer">
                                <RefreshCcw className="size-4" />
                                Regenerate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem variant="destructive" className="cursor-pointer">
                                <Trash2 className="size-4" />
                                Revoke key
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </ItemActions>
                      </Item>
                      {index < apiKeys.length - 1 && <ItemSeparator />}
                    </div>
                  ))}
                </ItemGroup>
                </Card>
              </div>
            </TabsContent>

            {/* ---------------- Integrations ---------------- */}
            <TabsContent value="integrations">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {integrations.map((integration) => (
                  <Card key={integration.name} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center justify-center rounded-md border border-border p-2">
                        <integration.icon className="size-4 text-foreground" />
                      </div>
                      <Switch defaultChecked={integration.connected} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {integration.name}
                        </p>
                        <Badge
                          variant={integration.connected ? "default" : "outline"}
                         
                        >
                          {integration.connected ? "Connected" : "Not connected"}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {integration.description}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* ---------------- Billing ---------------- */}
            <TabsContent value="billing" className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-foreground">Payment method</p>

                {hasCard ? (
                  <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-13 shrink-0 items-center justify-center rounded-md border border-border bg-muted">
                        <CreditCard className="size-4 text-muted-foreground" />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium text-foreground">
                          •••• •••• •••• 4242
                        </p>
                        <p className="text-xs text-muted-foreground">Expires 08/27</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Dialog>
                        <DialogTrigger render={<Button variant="outline" size="sm">Replace card</Button>} />
                        <AddCardDialog onSave={() => setHasCard(true)} />
                      </Dialog>
                      <Button
                        variant="destructive"
                        size="sm"
      
                        onClick={() => {
                          setHasCard(false);
                          toast.add({ title: "Payment method removed", type: "success" });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Card className="flex flex-col items-center gap-3 border-dashed p-8 text-center">
                    <div className="flex size-10 items-center justify-center rounded-full bg-muted">
                      <CreditCard className="size-5 text-muted-foreground" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium text-foreground">
                        No payment method on file
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Add a card to keep your subscription active without interruption.
                      </p>
                    </div>
                    <Dialog>
                      <DialogTrigger render={<Button size="sm">Add payment method</Button>} />
                      <AddCardDialog onSave={() => setHasCard(true)} />
                    </Dialog>
                  </Card>
                )}
              </div>

              <Separator />

              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-foreground">Current plan</p>
                <Card className="flex flex-row flex-wrap items-center justify-between gap-2 p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">Pro plan</p>
                    <p className="text-xs text-muted-foreground">$49/month · renews Aug 1, 2026</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage plan
                  </Button>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

const AddCardDialog = ({ onSave }: { onSave: () => void }) => {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold">Add payment method</DialogTitle>
        <DialogDescription>
          Your card details are encrypted and processed securely.
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <Field className="gap-1.5">
          <FieldLabel htmlFor="card-name" >
            CardHolder Name
          </FieldLabel>
          <Input id="card-name" placeholder="Sunil Joshi" />
        </Field>
        <Field className="gap-1.5">
          <FieldLabel htmlFor="card-number" >
            Card Number
          </FieldLabel>
          <Input id="card-number" placeholder="1234 1234 1234 1234" inputMode="numeric" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field className="gap-1.5">
            <FieldLabel htmlFor="card-expiry" >
              Expiry
            </FieldLabel>
            <Input id="card-expiry" placeholder="MM/YY" />
          </Field>
          <Field className="gap-1.5">
            <FieldLabel htmlFor="card-cvc" >
              CVC
            </FieldLabel>
            <Input id="card-cvc" placeholder="123" inputMode="numeric" />
          </Field>
        </div>
      </div>
      <DialogFooter>
        <DialogClose render={<Button variant="destructive">Cancel</Button>} />
        <DialogClose
          render={
            <Button
              onClick={() => {
                onSave();
                toast.add({ title: "Payment method saved", type: "success" });
              }}
            >
              Save card
            </Button>
          }
        />
      </DialogFooter>
    </DialogContent>
  );
};

export default AccountSetting1;
