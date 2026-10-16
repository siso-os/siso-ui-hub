import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function HighlightActiveAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className="border-b overflow-hidden transition-colors duration-300 data-[state=open]:bg-muted/30 rounded-md mb-2"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 data-[state=open]:font-medium transition-all">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-foreground after:scale-x-0 data-[state=open]:after:scale-x-100 after:transition-transform after:duration-300">
              Is it accessible?
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border-b overflow-hidden transition-colors duration-300 data-[state=open]:bg-muted/30 rounded-md mb-2"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 data-[state=open]:font-medium transition-all">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-foreground after:scale-x-0 data-[state=open]:after:scale-x-100 after:transition-transform after:duration-300">
              Is it styled?
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border-b overflow-hidden transition-colors duration-300 data-[state=open]:bg-muted/30 rounded-md mb-2"
        >
          <AccordionTrigger className="hover:no-underline px-4 py-3 data-[state=open]:font-medium transition-all">
            <span className="relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-foreground after:scale-x-0 data-[state=open]:after:scale-x-100 after:transition-transform after:duration-300">
              Is it animated?
            </span>
          </AccordionTrigger>
          <AccordionContent className="px-4">
            Yes. It&apos;s animated by default, but you can disable it if you
            prefer.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
