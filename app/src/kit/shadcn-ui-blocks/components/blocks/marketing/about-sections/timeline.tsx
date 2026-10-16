import { Card, CardContent } from "../../../ui/card";
import { BadgeCheck } from "lucide-react";

const timelineEvents = [
  {
    year: "2010",
    title: "Company Founded",
    description: "Started with a team of 3 in a small office in San Francisco.",
  },
  {
    year: "2013",
    title: "First Major Product Launch",
    description: "Released our flagship product that changed the industry.",
  },
  {
    year: "2015",
    title: "International Expansion",
    description: "Opened our first international offices in London and Tokyo.",
  },
  {
    year: "2018",
    title: "100,000 Customers",
    description: "Reached a milestone of 100,000 active customers worldwide.",
  },
  {
    year: "2020",
    title: "Major Acquisition",
    description: "Acquired our biggest competitor to expand our market reach.",
  },
  {
    year: "2023",
    title: "Sustainability Initiative",
    description: "Launched our commitment to be carbon neutral by 2025.",
  },
];

export default function AboutSectionTimeline() {
  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <h2 className="text-3xl font-bold">Our Journey</h2>
        <p className="text-muted-foreground">
          From humble beginnings to industry leader — explore the milestones
          that have shaped our company&apos;s growth and success over the years.
        </p>
      </div>

      {/* Desktop Timeline (hidden on mobile) */}
      <div className="relative mx-auto hidden max-w-4xl pt-10 md:block">
        {/* Timeline line */}
        <div className="bg-border absolute left-1/2 h-full w-0.5 -translate-x-1/2 transform" />

        {/* Timeline events */}
        <div className="space-y-12">
          {timelineEvents.map((event, index) => (
            <div
              key={event.year}
              className={`relative flex items-center ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              } gap-8`}
            >
              {/* Year marker */}
              <div className="absolute left-1/2 z-10 -translate-x-1/2 transform">
                <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full font-bold">
                  {event.year}
                </div>
              </div>

              {/* Content */}
              <div
                className={`w-1/2 ${
                  index % 2 === 0 ? "pr-16 text-right" : "pl-16"
                }`}
              >
                <Card className="p-0">
                  <CardContent className="space-y-2 p-5">
                    <div
                      className={`flex items-center gap-2 ${
                        index % 2 === 0 ? "justify-end" : ""
                      }`}
                    >
                      <BadgeCheck className="text-primary h-5 w-5" />
                      <h3 className="font-bold">{event.title}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {event.description}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Empty space for the other side */}
              <div className="w-1/2" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Timeline (shown only on mobile) */}
      <div className="relative mx-auto max-w-md pt-4 md:hidden">
        {/* Timeline line */}
        <div className="bg-border absolute top-0 bottom-0 left-6 w-0.5" />

        {/* Timeline events */}
        <div className="space-y-8">
          {timelineEvents.map((event) => (
            <div key={event.year} className="relative pl-16">
              {/* Year marker */}
              <div className="absolute left-0 z-10">
                <div className="bg-primary text-primary-foreground flex h-12 w-12 items-center justify-center rounded-full font-bold">
                  {event.year}
                </div>
              </div>

              {/* Content */}
              <Card className="p-0">
                <CardContent className="space-y-2 p-4">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="text-primary h-5 w-5" />
                    <h3 className="font-bold">{event.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {event.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
