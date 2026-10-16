import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function NestedBorderAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="item-1" className="border-0 relative">
          <div className="relative p-[1px] before:absolute before:inset-0 before:rounded-md before:border before:border-border after:absolute after:inset-[3px] after:rounded-[calc(0.5rem-2px)] after:border after:border-border/50 before:transition-colors after:transition-colors data-[state=open]:before:border-foreground/20 data-[state=open]:after:border-foreground/20">
            <div className="relative bg-background rounded-[calc(0.5rem-4px)] overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3 relative z-10">
                Is it accessible?
              </AccordionTrigger>
              <AccordionContent className="px-4 border-t pt-4">
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-0 relative">
          <div className="relative p-[1px] before:absolute before:inset-0 before:rounded-md before:border before:border-border after:absolute after:inset-[3px] after:rounded-[calc(0.5rem-2px)] after:border after:border-border/50 before:transition-colors after:transition-colors data-[state=open]:before:border-foreground/20 data-[state=open]:after:border-foreground/20">
            <div className="relative bg-background rounded-[calc(0.5rem-4px)] overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3 relative z-10">
                Is it styled?
              </AccordionTrigger>
              <AccordionContent className="px-4 border-t pt-4">
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-0 relative">
          <div className="relative p-[1px] before:absolute before:inset-0 before:rounded-md before:border before:border-border after:absolute after:inset-[3px] after:rounded-[calc(0.5rem-2px)] after:border after:border-border/50 before:transition-colors after:transition-colors data-[state=open]:before:border-foreground/20 data-[state=open]:after:border-foreground/20">
            <div className="relative bg-background rounded-[calc(0.5rem-4px)] overflow-hidden">
              <AccordionTrigger className="hover:no-underline px-4 py-3 relative z-10">
                Is it animated?
              </AccordionTrigger>
              <AccordionContent className="px-4 border-t pt-4">
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
