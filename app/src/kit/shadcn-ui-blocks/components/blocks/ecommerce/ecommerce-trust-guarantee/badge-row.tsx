import { Shield, Lock, RotateCcw, Truck } from "lucide-react";

export default function TrustGuaranteeBadgeRow() {
  const badges = [
    {
      icon: Shield,
      label: "30-Day Guarantee",
      description: "Risk-free returns",
    },
    {
      icon: Lock,
      label: "Secure Checkout",
      description: "SSL encrypted",
    },
    {
      icon: RotateCcw,
      label: "Free Returns",
      description: "No questions asked",
    },
    {
      icon: Truck,
      label: "Fast Shipping",
      description: "2-3 business days",
    },
  ];

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {badges.map((badge, index) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={index}
                className="bg-muted/30 hover:bg-muted/50 flex flex-col items-center rounded-lg p-4 text-center transition-colors"
              >
                <div className="bg-primary/10 mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                  <IconComponent className="text-primary h-6 w-6" />
                </div>
                <h3 className="mb-1 text-sm font-semibold">{badge.label}</h3>
                <p className="text-muted-foreground text-xs">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
