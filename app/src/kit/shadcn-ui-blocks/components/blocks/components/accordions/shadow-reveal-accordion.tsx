import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function ShadowRevealAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className="border-0 mb-4 overflow-hidden rounded-md shadow-sm data-[state=open]:shadow-md transition-shadow duration-500"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 bg-background hover:bg-muted/20 data-[state=open]:bg-muted/30 transition-colors duration-300">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent className="px-4 bg-gradient-to-b from-muted/20 to-transparent">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border-0 mb-4 overflow-hidden rounded-md shadow-sm data-[state=open]:shadow-md transition-shadow duration-500"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 bg-background hover:bg-muted/20 data-[state=open]:bg-muted/30 transition-colors duration-300">
            Is it styled?
          </AccordionTrigger>
          <AccordionContent className="px-4 bg-gradient-to-b from-muted/20 to-transparent">
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border-0 mb-4 overflow-hidden rounded-md shadow-sm data-[state=open]:shadow-md transition-shadow duration-500"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 bg-background hover:bg-muted/20 data-[state=open]:bg-muted/30 transition-colors duration-300">
            Is it animated?
          </AccordionTrigger>
          <AccordionContent className="px-4 bg-gradient-to-b from-muted/20 to-transparent">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
