import { Badge } from '../../../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import { useState } from 'react';

export default function CategorizedChangelog() {
  const [selectedVersion, setSelectedVersion] = useState('all');

  const categories = [
    {
      name: 'Features',
      icon: (
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
      ),
      bgColor: 'bg-green-50 dark:bg-green-950/30',
      textColor: 'text-green-700 dark:text-green-400',
      borderColor: 'border-green-200 dark:border-green-900',
    },
    {
      name: 'Improvements',
      icon: (
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
          <path d="M12 20V10"></path>
          <path d="M18 20V4"></path>
          <path d="M6 20v-4"></path>
        </svg>
      ),
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
      textColor: 'text-blue-700 dark:text-blue-400',
      borderColor: 'border-blue-200 dark:border-blue-900',
    },
    {
      name: 'Bug Fixes',
      icon: (
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
      ),
      bgColor: 'bg-red-50 dark:bg-red-950/30',
      textColor: 'text-red-700 dark:text-red-400',
      borderColor: 'border-red-200 dark:border-red-900',
    },
    {
      name: 'Breaking Changes',
      icon: (
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
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      bgColor: 'bg-amber-50 dark:bg-amber-950/30',
      textColor: 'text-amber-700 dark:text-amber-400',
      borderColor: 'border-amber-200 dark:border-amber-900',
    },
  ];

  const versions = [
    {
      version: '2.0.0',
      date: 'April 15, 2023',
      isLatest: true,
      changes: [
        {
          category: 'Features',
          items: [
            'Completely redesigned dashboard interface',
            'Added dark mode support across all pages',
            'New analytics dashboard with advanced filters',
          ],
        },
        {
          category: 'Improvements',
          items: [
            'Improved performance by 40%',
            'Enhanced mobile responsiveness',
            'Better form validation',
          ],
        },
        {
          category: 'Bug Fixes',
          items: [
            'Fixed multiple accessibility issues',
            'Corrected display issues on Safari',
          ],
        },
        {
          category: 'Breaking Changes',
          items: [
            'API endpoints restructured for v2',
            'Removed deprecated features',
          ],
        },
      ],
    },
    {
      version: '1.2.0',
      date: 'March 2, 2023',
      isLatest: false,
      changes: [
        {
          category: 'Features',
          items: ['Added new analytics dashboard', 'Introduced user profiles'],
        },
        {
          category: 'Improvements',
          items: [
            'Improved mobile responsiveness',
            'Enhanced search functionality',
          ],
        },
        {
          category: 'Bug Fixes',
          items: [
            'Fixed bug with user authentication',
            'Resolved display issues on small screens',
          ],
        },
      ],
    },
    {
      version: '1.1.0',
      date: 'January 15, 2023',
      isLatest: false,
      changes: [
        {
          category: 'Features',
          items: ['Added support for custom themes'],
        },
        {
          category: 'Improvements',
          items: ['Improved form validation', 'Updated documentation'],
        },
      ],
    },
  ];

  const filteredVersions =
    selectedVersion === 'all'
      ? versions
      : versions.filter((v) => v.version === selectedVersion);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Changelog</h2>
          <p className="text-muted-foreground mt-1">
            See what&apos;s changed across versions
          </p>
        </div>
        <div className="mt-4 w-full md:mt-0 md:w-48">
          <Select value={selectedVersion} onValueChange={setSelectedVersion}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by version" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Versions</SelectItem>
              {versions.map((version) => (
                <SelectItem key={version.version} value={version.version}>
                  v{version.version}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-10">
        {filteredVersions.map((version) => (
          <div key={version.version} className="space-y-6">
            <div className="flex items-end justify-between border-b pb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-semibold">v{version.version}</h3>
                {version.isLatest && <Badge>Latest</Badge>}
              </div>
              <time className="text-muted-foreground text-sm">
                {version.date}
              </time>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => {
                const changeCategory = version.changes.find(
                  (c) => c.category === category.name
                );
                const items = changeCategory?.items || [];

                if (items.length === 0) return null;

                return (
                  <Card
                    key={category.name}
                    className={`overflow-hidden border pt-0 ${category.borderColor}`}
                  >
                    <CardHeader
                      className={`grid-rows-none py-3 ${category.bgColor}`}
                    >
                      <CardTitle
                        className={`flex items-center text-sm font-medium ${category.textColor}`}
                      >
                        {category.icon}
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1 text-sm">
                        {items.map((item, i) => (
                          <li key={i} className="py-1">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
