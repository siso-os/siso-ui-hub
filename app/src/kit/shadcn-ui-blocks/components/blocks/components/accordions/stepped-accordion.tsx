import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function SteppedAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-0 mb-4 overflow-hidden">
          <div className="border rounded-md">
            <AccordionTrigger className="hover:no-underline px-4 py-3 bg-muted/10 data-[state=open]:bg-muted/20 transition-colors">
              Is it accessible?
            </AccordionTrigger>
          </div>
          <AccordionContent className="pl-6 pr-0 pt-3">
            <div className="border-l-2 border-border pl-4 py-2">
              Yes. It adheres to the WAI-ARIA design pattern.
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-0 mb-4 overflow-hidden">
          <div className="border rounded-md">
            <AccordionTrigger className="hover:no-underline px-4 py-3 bg-muted/10 data-[state=open]:bg-muted/20 transition-colors">
              Is it styled?
            </AccordionTrigger>
          </div>
          <AccordionContent className="pl-6 pr-0 pt-3">
            <div className="border-l-2 border-border pl-4 py-2">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-0 mb-4 overflow-hidden">
          <div className="border rounded-md">
            <AccordionTrigger className="hover:no-underline px-4 py-3 bg-muted/10 data-[state=open]:bg-muted/20 transition-colors">
              Is it animated?
            </AccordionTrigger>
          </div>
          <AccordionContent className="pl-6 pr-0 pt-3">
            <div className="border-l-2 border-border pl-4 py-2">
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
