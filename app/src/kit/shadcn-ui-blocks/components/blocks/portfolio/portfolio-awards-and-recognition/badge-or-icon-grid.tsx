export default function AwardsAndRecognitionBadgeGrid() {
  const awards = [
    {
      name: 'Webby Award 2023',
      category: 'Excellence in Interactive Design',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'CSS Design Award',
      category: 'Website of the Month',
      logo: 'https://images.unsplash.com/photo-1569012871812-f38ee64cd54c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'Adobe Design Achievement',
      category: 'Digital Experience Design',
      logo: 'https://images.unsplash.com/photo-1621839673705-6617adf9e890?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'FWA Award',
      category: 'Innovative Digital Experience',
      logo: 'https://images.unsplash.com/photo-1567427361984-0cbe7396fc6c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'UX Design Award',
      category: 'Best Navigation Experience',
      logo: 'https://images.unsplash.com/photo-1567427361984-0cbe7396fc6c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'Google Certified Partner',
      category: 'Analytics Professional',
      logo: 'https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?q=80&w=1918&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'HubSpot Certification',
      category: 'Inbound Marketing Expert',
      logo: 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
    {
      name: 'Shopify Partner',
      category: 'E-commerce Specialist',
      logo: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      link: '#',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Awards & Achievements
          </h2>
          <p className="text-muted-foreground mx-auto max-w-3xl text-lg">
            Recognition from industry leaders and professional certifications
            that validate my expertise.
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {awards.map((award, index) => (
            <a key={index} href={award.link} className="group flex">
              <div className="bg-card flex grow flex-col items-center rounded-lg border p-6 text-center shadow-sm transition-all hover:shadow-md">
                <div className="border-background relative mb-4 h-20 w-20 overflow-hidden rounded-full border-4">
                  <img
                    src={award.logo}
                    alt={award.name}
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="mb-1 text-lg font-semibold">{award.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {award.category}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
