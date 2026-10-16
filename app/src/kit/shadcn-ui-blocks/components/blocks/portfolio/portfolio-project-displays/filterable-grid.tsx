import { useState } from 'react';

import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../ui/card';
import {
  ExternalLink,
  Code,
  LineChart,
  Smartphone,
  Globe,
  Server,
  Database,
} from 'lucide-react';

// Sample project data with tech-related projects
const projects = [
  {
    id: 1,
    title: 'REST API Development',
    category: 'Backend',
    description:
      'Designed and developed a scalable REST API using Node.js and Express for a healthcare provider.',
    image:
      'https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2031&auto=format&fit=crop&ixlib=rb-4.0.3',
    tags: ['Node.js', 'Express', 'MongoDB', 'Docker'],
  },
  {
    id: 2,
    title: 'React Dashboard',
    category: 'Frontend',
    description:
      'Built a customizable analytics dashboard with real-time data visualization using React and D3.js.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    tags: ['React', 'TypeScript', 'D3.js', 'Material UI'],
  },
  {
    id: 3,
    title: 'Cross-platform Mobile App',
    category: 'Mobile',
    description:
      'Developed a cross-platform mobile application for event management with offline capabilities.',
    image:
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    tags: ['React Native', 'Redux', 'Firebase', 'Expo'],
  },
  {
    id: 4,
    title: 'Data Pipeline Architecture',
    category: 'Data',
    description:
      'Designed and implemented a data processing pipeline for real-time analytics using Apache Kafka.',
    image:
      'https://images.unsplash.com/photo-1504164996022-09080787b6b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    tags: ['Python', 'Kafka', 'AWS', 'Airflow'],
  },
  {
    id: 5,
    title: 'E-commerce Website',
    category: 'Frontend',
    description:
      'Created a modern e-commerce platform with advanced filtering and payment integration.',
    image:
      'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    tags: ['Next.js', 'Stripe', 'Tailwind CSS', 'Prisma'],
  },
  {
    id: 6,
    title: 'DevOps CI/CD Pipeline',
    category: 'DevOps',
    description:
      'Set up automated CI/CD pipelines for a microservices architecture using GitHub Actions and Kubernetes.',
    image:
      'https://images.unsplash.com/photo-1620825937374-87fc7d6bddc2?q=80&w=2051&auto=format&fit=crop&ixlib=rb-4.0.3',
    tags: ['Kubernetes', 'Docker', 'GitHub Actions', 'Terraform'],
  },
  {
    id: 7,
    title: 'iOS Fitness Tracker',
    category: 'Mobile',
    description:
      'Developed a native iOS fitness tracking app with HealthKit integration and social features.',
    image:
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    tags: ['Swift', 'UIKit', 'HealthKit', 'CoreData'],
  },
  {
    id: 8,
    title: 'Blockchain Explorer',
    category: 'Frontend',
    description:
      'Designed and developed a web-based blockchain explorer with detailed transaction visualization.',
    image:
      'https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    tags: ['Vue.js', 'Web3.js', 'GraphQL', 'Node.js'],
  },
  {
    id: 9,
    title: 'Serverless Backend',
    category: 'Backend',
    description:
      'Built a cost-effective serverless backend using AWS Lambda and API Gateway for a startup.',
    image:
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    tags: ['AWS Lambda', 'DynamoDB', 'Serverless', 'Node.js'],
  },
];

// Get unique categories from projects
const categories = [
  'All',
  ...Array.from(new Set(projects.map((project) => project.category))),
];

// Define icon mapping for categories
const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Globe className="h-4 w-4" />,
  Backend: <Server className="h-4 w-4" />,
  Mobile: <Smartphone className="h-4 w-4" />,
  Data: <Database className="h-4 w-4" />,
  DevOps: <Code className="h-4 w-4" />,
  All: <LineChart className="h-4 w-4" />,
};

export default function PortfolioFilterableGrid() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter projects based on active category and search query
  const filteredProjects = projects.filter((project) => {
    // Filter by category
    const matchesCategory =
      activeCategory === 'All' || project.category === activeCategory;

    // Filter by search query (case insensitive)
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My Development Portfolio
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            Browse through my portfolio of software development projects
            spanning web, mobile, and data technologies.
          </p>
        </div>

        {/* Search and filter controls */}
        <div className="mb-8 space-y-4 md:flex md:items-center md:justify-between md:space-y-0">
          {/* Search input */}
          <div className="relative w-full max-w-sm">
            <Input
              type="text"
              placeholder="Search projects or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="flex items-center gap-1.5"
              >
                {categoryIcons[category]}
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="text-muted-foreground mb-6 text-sm">
          Showing {filteredProjects.length} of {projects.length} projects
        </div>

        {/* Project grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Card
                key={project.id}
                className="group gap-6 overflow-hidden pt-0"
              >
                {/* Project image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge
                    variant="secondary"
                    className="bg-background/80 absolute top-3 right-3 backdrop-blur-sm"
                  >
                    {project.category}
                  </Badge>
                </div>

                <CardHeader className="px-5">
                  <h3 className="text-xl font-bold">{project.title}</h3>
                  <p className="text-muted-foreground mt-2 line-clamp-2 text-sm">
                    {project.description}
                  </p>
                </CardHeader>

                <CardContent className="px-5">
                  {/* Technology tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted text-muted-foreground inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="px-5">
                  {/* View project link */}
                  <Button asChild variant="secondary">
                    <a
                      href="#"
                      className="text-primary flex items-center text-sm font-medium"
                    >
                      <span>View details</span>
                      <ExternalLink className="ml-1 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          // No results state
          <div className="border-muted-foreground/10 my-10 rounded-lg border-2 border-dashed py-16 text-center">
            <p className="text-muted-foreground text-lg font-medium">
              No projects found matching your criteria
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
