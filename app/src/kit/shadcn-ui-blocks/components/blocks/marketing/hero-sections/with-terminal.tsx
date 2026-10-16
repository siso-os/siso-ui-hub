import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Card } from '../../../ui/card';
import { useState, useEffect } from 'react';

export default function HeroSectionWithTerminal() {
  const [currentCommand, setCurrentCommand] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [typedText, setTypedText] = useState('');

  const commands = [
    {
      command: 'npx create-next-app@latest my-app --template=shadcn-ui',
      output: [
        'Creating a new Next.js app with shadcn/ui...',
        '✓ Project initialized',
        '✓ Dependencies installed',
        '✓ Components configured',
        '',
        'Success! Your project is ready.',
        'Next steps:',
        '  cd my-app',
        '  npm run dev',
      ],
    },
    {
      command: 'npm run dev',
      output: [
        'ready - started server on 0.0.0.0:3000',
        'event - compiled client and server successfully in 188 ms',
        'ℹ waiting for file changes',
      ],
    },
    {
      command: 'npx shadcn-ui@latest add button',
      output: [
        'Adding button component...',
        '✓ Created components/ui/button.tsx',
        '✓ Updated styles/globals.css',
        '✓ Component installed successfully',
      ],
    },
  ];

  useEffect(() => {
    if (isTyping) {
      if (typedText.length < commands[currentCommand]!.command.length) {
        const timer = setTimeout(() => {
          setTypedText(
            commands[currentCommand]!.command.slice(0, typedText.length + 1)
          );
        }, 50);
        return () => clearTimeout(timer);
      } else {
        setIsTyping(false);
        const timer = setTimeout(() => {
          if (currentCommand < commands.length - 1) {
            setCurrentCommand(currentCommand + 1);
            setTypedText('');
            setIsTyping(true);
          }
        }, 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [typedText, isTyping, currentCommand, commands]);

  return (
    <>
      <div className="">
        <div className="relative">
          {/* Background pattern */}
          <div className="absolute inset-0 -z-10 h-full w-full">
            <div className="absolute h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[radial-gradient(circle_800px_at_100%_200px,rgba(120,119,198,0.1),transparent)]"></div>
          </div>

          <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <Badge variant="outline" className="mb-4">
                Quick Start
              </Badge>
              <h1 className="mb-4 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Get started in seconds
              </h1>
              <p className="text-muted-foreground mb-8 text-xl">
                Start building beautiful applications with our components.
                Simple installation, instant results.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button size="lg">
                  Install Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="ml-2 h-4 w-4"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
                <Button size="lg" variant="outline">
                  Read Docs
                </Button>
              </div>
            </div>

            {/* Terminal */}
            <div className="mx-auto max-w-4xl">
              <Card className="border-2">
                {/* Terminal Header */}
                <div className="bg-muted flex items-center justify-between border-b p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="text-muted-foreground text-sm">
                      terminal
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Copy
                  </Button>
                </div>

                {/* Terminal Content */}
                <div className="space-y-4 bg-black p-4 font-mono text-sm text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">➜</span>
                    <span className="text-blue-500">~</span>
                    <span>{typedText}</span>
                    {isTyping && (
                      <span className="h-4 w-2 animate-pulse bg-white" />
                    )}
                  </div>
                  {!isTyping && (
                    <div className="text-muted-foreground space-y-1">
                      {commands[currentCommand]!.output.map((line, index) => (
                        <div key={index}>{line}</div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>

              {/* Features */}
              <div className="mt-12 grid gap-6 md:grid-cols-3">
                <Card className="p-6">
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="m18.5 5.5-8.5 8.5-4-4" />
                      <path d="M18.5 5.5h-4v-4" />
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Quick Setup</h3>
                  <p className="text-muted-foreground text-sm">
                    Install and start building in minutes
                  </p>
                </Card>
                <Card className="p-6">
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                      <path d="M7 7h.01" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">Zero Config</h3>
                  <p className="text-muted-foreground text-sm">
                    Works out of the box with Next.js
                  </p>
                </Card>
                <Card className="p-6">
                  <div className="bg-primary/10 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary"
                    >
                      <path d="m7 11 2-2-2-2" />
                      <path d="M11 13h4" />
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    </svg>
                  </div>
                  <h3 className="mb-2 font-semibold">CLI Tools</h3>
                  <p className="text-muted-foreground text-sm">
                    Powerful CLI for adding components
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
