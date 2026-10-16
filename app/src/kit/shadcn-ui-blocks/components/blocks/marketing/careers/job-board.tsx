import * as React from 'react';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Input } from '../../../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select';
import {
  BriefcaseIcon,
  BuildingIcon,
  ClockIcon,
  DollarSignIcon,
  MapPinIcon,
  SearchIcon,
  FilterIcon,
  BookmarkIcon,
  GlobeIcon,
} from 'lucide-react';

interface JobPosition {
  id: string;
  title: string;
  department: string;
  companyName: string;
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  employmentType: 'full-time' | 'part-time' | 'contract' | 'internship';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'lead' | 'executive';
  postedDate: string;
  salary: string;
  description: string;
}

export default function JobBoard() {
  // Sample job position data
  const jobPositions: JobPosition[] = [
    {
      id: 'frontend-developer',
      title: 'Frontend Developer',
      department: 'Engineering',
      companyName: 'TechCorp',
      location: 'San Francisco, CA',
      locationType: 'hybrid',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      postedDate: '2023-10-10',
      salary: '$90,000 - $120,000',
      description:
        'Join our team to build intuitive and responsive web applications using React, Next.js, and TypeScript.',
    },
    {
      id: 'ux-researcher',
      title: 'UX Researcher',
      department: 'Design',
      companyName: 'DesignLab',
      location: 'New York, NY',
      locationType: 'onsite',
      employmentType: 'full-time',
      experienceLevel: 'senior',
      postedDate: '2023-10-08',
      salary: '$100,000 - $130,000',
      description:
        'Lead user research initiatives to inform product design decisions and improve user experience.',
    },
    {
      id: 'data-scientist',
      title: 'Data Scientist',
      department: 'Data',
      companyName: 'DataInsights',
      location: 'Remote',
      locationType: 'remote',
      employmentType: 'full-time',
      experienceLevel: 'senior',
      postedDate: '2023-10-09',
      salary: '$110,000 - $150,000',
      description:
        'Apply statistical analysis and machine learning techniques to extract insights from large datasets.',
    },
    {
      id: 'devops-engineer',
      title: 'DevOps Engineer',
      department: 'Operations',
      companyName: 'CloudTech',
      location: 'Austin, TX',
      locationType: 'hybrid',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      postedDate: '2023-10-07',
      salary: '$100,000 - $140,000',
      description:
        'Implement and maintain CI/CD pipelines and cloud infrastructure using AWS, Kubernetes, and Terraform.',
    },
    {
      id: 'marketing-manager',
      title: 'Marketing Manager',
      department: 'Marketing',
      companyName: 'BrandBoost',
      location: 'Chicago, IL',
      locationType: 'hybrid',
      employmentType: 'full-time',
      experienceLevel: 'senior',
      postedDate: '2023-10-05',
      salary: '$95,000 - $125,000',
      description:
        'Develop and execute marketing strategies to drive brand awareness and customer acquisition.',
    },
    {
      id: 'backend-engineer',
      title: 'Backend Engineer',
      department: 'Engineering',
      companyName: 'ServerStack',
      location: 'Seattle, WA',
      locationType: 'hybrid',
      employmentType: 'full-time',
      experienceLevel: 'senior',
      postedDate: '2023-10-06',
      salary: '$120,000 - $160,000',
      description:
        'Design and build scalable backend services and APIs using Node.js, Go, and distributed systems.',
    },
    {
      id: 'product-manager',
      title: 'Product Manager',
      department: 'Product',
      companyName: 'ProductLabs',
      location: 'Boston, MA',
      locationType: 'onsite',
      employmentType: 'full-time',
      experienceLevel: 'senior',
      postedDate: '2023-10-04',
      salary: '$110,000 - $150,000',
      description:
        'Lead product development from conception to launch, working with cross-functional teams to deliver exceptional user experiences.',
    },
    {
      id: 'qa-engineer',
      title: 'QA Engineer',
      department: 'Engineering',
      companyName: 'QualityTech',
      location: 'Denver, CO',
      locationType: 'hybrid',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      postedDate: '2023-10-03',
      salary: '$85,000 - $115,000',
      description:
        'Ensure software quality through test automation, manual testing, and establishing QA best practices.',
    },
    {
      id: 'technical-writer',
      title: 'Technical Writer',
      department: 'Documentation',
      companyName: 'DocuTech',
      location: 'Remote',
      locationType: 'remote',
      employmentType: 'contract',
      experienceLevel: 'mid',
      postedDate: '2023-10-02',
      salary: '$70,000 - $90,000',
      description:
        'Create clear and concise technical documentation, API references, and user guides for our products.',
    },
    {
      id: 'sales-representative',
      title: 'Sales Representative',
      department: 'Sales',
      companyName: 'SalesPro',
      location: 'Los Angeles, CA',
      locationType: 'hybrid',
      employmentType: 'full-time',
      experienceLevel: 'entry',
      postedDate: '2023-10-01',
      salary: '$60,000 - $80,000 + Commission',
      description:
        'Identify and pursue sales opportunities, build client relationships, and meet revenue targets.',
    },
    {
      id: 'hr-specialist',
      title: 'HR Specialist',
      department: 'Human Resources',
      companyName: 'PeopleFirst',
      location: 'Miami, FL',
      locationType: 'onsite',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      postedDate: '2023-09-30',
      salary: '$75,000 - $95,000',
      description:
        'Support recruitment, onboarding, employee relations, and HR programs to foster a positive workplace culture.',
    },
    {
      id: 'mobile-developer',
      title: 'Mobile Developer',
      department: 'Engineering',
      companyName: 'AppWorks',
      location: 'Portland, OR',
      locationType: 'hybrid',
      employmentType: 'full-time',
      experienceLevel: 'mid',
      postedDate: '2023-09-29',
      salary: '$95,000 - $125,000',
      description:
        'Build native mobile applications for iOS and Android using Swift, Kotlin, and React Native.',
    },
  ];

  // Define filter options
  const departments = Array.from(
    new Set(jobPositions.map((job) => job.department))
  ).sort();
  const locations = Array.from(
    new Set(jobPositions.map((job) => job.location))
  ).sort();
  const locationTypes = ['remote', 'onsite', 'hybrid'];
  const employmentTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const experienceLevels = ['entry', 'mid', 'senior', 'lead', 'executive'];

  // State for search and filters
  const [searchQuery, setSearchQuery] = React.useState('');
  const [departmentFilter, setDepartmentFilter] = React.useState('all');
  const [locationFilter, setLocationFilter] = React.useState('all');
  const [locationTypeFilter, setLocationTypeFilter] = React.useState('all');
  const [employmentTypeFilter, setEmploymentTypeFilter] = React.useState('all');
  const [experienceFilter, setExperienceFilter] = React.useState('all');
  const [filteredJobs, setFilteredJobs] =
    React.useState<JobPosition[]>(jobPositions);
  const [filtersVisible, setFiltersVisible] = React.useState(false);

  // Helper functions
  // Calculate days ago from date
  const getDaysAgo = (dateString: string) => {
    const postDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };

  // Format location type for display
  const formatLocationType = (type: string) => {
    switch (type) {
      case 'remote':
        return 'Remote';
      case 'hybrid':
        return 'Hybrid';
      case 'onsite':
        return 'On-site';
      default:
        return type;
    }
  };

  // Format employment type for display
  const formatEmploymentType = (type: string) => {
    switch (type) {
      case 'full-time':
        return 'Full-time';
      case 'part-time':
        return 'Part-time';
      case 'contract':
        return 'Contract';
      case 'internship':
        return 'Internship';
      default:
        return type;
    }
  };

  // Format experience level for display
  const formatExperienceLevel = (level: string) => {
    switch (level) {
      case 'entry':
        return 'Entry Level';
      case 'mid':
        return 'Mid Level';
      case 'senior':
        return 'Senior Level';
      case 'lead':
        return 'Lead';
      case 'executive':
        return 'Executive';
      default:
        return level;
    }
  };

  // Filter jobs based on search and filters
  React.useEffect(() => {
    const filtered = jobPositions.filter((job) => {
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDepartment =
        departmentFilter === 'all' || job.department === departmentFilter;
      const matchesLocation =
        locationFilter === 'all' || job.location === locationFilter;
      const matchesLocationType =
        locationTypeFilter === 'all' || job.locationType === locationTypeFilter;
      const matchesEmploymentType =
        employmentTypeFilter === 'all' ||
        job.employmentType === employmentTypeFilter;
      const matchesExperienceLevel =
        experienceFilter === 'all' || job.experienceLevel === experienceFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLocation &&
        matchesLocationType &&
        matchesEmploymentType &&
        matchesExperienceLevel
      );
    });

    setFilteredJobs(filtered);
  }, [
    searchQuery,
    departmentFilter,
    locationFilter,
    locationTypeFilter,
    employmentTypeFilter,
    experienceFilter,
  ]);

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('all');
    setLocationFilter('all');
    setLocationTypeFilter('all');
    setEmploymentTypeFilter('all');
    setExperienceFilter('all');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Career Opportunities
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl">
          Discover your next career opportunity. Browse our open positions and
          find the perfect role that matches your skills, experience, and career
          goals.
        </p>
      </div>

      <div className="mb-8">
        <div className="mb-4 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-grow">
            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="Search jobs by title, department, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setFiltersVisible(!filtersVisible)}
            className="w-full md:w-auto"
          >
            <FilterIcon className="mr-2 h-4 w-4" />
            {filtersVisible ? 'Hide Filters' : 'Show Filters'}
          </Button>
          {(departmentFilter ||
            locationFilter ||
            locationTypeFilter ||
            employmentTypeFilter ||
            experienceFilter) && (
            <Button
              variant="ghost"
              onClick={resetFilters}
              className="w-full md:w-auto"
            >
              Reset Filters
            </Button>
          )}
        </div>

        {filtersVisible && (
          <div className="bg-muted/10 mt-4 grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <Select
              value={departmentFilter}
              onValueChange={setDepartmentFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Department</SelectLabel>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((department) => (
                    <SelectItem key={department} value={department}>
                      {department}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Location</SelectLabel>
                  <SelectItem value="all">All Locations</SelectItem>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={locationTypeFilter}
              onValueChange={setLocationTypeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Work Environment" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Work Environment</SelectLabel>
                  <SelectItem value="all">All Types</SelectItem>
                  {locationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatLocationType(type)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={employmentTypeFilter}
              onValueChange={setEmploymentTypeFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Employment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Employment Type</SelectLabel>
                  <SelectItem value="all">All Types</SelectItem>
                  {employmentTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {formatEmploymentType(type)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={experienceFilter}
              onValueChange={setExperienceFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Experience Level</SelectLabel>
                  <SelectItem value="all">All Levels</SelectItem>
                  {experienceLevels.map((level) => (
                    <SelectItem key={level} value={level}>
                      {formatExperienceLevel(level)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4">
            <SearchIcon className="text-muted-foreground h-12 w-12" />
          </div>
          <h3 className="mb-2 text-xl font-semibold">No matching jobs found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search criteria or filters to find what
            you&apos;re looking for.
          </p>
          <Button onClick={resetFilters}>Clear All Filters</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <Card key={job.id} className="flex h-full flex-col">
              <CardHeader>
                <div className="mb-2 flex items-start justify-between">
                  <Badge variant="outline" className="text-xs">
                    {formatEmploymentType(job.employmentType)}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className={
                      job.locationType === 'remote'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        : job.locationType === 'hybrid'
                          ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
                          : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    }
                  >
                    {job.locationType === 'remote' ? (
                      <GlobeIcon className="mr-1 h-3 w-3" />
                    ) : null}
                    {formatLocationType(job.locationType)}
                  </Badge>
                </div>
                <CardTitle className="line-clamp-2">{job.title}</CardTitle>
                <div className="mt-1 flex items-center gap-1">
                  <BuildingIcon className="text-muted-foreground h-3.5 w-3.5" />
                  <p className="text-muted-foreground text-sm">
                    {job.companyName}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{job.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSignIcon className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="text-muted-foreground h-4 w-4 flex-shrink-0" />
                    <span className="text-sm">
                      Posted {getDaysAgo(job.postedDate)}
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-muted-foreground line-clamp-3 text-sm">
                    {job.description}
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex gap-3 pt-2">
                <Button variant="outline" size="sm" className="w-1/2">
                  <BookmarkIcon className="mr-1 h-4 w-4" />
                  Save
                </Button>
                <Button size="sm" className="w-1/2">
                  Apply Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-10 text-center">
        <p className="text-muted-foreground mb-4">
          Showing {filteredJobs.length} of {jobPositions.length} available
          positions
        </p>
        <Button variant="outline">Load More</Button>
      </div>
    </div>
  );
}
