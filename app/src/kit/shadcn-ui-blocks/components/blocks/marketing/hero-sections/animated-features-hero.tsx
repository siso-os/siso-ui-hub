import { useState } from 'react';

import { Button } from '../../../ui/button';
import { ArrowRight } from 'lucide-react';

export default function AnimatedFeaturesHero() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: 'Powerful Analytics',
      description:
        'Gain deep insights into user behavior and business metrics with our advanced analytics dashboard.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      ),
    },
    {
      title: 'Team Collaboration',
      description:
        'Work seamlessly with your team in real-time with collaborative editing and shared workspaces.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: 'Smart Automation',
      description:
        'Automate repetitive tasks and workflows to save time and reduce errors in your processes.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
          <path d="M2 20h20" />
          <path d="M14 12v.01" />
        </svg>
      ),
    },
    {
      title: 'Enterprise Security',
      description:
        'Rest easy with enterprise-grade security features including encryption, SSO, and compliance tools.',
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="from-background via-background to-muted/20 relative overflow-hidden bg-gradient-to-b">
      <div className="container mx-auto px-4 py-24 md:px-6 md:py-32 2xl:max-w-[1400px]">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Your platform for{' '}
            <span className="text-primary relative inline-flex">
              <span className="animate-text-gradient from-primary to-primary via-muted-foreground bg-gradient-to-r bg-[200%_auto] bg-clip-text text-transparent">
                innovation
              </span>
            </span>
          </h1>
          <p className="text-muted-foreground mt-6 text-xl">
            A powerful, all-in-one platform that helps teams build better
            products, faster.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild>
              <a href="#">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#">Book a Demo</a>
            </Button>
          </div>
        </div>

        {/* Animated features showcase */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_500px]">
          {/* Left side animated tabs */}
          <div className="order-2 lg:order-1">
            <div className="bg-card rounded-xl border p-1">
              <div className="grid grid-cols-4 gap-1">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFeature(index)}
                    className={`hover:bg-muted flex flex-col items-center justify-center rounded-lg p-3 text-center transition-colors ${
                      activeFeature === index
                        ? 'bg-primary text-primary-foreground hover:bg-primary'
                        : ''
                    }`}
                  >
                    <div className="mb-2">{feature.icon}</div>
                    <div className="text-xs font-medium">
                      {feature.title.split(' ')[0]}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 rounded-xl border p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-full p-3 ${
                    activeFeature === 0
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400'
                      : activeFeature === 1
                        ? 'bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400'
                        : activeFeature === 2
                          ? 'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400'
                          : 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400'
                  }`}
                >
                  {features[activeFeature]!.icon}
                </div>
                <div>
                  <h3 className="font-medium">
                    {features[activeFeature]!.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {features[activeFeature]!.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center gap-2">
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
                    className="text-primary h-5 w-5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm">
                    {activeFeature === 0
                      ? 'Real-time data visualization'
                      : activeFeature === 1
                        ? 'Real-time commenting and feedback'
                        : activeFeature === 2
                          ? 'Customizable workflow automation'
                          : 'Role-based access controls'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
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
                    className="text-primary h-5 w-5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm">
                    {activeFeature === 0
                      ? 'Custom reports and dashboards'
                      : activeFeature === 1
                        ? 'Shared workspaces and permissions'
                        : activeFeature === 2
                          ? 'AI-powered suggestions'
                          : 'Data encryption at rest and in transit'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
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
                    className="text-primary h-5 w-5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="text-sm">
                    {activeFeature === 0
                      ? 'Advanced filtering and segmentation'
                      : activeFeature === 1
                        ? 'Version history and comparison'
                        : activeFeature === 2
                          ? 'Scheduled tasks and triggers'
                          : 'Compliance with GDPR, HIPAA, SOC 2'}
                  </span>
                </div>
              </div>

              <div className="mt-6 border-t pt-6">
                <Button variant="ghost" size="sm" className="gap-1" asChild>
                  <a href="#">
                    Learn more about{' '}
                    {features[activeFeature]!.title.toLowerCase()}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Right side animated illustration */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative aspect-square w-full max-w-md">
              {/* Animated illustration based on active feature */}
              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeFeature === 0 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl border bg-gradient-to-br from-blue-50 to-blue-100 p-8 dark:from-blue-950/30 dark:to-blue-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240"
                    height="240"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M3 15h18" />
                    <path d="M9 3v18" />
                    <path d="M15 3v18" />
                  </svg>
                </div>
              </div>

              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeFeature === 1 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl border bg-gradient-to-br from-purple-50 to-purple-100 p-8 dark:from-purple-950/30 dark:to-purple-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240"
                    height="240"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-purple-500"
                  >
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    <circle cx="12" cy="2" r="1" />
                  </svg>
                </div>
              </div>

              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeFeature === 2 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl border bg-gradient-to-br from-green-50 to-green-100 p-8 dark:from-green-950/30 dark:to-green-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240"
                    height="240"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-500"
                  >
                    <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                    <path d="M12 13v8" />
                    <path d="M12 3v3" />
                  </svg>
                </div>
              </div>

              <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                  activeFeature === 3 ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="flex h-full w-full items-center justify-center rounded-xl border bg-gradient-to-br from-amber-50 to-amber-100 p-8 dark:from-amber-950/30 dark:to-amber-900/20">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="240"
                    height="240"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-amber-500"
                  >
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="via-foreground/10 absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent to-transparent"></div>
    </div>
  );
}
