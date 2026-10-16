import {
  ArrowRight,
  Clock,
  Users,
  Star,
  TrendingUp,
  Award,
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '../../../ui/card';
import { Progress } from '../../../ui/progress';

// Sample project data with metrics
const projects = [
  {
    id: 1,
    title: 'Enterprise CRM System',
    category: 'Full Stack Development',
    description:
      'Engineered a comprehensive CRM solution with advanced analytics dashboard and automation tools for enterprise clients.',
    image:
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker'],
    stats: {
      duration: '8 months',
      teamSize: 6,
      impactScore: 92,
      clientSatisfaction: 96,
      complexity: 85,
    },
    link: '#',
  },
  {
    id: 2,
    title: 'AI-Powered Content Analyzer',
    category: 'Machine Learning',
    description:
      'Developed an AI solution that automatically analyzes, categorizes, and extracts key insights from various content types.',
    image:
      'https://images.unsplash.com/photo-1655720828018-edd2daec9349?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'AWS'],
    stats: {
      duration: '6 months',
      teamSize: 4,
      impactScore: 89,
      clientSatisfaction: 90,
      complexity: 95,
    },
    link: '#',
  },
  {
    id: 3,
    title: 'FinTech Mobile Application',
    category: 'Mobile Development',
    description:
      'Created a secure financial management app with real-time transaction monitoring, budgeting tools, and investment tracking.',
    image:
      'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['React Native', 'Firebase', 'Redux', 'Node.js', 'Jest'],
    stats: {
      duration: '5 months',
      teamSize: 5,
      impactScore: 87,
      clientSatisfaction: 94,
      complexity: 78,
    },
    link: '#',
  },
  {
    id: 4,
    title: 'E-commerce Platform Redesign',
    category: 'UI/UX & Front-end',
    description:
      'Completely redesigned and rebuilt the front-end of an e-commerce platform, improving conversion rates and user engagement.',
    image:
      'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['Next.js', 'TypeScript', 'TailwindCSS', 'Stripe'],
    stats: {
      duration: '4 months',
      teamSize: 3,
      impactScore: 83,
      clientSatisfaction: 98,
      complexity: 72,
    },
    link: '#',
  },
  {
    id: 5,
    title: 'IoT Fleet Management System',
    category: 'IoT Development',
    description:
      'Built an IoT-based solution for real-time tracking, diagnostics, and management of vehicle fleets with predictive maintenance.',
    image:
      'https://images.unsplash.com/photo-1511578194003-00c80e42dc9b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['Python', 'MQTT', 'React', 'MongoDB', 'Azure IoT'],
    stats: {
      duration: '10 months',
      teamSize: 7,
      impactScore: 95,
      clientSatisfaction: 92,
      complexity: 90,
    },
    link: '#',
  },
  {
    id: 6,
    title: 'Blockchain Supply Chain Solution',
    category: 'Blockchain Development',
    description:
      'Developed a blockchain-based supply chain tracking system providing end-to-end visibility and improved authentication.',
    image:
      'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
    technologies: ['Solidity', 'Ethereum', 'Node.js', 'React', 'Web3.js'],
    stats: {
      duration: '9 months',
      teamSize: 5,
      impactScore: 91,
      clientSatisfaction: 88,
      complexity: 93,
    },
    link: '#',
  },
];

export default function PortfolioStatsCards() {
  return (
    <div className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Project Portfolio & Metrics
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl">
            A quantitative look at my key projects, highlighting scope, impact,
            and technical complexity
          </p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden pt-0 transition-all duration-300 hover:shadow-lg"
            >
              {/* Project image with category overlay */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                <div className="absolute right-4 bottom-4 left-4">
                  <Badge
                    variant="secondary"
                    className="bg-primary/90 text-primary-foreground backdrop-blur-sm"
                  >
                    {project.category}
                  </Badge>
                  <h3 className="mt-2 text-xl font-bold text-white drop-shadow-sm">
                    {project.title}
                  </h3>
                </div>
              </div>

              <CardHeader>
                <p className="text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
              </CardHeader>

              <CardContent>
                {/* Project stats section */}
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div className="col-span-2 flex flex-col gap-2 xl:flex-row">
                    <div className="flex w-full flex-row items-center gap-2">
                      <Clock className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground text-sm">
                        Duration:
                      </span>
                      <span className="text-sm font-medium">
                        {project.stats.duration}
                      </span>
                    </div>

                    <div className="flex w-full flex-row items-center gap-2">
                      <Users className="text-muted-foreground h-4 w-4" />
                      <span className="text-muted-foreground text-sm">
                        Team:
                      </span>
                      <span className="text-sm font-medium">
                        {project.stats.teamSize} people
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground text-sm">
                          Impact Score:
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {project.stats.impactScore}/100
                      </span>
                    </div>
                    <Progress
                      value={project.stats.impactScore}
                      className="h-1.5"
                    />
                  </div>

                  <div className="col-span-2 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground text-sm">
                          Client Satisfaction:
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {project.stats.clientSatisfaction}/100
                      </span>
                    </div>
                    <Progress
                      value={project.stats.clientSatisfaction}
                      className="h-1.5"
                    />
                  </div>

                  <div className="col-span-2 flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="text-muted-foreground h-4 w-4" />
                        <span className="text-muted-foreground text-sm">
                          Complexity:
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {project.stats.complexity}/100
                      </span>
                    </div>
                    <Progress
                      value={project.stats.complexity}
                      className="h-1.5"
                    />
                  </div>
                </div>

                {/* Technologies */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full gap-1.5" variant="default" asChild>
                  <a href={project.link}>
                    View Project Details
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
