import { ExternalLink, Calendar } from 'lucide-react';

export default function AwardsAndRecognitionTimeline() {
  const awards = [
    {
      year: '2023',
      month: 'November',
      name: 'Design Excellence Award',
      organization: 'International Web Design Council',
      description:
        'Recognized for exceptional user interface design and accessibility standards.',
      logo: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      year: '2022',
      month: 'September',
      name: 'Rising Talent Award',
      organization: 'Creative Network Alliance',
      description:
        'Selected from over 3,000 nominees as an emerging talent in digital design.',
      logo: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      year: '2021',
      month: 'June',
      name: 'Best Portfolio Website',
      organization: 'Webflow Awards',
      description:
        'Honored for creating an innovative and engaging portfolio experience.',
      logo: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      year: '2020',
      month: 'August',
      name: 'UX Certificate with Distinction',
      organization: 'Nielsen Norman Group',
      description:
        'Completed advanced user experience certification with highest honors.',
      logo: 'https://images.unsplash.com/photo-1567427361984-0cbe7396fc6c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      year: '2019',
      month: 'March',
      name: 'Front-End Developer Certification',
      organization: 'Mozilla Development Network',
      description:
        'Recognized for excellence in front-end web development techniques.',
      logo: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Professional Recognition
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            A timeline of awards, certifications, and achievements throughout my
            career.
          </p>
        </div>

        {/* Timeline */}
        <div className="mx-auto max-w-4xl">
          {/* Mobile Timeline */}
          <div className="space-y-6 md:hidden">
            {awards.map((award, index) => (
              <div
                key={index}
                className="bg-card rounded-lg border p-5 shadow-sm"
              >
                {/* Header Row with Image, Name and Organization */}
                <div className="flex items-center gap-3">
                  {/* Logo */}
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border">
                    <img
                      src={award.logo}
                      alt={award.organization}
                      className="object-cover"
                    />
                  </div>

                  {/* Award Title and Organization */}
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base leading-tight font-semibold">
                      {award.name}
                    </h3>
                    <p className="text-muted-foreground truncate text-xs font-medium">
                      {award.organization}
                    </p>
                    <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {award.month} {award.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mt-4 text-sm">
                  {award.description}
                </p>

                {/* Link */}
                <div className="mt-3">
                  <a
                    href={award.link}
                    className="text-primary inline-flex items-center text-sm font-medium hover:underline"
                  >
                    View Certificate
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Timeline */}
          <div className="hidden space-y-8 md:block">
            {awards.map((award, index) => (
              <div key={index} className="relative">
                {/* Date Badge (only element from timeline kept) */}
                <div className="absolute top-6 -left-4 z-10">
                  <div className="bg-primary text-primary-foreground flex h-10 items-center justify-center rounded-full px-4 text-sm font-medium">
                    {award.year}
                  </div>
                </div>

                {/* Award Card (same layout as mobile) */}
                <div className="bg-card ml-14 rounded-lg border p-6 shadow-sm">
                  {/* Header Row with Image, Name and Organization */}
                  <div className="flex items-center gap-4">
                    {/* Logo */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                      <img
                        src={award.logo}
                        alt={award.organization}
                        className="object-cover"
                      />
                    </div>

                    {/* Award Title and Organization */}
                    <div className="min-w-0 flex-1">
                      <h3 className="text-xl leading-tight font-semibold">
                        {award.name}
                      </h3>
                      <p className="text-muted-foreground text-sm font-medium">
                        {award.organization}
                      </p>
                      <div className="text-muted-foreground mt-1 flex items-center gap-1 text-xs">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {award.month} {award.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mt-5">
                    {award.description}
                  </p>

                  {/* Link */}
                  <div className="mt-4">
                    <a
                      href={award.link}
                      className="text-primary inline-flex items-center text-sm font-medium hover:underline"
                    >
                      View Certificate
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
