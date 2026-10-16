import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function CardCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto max-w-md py-6">
      <Collapsible
        className="w-full space-y-4"
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="overflow-hidden rounded-lg border shadow-sm transition-all duration-300">
          <CollapsibleTrigger className="bg-muted/30 hover:bg-muted/40 flex w-full items-center justify-between px-4 py-3 transition-colors">
            <span className="font-medium">Product Information</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent className="border-t px-4 py-3">
            <p className="text-muted-foreground text-sm">
              Our product is designed with the highest quality materials and
              built to last. We offer a 30-day money-back guarantee on all
              purchases.
            </p>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </div>
  );
}
