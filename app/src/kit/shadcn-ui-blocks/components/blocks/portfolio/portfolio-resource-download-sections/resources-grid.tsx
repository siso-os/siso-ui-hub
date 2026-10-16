import { Button } from '../../../ui/button';
import {
  Download,
  ArrowRight,
  FileText,
  FileSpreadsheet,
  Film,
} from 'lucide-react';
import { Badge } from '../../../ui/badge';

export default function PortfolioResourcesGrid() {
  const resources = [
    {
      id: 1,
      title: 'UX Research Templates',
      description:
        'A collection of 10 ready-to-use templates for conducting effective user research sessions.',
      icon: <FileSpreadsheet className="h-10 w-10" />,
      badge: 'Templates',
      image:
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      downloadText: 'Download Templates',
    },
    {
      id: 2,
      title: 'Website Project Estimator',
      description:
        'An interactive tool to help accurately scope and price your next web development project.',
      icon: <FileText className="h-10 w-10" />,
      badge: 'Spreadsheet',
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3',
      downloadText: 'Get Estimator',
    },
    {
      id: 3,
      title: 'UI Design Process Guide',
      description:
        'A comprehensive walkthrough of my professional UI design workflow from concept to handoff.',
      icon: <FileText className="h-10 w-10" />,
      badge: 'PDF Guide',
      image:
        'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3',
      downloadText: 'Download Guide',
    },
    {
      id: 4,
      title: 'Portfolio Case Study Template',
      description:
        'Structure your design case studies effectively with this proven format and examples.',
      icon: <Film className="h-10 w-10" />,
      badge: 'Template',
      image:
        'https://images.unsplash.com/photo-1576153192396-180ecef2a715?q=80&w=1774&auto=format&fit=crop&ixlib=rb-4.0.3',
      downloadText: 'Download Template',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Free Resources & Tools
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl md:text-lg">
          Download these free resources to help with your next project or level
          up your professional skills.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {resources.map((resource) => (
          <div
            key={resource.id}
            className="group bg-card relative flex flex-col overflow-hidden rounded-lg border transition-all hover:shadow-md"
          >
            {/* Resource image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={resource.image}
                alt={resource.title}
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Resource type badge */}
              <Badge className="absolute top-3 right-3">{resource.badge}</Badge>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
              <div className="text-primary mb-3">{resource.icon}</div>

              <h3 className="mb-2 text-lg font-semibold">{resource.title}</h3>

              <p className="text-muted-foreground mb-4 flex-1 text-sm">
                {resource.description}
              </p>

              <Button
                asChild
                variant="outline"
                className="group mt-auto w-full"
              >
                <a href="#">
                  <Download className="mr-2 h-4 w-4" />
                  {resource.downloadText}
                </a>
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button asChild variant="link" className="group">
          <a href="#">
            Browse all resources
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}
