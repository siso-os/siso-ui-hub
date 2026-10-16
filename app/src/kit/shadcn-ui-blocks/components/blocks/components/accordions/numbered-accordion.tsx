import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function NumberedAccordion() {
  return (
    <div className="max-w-md mx-auto py-6">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1" className="border-b relative pl-8">
          <div className="absolute left-0 top-4 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium">
            1
          </div>
          <AccordionTrigger className="hover:no-underline data-[state=open]:font-medium transition-all">
            Is it accessible?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="border-b relative pl-8">
          <div className="absolute left-0 top-4 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium">
            2
          </div>
          <AccordionTrigger className="hover:no-underline data-[state=open]:font-medium transition-all">
            Is it styled?
          </AccordionTrigger>
          <AccordionContent>
            Yes. It comes with default styles that matches the other
            components&apos; aesthetic.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="border-b relative pl-8">
          <div className="absolute left-0 top-4 flex h-6 w-6 items-center justify-center rounded-full border text-xs font-medium">
            3
          </div>
          <AccordionTrigger className="hover:no-underline data-[state=open]:font-medium transition-all">
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
