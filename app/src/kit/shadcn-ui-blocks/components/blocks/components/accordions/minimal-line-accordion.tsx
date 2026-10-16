import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function MinimalLineAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className="border-0 border-l-2 border-border/30 data-[state=open]:border-border pl-4 mb-4 transition-colors duration-300"
        >
          <AccordionTrigger className="hover:no-underline">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border-0 border-l-2 border-border/30 data-[state=open]:border-border pl-4 mb-4 transition-colors duration-300"
        >
          <AccordionTrigger className="hover:no-underline">
            Is it styled?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border-0 border-l-2 border-border/30 data-[state=open]:border-border pl-4 mb-4 transition-colors duration-300"
        >
          <AccordionTrigger className="hover:no-underline">
            Is it animated?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
