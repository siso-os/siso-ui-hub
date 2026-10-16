import { Check } from "lucide-react";

export default function MissionAndValuesStoryFirst() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Personal Story */}
        <div className="mx-auto mb-16 max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Journey
          </h2>

          <div className="prose dark:prose-invert lg:prose-lg max-w-none">
            <p>
              It all began in a small apartment in 2015. With nothing but a
              laptop and a vision, we set out to change how people interact with
              digital products. The early days were challenging — long nights,
              countless iterations, and moments of doubt.
            </p>

            <p>
              Our first breakthrough came when we partnered with a local
              business facing a critical challenge. By focusing on their unique
              needs rather than applying a one-size-fits-all approach, we
              created a solution that transformed their operations. That success
              taught us a fundamental lesson: genuine understanding of
              people&apos;s needs is the foundation of meaningful innovation.
            </p>

            <p>
              As we grew from that two-person team to the organization we are
              today, we&apos;ve held onto that principle. Whether working with
              startups or established enterprises, we approach each project with
              the same dedication to understanding, creating, and delivering
              solutions that make a difference.
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-card mx-auto mb-12 max-w-3xl rounded-lg border p-8 text-center shadow-sm">
          <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
          <p className="text-muted-foreground text-lg">
            To empower businesses and individuals through thoughtful digital
            solutions that balance innovation with human-centered design.
          </p>
        </div>

        {/* Core Values List */}
        <div className="mx-auto max-w-3xl">
          <h3 className="mb-6 text-center text-2xl font-bold">
            Our Core Values
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              {
                title: "Empathy First",
                description:
                  "We listen before we create, understanding needs before proposing solutions.",
              },
              {
                title: "Continuous Learning",
                description:
                  "We embrace change and constantly seek new knowledge and perspectives.",
              },
              {
                title: "Quality Craftsmanship",
                description:
                  "We take pride in our work and pay attention to every detail.",
              },
              {
                title: "Transparent Partnership",
                description:
                  "We build relationships based on honesty, clarity, and mutual respect.",
              },
            ].map((value, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-md border p-4"
              >
                <div className="bg-primary/10 text-primary flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <div>
                  <h4 className="font-medium">{value.title}</h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
