import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function GroupedCollapsible() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    shipping: false,
    payment: false,
    returns: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="mx-auto max-w-md py-6">
      <div className="divide-y overflow-hidden rounded-md border">
        {/* Shipping Section */}
        <Collapsible
          className="w-full"
          open={openSections.shipping}
          onOpenChange={() => toggleSection('shipping')}
        >
          <CollapsibleTrigger className="hover:bg-muted/10 flex w-full items-center justify-between px-4 py-3 transition-colors">
            <span className="font-medium">Shipping Information</span>
            {openSections.shipping ? (
              <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="text-muted-foreground border-t px-4 py-3 text-sm">
              <p>
                We offer free shipping on all orders over $50. Standard shipping
                takes 3-5 business days.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Payment Section */}
        <Collapsible
          className="w-full"
          open={openSections.payment}
          onOpenChange={() => toggleSection('payment')}
        >
          <CollapsibleTrigger className="hover:bg-muted/10 flex w-full items-center justify-between px-4 py-3 transition-colors">
            <span className="font-medium">Payment Options</span>
            {openSections.payment ? (
              <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="text-muted-foreground border-t px-4 py-3 text-sm">
              <p>
                We accept all major credit cards, PayPal, and Apple Pay. All
                transactions are secure and encrypted.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Returns Section */}
        <Collapsible
          className="w-full"
          open={openSections.returns}
          onOpenChange={() => toggleSection('returns')}
        >
          <CollapsibleTrigger className="hover:bg-muted/10 flex w-full items-center justify-between px-4 py-3 transition-colors">
            <span className="font-medium">Return Policy</span>
            {openSections.returns ? (
              <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="text-muted-foreground border-t px-4 py-3 text-sm">
              <p>
                Returns are accepted within 30 days of purchase. Items must be
                in original condition with tags attached.
              </p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}
