import { Badge } from "../../../ui/badge";

export default function TimelineChangelog() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Changelog</h2>
        <p className="text-muted-foreground mt-2">
          All notable changes to our product will be documented here.
        </p>
      </div>

      <div className="lg:before:bg-border relative space-y-8 lg:ml-5 lg:before:absolute lg:before:inset-0 lg:before:left-[57.5px] lg:before:ml-0 lg:before:h-full lg:before:w-0.5">
        {/* Version 2.0.0 */}
        <div className="relative flex flex-col gap-4 lg:flex-row">
          <div className="hidden items-center justify-center lg:flex lg:w-1/6">
            <div className="bg-primary text-primary-foreground z-10 flex h-10 w-10 items-center justify-center rounded-full shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-rocket"
              >
                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
              </svg>
            </div>
          </div>
          <div className="bg-card w-full rounded-lg border p-6 shadow-sm lg:w-5/6">
            <div className="mb-2 flex items-center gap-2">
              <h3 className="text-xl font-bold">Version 2.0.0</h3>
              <Badge className="px-2">Latest</Badge>
            </div>
            <time className="text-muted-foreground text-sm">
              April 15, 2023
            </time>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li>Completely redesigned dashboard interface</li>
              <li>Added dark mode support across all pages</li>
              <li>Improved performance by 40%</li>
              <li>Fixed multiple accessibility issues</li>
            </ul>
          </div>
        </div>

        {/* Version 1.2.0 */}
        <div className="relative flex flex-col gap-4 lg:flex-row">
          <div className="hidden items-center justify-center lg:flex lg:w-1/6">
            <div className="bg-secondary text-secondary-foreground z-10 flex h-10 w-10 items-center justify-center rounded-full shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-zap"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
          </div>
          <div className="bg-card w-full rounded-lg border p-6 shadow-sm lg:w-5/6">
            <h3 className="mb-2 text-xl font-bold">Version 1.2.0</h3>
            <time className="text-muted-foreground text-sm">March 2, 2023</time>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li>Added new analytics dashboard</li>
              <li>Improved mobile responsiveness</li>
              <li>Fixed bug with user authentication</li>
            </ul>
          </div>
        </div>

        {/* Version 1.1.0 */}
        <div className="relative flex flex-col gap-4 lg:flex-row">
          <div className="hidden items-center justify-center lg:flex lg:w-1/6">
            <div className="bg-muted text-muted-foreground z-10 flex h-10 w-10 items-center justify-center rounded-full shadow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-git-merge"
              >
                <circle cx="18" cy="18" r="3"></circle>
                <circle cx="6" cy="6" r="3"></circle>
                <path d="M6 9v12"></path>
                <path d="m18 15-6-6"></path>
              </svg>
            </div>
          </div>
          <div className="bg-card w-full rounded-lg border p-6 shadow-sm lg:w-5/6">
            <h3 className="mb-2 text-xl font-bold">Version 1.1.0</h3>
            <time className="text-muted-foreground text-sm">
              January 15, 2023
            </time>
            <ul className="mt-4 list-disc space-y-1.5 pl-5">
              <li>Added support for custom themes</li>
              <li>Improved form validation</li>
              <li>Updated documentation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
