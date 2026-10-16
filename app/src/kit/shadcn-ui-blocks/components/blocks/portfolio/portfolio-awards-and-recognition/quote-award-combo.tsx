import { Trophy, Award, Medal } from 'lucide-react';

export default function AwardsAndRecognitionQuoteCombo() {
  const awards = [
    {
      name: 'Digital Innovation Award',
      organization: 'Creative Technology Foundation',
      year: '2023',
      quote:
        'Sets new standards for what a modern digital experience can achieve. Exceptional technical implementation paired with creative vision.',
      judge: 'Sarah Johnson',
      judgeTitle: 'Head of Jury, Digital Innovation Awards',
      icon: <Trophy className="h-6 w-6" />,
      link: '#',
    },
    {
      name: 'Excellence in UX Design',
      organization: 'UX Design Association',
      year: '2022',
      quote:
        'A masterclass in user-centered design. Every interaction has been thoughtfully crafted with the end-user in mind.',
      judge: 'Michael Chen',
      judgeTitle: 'UX Design Director, Tech Innovations',
      icon: <Award className="h-6 w-6" />,
      link: '#',
    },
    {
      name: 'Best Portfolio Website',
      organization: 'Web Design Awards',
      year: '2021',
      quote:
        'The perfect balance of aesthetics and functionality. This portfolio sets the creator apart as a true professional in their field.',
      judge: 'Alexandra Rivera',
      judgeTitle: 'Senior Creative Director, DesignStudio',
      icon: <Medal className="h-6 w-6" />,
      link: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Award Recognition
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            What industry experts have said about my award-winning work.
          </p>
        </div>

        {/* Awards with Quotes */}
        <div className="mx-auto grid max-w-5xl gap-8 md:gap-12">
          {awards.map((award, index) => (
            <div
              key={index}
              className={`bg-card relative overflow-hidden rounded-xl border p-8 shadow-sm ${
                index === 0 ? 'md:p-10' : ''
              }`}
            >
              {/* Award Info */}
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <div className="text-muted-foreground text-sm font-medium">
                    {award.organization} • {award.year}
                  </div>
                  <h3 className="mt-1 text-xl font-bold md:text-2xl">
                    {award.name}
                  </h3>
                </div>
                <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                  {award.icon}
                </div>
              </div>

              {/* Quote */}
              <div className="bg-muted relative mb-8 rounded-lg p-6">
                <blockquote className="italic">
                  &quot;{award.quote}&quot;
                </blockquote>
                <div className="mt-4 flex items-center">
                  <div className="">
                    <p className="font-medium">{award.judge}</p>
                    <p className="text-muted-foreground text-sm">
                      {award.judgeTitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* Link */}
              <div className="text-right">
                <a
                  href={award.link}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Learn more about this award
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Personal Reflection */}
        <div className="bg-card mx-auto mt-16 max-w-3xl rounded-lg border p-8 text-center">
          <h3 className="mb-4 text-xl font-semibold">My Reflection</h3>
          <p className="text-muted-foreground">
            These awards represent not just recognition of my work, but
            milestones in my professional journey. Each one has pushed me to
            explore new techniques, refine my skills, and continue delivering
            exceptional results for my clients. I&apos;m honored to have my work
            recognized by these respected organizations.
          </p>
        </div>
      </div>
    </section>
  );
}
