import { Button } from '../../../ui/button';

const features = [
  {
    title: 'Streamlined Workflow',
    description:
      'Automate your workflow with our intuitive tools. Build, deploy, and scale your applications with ease.',
    image: 'https://placehold.co/1024x768/jpeg',
    imageAlt: 'Workflow dashboard screenshot',
    reverse: false,
  },
  {
    title: 'Real-time Collaboration',
    description:
      'Work together in real-time with your team. Share, edit, and review code seamlessly.',
    image: 'https://placehold.co/1024x768/jpeg',
    imageAlt: 'Collaboration interface screenshot',
    reverse: true,
  },
  {
    title: 'Advanced Analytics',
    description:
      "Get deep insights into your application's performance with our advanced analytics tools.",
    image: 'https://placehold.co/1024x768/jpeg',
    imageAlt: 'Analytics dashboard screenshot',
    reverse: false,
  },
];

export default function FeatureSectionWithImages() {
  return (
    <section className="container mx-auto space-y-24 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Built for developers
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Our platform provides the tools you need to build amazing
          applications. Focus on what matters most - your code.
        </p>
      </div>

      <div className="space-y-24">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`grid-col-1 grid items-center gap-8 lg:grid-cols-2 ${
              feature.reverse
                ? 'lg:grid-cols-[1fr,1fr]'
                : 'lg:grid-cols-[1fr,1fr]'
            }`}
          >
            <div className={feature.reverse ? 'lg:order-last' : ''}>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                <Button>Learn more</Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <img
                src={feature.image}
                alt={feature.imageAlt}
                className="object-cover object-center"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
