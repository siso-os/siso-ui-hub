import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../ui/collapsible';
import { ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

export default function IconCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto max-w-md py-6">
      <Collapsible
        className="w-full overflow-hidden rounded-md border"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="bg-muted/5 border-b">
          <CollapsibleTrigger className="hover:bg-muted/10 flex w-full items-center justify-between px-4 py-3 transition-colors">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
                <ShoppingCart className="text-primary h-4 w-4" />
              </div>
              <span className="font-medium">Order Details</span>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="text-muted-foreground px-4 py-3 text-sm">
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Product</span>
                <span className="font-medium">Premium Widget</span>
              </li>
              <li className="flex justify-between">
                <span>Quantity</span>
                <span className="font-medium">2</span>
              </li>
              <li className="flex justify-between">
                <span>Price</span>
                <span className="font-medium">$99.99</span>
              </li>
              <li className="mt-2 flex justify-between border-t pt-2">
                <span>Total</span>
                <span className="font-medium">$199.98</span>
              </li>
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
