import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../ui/tabs';
import { CalendarIcon, MapPinIcon, PlayIcon } from 'lucide-react';

const featuredTalk = {
  title: 'Building Resilient Design Systems at Scale',
  event: 'DesignOps Global Conference',
  date: 'May 15, 2024',
  location: 'Amsterdam, Netherlands',
  heroImage:
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  description:
    'My keynote talk at DesignOps Global Conference focused on strategies for building and maintaining design systems that can evolve with organizational growth while ensuring consistency and efficiency across multiple product teams.',
  videoUrl: '#',
  slidesUrl: '#',
  resourcesUrl: '#',
  keyPoints: [
    'Design system governance models for distributed teams',
    'Balancing flexibility with consistency in component architecture',
    'Automating design token implementation across platforms',
    'Measuring and communicating design system success',
    'Change management and adoption strategies for large organizations',
  ],
  feedback: [
    {
      quote:
        "One of the most insightful talks on design systems I've ever attended. The practical strategies shared are immediately applicable to our work.",
      author: 'Sarah Chen',
      role: 'Lead Designer, TechCorp',
    },
    {
      quote:
        'The frameworks presented for measuring design system success have completely changed how we think about ROI in our organization.',
      author: 'Marcus Johnson',
      role: 'Design Director, Platform Co.',
    },
    {
      quote:
        'Finally, someone addressing the human and organizational challenges in design systems, not just the technical ones. Brilliant presentation!',
      author: 'Aisha Patel',
      role: 'VP of Design, Global Finance',
    },
  ],
};

export default function FeaturedTalk() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mb-10 flex flex-col items-center text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight">
          Featured Speaking Engagement
        </h2>
        <p className="text-muted-foreground max-w-[800px]">
          Highlighting my most impactful presentation and its reception in the
          industry.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left column - image and main info */}
        <div className="lg:col-span-5">
          <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={featuredTalk.heroImage}
              alt={featuredTalk.title}
              className="object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-300 hover:opacity-100">
              <Button
                size="lg"
                variant="secondary"
                className="flex items-center gap-2"
              >
                <PlayIcon className="h-5 w-5" />
                Watch Talk
              </Button>
            </div>
          </div>

          <h3 className="mb-3 text-2xl font-bold">{featuredTalk.title}</h3>
          <div className="mb-4 flex flex-col space-y-2">
            <div className="text-muted-foreground flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{featuredTalk.date}</span>
            </div>
            <div className="text-muted-foreground flex items-center">
              <MapPinIcon className="mr-2 h-4 w-4" />
              <span>
                {featuredTalk.event} • {featuredTalk.location}
              </span>
            </div>
          </div>

          <p className="text-muted-foreground mb-6">
            {featuredTalk.description}
          </p>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="default">
              <a href={featuredTalk.videoUrl}>
                <PlayIcon className="mr-2 h-4 w-4" />
                Watch Recording
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={featuredTalk.slidesUrl}>View Slides</a>
            </Button>
            <Button asChild variant="outline">
              <a href={featuredTalk.resourcesUrl}>Resources</a>
            </Button>
          </div>
        </div>

        {/* Right column - tabs with content */}
        <div className="lg:col-span-7">
          <Tabs defaultValue="key-points" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="key-points">Key Points</TabsTrigger>
              <TabsTrigger value="feedback">Attendee Feedback</TabsTrigger>
            </TabsList>

            <TabsContent value="key-points" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h4 className="mb-4 text-xl font-semibold">
                    Main Topics Covered
                  </h4>
                  <ul className="space-y-3">
                    {featuredTalk.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start">
                        <div className="bg-primary text-primary-foreground mt-0.5 mr-3 flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium">
                          {i + 1}
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feedback" className="mt-6">
              <div className="space-y-4">
                {featuredTalk.feedback.map((item, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <blockquote className="mb-4 text-lg italic">
                        &quot;{item.quote}&quot;
                      </blockquote>
                      <div>
                        <div className="font-semibold">{item.author}</div>
                        <div className="text-muted-foreground text-sm">
                          {item.role}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
