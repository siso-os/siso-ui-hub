import { useState } from 'react';
import { Button } from '../../../ui/button';
import { cn } from '@/arc-shims/kit-utils';

const features = [
  {
    title: 'Quick Start',
    description: 'Get started in seconds with our CLI tool.',
    command: 'npx create-app@latest my-app',
    output: [
      'Creating a new app...',
      'Installing dependencies...',
      'Success! Created my-app at /path/to/my-app',
      '',
      'Get started with:',
      '  cd my-app',
      '  npm run dev',
    ],
  },
  {
    title: 'Database Setup',
    description: 'Set up your database with a single command.',
    command: 'npm run db:setup',
    output: [
      'Setting up database...',
      'Creating tables...',
      'Running migrations...',
      'Seeding initial data...',
      '',
      'Database setup complete!',
    ],
  },
  {
    title: 'Deploy',
    description: 'Deploy your app to production instantly.',
    command: 'npm run deploy',
    output: [
      'Building application...',
      'Running tests...',
      'Optimizing assets...',
      'Deploying to production...',
      '',
      '🚀 Deployed successfully!',
      '  URL: https://your-app.com',
    ],
  },
];

function Terminal({ command, output }: { command: string; output: string[] }) {
  return (
    <div className="bg-foreground overflow-hidden rounded-lg">
      <div className="bg-accent-foreground flex items-center gap-2 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-500" />
        <div className="h-3 w-3 rounded-full bg-yellow-500" />
        <div className="h-3 w-3 rounded-full bg-green-500" />
      </div>
      <div className="p-4 font-mono text-sm">
        <div className="text-muted-foreground flex items-center gap-2">
          <span>$</span>
          <span className="text-background">{command}</span>
        </div>
        <div className="mt-4 space-y-1">
          {output.map((line, i) => (
            <div key={i} className={line ? 'text-muted/90' : 'h-4'}>
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FeatureSectionTerminal() {
  const [activeFeature, setActiveFeature] = useState(0);

  return (
    <section className="container mx-auto space-y-8 px-4 py-24 md:px-6 2xl:max-w-[1400px]">
      <div className="space-y-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Simple commands, powerful results
        </h2>
        <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Build and deploy your applications with just a few commands.
        </p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[1fr,2fr]">
        <div className="flex flex-col gap-4">
          {features.map((feature, index) => (
            <Button
              key={feature.title}
              variant={activeFeature === index ? 'default' : 'ghost'}
              className="h-auto justify-start p-4 whitespace-normal"
              onClick={() => setActiveFeature(index)}
            >
              <div className="text-left">
                <h3 className="font-semibold">{feature.title}</h3>
                <p
                  className={cn(
                    'text-muted-foreground mt-1 text-sm',
                    activeFeature === index && 'text-muted/90'
                  )}
                >
                  {feature.description}
                </p>
              </div>
            </Button>
          ))}
        </div>

        <div className="relative">
          <Terminal
            command={features[activeFeature]!.command}
            output={features[activeFeature]!.output}
          />
        </div>
      </div>
    </section>
  );
}
