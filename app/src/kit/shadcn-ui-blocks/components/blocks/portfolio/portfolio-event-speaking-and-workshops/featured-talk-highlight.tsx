import { ArrowRight, Calendar, MapPin, Mic, Users, Clock } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';

// Sample featured talk data
const featuredTalk = {
  id: 1,
  title: 'The Future of Web Design: AI-Driven Interfaces',
  event: 'UXConf 2024',
  role: 'Keynote Speaker',
  date: 'April 18, 2024',
  location: 'San Francisco, CA',
  time: '45 min',
  audience: '500+ attendees',
  description:
    'In this keynote presentation, I explored how artificial intelligence is revolutionizing the way we approach web design, from automated layouts to personalized user experiences. Drawing on case studies and real-world examples, I demonstrated how designers can embrace AI as a powerful collaborator rather than viewing it as a replacement.',
  topics: [
    'AI-driven design systems',
    'Ethical considerations in automated design',
    'Balancing automation with human creativity',
    'Practical implementation strategies for teams',
  ],
  image:
    'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?q=80&w=2070&auto=format&fit=crop',
  link: '#',
};

// Sample other talks data
const otherTalks = [
  {
    id: 2,
    title: 'UX Workshop: User Research Techniques',
    event: 'DesignMatters Conference',
    role: 'Workshop Leader',
    date: 'January 28, 2024',
    location: 'Virtual Event',
    image:
      'https://images.unsplash.com/photo-1544531585-9847b68c8c86?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 3,
    title: 'Building Accessible Web Applications',
    event: 'A11y Summit',
    role: 'Panel Moderator',
    date: 'November 12, 2023',
    location: 'Chicago, IL',
    image:
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2112&auto=format&fit=crop',
    link: '#',
  },
  {
    id: 4,
    title: 'From Freelancer to Agency Owner',
    event: 'Freelance Business Forum',
    role: 'Featured Speaker',
    date: 'October 5, 2023',
    location: 'Austin, TX',
    image:
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=2070&auto=format&fit=crop',
    link: '#',
  },
];

export default function FeaturedTalkHighlight() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            Featured Talk
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Speaking Highlights
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            Explore my featured presentations and speaking engagements at
            conferences and events
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Featured Talk */}
          <div className="bg-card mb-16 overflow-hidden rounded-xl border shadow-sm md:mb-24">
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={featuredTalk.image}
                alt={featuredTalk.title}
                className="object-cover"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                <Badge className="mb-2">{featuredTalk.role}</Badge>
                <h3 className="mb-1 text-2xl font-bold text-white md:text-3xl">
                  {featuredTalk.title}
                </h3>
                <p className="text-lg font-medium text-white md:text-xl">
                  {featuredTalk.event}
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="flex flex-col">
                  <div className="text-muted-foreground mb-1 flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Date
                  </div>
                  <div className="font-medium">{featuredTalk.date}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-muted-foreground mb-1 flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    Location
                  </div>
                  <div className="font-medium">{featuredTalk.location}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-muted-foreground mb-1 flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4" />
                    Duration
                  </div>
                  <div className="font-medium">{featuredTalk.time}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-muted-foreground mb-1 flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    Audience
                  </div>
                  <div className="font-medium">{featuredTalk.audience}</div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-lg font-medium">Talk Overview</h4>
                <p className="text-muted-foreground">
                  {featuredTalk.description}
                </p>
              </div>

              <div className="mb-6">
                <h4 className="mb-3 text-lg font-medium">Topics Covered</h4>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {featuredTalk.topics.map((topic, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="text-primary text-lg leading-none">•</div>
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <Button asChild>
                  <a
                    href={featuredTalk.link}
                    className="inline-flex items-center gap-2"
                  >
                    <span>View talk details</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Other Talks Section */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Other Recent Talks</h3>
              <Button variant="outline" asChild size="sm">
                <a href="#" className="inline-flex items-center gap-1">
                  <span>View all</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            </div>

            <div className="space-y-4">
              {otherTalks.map((talk) => (
                <div
                  key={talk.id}
                  className="bg-card flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row"
                >
                  <div className="relative h-40 w-full sm:h-auto sm:w-44 md:w-60">
                    <img
                      src={talk.image}
                      alt={talk.title}
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-4">
                    <div>
                      <h4 className="mb-1 text-lg font-medium">{talk.title}</h4>
                      <p className="text-primary font-medium">{talk.event}</p>
                      <div className="text-muted-foreground mt-2 flex flex-wrap gap-3 text-sm">
                        <Badge variant="outline">{talk.role}</Badge>
                        <span>{talk.date}</span>
                        <span>•</span>
                        <span>{talk.location}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="group"
                      >
                        <a
                          href={talk.link}
                          className="text-primary flex items-center gap-1"
                        >
                          <span>Details</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-12" />

          {/* CTA */}
          <div className="text-center">
            <p className="text-muted-foreground mb-6 text-lg">
              Interested in having me speak at your conference or event?
            </p>
            <Button size="lg" asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <Mic className="h-4 w-4" />
                <span>Get in touch about speaking</span>
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
