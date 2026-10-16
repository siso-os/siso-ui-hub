import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function DashLineAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className="border-b-0 relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-border after:[background-image:linear-gradient(to_right,transparent_50%,currentColor_50%)] after:[background-size:8px_1px] after:opacity-50 data-[state=open]:after:opacity-100 after:transition-opacity"
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
          className="border-b-0 relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-border after:[background-image:linear-gradient(to_right,transparent_50%,currentColor_50%)] after:[background-size:8px_1px] after:opacity-50 data-[state=open]:after:opacity-100 after:transition-opacity"
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
          className="border-b-0 relative after:absolute after:left-0 after:right-0 after:bottom-0 after:h-[1px] after:bg-border after:[background-image:linear-gradient(to_right,transparent_50%,currentColor_50%)] after:[background-size:8px_1px] after:opacity-50 data-[state=open]:after:opacity-100 after:transition-opacity"
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
