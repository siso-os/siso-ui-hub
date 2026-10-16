import * as React from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { ScrollArea } from '../../../ui/scroll-area';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../ui/collapsible';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

interface Version {
  number: string;
  date: string;
  isLatest: boolean;
  description: string;
  changes: {
    category: 'added' | 'improved' | 'fixed' | 'removed';
    items: string[];
  }[];
}

export default function CompactChangelog() {
  const versions: Version[] = [
    {
      number: '2.0.0',
      date: 'April 15, 2023',
      isLatest: true,
      description:
        'Major redesign with dark mode support and significant performance improvements.',
      changes: [
        {
          category: 'added',
          items: [
            'Completely redesigned dashboard interface',
            'Dark mode support across all pages',
            'New analytics dashboard with advanced filters',
          ],
        },
        {
          category: 'improved',
          items: [
            'Performance improved by 40%',
            'Enhanced mobile responsiveness',
            'Better form validation',
          ],
        },
        {
          category: 'fixed',
          items: [
            'Multiple accessibility issues',
            'Display issues on Safari',
            'Authentication errors',
          ],
        },
        {
          category: 'removed',
          items: ['Legacy API endpoints', 'Deprecated dashboard features'],
        },
      ],
    },
    {
      number: '1.9.0',
      date: 'March 20, 2023',
      isLatest: false,
      description: 'New notification system and multiple UI improvements.',
      changes: [
        {
          category: 'added',
          items: ['Real-time notification system', 'Custom alert preferences'],
        },
        {
          category: 'improved',
          items: ['Form loading times', 'Animation smoothness'],
        },
        {
          category: 'fixed',
          items: ['Dropdown menu positioning on mobile devices'],
        },
        {
          category: 'removed',
          items: [],
        },
      ],
    },
    {
      number: '1.8.0',
      date: 'February 5, 2023',
      isLatest: false,
      description: 'Enhanced search functionality and bug fixes.',
      changes: [
        {
          category: 'added',
          items: ['Advanced search filters', 'Search history'],
        },
        {
          category: 'improved',
          items: ['Search results accuracy', 'Search performance'],
        },
        {
          category: 'fixed',
          items: ['Search result pagination issues'],
        },
        {
          category: 'removed',
          items: [],
        },
      ],
    },
    {
      number: '1.7.0',
      date: 'January 10, 2023',
      isLatest: false,
      description: 'Integration with third-party services and UI tweaks.',
      changes: [
        {
          category: 'added',
          items: [
            'Integration with popular calendar services',
            'Export to PDF feature',
          ],
        },
        {
          category: 'improved',
          items: ['Dashboard loading times'],
        },
        {
          category: 'fixed',
          items: ['Account settings synchronization'],
        },
        {
          category: 'removed',
          items: [],
        },
      ],
    },
    {
      number: '1.6.0',
      date: 'December 5, 2022',
      isLatest: false,
      description: 'Year-end updates with performance optimizations.',
      changes: [
        {
          category: 'added',
          items: ['Year-end reporting tools'],
        },
        {
          category: 'improved',
          items: ['Overall system performance', 'Database query optimization'],
        },
        {
          category: 'fixed',
          items: ['Data export issues', 'Several minor UI bugs'],
        },
        {
          category: 'removed',
          items: [],
        },
      ],
    },
  ];

  // Styling for categories
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'added':
        return 'text-green-600 dark:text-green-400';
      case 'improved':
        return 'text-blue-600 dark:text-blue-400';
      case 'fixed':
        return 'text-amber-600 dark:text-amber-400';
      case 'removed':
        return 'text-red-600 dark:text-red-400';
      default:
        return '';
    }
  };

  // Icons for categories
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'added':
        return (
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
            className="mr-1"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        );
      case 'improved':
        return (
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
            className="mr-1"
          >
            <path d="M12 20V10"></path>
            <path d="M18 20V4"></path>
            <path d="M6 20v-4"></path>
          </svg>
        );
      case 'fixed':
        return (
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
            className="mr-1"
          >
            <path d="m5 12 5 5 9-9"></path>
          </svg>
        );
      case 'removed':
        return (
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
            className="mr-1"
          >
            <path d="M5 12h14"></path>
          </svg>
        );
      default:
        return null;
    }
  };

  const [expandedVersions, setExpandedVersions] = React.useState<string[]>([
    versions[0]!.number,
  ]);

  const toggleVersion = (versionNumber: string) => {
    setExpandedVersions((prev) =>
      prev.includes(versionNumber)
        ? prev.filter((v) => v !== versionNumber)
        : [...prev, versionNumber]
    );
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Changelog</h2>
          <p className="text-muted-foreground mt-1">
            Recent updates and improvements
          </p>
        </div>
        <div className="mt-2 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setExpandedVersions(
                expandedVersions.length === versions.length
                  ? []
                  : versions.map((v) => v.number)
              )
            }
          >
            {expandedVersions.length === versions.length
              ? 'Collapse All'
              : 'Expand All'}
          </Button>
        </div>
      </div>

      <div className="rounded-lg border">
        <ScrollArea className="h-[500px] rounded-md">
          <div className="divide-y">
            {versions.map((version) => (
              <Collapsible
                key={version.number}
                open={expandedVersions.includes(version.number)}
                onOpenChange={() => toggleVersion(version.number)}
                className="w-full"
              >
                <div className="bg-muted/20">
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hover:bg-muted/40 w-full justify-start rounded-none px-4 py-3 text-left"
                    >
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center gap-2">
                          {expandedVersions.includes(version.number) ? (
                            <ChevronDownIcon className="h-4 w-4" />
                          ) : (
                            <ChevronRightIcon className="h-4 w-4" />
                          )}
                          <span className="font-bold">v{version.number}</span>
                          {version.isLatest && (
                            <Badge className="ml-2">Latest</Badge>
                          )}
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {version.date}
                        </span>
                      </div>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent>
                  <div className="bg-background p-4">
                    <p className="text-muted-foreground mb-4 text-sm">
                      {version.description}
                    </p>
                    <div className="space-y-4">
                      {version.changes.map(
                        (category) =>
                          category.items.length > 0 && (
                            <div key={category.category}>
                              <h4
                                className={`mb-2 flex items-center text-sm font-semibold capitalize ${getCategoryStyles(
                                  category.category
                                )}`}
                              >
                                {getCategoryIcon(category.category)}
                                {category.category}
                              </h4>
                              <ul className="ml-5 space-y-1 text-sm">
                                {category.items.map((item, i) => (
                                  <li key={i} className="list-disc">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
