import { Badge } from "../../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";

export default function TabbedChangelog() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Changelog</h2>
        <p className="text-muted-foreground mt-2">
          Track all updates and improvements to our platform
        </p>
      </div>

      <Tabs defaultValue="v2" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-3">
          <TabsTrigger value="v2" className="relative">
            v2.0.0
            <Badge className="absolute -top-2 -right-2 ml-2 px-1.5 py-0.5 text-[10px]">
              New
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="v1.2">v1.2.0</TabsTrigger>
          <TabsTrigger value="v1.1">v1.1.0</TabsTrigger>
        </TabsList>

        <TabsContent value="v2" className="rounded-lg border p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Version 2.0.0</h3>
            <time className="text-muted-foreground text-sm">
              April 15, 2023
            </time>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="flex items-center font-semibold">
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
                    className="mr-2 text-green-500"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  New Features
                </h4>
                <ul className="list-disc space-y-1.5 pl-5 text-sm">
                  <li>Completely redesigned dashboard interface</li>
                  <li>Added dark mode support across all pages</li>
                  <li>New analytics dashboard with advanced filters</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="flex items-center font-semibold">
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
                    className="mr-2 text-blue-500"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  Improvements
                </h4>
                <ul className="list-disc space-y-1.5 pl-5 text-sm">
                  <li>Improved performance by 40%</li>
                  <li>Enhanced mobile responsiveness</li>
                  <li>Better form validation</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="flex items-center font-semibold">
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
                    className="mr-2 text-red-500"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  Bug Fixes
                </h4>
                <ul className="list-disc space-y-1.5 pl-5 text-sm">
                  <li>Fixed multiple accessibility issues</li>
                  <li>Corrected display issues on Safari</li>
                  <li>Fixed authentication errors</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="flex items-center font-semibold">
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
                    className="mr-2 text-yellow-500"
                  >
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  Breaking Changes
                </h4>
                <ul className="list-disc space-y-1.5 pl-5 text-sm">
                  <li>API endpoints restructured for v2</li>
                  <li>Removed deprecated features</li>
                  <li>Changed authentication flow</li>
                </ul>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="v1.2" className="rounded-lg border p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Version 1.2.0</h3>
            <time className="text-muted-foreground text-sm">March 2, 2023</time>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="flex items-center font-semibold">
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
                  className="mr-2 text-green-500"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                New Features
              </h4>
              <ul className="list-disc space-y-1.5 pl-5 text-sm">
                <li>Added new analytics dashboard</li>
                <li>Introduced user profiles</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center font-semibold">
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
                  className="mr-2 text-blue-500"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                Improvements
              </h4>
              <ul className="list-disc space-y-1.5 pl-5 text-sm">
                <li>Improved mobile responsiveness</li>
                <li>Enhanced search functionality</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center font-semibold">
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
                  className="mr-2 text-red-500"
                >
                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                  <path d="M12 9v4"></path>
                  <path d="M12 17h.01"></path>
                </svg>
                Bug Fixes
              </h4>
              <ul className="list-disc space-y-1.5 pl-5 text-sm">
                <li>Fixed bug with user authentication</li>
                <li>Resolved display issues on small screens</li>
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="v1.1" className="rounded-lg border p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xl font-bold">Version 1.1.0</h3>
            <time className="text-muted-foreground text-sm">
              January 15, 2023
            </time>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="flex items-center font-semibold">
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
                  className="mr-2 text-green-500"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                New Features
              </h4>
              <ul className="list-disc space-y-1.5 pl-5 text-sm">
                <li>Added support for custom themes</li>
                <li>Introduced export functionality</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="flex items-center font-semibold">
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
                  className="mr-2 text-blue-500"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="M12 16v-4"></path>
                  <path d="M12 8h.01"></path>
                </svg>
                Improvements
              </h4>
              <ul className="list-disc space-y-1.5 pl-5 text-sm">
                <li>Improved form validation</li>
                <li>Updated documentation</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
