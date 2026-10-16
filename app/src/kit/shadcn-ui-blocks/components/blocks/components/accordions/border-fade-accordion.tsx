import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function BorderFadeAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem
          value="item-1"
          className="border-0 mb-4 relative before:absolute before:inset-0 before:rounded-md before:border before:border-border/0 data-[state=open]:before:border-border/100 before:transition-colors before:duration-500"
        >
          <div className="relative p-0.5">
            <AccordionTrigger className="hover:no-underline px-4 py-3">
              <span className="relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-foreground/10 after:to-transparent after:opacity-0 data-[state=open]:after:opacity-100 after:transition-opacity after:duration-500">
                Is it accessible?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </div>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border-0 mb-4 relative before:absolute before:inset-0 before:rounded-md before:border before:border-border/0 data-[state=open]:before:border-border/100 before:transition-colors before:duration-500"
        >
          <div className="relative p-0.5">
            <AccordionTrigger className="hover:no-underline px-4 py-3">
              <span className="relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-foreground/10 after:to-transparent after:opacity-0 data-[state=open]:after:opacity-100 after:transition-opacity after:duration-500">
                Is it styled?
              </span>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </div>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border-0 mb-4 relative before:absolute before:inset-0 before:rounded-md before:border before:border-border/0 data-[state=open]:before:border-border/100 before:transition-colors before:duration-500"
        >
          <div className="relative p-0.5">
            <AccordionTrigger className="hover:no-underline px-4 py-3">
              <span className="relative after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-foreground/10 after:to-transparent after:opacity-0 data-[state=open]:after:opacity-100 after:transition-opacity after:duration-500">
                Is it animated?
              </span>
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
