import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function GlowBorderAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className="border-b-0 mb-4 rounded-md overflow-hidden shadow-sm data-[state=open]:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-shadow duration-300"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 data-[state=open]:bg-muted/30 transition-colors rounded-t-md">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent className="border-t px-4 pt-4">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border-b-0 mb-4 rounded-md overflow-hidden shadow-sm data-[state=open]:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-shadow duration-300"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 data-[state=open]:bg-muted/30 transition-colors rounded-t-md">
            Is it styled?
          </AccordionTrigger>
          <AccordionContent className="border-t px-4 pt-4">
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border-b-0 mb-4 rounded-md overflow-hidden shadow-sm data-[state=open]:shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-shadow duration-300"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 data-[state=open]:bg-muted/30 transition-colors rounded-t-md">
            Is it animated?
          </AccordionTrigger>
          <AccordionContent className="border-t px-4 pt-4">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
