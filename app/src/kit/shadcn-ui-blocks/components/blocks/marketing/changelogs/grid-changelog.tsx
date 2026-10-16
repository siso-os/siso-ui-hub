import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../ui/tabs";

export default function GridChangelog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Changelog</h2>
        <p className="text-muted-foreground mt-2">
          All notable changes and updates to our platform
        </p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8 flex h-fit flex-wrap justify-center gap-2">
          <TabsTrigger value="all">All Updates</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="improvements">Improvements</TabsTrigger>
          <TabsTrigger value="fixes">Bug Fixes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Version 2.0.0 */}
            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-muted/40 py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Version 2.0.0</CardTitle>
                  <Badge>Latest</Badge>
                </div>
                <time className="text-muted-foreground text-sm">
                  April 15, 2023
                </time>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-primary mb-2 flex items-center text-sm font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      New Features
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      <li>Completely redesigned dashboard interface</li>
                      <li>Added dark mode support across all pages</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 flex items-center text-sm font-semibold text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      Improvements
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      <li>Improved performance by 40%</li>
                      <li>Enhanced mobile responsiveness</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 flex items-center text-sm font-semibold text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      Bug Fixes
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      <li>Fixed multiple accessibility issues</li>
                      <li>Corrected display issues on Safari</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Version 1.2.0 */}
            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-muted/40 py-3">
                <CardTitle className="text-lg">Version 1.2.0</CardTitle>
                <time className="text-muted-foreground text-sm">
                  March 2, 2023
                </time>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-primary mb-2 flex items-center text-sm font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      New Features
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      <li>Added new analytics dashboard</li>
                      <li>Introduced user profiles</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 flex items-center text-sm font-semibold text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      Improvements
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      <li>Improved mobile responsiveness</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 flex items-center text-sm font-semibold text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                        <path d="M12 9v4"></path>
                        <path d="M12 17h.01"></path>
                      </svg>
                      Bug Fixes
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      <li>Fixed bug with user authentication</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Version 1.1.0 */}
            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-muted/40 py-3">
                <CardTitle className="text-lg">Version 1.1.0</CardTitle>
                <time className="text-muted-foreground text-sm">
                  January 15, 2023
                </time>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-primary mb-2 flex items-center text-sm font-semibold">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="m9 12 2 2 4-4"></path>
                      </svg>
                      New Features
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      <li>Added support for custom themes</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 flex items-center text-sm font-semibold text-blue-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                        <path d="M12 16v-4"></path>
                        <path d="M12 8h.01"></path>
                      </svg>
                      Improvements
                    </h4>
                    <ul className="list-disc space-y-1 pl-5 text-sm">
                      <li>Improved form validation</li>
                      <li>Updated documentation</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-muted/40 py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Version 2.0.0</CardTitle>
                  <Badge>Latest</Badge>
                </div>
                <time className="text-muted-foreground text-sm">
                  April 15, 2023
                </time>
              </CardHeader>
              <CardContent className="pt-4">
                <h4 className="text-primary mb-2 flex items-center text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  New Features
                </h4>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>Completely redesigned dashboard interface</li>
                  <li>Added dark mode support across all pages</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-muted/40 py-3">
                <CardTitle className="text-lg">Version 1.2.0</CardTitle>
                <time className="text-muted-foreground text-sm">
                  March 2, 2023
                </time>
              </CardHeader>
              <CardContent className="pt-4">
                <h4 className="text-primary mb-2 flex items-center text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  New Features
                </h4>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>Added new analytics dashboard</li>
                  <li>Introduced user profiles</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-muted/40 py-3">
                <CardTitle className="text-lg">Version 1.1.0</CardTitle>
                <time className="text-muted-foreground text-sm">
                  January 15, 2023
                </time>
              </CardHeader>
              <CardContent className="pt-4">
                <h4 className="text-primary mb-2 flex items-center text-sm font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                  New Features
                </h4>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>Added support for custom themes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="improvements" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-muted/40 py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Version 2.0.0</CardTitle>
                  <Badge>Latest</Badge>
                </div>
                <time className="text-muted-foreground text-sm">
                  April 15, 2023
                </time>
              </CardHeader>
              <CardContent className="pt-4">
                <h4 className="mb-2 flex items-center text-sm font-semibold text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  Improvements
                </h4>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>Improved performance by 40%</li>
                  <li>Enhanced mobile responsiveness</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-muted/40 py-3">
                <CardTitle className="text-lg">Version 1.1.0</CardTitle>
                <time className="text-muted-foreground text-sm">
                  January 15, 2023
                </time>
              </CardHeader>
              <CardContent className="pt-4">
                <h4 className="mb-2 flex items-center text-sm font-semibold text-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                    <path d="M12 16v-4"></path>
                    <path d="M12 8h.01"></path>
                  </svg>
                  Improvements
                </h4>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>Improved form validation</li>
                  <li>Updated documentation</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fixes" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-muted/40 py-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Version 2.0.0</CardTitle>
                  <Badge>Latest</Badge>
                </div>
                <time className="text-muted-foreground text-sm">
                  April 15, 2023
                </time>
              </CardHeader>
              <CardContent className="pt-4">
                <h4 className="mb-2 flex items-center text-sm font-semibold text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  Bug Fixes
                </h4>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>Fixed multiple accessibility issues</li>
                  <li>Corrected display issues on Safari</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="overflow-hidden pt-0">
              <CardHeader className="bg-muted/40 py-3">
                <CardTitle className="text-lg">Version 1.2.0</CardTitle>
                <time className="text-muted-foreground text-sm">
                  March 2, 2023
                </time>
              </CardHeader>
              <CardContent className="pt-4">
                <h4 className="mb-2 flex items-center text-sm font-semibold text-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                    <path d="M12 9v4"></path>
                    <path d="M12 17h.01"></path>
                  </svg>
                  Bug Fixes
                </h4>
                <ul className="list-disc space-y-1 pl-5 text-sm">
                  <li>Fixed bug with user authentication</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
