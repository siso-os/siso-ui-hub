import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import {
  Download,
  FileText,
  FileImage,
  FileSpreadsheet,
  Film,
  FileArchive,
} from 'lucide-react';

export default function BrandedDocumentIconsGrid() {
  const documents = [
    {
      id: 1,
      title: 'Resume',
      description: 'Professional experience and skills',
      icon: <FileText className="h-10 w-10" />,
      color: 'bg-blue-100 dark:bg-blue-950',
      iconColor: 'text-blue-600 dark:text-blue-400',
      fileType: 'PDF',
      fileSize: '1.2 MB',
    },
    {
      id: 2,
      title: 'Portfolio PDF',
      description: 'Visual showcase of my best work',
      icon: <FileImage className="h-10 w-10" />,
      color: 'bg-purple-100 dark:bg-purple-950',
      iconColor: 'text-purple-600 dark:text-purple-400',
      fileType: 'PDF',
      fileSize: '8.5 MB',
    },
    {
      id: 3,
      title: 'Media Kit',
      description: 'Branding assets and guidelines',
      icon: <FileArchive className="h-10 w-10" />,
      color: 'bg-amber-100 dark:bg-amber-950',
      iconColor: 'text-amber-600 dark:text-amber-400',
      fileType: 'ZIP',
      fileSize: '15 MB',
    },
    {
      id: 4,
      title: 'Case Studies',
      description: 'Detailed project breakdowns',
      icon: <FileSpreadsheet className="h-10 w-10" />,
      color: 'bg-green-100 dark:bg-green-950',
      iconColor: 'text-green-600 dark:text-green-400',
      fileType: 'PDF',
      fileSize: '4.7 MB',
    },
    {
      id: 5,
      title: 'Intro Video',
      description: 'Personal introduction to clients',
      icon: <Film className="h-10 w-10" />,
      color: 'bg-red-100 dark:bg-red-950',
      iconColor: 'text-red-600 dark:text-red-400',
      fileType: 'MP4',
      fileSize: '22 MB',
    },
    {
      id: 6,
      title: 'Service Rates',
      description: 'Pricing guide for services',
      icon: <FileText className="h-10 w-10" />,
      color: 'bg-teal-100 dark:bg-teal-950',
      iconColor: 'text-teal-600 dark:text-teal-400',
      fileType: 'PDF',
      fileSize: '900 KB',
    },
  ];

  return (
    <section className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Downloadable Resources
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            Access and download my professional documents and resources to learn
            more about my work, experience, and offerings.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {documents.map((doc) => (
            <Card
              key={doc.id}
              className="overflow-hidden border-0 p-0 shadow-md"
            >
              <CardContent className="p-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-32 w-full items-center justify-center ${doc.color}`}
                  >
                    <div className={`${doc.iconColor}`}>{doc.icon}</div>
                  </div>

                  <div className="flex w-full flex-col p-5">
                    <h3 className="mb-1 font-medium">{doc.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">
                      {doc.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-muted-foreground text-xs">
                        {doc.fileType} • {doc.fileSize}
                      </span>

                      <Button asChild variant="ghost" size="sm">
                        <a href="#">
                          <Download className="mr-1 h-4 w-4" />
                          <span>Download</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-4">
            Can&apos;t find what you&apos;re looking for?
          </p>
          <Button asChild variant="outline">
            <a href="#">Request a Custom Document</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
