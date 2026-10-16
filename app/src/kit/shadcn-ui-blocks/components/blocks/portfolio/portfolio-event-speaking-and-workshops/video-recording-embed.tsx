import {
  ArrowRight,
  PlayCircle,
  Calendar,
  MapPin,
  Clock,
  Download,
  Mic,
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';

// Sample featured recordings data
const featuredRecordings = [
  {
    id: 1,
    title: 'AI-Driven Interfaces',
    event: 'UXConf 2024',
    role: 'Keynote Speaker',
    date: 'April 18, 2024',
    location: 'San Francisco, CA',
    duration: '45 min',
    description:
      'In this keynote presentation, I explored how artificial intelligence is revolutionizing the way we approach web design, from automated layouts to personalized user experiences. Drawing on case studies and real-world examples, I demonstrated how designers can embrace AI as a powerful collaborator rather than viewing it as a replacement.',
    videoId: '8WXN9M79ZYA', // YouTube video ID (AI in Web Design talk)
    thumbnailImage:
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop',
    slides: '#', // Link to slides
    resources: '#', // Link to additional resources
    tags: ['AI', 'Web Design', 'UX', 'Future Trends'],
  },
  {
    id: 2,
    title: 'Designs That Scale',
    event: 'DesignOps Global',
    role: 'Workshop Leader',
    date: 'September 18, 2023',
    location: 'Berlin, Germany',
    duration: '90 min',
    description:
      'In this hands-on workshop, I guided participants through the process of creating, implementing, and maintaining design systems for enterprise organizations. We covered everything from component architecture to team workflows, documentation, and scaling strategies.',
    videoId: 'f1x-g5uTt1E', // YouTube video ID
    thumbnailImage:
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop',
    slides: '#', // Link to slides
    resources: '#', // Link to additional resources
    tags: ['Design Systems', 'DesignOps', 'Enterprise', 'Workflow'],
  },
  {
    id: 3,
    title: 'Building Accessible Applications',
    event: 'A11y Summit',
    role: 'Panel Moderator',
    date: 'November 12, 2023',
    location: 'Chicago, IL',
    duration: '60 min',
    description:
      'I moderated this panel discussion with leading accessibility experts, exploring best practices for building truly accessible digital products from the ground up. The conversation covered technical implementation, inclusive design, testing methodologies, and organizational approaches to accessibility.',
    videoId: 'ZYSceVMX3-U', // YouTube video ID
    thumbnailImage:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2112&auto=format&fit=crop',
    slides: '#', // Link to slides
    resources: '#', // Link to additional resources
    tags: ['Accessibility', 'WCAG', 'Inclusive Design', 'Panel Discussion'],
  },
];

export default function VideoRecordingEmbed() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            Watch & Learn
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Speaking Recordings
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Watch recordings of my keynotes, workshops, and panel discussions
            from events around the world
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <Tabs
            className="space-y-8"
            defaultValue={featuredRecordings[0]!.id.toString()}
          >
            <TabsList className="h-fit w-full flex-wrap">
              {featuredRecordings.map((recording) => (
                <TabsTrigger
                  key={recording.id}
                  value={recording.id.toString()}
                  className="data-[state=active]:bg-background rounded-md px-3 py-2"
                >
                  <div className="text-center">
                    <h3 className="text-sm font-medium md:text-base">
                      {recording.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">
                      {recording.event}
                    </p>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {featuredRecordings.map((recording) => (
              <TabsContent
                key={recording.id}
                value={recording.id.toString()}
                className="mt-6"
              >
                <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
                  {/* Video embed */}
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${recording.videoId}`}
                      title={recording.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <Badge className="mb-2" variant="outline">
                          {recording.role}
                        </Badge>
                        <h3 className="mb-1 text-xl font-semibold md:text-2xl">
                          {recording.title}
                        </h3>
                        <p className="text-primary font-medium">
                          {recording.event}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={recording.slides}
                            className="inline-flex items-center gap-1"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Slides</span>
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={recording.resources}
                            className="inline-flex items-center gap-1"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Resources</span>
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div className="mt-6 mb-6 grid grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <div className="text-muted-foreground mb-1 flex items-center text-xs">
                          <Calendar className="mr-1.5 h-3.5 w-3.5" />
                          Date
                        </div>
                        <div className="text-sm font-medium">
                          {recording.date}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-muted-foreground mb-1 flex items-center text-xs">
                          <MapPin className="mr-1.5 h-3.5 w-3.5" />
                          Location
                        </div>
                        <div className="text-sm font-medium">
                          {recording.location}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="text-muted-foreground mb-1 flex items-center text-xs">
                          <Clock className="mr-1.5 h-3.5 w-3.5" />
                          Duration
                        </div>
                        <div className="text-sm font-medium">
                          {recording.duration}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="mb-2 text-lg font-medium">
                        About this talk
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {recording.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {recording.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {/* Other recordings preview */}
          <div className="mt-16">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-semibold">More Recordings</h3>
              <Button variant="outline" asChild size="sm">
                <a href="#" className="inline-flex items-center gap-1">
                  <span>View all</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((index) => (
                <div
                  key={`more-${index}`}
                  className="group overflow-hidden rounded-lg border transition-all duration-300 hover:shadow-md"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={featuredRecordings[index - 1]!.thumbnailImage}
                      alt={featuredRecordings[index - 1]!.title}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <PlayCircle className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="mb-1 line-clamp-1 text-sm font-medium">
                      {featuredRecordings[index - 1]!.title}
                    </h4>
                    <p className="text-muted-foreground text-xs">
                      {featuredRecordings[index - 1]!.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span>Book me for your next event</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
