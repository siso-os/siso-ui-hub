import * as React from 'react';
import { Badge } from '../../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Input } from '../../../ui/input';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';

// Define interfaces for our data structures
interface ChangelogCategory {
  features: string[];
  improvements: string[];
  fixes: string[];
  breaking: string[];
}

interface Version {
  version: string;
  date: string;
  isLatest: boolean;
  categories: ChangelogCategory;
}

interface Change {
  version: string;
  date: string;
  isLatest: boolean;
  category: keyof ChangelogCategory;
  text: string;
}

interface GroupedVersion {
  version: string;
  date: string;
  isLatest: boolean;
  categories: ChangelogCategory;
}

export default function InteractiveChangelog() {
  const [searchQuery, setSearchQuery] = useState('');

  const versions: Version[] = [
    {
      version: '2.0.0',
      date: 'April 15, 2023',
      isLatest: true,
      categories: {
        features: [
          'Completely redesigned dashboard interface',
          'Added dark mode support across all pages',
          'New analytics dashboard with advanced filters',
        ],
        improvements: [
          'Improved performance by 40%',
          'Enhanced mobile responsiveness',
          'Better form validation',
        ],
        fixes: [
          'Fixed multiple accessibility issues',
          'Corrected display issues on Safari',
          'Fixed authentication errors',
        ],
        breaking: [
          'API endpoints restructured for v2',
          'Removed deprecated features',
          'Changed authentication flow',
        ],
      },
    },
    {
      version: '1.2.0',
      date: 'March 2, 2023',
      isLatest: false,
      categories: {
        features: ['Added new analytics dashboard', 'Introduced user profiles'],
        improvements: [
          'Improved mobile responsiveness',
          'Enhanced search functionality',
        ],
        fixes: [
          'Fixed bug with user authentication',
          'Resolved display issues on small screens',
        ],
        breaking: [],
      },
    },
    {
      version: '1.1.0',
      date: 'January 15, 2023',
      isLatest: false,
      categories: {
        features: [
          'Added support for custom themes',
          'Introduced export functionality',
        ],
        improvements: ['Improved form validation', 'Updated documentation'],
        fixes: [],
        breaking: [],
      },
    },
  ];

  const allChanges: Change[] = versions.flatMap((version) => {
    const allCategoryItems = Object.entries(version.categories).flatMap(
      ([category, items]) =>
        items.map((item: string) => ({
          version: version.version,
          date: version.date,
          isLatest: version.isLatest,
          category: category as keyof ChangelogCategory,
          text: item,
        }))
    );
    return allCategoryItems;
  });

  const filteredChanges = searchQuery
    ? allChanges.filter((change) =>
        change.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allChanges;

  const categoryIcons: Record<keyof ChangelogCategory, React.JSX.Element> = {
    features: (
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
        className="mr-1.5 text-green-500"
      >
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
        <path d="m9 12 2 2 4-4"></path>
      </svg>
    ),
    improvements: (
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
        className="mr-1.5 text-blue-500"
      >
        <path d="M12 20V10"></path>
        <path d="M18 20V4"></path>
        <path d="M6 20v-4"></path>
      </svg>
    ),
    fixes: (
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
        className="mr-1.5 text-red-500"
      >
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
        <path d="M12 9v4"></path>
        <path d="M12 17h.01"></path>
      </svg>
    ),
    breaking: (
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
        className="mr-1.5 text-amber-500"
      >
        <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
  };

  const categoryLabels: Record<keyof ChangelogCategory, string> = {
    features: 'Features',
    improvements: 'Improvements',
    fixes: 'Bug Fixes',
    breaking: 'Breaking Changes',
  };

  const getGroupedChanges = (): GroupedVersion[] => {
    // Group by version
    const byVersion: Record<string, GroupedVersion> = {};
    filteredChanges.forEach((change) => {
      if (!byVersion[change.version]) {
        byVersion[change.version] = {
          version: change.version,
          date: change.date,
          isLatest: change.isLatest,
          categories: {
            features: [],
            improvements: [],
            fixes: [],
            breaking: [],
          },
        };
      }
      byVersion[change.version]!.categories[change.category].push(change.text);
    });
    return Object.values(byVersion);
  };

  const groupedByVersion = getGroupedChanges();

  // Group by category
  const changesByCategory: Record<keyof ChangelogCategory, Change[]> = {
    features: filteredChanges.filter((c) => c.category === 'features'),
    improvements: filteredChanges.filter((c) => c.category === 'improvements'),
    fixes: filteredChanges.filter((c) => c.category === 'fixes'),
    breaking: filteredChanges.filter((c) => c.category === 'breaking'),
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold tracking-tight">Changelog</h2>
        <div className="max-w-md">
          <div className="relative">
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
              className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <Input
              type="search"
              placeholder="Search changes..."
              className="mt-4 pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="by-version" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="by-version">By Version</TabsTrigger>
          <TabsTrigger value="by-category">By Category</TabsTrigger>
        </TabsList>

        <TabsContent value="by-version" className="mt-0">
          <div className="space-y-8">
            {searchQuery && filteredChanges.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">
                No changes found matching &quot;{searchQuery}&quot;
              </p>
            ) : (
              groupedByVersion.map((version) => (
                <Card key={version.version} className="overflow-hidden pt-0">
                  <CardHeader className="bg-muted/40 grid-rows-none py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CardTitle>Version {version.version}</CardTitle>
                        {version.isLatest && <Badge>Latest</Badge>}
                      </div>
                      <time className="text-muted-foreground hidden text-sm sm:block">
                        {version.date}
                      </time>
                    </div>
                    <time className="text-muted-foreground mt-1 block text-sm sm:hidden">
                      {version.date}
                    </time>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y">
                      {Object.entries(version.categories).map(
                        ([category, items]) => {
                          const typedCategory =
                            category as keyof ChangelogCategory;
                          return items.length > 0 ? (
                            <div key={category} className="p-4">
                              <h4 className="mb-3 flex items-center text-sm font-medium">
                                {categoryIcons[typedCategory]}
                                {categoryLabels[typedCategory]}
                              </h4>
                              <ul className="space-y-2 pl-6 text-sm">
                                {items.map((item: string, i: number) => (
                                  <li key={i} className="list-disc">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : null;
                        }
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="by-category" className="mt-0">
          <div className="space-y-8">
            {searchQuery && filteredChanges.length === 0 ? (
              <p className="text-muted-foreground py-12 text-center">
                No changes found matching &quot;{searchQuery}&quot;
              </p>
            ) : (
              Object.entries(changesByCategory).map(([category, changes]) => {
                const typedCategory = category as keyof ChangelogCategory;
                return changes.length > 0 ? (
                  <Card key={category} className="overflow-hidden pt-0">
                    <CardHeader className="bg-muted/40 grid-rows-none py-3">
                      <CardTitle className="flex items-center text-base">
                        {categoryIcons[typedCategory]}
                        {categoryLabels[typedCategory]}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y">
                        {changes.map((change, index) => (
                          <div key={index} className="p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  v{change.version}
                                </span>
                                {change.isLatest && (
                                  <Badge className="px-1.5 py-0 text-[10px]">
                                    Latest
                                  </Badge>
                                )}
                              </div>
                              <time className="text-muted-foreground text-xs">
                                {change.date}
                              </time>
                            </div>
                            <p className="text-sm">{change.text}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : null;
              })
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
