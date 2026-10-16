import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function FadeInContentAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b">
          <AccordionTrigger className="hover:no-underline">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden">
            <div className="animate-in fade-in-0 duration-500 slide-in-from-bottom-2">
              Yes. It adheres to the WAI-ARIA design pattern.
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b">
          <AccordionTrigger className="hover:no-underline">
            Is it styled?
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden">
            <div className="animate-in fade-in-0 duration-500 slide-in-from-bottom-2">
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-b">
          <AccordionTrigger className="hover:no-underline">
            Is it animated?
          </AccordionTrigger>
          <AccordionContent className="overflow-hidden">
            <div className="animate-in fade-in-0 duration-500 slide-in-from-bottom-2">
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
