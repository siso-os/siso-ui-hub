import { Badge } from "../../../ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

export default function ExpandableChangelog() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Changelog
        </h2>
        <p className="text-muted-foreground mt-2">
          Expand each version to see the changes
        </p>
      </div>

      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="v2.0.0"
      >
        <AccordionItem
          value="v2.0.0"
          className="mb-3 overflow-hidden rounded-lg border sm:mb-4"
        >
          <AccordionTrigger className="hover:bg-muted/40 [&[data-state=open]]:bg-muted/40 px-3 py-3 sm:px-6 sm:py-4">
            <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-base font-medium sm:text-lg">
                Version 2.0.0
              </span>
              <Badge className="text-xs">Latest</Badge>
              <span className="text-muted-foreground text-xs">
                April 15, 2023
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-2 pb-4 sm:px-6">
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2">
              <div>
                <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase sm:mb-3 sm:text-sm">
                  Features & Improvements
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 flex-shrink-0 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>
                      <p className="text-sm font-medium sm:text-base">
                        Redesigned dashboard
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        More intuitive UI with improved accessibility
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 flex-shrink-0 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>
                      <p className="text-sm font-medium sm:text-base">
                        Dark mode support
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Full dark mode across all pages and components
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 flex-shrink-0 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>
                      <p className="text-sm font-medium sm:text-base">
                        Performance improvements
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        40% faster load times and reduced bundle size
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase sm:mb-3 sm:text-sm">
                  Bug Fixes & Changes
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 flex-shrink-0 text-red-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>
                      <p className="text-sm font-medium sm:text-base">
                        Fixed accessibility issues
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Improved keyboard navigation and screen reader support
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-1 flex-shrink-0 text-yellow-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <div>
                      <p className="text-sm font-medium sm:text-base">
                        API changes
                      </p>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        Restructured endpoints with backward compatibility
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="v1.2.0"
          className="mb-3 overflow-hidden rounded-lg border sm:mb-4"
        >
          <AccordionTrigger className="hover:bg-muted/40 [&[data-state=open]]:bg-muted/40 px-3 py-3 sm:px-6 sm:py-4">
            <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-base font-medium sm:text-lg">
                Version 1.2.0
              </span>
              <span className="text-muted-foreground text-xs">
                March 2, 2023
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-2 pb-4 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase sm:mb-3 sm:text-sm">
                  Features & Improvements
                </h4>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 flex-shrink-0 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <p className="text-sm sm:text-base">
                      Added new analytics dashboard with advanced filters
                    </p>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 flex-shrink-0 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <p className="text-sm sm:text-base">
                      Improved mobile responsiveness across all views
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase sm:mb-3 sm:text-sm">
                  Bug Fixes
                </h4>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 flex-shrink-0 text-red-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <p className="text-sm sm:text-base">
                      Fixed bug with user authentication
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="v1.1.0"
          className="mb-3 overflow-hidden rounded-lg border sm:mb-4"
        >
          <AccordionTrigger className="hover:bg-muted/40 [&[data-state=open]]:bg-muted/40 px-3 py-3 sm:px-6 sm:py-4">
            <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-base font-medium sm:text-lg">
                Version 1.1.0
              </span>
              <span className="text-muted-foreground text-xs">
                January 15, 2023
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-2 pb-4 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h4 className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase sm:mb-3 sm:text-sm">
                  What&apos;s New
                </h4>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 flex-shrink-0 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <p className="text-sm sm:text-base">
                      Added support for custom themes
                    </p>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 flex-shrink-0 text-green-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <p className="text-sm sm:text-base">
                      Improved form validation with helpful error messages
                    </p>
                  </li>
                  <li className="flex gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 flex-shrink-0 text-blue-500"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <p className="text-sm sm:text-base">
                      Updated documentation with more examples
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="v1.0.0"
          className="overflow-hidden rounded-lg !border"
        >
          <AccordionTrigger className="hover:bg-muted/40 [&[data-state=open]]:bg-muted/40 px-3 py-3 sm:px-6 sm:py-4">
            <div className="flex w-full flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-base font-medium sm:text-lg">
                Version 1.0.0
              </span>
              <span className="text-muted-foreground text-xs">
                December 1, 2022
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-3 pt-2 pb-4 sm:px-6">
            <p className="text-muted-foreground text-sm sm:text-base">
              Initial release of the product.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
