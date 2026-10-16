"use client";
import { Card, CardContent } from "../../../../../shadcn/ui/card";

const integrations = [
  
  {
    name: "Figma",
    description:
      "Import design tokens and components straight from your Figma files.",
    icon: "https://images.shadcnspace.com/assets/svgs/figma.svg",
  },
  {
    name: "Claude",
    description:
      "Summarize activity and answer questions using Claude inside your workspace.",
    icon: "https://images.shadcnspace.com/assets/svgs/claude.svg",
  },
  {
    name: "Cloud Storage",
    description: "Store and sync files securely with built-in cloud storage.",
    icon: "https://images.shadcnspace.com/assets/svgs/google-cloud.svg",
  },
  {
    name: "Linear",
    description: "Track issues and sync project updates from your dashboard.",
    icon: "https://images.shadcnspace.com/assets/svgs/stripe-dark.svg",
      darkIcon: "https://images.shadcnspace.com/assets/svgs/stripe.svg",
  },
];

const IntegrationsShowcaseCard = () => {
  return (
    <div className="grid w-full max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
      {integrations.map(({ name, description, icon, darkIcon }) => {
    
        return (
          <Card key={name} className="items-start py-5">
            <CardContent className="flex flex-col gap-5 items-start">
             {darkIcon ? (
                <>
                  <img
                    src={icon}
                    alt={name}
                    className="block dark:hidden size-8 object-contain"
                  />
                  <img
                    src={darkIcon}
                    alt={name}
                    className="hidden dark:block size-8 object-contain"
                  />
                </>
              ) : (
                <img src={icon} alt={name} className="size-8 object-contain" />
              )}
              <div>
              <p className="text-sm font-semibold text-foreground">{name}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default IntegrationsShowcaseCard;
