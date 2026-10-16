import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function CardAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem
          value="item-1"
          className="border rounded-lg overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all duration-300 border-b-0"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 bg-muted/30 data-[state=open]:bg-muted/50 transition-colors">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent className="px-4 border-t pt-4">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border rounded-lg overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all duration-300 border-b-0"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 bg-muted/30 data-[state=open]:bg-muted/50 transition-colors">
            Is it styled?
          </AccordionTrigger>
          <AccordionContent className="px-4 border-t pt-4">
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border rounded-lg overflow-hidden shadow-sm data-[state=open]:shadow-md transition-all duration-300 border-b-0"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 bg-muted/30 data-[state=open]:bg-muted/50 transition-colors">
            Is it animated?
          </AccordionTrigger>
          <AccordionContent className="px-4 border-t pt-4">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
