import { useState, useEffect } from 'react';

import { Button } from '../../../ui/button';
import { ArrowRight } from 'lucide-react';

export default function AnimatedTextHero() {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrases = [
    'innovative solutions',
    'creative workflows',
    'powerful analytics',
    'seamless experiences',
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = 1500;

    const currentPhrase = phrases[currentPhraseIndex]!;

    // Handle typing, pausing, and deleting
    const timer = setTimeout(() => {
      if (!isDeleting && typedText === currentPhrase) {
        // Finished typing, wait before starting to delete
        setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      } else if (isDeleting && typedText === '') {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        return;
      }

      // Either typing or deleting
      setTypedText((prev) => {
        if (isDeleting) {
          return prev.substring(0, prev.length - 1);
        } else {
          return currentPhrase.substring(0, prev.length + 1);
        }
      });
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedText, currentPhraseIndex, isDeleting, phrases]);

  return (
    <div className="bg-background relative overflow-hidden">
      <div className="via-foreground/10 absolute top-0 right-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"></div>

      <div className="container mx-auto px-4 py-24 md:px-6 md:py-32 lg:py-40 2xl:max-w-[1400px]">
        <div className="mx-auto flex max-w-4xl flex-col items-center space-y-10 text-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Empower your team with{' '}
              <span className="relative inline-flex overflow-hidden">
                <span className="text-primary">{typedText}</span>
                <span className="bg-primary absolute right-0 h-full w-[2px] animate-pulse"></span>
              </span>
            </h1>
            <p className="text-muted-foreground dark:text-muted-foreground/90 mx-auto max-w-[700px] md:text-xl">
              Our platform helps teams work smarter, not harder. Streamline your
              workflow, boost productivity, and deliver exceptional results.
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-col gap-4 sm:flex-row">
            <Button size="lg" className="w-full" asChild>
              <a href="#">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full dark:border-gray-700"
              asChild
            >
              <a href="#">Book a Demo</a>
            </Button>
          </div>

          <div className="grid w-full max-w-3xl grid-cols-2 gap-8 pt-12 md:grid-cols-4">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-foreground text-3xl font-bold">10k+</div>
              <div className="text-muted-foreground text-sm">Active Users</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-foreground text-3xl font-bold">200+</div>
              <div className="text-muted-foreground text-sm">
                Enterprise Clients
              </div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-foreground text-3xl font-bold">99.9%</div>
              <div className="text-muted-foreground text-sm">Uptime</div>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <div className="text-foreground text-3xl font-bold">24/7</div>
              <div className="text-muted-foreground text-sm">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="via-foreground/10 absolute right-0 bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent to-transparent"></div>
    </div>
  );
}
