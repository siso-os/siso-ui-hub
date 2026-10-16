import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/arc-shims/kit-utils';
import { useState } from 'react';

export default function ShadowedCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto max-w-md py-6">
      <Collapsible
        className={cn(
          'w-full overflow-hidden rounded-md transition-shadow duration-300',
          isOpen ? 'shadow-md' : 'shadow-sm'
        )}
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <div className="bg-muted/10">
          <CollapsibleTrigger className="hover:bg-muted/20 flex w-full items-center justify-between px-4 py-3 transition-colors">
            <span className="font-medium">Product Specifications</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="from-muted/10 bg-gradient-to-b to-transparent px-4 py-3 text-sm">
            <ul className="space-y-2">
              <li>
                <span className="font-medium">Dimensions:</span> 10&quot; x
                8&quot; x 2&quot;
              </li>
              <li>
                <span className="font-medium">Weight:</span> 1.5 lbs
              </li>
              <li>
                <span className="font-medium">Material:</span> Aluminum and
                high-grade plastic
              </li>
              <li>
                <span className="font-medium">Battery Life:</span> Up to 12
                hours
              </li>
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
