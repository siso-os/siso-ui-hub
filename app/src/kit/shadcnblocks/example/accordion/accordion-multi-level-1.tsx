import { ChevronDown } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../shadcn/ui/accordion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../shadcn/ui/collapsible";

export const title = "Multi-level";

const items: {
  id: string;
  title: string;
  collapsibles: {
    id: string;
    title: string;
    content: string;
    open?: boolean;
  }[];
}[] = [
  {
    id: "item-1",
    title: "Getting started",
    collapsibles: [
      {
        id: "item-1a",
        title: "Create your workspace",
        content:
          "Sign up and name your workspace. You can add a logo and invite teammates after the first save.",
      },
      {
        id: "item-1b",
        title: "Invite your team",
        content:
          "Send email invites from settings. Teammates can join with view or edit access depending on their role.",
      },
    ],
  },
  {
    id: "item-2",
    title: "Billing and plans",
    collapsibles: [
      {
        id: "item-2a",
        title: "Choose a plan",
        content:
          "Compare monthly and annual plans in billing. You can switch tiers whenever your team size changes.",
      },
      {
        id: "item-2b",
        title: "Update payment details",
        content:
          "Add a card or invoice contact in billing settings. Receipts are emailed after each successful charge.",
      },
    ],
  },
  {
    id: "item-3",
    title: "Security",
    collapsibles: [
      {
        id: "item-3a",
        title: "Two-factor authentication",
        content:
          "Turn on 2FA from your profile. We support authenticator apps and backup codes for account recovery.",
      },
      {
        id: "item-3b",
        title: "Session management",
        content:
          "Review active sessions and sign out of unused devices. Admins can require re-authentication for sensitive actions.",
      },
    ],
  },
  {
    id: "item-4",
    title: "Integrations",
    collapsibles: [
      {
        id: "item-4a",
        title: "Connect your tools",
        content:
          "Link Slack, GitHub, or your calendar from the integrations page. Each connection can be revoked at any time.",
      },
      {
        id: "item-4b",
        title: "Manage webhooks",
        content:
          "Create webhooks to push events to your own services. Delivery logs help you debug failed requests.",
      },
    ],
  },
];

const Example = () => (
  <Accordion
    className="w-full max-w-md -space-y-1"
    collapsible
    defaultValue={items[0].id}
    type="single"
  >
    {items.map((item) => (
      <AccordionItem
        className="overflow-hidden border bg-background first:rounded-t-lg last:rounded-b-lg last:border-b"
        key={item.id}
        value={item.id}
      >
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="p-0">
          {item.collapsibles.map((collapsible) => (
            <Collapsible
              className="space-y-1 border-t border-border bg-accent px-4 py-3"
              defaultOpen={collapsible.open}
              key={collapsible.id}
            >
              <CollapsibleTrigger className="flex gap-2 font-medium [&[data-state=open]>svg]:rotate-180">
                <ChevronDown
                  aria-hidden="true"
                  className="mt-1 shrink-0 opacity-60 transition-transform duration-200"
                  size={16}
                  strokeWidth={2}
                />
                {collapsible.title}
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden ps-6 text-sm text-muted-foreground transition-all data-open:animate-collapsible-down data-closed:animate-collapsible-up">
                {collapsible.content}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default Example;
