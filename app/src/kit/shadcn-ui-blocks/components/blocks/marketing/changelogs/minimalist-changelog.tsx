import * as React from "react";
import { Badge } from "../../../ui/badge";
import { Separator } from "../../../ui/separator";
import { cn } from "@/arc-shims/kit-utils";

interface Release {
  version: string;
  date: string;
  isLatest: boolean;
  changes: string[];
}

export default function MinimalistChangelog() {
  const releases: Release[] = [
    {
      version: "2.0.0",
      date: "April 15, 2023",
      isLatest: true,
      changes: [
        "Completely redesigned dashboard interface",
        "Added dark mode support across all pages",
        "Improved performance by 40%",
        "Fixed multiple accessibility issues",
        "API endpoints restructured for v2",
      ],
    },
    {
      version: "1.9.0",
      date: "March 2, 2023",
      isLatest: false,
      changes: [
        "Added new analytics dashboard",
        "Enhanced mobile responsiveness",
        "Fixed bug with user authentication",
      ],
    },
    {
      version: "1.8.0",
      date: "February 10, 2023",
      isLatest: false,
      changes: [
        "Added team collaboration features",
        "Improved form validation",
        "Updated documentation",
      ],
    },
    {
      version: "1.7.0",
      date: "January 15, 2023",
      isLatest: false,
      changes: [
        "Added support for custom themes",
        "Enhanced search functionality",
        "Fixed account settings issues",
      ],
    },
  ];

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Changelog</h2>
        <p className="text-muted-foreground mt-2">
          A record of all notable changes
        </p>
      </div>

      <div className="space-y-10">
        {releases.map((release, releaseIndex) => (
          <div
            key={release.version}
            className={cn(
              "animate-fadeIn",
              releaseIndex === 0
                ? "opacity-100"
                : `opacity-[0.${9 - releaseIndex}]`,
            )}
            style={{
              animationDelay: `${releaseIndex * 100}ms`,
              animationFillMode: "both",
            }}
          >
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-semibold tracking-tight">
                  v{release.version}
                </h3>
                {release.isLatest && (
                  <Badge className="font-medium">Latest</Badge>
                )}
              </div>
              <time className="text-muted-foreground text-sm font-medium">
                {formatDate(release.date)}
              </time>
            </div>

            <ul className="space-y-3">
              {release.changes.map((change, changeIndex) => (
                <li
                  key={changeIndex}
                  className={cn(
                    "animate-slideIn relative pl-5",
                    "before:absolute before:top-[0.6em] before:left-0 before:h-1.5 before:w-1.5 before:rounded-full",
                    changeIndex === 0
                      ? "before:bg-primary"
                      : "before:bg-muted-foreground/50",
                  )}
                  style={{
                    animationDelay: `${200 + changeIndex * 50 + releaseIndex * 100}ms`,
                    animationFillMode: "both",
                  }}
                >
                  {change}
                </li>
              ))}
            </ul>

            {releaseIndex < releases.length - 1 && (
              <Separator className="mt-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
