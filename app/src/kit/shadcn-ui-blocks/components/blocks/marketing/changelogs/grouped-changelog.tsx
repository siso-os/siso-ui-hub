import * as React from 'react';
import { Badge } from '../../../ui/badge';
import { Card, CardContent } from '../../../ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';
import { cn } from '@/arc-shims/kit-utils';

interface ChangelogItem {
  version: string;
  date: string;
  isLatest: boolean;
  changes: {
    type: 'feature' | 'improvement' | 'bugfix' | 'breaking';
    description: string;
  }[];
}

interface TimeGroup {
  year: number;
  quarters: {
    quarter: number;
    releases: ChangelogItem[];
  }[];
}

export default function GroupedChangelog() {
  // Sample data
  const changelogData: ChangelogItem[] = [
    {
      version: '2.0.0',
      date: '2023-04-15',
      isLatest: true,
      changes: [
        {
          type: 'feature',
          description: 'Completely redesigned dashboard interface',
        },
        {
          type: 'feature',
          description: 'Added dark mode support across all pages',
        },
        { type: 'improvement', description: 'Improved performance by 40%' },
        { type: 'bugfix', description: 'Fixed multiple accessibility issues' },
        {
          type: 'breaking',
          description: 'API endpoints restructured for v2',
        },
      ],
    },
    {
      version: '1.9.0',
      date: '2023-02-10',
      isLatest: false,
      changes: [
        { type: 'feature', description: 'Added export to PDF functionality' },
        { type: 'improvement', description: 'Enhanced search performance' },
        { type: 'bugfix', description: 'Fixed login issues on Safari' },
      ],
    },
    {
      version: '1.8.5',
      date: '2022-12-07',
      isLatest: false,
      changes: [
        {
          type: 'improvement',
          description: 'Year-end performance optimizations',
        },
        { type: 'bugfix', description: 'Fixed data visualization issues' },
      ],
    },
    {
      version: '1.8.0',
      date: '2022-10-20',
      isLatest: false,
      changes: [
        { type: 'feature', description: 'New data visualization options' },
        { type: 'feature', description: 'Added team collaboration features' },
        { type: 'improvement', description: 'Updated documentation' },
      ],
    },
    {
      version: '1.7.0',
      date: '2022-08-05',
      isLatest: false,
      changes: [
        { type: 'feature', description: 'Added user roles and permissions' },
        { type: 'bugfix', description: 'Fixed several UI glitches' },
      ],
    },
    {
      version: '1.6.0',
      date: '2022-05-12',
      isLatest: false,
      changes: [
        { type: 'feature', description: 'Integrated third-party API services' },
        { type: 'improvement', description: 'Enhanced mobile experience' },
      ],
    },
    {
      version: '1.5.0',
      date: '2022-02-28',
      isLatest: false,
      changes: [
        { type: 'feature', description: 'Added custom report builder' },
        { type: 'improvement', description: 'Improved data loading times' },
      ],
    },
    {
      version: '1.4.0',
      date: '2021-11-18',
      isLatest: false,
      changes: [
        { type: 'feature', description: 'Added multi-language support' },
        { type: 'bugfix', description: 'Fixed account settings issues' },
      ],
    },
  ];

  // Group data by year and quarter
  const groupedData: TimeGroup[] = React.useMemo(() => {
    const groups: Record<number, TimeGroup> = {};

    changelogData.forEach((item) => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const quarter = Math.floor(date.getMonth() / 3) + 1;

      if (!groups[year]) {
        groups[year] = { year, quarters: [] };
      }

      let quarterGroup = groups[year].quarters.find(
        (q) => q.quarter === quarter
      );
      if (!quarterGroup) {
        quarterGroup = { quarter, releases: [] };
        groups[year].quarters.push(quarterGroup);
      }

      quarterGroup.releases.push(item);
    });

    // Sort quarters in descending order
    Object.values(groups).forEach((yearGroup) => {
      yearGroup.quarters.sort((a, b) => b.quarter - a.quarter);
      yearGroup.quarters.forEach((quarter) => {
        quarter.releases.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      });
    });

    // Sort years in descending order
    return Object.values(groups).sort((a, b) => b.year - a.year);
  }, [changelogData]);

  // Get quarterly name
  const getQuarterName = (quarter: number) => {
    return `Q${quarter}`;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Change type styling
  const getChangeTypeStyles = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-transparent';
      case 'improvement':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 border-transparent';
      case 'bugfix':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-transparent';
      case 'breaking':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-transparent';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 border-transparent';
    }
  };

  // Get change type label
  const getChangeTypeLabel = (type: string) => {
    switch (type) {
      case 'feature':
        return 'New';
      case 'improvement':
        return 'Improved';
      case 'bugfix':
        return 'Fixed';
      case 'breaking':
        return 'Breaking';
      default:
        return type;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Changelog</h2>
        <p className="text-muted-foreground mt-2">
          History of changes organized by year and quarter
        </p>
      </div>

      <div className="space-y-6">
        {groupedData.map((yearGroup) => (
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={yearGroup.year.toString()}
            key={yearGroup.year}
          >
            <AccordionItem
              value={yearGroup.year.toString()}
              className="border-b-0"
            >
              <AccordionTrigger className="bg-muted/50 hover:bg-muted rounded-lg px-4 py-3 hover:no-underline data-[state=open]:rounded-b-none">
                <span className="text-xl font-bold">{yearGroup.year}</span>
              </AccordionTrigger>
              <AccordionContent className="pt-0 pb-0">
                <div className="space-y-6 pb-6">
                  {yearGroup.quarters.map((quarter) => (
                    <div
                      key={`${yearGroup.year}-Q${quarter.quarter}`}
                      className="rounded-lg border border-dashed p-3 sm:p-4"
                    >
                      <h3 className="mb-4 flex flex-wrap items-center gap-2 text-lg font-semibold">
                        <span className="text-muted-foreground text-sm font-medium">
                          {yearGroup.year}
                        </span>
                        <Badge variant="outline" className="bg-muted/50">
                          {getQuarterName(quarter.quarter)}
                        </Badge>
                      </h3>
                      <div className="space-y-4">
                        {quarter.releases.map((release) => (
                          <Card
                            key={release.version}
                            className="overflow-hidden pt-0"
                          >
                            <CardContent className="p-0">
                              <div className="bg-muted/30 border-b p-3 sm:p-4">
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h4 className="text-lg font-bold">
                                      v{release.version}
                                    </h4>
                                    {release.isLatest && (
                                      <Badge className="bg-primary text-primary-foreground">
                                        Latest
                                      </Badge>
                                    )}
                                  </div>
                                  <time className="text-muted-foreground text-sm sm:ml-auto">
                                    {formatDate(release.date)}
                                  </time>
                                </div>
                              </div>
                              <ul className="divide-y">
                                {release.changes.map((change, i) => (
                                  <li
                                    key={`${release.version}-${i}`}
                                    className="flex flex-col gap-2 p-3 sm:flex-row sm:items-start sm:p-4"
                                  >
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        'min-w-[60px] justify-center self-start rounded px-1.5 text-xs capitalize',
                                        getChangeTypeStyles(change.type)
                                      )}
                                    >
                                      {getChangeTypeLabel(change.type)}
                                    </Badge>
                                    <span className="break-words sm:ml-2">
                                      {change.description}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
