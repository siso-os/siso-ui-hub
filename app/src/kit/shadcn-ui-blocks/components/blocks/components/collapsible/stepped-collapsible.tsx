import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function SteppedCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto max-w-md py-6">
      <Collapsible className="w-full" open={isOpen} onOpenChange={setIsOpen}>
        <div className="overflow-hidden rounded-md border">
          <CollapsibleTrigger className="bg-muted/10 hover:bg-muted/20 flex w-full items-center justify-between px-4 py-3 transition-colors">
            <span className="font-medium">Installation Instructions</span>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 shrink-0 transition-transform duration-200" />
            ) : (
              <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
            )}
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="pt-3 pr-0 pl-6">
            <div className="border-border text-muted-foreground border-l-2 py-2 pl-4 text-sm">
              <ol className="list-decimal space-y-2 pl-4">
                <li>
                  Unpack all components from the box and verify all parts are
                  included.
                </li>
                <li>
                  Attach the base to the main unit using the provided screws.
                </li>
                <li>Connect the power cable to the back of the unit.</li>
                <li>
                  Plug the power cable into a wall outlet and press the power
                  button.
                </li>
                <li>Follow the on-screen instructions to complete setup.</li>
              </ol>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
