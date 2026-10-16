import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';

// Sample timeline events data
const timelineEvents = [
  {
    id: 1,
    year: '2024',
    events: [
      {
        id: 101,
        title: 'Responsive Design in 2024',
        event: 'FrontEnd Summit',
        role: 'Keynote Speaker',
        date: 'March 15, 2024',
        location: 'San Francisco, CA',
        link: '#',
      },
      {
        id: 102,
        title: 'UX Workshop: User Research Techniques',
        event: 'DesignMatters Conference',
        role: 'Workshop Leader',
        date: 'January 28, 2024',
        location: 'Virtual Event',
        link: '#',
      },
    ],
  },
  {
    id: 2,
    year: '2023',
    events: [
      {
        id: 201,
        title: 'Building Accessible Web Applications',
        event: 'A11y Summit',
        role: 'Panel Moderator',
        date: 'November 12, 2023',
        location: 'Chicago, IL',
        link: '#',
      },
      {
        id: 202,
        title: 'From Freelancer to Agency Owner',
        event: 'Freelance Business Forum',
        role: 'Featured Speaker',
        date: 'October 5, 2023',
        location: 'Austin, TX',
        link: '#',
      },
      {
        id: 203,
        title: 'Design Systems at Scale',
        event: 'DesignOps Global',
        role: 'Workshop Leader',
        date: 'September 18, 2023',
        location: 'Berlin, Germany',
        link: '#',
      },
      {
        id: 204,
        title: 'Conversion-Focused Web Design',
        event: 'Marketing Innovation Summit',
        role: 'Speaker',
        date: 'July 22, 2023',
        location: 'New York, NY',
        link: '#',
      },
    ],
  },
  {
    id: 3,
    year: '2022',
    events: [
      {
        id: 301,
        title: 'Creating Effective Design Handoff Processes',
        event: 'DesignX Conference',
        role: 'Speaker',
        date: 'December 3, 2022',
        location: 'Toronto, Canada',
        link: '#',
      },
      {
        id: 302,
        title: 'Web Animation Workshop',
        event: 'Frontend Developers Meetup',
        role: 'Workshop Leader',
        date: 'August 17, 2022',
        location: 'Los Angeles, CA',
        link: '#',
      },
      {
        id: 303,
        title: 'Portfolio Reviews & Feedback Session',
        event: 'Design Students Association',
        role: 'Guest Critic',
        date: 'May 4, 2022',
        location: 'Virtual Event',
        link: '#',
      },
    ],
  },
  {
    id: 4,
    year: '2021',
    events: [
      {
        id: 401,
        title: 'Getting Started with Freelance Web Design',
        event: 'Creative Entrepreneurs Summit',
        role: 'Speaker',
        date: 'October 28, 2021',
        location: 'Seattle, WA',
        link: '#',
      },
      {
        id: 402,
        title: 'Intro to Web Accessibility',
        event: 'Tech For All Conference',
        role: 'Workshop Leader',
        date: 'June 12, 2021',
        location: 'Virtual Event',
        link: '#',
      },
    ],
  },
];

export default function TimelineSpeakingEngagements() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 2xl:max-w-[1400px]">
        {/* Section header */}
        <div className="mb-12 text-center md:mb-16">
          <Badge className="mb-4" variant="outline">
            Speaking Journey
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            My Speaking Timeline
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-2xl text-lg">
            A chronological overview of my speaking engagements and workshops
            over the years
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          {/* Timeline */}
          <div className="relative pb-12">
            {/* Timeline line */}
            <div className="bg-border absolute top-0 bottom-0 left-0 w-px lg:left-1/2"></div>

            {timelineEvents.map((yearGroup) => (
              <div key={yearGroup.id} className="mb-12 last:mb-0">
                {/* Year marker */}
                <div className="relative mb-8 flex items-center justify-start lg:justify-center">
                  <div className="bg-primary text-primary-foreground z-10 flex h-10 w-24 items-center justify-center rounded-full text-lg font-bold">
                    {yearGroup.year}
                  </div>
                </div>

                {/* Events for this year */}
                <div className="space-y-8">
                  {yearGroup.events.map((event, index) => (
                    <div
                      key={event.id}
                      className={`relative flex ${
                        index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                      }`}
                    >
                      {/* Event connector dot */}
                      <div className="border-primary bg-background absolute top-7 left-0 h-3 w-3 rounded-full border-2 lg:left-1/2 lg:-ml-1.5"></div>

                      {/* Event content */}
                      <div
                        className={`w-full ${
                          index % 2 === 0
                            ? 'lg:mr-12 lg:w-1/2'
                            : 'lg:ml-12 lg:w-1/2'
                        }`}
                      >
                        <div className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md">
                          <h3 className="text-xl font-semibold">
                            {event.title}
                          </h3>
                          <p className="text-primary mb-2 font-medium">
                            {event.event}
                          </p>
                          <div className="text-muted-foreground mb-4 flex flex-wrap gap-3 text-sm">
                            <Badge variant="outline">{event.role}</Badge>
                            <span>{event.date}</span>
                            <span>•</span>
                            <span>{event.location}</span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="group p-0 hover:bg-transparent"
                          >
                            <a
                              href={event.link}
                              className="text-primary flex items-center"
                            >
                              <span className="mr-1">Event details</span>
                              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Button asChild>
              <a href="#" className="inline-flex items-center gap-2">
                <span>Contact me about speaking at your event</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
