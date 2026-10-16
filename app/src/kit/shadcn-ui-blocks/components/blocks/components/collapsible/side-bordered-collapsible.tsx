import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/arc-shims/kit-utils';
import { useState } from 'react';

export default function SideBorderedCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto max-w-md py-6">
      <Collapsible
        className={cn(
          'w-full transition-all duration-300',
          isOpen ? 'border-l-border border-l-4 pl-4' : 'border-l-0 pl-0'
        )}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="border-b pb-1">
          <CollapsibleTrigger className="hover:text-foreground/80 flex w-full items-center justify-between py-3 transition-colors">
            <span className="font-medium">Return Policy</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="text-muted-foreground py-3 text-sm">
            <p>
              We accept returns within 30 days of purchase. Items must be in
              original condition with tags attached.
            </p>
            <p className="mt-2">
              Refunds will be processed within 5-7 business days after we
              receive your return.
            </p>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
