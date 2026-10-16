import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function DoubleBorderAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className="border-b-0 mb-6 relative before:absolute before:inset-0 before:rounded-md before:border before:border-border after:absolute after:inset-[3px] after:rounded-[5px] after:border after:border-border data-[state=open]:before:border-foreground/20 data-[state=open]:after:border-foreground/20 before:transition-colors after:transition-colors before:duration-300 after:duration-300"
        >
          <div className="relative p-[6px]">
            <AccordionTrigger className="hover:no-underline px-4 py-3 relative z-10">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="px-4">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </div>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border-b-0 mb-6 relative before:absolute before:inset-0 before:rounded-md before:border before:border-border after:absolute after:inset-[3px] after:rounded-[5px] after:border after:border-border data-[state=open]:before:border-foreground/20 data-[state=open]:after:border-foreground/20 before:transition-colors after:transition-colors before:duration-300 after:duration-300"
        >
          <div className="relative p-[6px]">
            <AccordionTrigger className="hover:no-underline px-4 py-3 relative z-10">
              Is it styled?
            </AccordionTrigger>
            <AccordionContent className="px-4">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </div>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border-b-0 mb-6 relative before:absolute before:inset-0 before:rounded-md before:border before:border-border after:absolute after:inset-[3px] after:rounded-[5px] after:border after:border-border data-[state=open]:before:border-foreground/20 data-[state=open]:after:border-foreground/20 before:transition-colors after:transition-colors before:duration-300 after:duration-300"
        >
          <div className="relative p-[6px]">
            <AccordionTrigger className="hover:no-underline px-4 py-3 relative z-10">
              Is it animated?
            </AccordionTrigger>
            <AccordionContent className="px-4">
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
