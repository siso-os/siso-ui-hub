import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../../ui/table';
import { Badge } from '../../../ui/badge';
import { Input } from '../../../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
  FilterIcon,
} from 'lucide-react';
import { Button } from '../../../ui/button';

type ChangeType = 'feature' | 'improvement' | 'bugfix' | 'breaking';

interface Change {
  id: string;
  version: string;
  date: string;
  type: ChangeType;
  description: string;
}

const typeLabels: Record<ChangeType, string> = {
  feature: 'Feature',
  improvement: 'Improvement',
  bugfix: 'Bug Fix',
  breaking: 'Breaking Change',
};

const typeColors: Record<ChangeType, string> = {
  feature:
    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  improvement:
    'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
  bugfix: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  breaking:
    'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
};

export default function TableChangelog() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState<string>('all');
  const [sortConfig, setSortConfig] = React.useState<{
    key: keyof Change;
    direction: 'ascending' | 'descending';
  }>({
    key: 'date',
    direction: 'descending',
  });

  // Sample changelog data
  const changes: Change[] = [
    {
      id: '1',
      version: '2.0.0',
      date: '2023-04-15',
      type: 'feature',
      description: 'Completely redesigned dashboard interface',
    },
    {
      id: '2',
      version: '2.0.0',
      date: '2023-04-15',
      type: 'feature',
      description: 'Added dark mode support across all pages',
    },
    {
      id: '3',
      version: '2.0.0',
      date: '2023-04-15',
      type: 'improvement',
      description: 'Improved performance by 40%',
    },
    {
      id: '4',
      version: '2.0.0',
      date: '2023-04-15',
      type: 'bugfix',
      description: 'Fixed multiple accessibility issues',
    },
    {
      id: '5',
      version: '2.0.0',
      date: '2023-04-15',
      type: 'breaking',
      description: 'API endpoints restructured for v2',
    },
    {
      id: '6',
      version: '1.2.0',
      date: '2023-03-02',
      type: 'feature',
      description: 'Added new analytics dashboard',
    },
    {
      id: '7',
      version: '1.2.0',
      date: '2023-03-02',
      type: 'improvement',
      description: 'Enhanced mobile responsiveness',
    },
    {
      id: '8',
      version: '1.2.0',
      date: '2023-03-02',
      type: 'bugfix',
      description: 'Fixed bug with user authentication',
    },
    {
      id: '9',
      version: '1.1.0',
      date: '2023-01-15',
      type: 'feature',
      description: 'Added support for custom themes',
    },
    {
      id: '10',
      version: '1.1.0',
      date: '2023-01-15',
      type: 'improvement',
      description: 'Improved form validation',
    },
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Handle sorting
  const requestSort = (key: keyof Change) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering
  const sortedAndFilteredChanges = React.useMemo(() => {
    let filteredData = [...changes];

    // Apply type filter
    if (typeFilter !== 'all') {
      filteredData = filteredData.filter((item) => item.type === typeFilter);
    }

    // Apply search filter
    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filteredData = filteredData.filter(
        (item) =>
          item.description.toLowerCase().includes(lowerCaseQuery) ||
          item.version.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    return filteredData;
  }, [changes, sortConfig, typeFilter, searchQuery]);

  // Group changes by version for displaying version badges
  const isFirstOfVersion = (change: Change, index: number): boolean => {
    if (index === 0) return true;
    return change.version !== sortedAndFilteredChanges[index - 1]!.version;
  };

  // Render sort indicator
  const renderSortIndicator = (key: keyof Change) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' ? (
      <ChevronUpIcon className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDownIcon className="ml-1 h-4 w-4" />
    );
  };

  return (
    <div className="container mx-auto space-y-6 px-4 py-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Changelog</h2>
        <p className="text-muted-foreground mt-2">
          Track all changes across versions
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Search changes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="w-full md:w-[180px]">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger>
              <span className="flex items-center">
                <FilterIcon className="mr-2 h-4 w-4" />
                <SelectValue placeholder="All types" />
              </span>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="feature">Features</SelectItem>
              <SelectItem value="improvement">Improvements</SelectItem>
              <SelectItem value="bugfix">Bug Fixes</SelectItem>
              <SelectItem value="breaking">Breaking Changes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">
                <Button
                  variant="ghost"
                  className="flex h-8 items-center px-2 text-xs font-semibold"
                  onClick={() => requestSort('version')}
                >
                  Version
                  {renderSortIndicator('version')}
                </Button>
              </TableHead>
              <TableHead className="w-[180px]">
                <Button
                  variant="ghost"
                  className="flex h-8 items-center px-2 text-xs font-semibold"
                  onClick={() => requestSort('date')}
                >
                  Date
                  {renderSortIndicator('date')}
                </Button>
              </TableHead>
              <TableHead className="w-[150px]">
                <Button
                  variant="ghost"
                  className="flex h-8 items-center px-2 text-xs font-semibold"
                  onClick={() => requestSort('type')}
                >
                  Type
                  {renderSortIndicator('type')}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  className="flex h-8 items-center px-2 text-xs font-semibold"
                  onClick={() => requestSort('description')}
                >
                  Change
                  {renderSortIndicator('description')}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedAndFilteredChanges.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-muted-foreground h-24 text-center"
                >
                  No changes found.
                </TableCell>
              </TableRow>
            ) : (
              sortedAndFilteredChanges.map((change, index) => (
                <TableRow key={change.id}>
                  <TableCell className="py-3 font-medium">
                    {isFirstOfVersion(change, index) && (
                      <div className="flex items-center gap-2">
                        v{change.version}
                        {change.version === '2.0.0' && (
                          <Badge variant="outline" className="text-[10px]">
                            Latest
                          </Badge>
                        )}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground py-3">
                    {isFirstOfVersion(change, index) && formatDate(change.date)}
                  </TableCell>
                  <TableCell className="py-3">
                    <Badge
                      variant="outline"
                      className={`${typeColors[change.type]} border-transparent text-xs capitalize`}
                    >
                      {typeLabels[change.type]}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">{change.description}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
