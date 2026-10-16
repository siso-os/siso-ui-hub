import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function FloatingLabelAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem
          value="item-1"
          className="border rounded-md overflow-hidden relative pt-6 data-[state=open]:border-foreground/30 transition-colors duration-300"
        >
          <div className="absolute top-2 left-4 text-xs text-muted-foreground">
            Accessibility
          </div>
          <AccordionTrigger className="hover:no-underline px-4 py-2 font-medium">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent className="px-4 border-t pt-4">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-2"
          className="border rounded-md overflow-hidden relative pt-6 data-[state=open]:border-foreground/30 transition-colors duration-300"
        >
          <div className="absolute top-2 left-4 text-xs text-muted-foreground">
            Styling
          </div>
          <AccordionTrigger className="hover:no-underline px-4 py-2 font-medium">
            Is it styled?
          </AccordionTrigger>
          <AccordionContent className="px-4 border-t pt-4">
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="item-3"
          className="border rounded-md overflow-hidden relative pt-6 data-[state=open]:border-foreground/30 transition-colors duration-300"
        >
          <div className="absolute top-2 left-4 text-xs text-muted-foreground">
            Animation
          </div>
          <AccordionTrigger className="hover:no-underline px-4 py-2 font-medium">
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
