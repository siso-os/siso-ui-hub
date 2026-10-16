import { CalendarDays } from "lucide-react";

export default function MissionAndValuesTimeline() {
  const timelineEvents = [
    {
      year: "2015",
      title: "The Beginning",
      description:
        "Founded with a mission to create digital products that make a difference.",
      value: "Vision",
      valueDescription: "Looking beyond what exists to what could be.",
    },
    {
      year: "2017",
      title: "First Major Client",
      description:
        "Partnered with industry leaders to transform their digital presence.",
      value: "Excellence",
      valueDescription:
        "Committing to exceptional quality in everything we do.",
    },
    {
      year: "2019",
      title: "Team Expansion",
      description: "Grew from 5 to 25 team members across three countries.",
      value: "Collaboration",
      valueDescription:
        "Bringing diverse perspectives together to solve complex challenges.",
    },
    {
      year: "2021",
      title: "Innovation Lab",
      description:
        "Launched our dedicated R&D department to explore emerging technologies.",
      value: "Innovation",
      valueDescription: "Continuously seeking new ways to create impact.",
    },
    {
      year: "2023",
      title: "Global Recognition",
      description:
        "Recognized with multiple awards for our innovative approach and impact.",
      value: "Purpose",
      valueDescription:
        "Making meaningful contributions that matter in the world.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Journey & Values
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            How our mission evolved and the core values we developed along the
            way.
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            {/* Vertical Line */}
            <div className="bg-border absolute top-0 left-0 hidden h-full w-px md:left-1/2 md:-ml-px md:block" />

            {/* Timeline Events */}
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`relative ${index !== 0 ? "mt-12 md:mt-20" : ""}`}
              >
                {/* Year Badge */}
                <div className="mb-6 flex items-center justify-center md:absolute md:left-1/2 md:z-10 md:mb-0 md:-ml-11">
                  <div className="bg-primary text-primary-foreground flex h-9 w-20 items-center justify-center rounded-full text-sm font-medium shadow-sm">
                    {event.year}
                  </div>
                </div>

                {/* Content Cards */}
                <div
                  className={`relative flex flex-col gap-6 md:grid md:grid-cols-2 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  {/* Event Card */}
                  <div className={`bg-card rounded-lg border p-6 shadow-sm`}>
                    <div className="mb-4 flex items-center gap-2">
                      <CalendarDays className="text-muted-foreground h-5 w-5" />
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                    </div>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>

                  {/* Value Card */}
                  <div
                    className={`bg-primary/5 rounded-lg border p-6 shadow-sm`}
                  >
                    <h3 className="mb-2 text-lg font-medium">
                      Value:{" "}
                      <span className="text-primary font-semibold">
                        {event.value}
                      </span>
                    </h3>
                    <p className="text-muted-foreground">
                      {event.valueDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Current Mission Statement */}
          <div className="bg-card mt-16 rounded-lg border p-8 text-center shadow-md">
            <h3 className="mb-4 text-2xl font-bold">Our Mission Today</h3>
            <p className="text-muted-foreground text-lg">
              To create impactful digital experiences that empower organizations
              and individuals while upholding our values of innovation,
              excellence, collaboration, vision, and purpose.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
