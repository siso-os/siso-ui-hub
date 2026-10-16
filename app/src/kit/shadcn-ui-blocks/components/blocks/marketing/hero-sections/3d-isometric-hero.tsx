/*
 * This component requires the following global CSS styles:
 *
 * .perspective {
 *   perspective: 1000px;
 * }
 *
 * .transform-style {
 *   transform-style: preserve-3d;
 * }
 *
 * .rotateX-[60deg] {
 *   transform: rotateX(60deg);
 * }
 *
 * .rotateY-90 {
 *   transform: rotateY(90deg);
 * }
 *
 * .rotateX-90 {
 *   transform: rotateX(90deg);
 * }
 *
 * .rotateZ-[45deg] {
 *   transform: rotateZ(45deg);
 * }
 *
 * .translate-z-5 {
 *   transform: translateZ(5px);
 * }
 *
 * .translate-z-6 {
 *   transform: translateZ(6px);
 * }
 *
 * .translate-z-7 {
 *   transform: translateZ(7px);
 * }
 *
 * .translate-z-8 {
 *   transform: translateZ(8px);
 * }
 *
 * .translate-z-24 {
 *   transform: translateZ(24px);
 * }
 *
 * .animate-spin-slow {
 *   animation: spin 6s linear infinite;
 * }
 *
 * .animate-bounce-slow {
 *   animation: bounce 3s ease-in-out infinite;
 * }
 *
 * .delay-100 {
 *   animation-delay: 100ms;
 * }
 *
 * .delay-200 {
 *   animation-delay: 200ms;
 * }
 *
 * .delay-300 {
 *   animation-delay: 300ms;
 * }
 *
 * @keyframes bounce {
 *   0%, 100% {
 *     transform: translateY(0);
 *   }
 *   50% {
 *     transform: translateY(-20px);
 *   }
 * }
 */

import { Button } from '../../../ui/button';
import { CheckIcon, ChevronRight, Code2, FileText } from 'lucide-react';

export default function IsometricHero() {
  return (
    <div className="relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] bg-[size:14px_24px]"></div>

      <div className="relative container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="grid gap-6 pt-12 pb-8 md:pt-16 md:pb-12 lg:grid-cols-2 lg:pt-20 lg:pb-16">
          <div className="flex flex-col justify-center space-y-8">
            {/* Notification badge */}
            <div className="border-primary/20 bg-primary/10 text-primary inline-flex max-w-fit items-center rounded-full border px-3 py-1 text-sm font-medium">
              <span className="sm:hidden">New features available</span>
              <span className="hidden sm:inline">
                Just released: Enhanced customization and new components
              </span>
            </div>

            {/* Heading and description */}
            <div>
              <h1 className="from-foreground to-foreground/60 mb-4 bg-gradient-to-r bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                Build better interfaces with modern components
              </h1>
              <p className="text-muted-foreground mb-8 max-w-[85%] text-xl">
                A professionally designed component library for creating
                beautiful, responsive applications that match your brand.
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-3">
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  Customizable components for any design system
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  Dark mode support out of the box
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="text-primary h-4 w-4" />
                <span className="text-muted-foreground text-sm">
                  Built with TypeScript and fully accessible
                </span>
              </div>
            </div>

            {/* Call to action */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" asChild>
                <a href="#">
                  Get Started
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href="#">
                  View Documentation
                  <FileText className="h-4 w-4" />
                </a>
              </Button>
            </div>

            {/* Trusted by */}
            <div className="flex flex-col space-y-3 pt-6">
              <div className="text-muted-foreground text-sm">
                Trusted by developers at
              </div>
              <div className="flex items-center gap-6">
                <div className="text-muted-foreground/60">
                  <svg
                    className="h-5 w-auto"
                    viewBox="0 0 124 34"
                    fill="currentColor"
                  >
                    <path d="M42.1 15.1c0 3.2-2.7 5.9-7.1 5.9h-4.3v5.8h-4.5V9.4h8.8c4.3 0 7.1 2.5 7.1 5.7zm-4.7 0c0-1.3-1.2-2.2-2.7-2.2h-4v4.4h4c1.5 0 2.7-.9 2.7-2.2zM43.1 26.8V9.4h15.6v3.7h-11v3.3h9.6v3.7h-9.6v3h11v3.7H43.1zM59.5 26.8l10-17.5H76l10 17.5h-5.2L79 23.4h-7.9l-1.9 3.4h-9.7zm11.7-6.9h4.2l-2.1-3.8-2.1 3.8zM111.6 26.8l-4.5-5.7-4.5 5.7h-5.5l7.2-8.8-6.7-8.7h5.5l4.1 5.3 4.1-5.3h5.4l-6.7 8.7 7.2 8.8h-5.6zM89.8 13.5c-3.4 0-5.8 2.7-5.8 5.9 0 3.3 2.4 5.9 5.8 5.9 3.5 0 5.9-2.6 5.9-5.9 0-3.2-2.4-5.9-5.9-5.9zm0-4.1c6 0 10.5 4.3 10.5 10s-4.4 10-10.5 10c-6 0-10.4-4.3-10.4-10s4.4-10 10.4-10zM6 9.4V7l18 7.8v2.8L6 25v-2.6l14.2-5.9-14.2-7.1z" />
                  </svg>
                </div>
                <div className="text-muted-foreground/60">
                  <svg
                    className="h-5 w-auto"
                    viewBox="0 0 139 34"
                    fill="currentColor"
                  >
                    <path d="M52.1 18.4V16h5.5v8.4c-1.3.9-3.6 1.7-5.8 1.7-5.6 0-9.4-4-9.4-9.4 0-5.3 3.9-9.4 9.7-9.4 2.8 0 4.9.9 6.4 2.4l-1.9 2.8c-1.1-1.1-2.3-1.7-4.1-1.7-3.3 0-5.7 2.5-5.7 5.9 0 3.5 2.5 5.9 5.8 5.9 1 0 2.1-.2 3-1v-3.2h-3.5zM79.9 25.9h-3.9V16h-5.5v9.9h-3.9V7.6h3.9v5.1h5.5V7.6h3.9v18.3zM91.3 26c-3.2 0-5.2-1.4-5.2-4.3v-10h-2.2V9.2h2.2V6.1h3.7v3.1h3.5v2.6h-3.5v9.5c0 1.1.6 1.7 1.6 1.7.7 0 1.2-.2 1.6-.5l.9 2.9c-.9.3-1.7.6-3.6.6zM105.2 7.6h4.1L101.4 32h-4.1l7.9-24.4zM114.7 9.2h-4V5.7h4v3.5zm-.1 16.7h-3.7V11.8h3.7v14.1zM126.8 25.9V15.4c0-1.7-1-2.4-2.4-2.4-1.5 0-2.7.9-3.5 1.9v11h-3.7V11.8h3.7v1.9c1.1-1.3 2.9-2.2 5-2.2 3.1 0 4.7 1.8 4.7 4.4v10.1h-3.8z" />
                    <path d="M7.2 2.8H30l-7.4 12.8L30 28.3H7.2l3.7-12.8L7.2 2.8z" />
                  </svg>
                </div>
                <div className="text-muted-foreground/60">
                  <svg
                    className="h-5 w-auto"
                    viewBox="0 0 180 34"
                    fill="currentColor"
                  >
                    <path d="M46.1 24c-2.6 0-4.6-.8-6-2.5-1.4-1.7-2.1-3.9-2.1-6.7 0-3 .8-5.3 2.4-7 1.6-1.7 3.8-2.6 6.6-2.6 2.6 0 4.5.8 5.9 2.3 1.4 1.5 2.1 3.6 2.1 6.1v2.2H42.3c.1 1.8.5 3.1 1.4 4 .9.9 2.2 1.3 3.8 1.3 1.1 0 2.1-.1 3-.3.9-.2 1.9-.5 3-.9V23c-1.1.5-2.1.8-3 1-1 .1-2.1.2-3.4.2zm-.7-15.6c-1.2 0-2.2.4-2.9 1.1-.7.8-1.1 1.9-1.2 3.4h8.1c0-1.5-.4-2.6-1.1-3.4-.8-.7-1.7-1.1-2.9-1.1zm20.5-4.6c.9 0 1.8.1 2.4.2l-.5 3.8c-.7-.1-1.3-.2-1.9-.2-1.4 0-2.5.4-3.4 1.3s-1.3 2.1-1.3 3.6V24h-4.1V4.1h3.1l.6 3.3h.2c.6-1.1 1.3-2 2.2-2.6.8-.7 1.8-1 2.7-1zm16.3 20.2c-2.7 0-4.7-.7-6.2-2.2-1.5-1.5-2.2-3.7-2.2-6.6 0-2.9.7-5.2 2.2-6.8 1.5-1.6 3.5-2.4 6.2-2.4 2.8 0 5 .8 6.5 2.3 1.5 1.5 2.2 3.7 2.2 6.8 0 2.9-.7 5.1-2.2 6.6-1.4 1.6-3.6 2.3-6.5 2.3zm.1-14.5c-3 0-4.5 1.9-4.5 5.8 0 3.8 1.5 5.7 4.4 5.7 2.9 0 4.4-1.9 4.4-5.7-.1-3.9-1.5-5.8-4.3-5.8zm19 14.2c-3.9 0-5.9-2.2-5.9-6.6V9.5h4.1v8.1c0 1.1.2 1.9.6 2.5.4.6 1.1.9 1.9.9 1.2 0 2-.4 2.6-1.1.6-.7.9-2 .9-3.7V9.5h4.1V24h-3.1l-.5-2.1h-.2c-.5.8-1.2 1.4-2 1.8-.8.4-1.6.6-2.5.6zm16.6-18.6c0-.8.2-1.4.6-1.7.4-.4 1-.5 1.8-.5.8 0 1.4.2 1.8.5.4.4.6.9.6 1.7 0 .7-.2 1.3-.6 1.7-.4.4-1 .6-1.8.6-.8 0-1.4-.2-1.8-.6-.4-.4-.6-1-.6-1.7zm4.3 18.3h-4.1V9.5h4.1V24zm5.6 0V9.5h3.1l.5 2.2h.2c.5-.8 1.2-1.4 2-1.8s1.8-.6 2.8-.6c2.5 0 4.2 1 5 2.9h.3c.6-.9 1.3-1.6 2.2-2.1.9-.5 1.9-.8 3.1-.8 2 0 3.5.5 4.4 1.6.9 1.1 1.4 2.7 1.4 4.8V24h-4.1v-8.7c0-1.1-.2-1.9-.6-2.4-.4-.5-1.1-.8-2-.8-.9 0-1.6.3-2.1.9-.5.6-.7 1.5-.7 2.7V24h-4.1v-8.7c0-1.1-.2-1.9-.6-2.4-.4-.5-1.1-.8-2-.8-1 0-1.7.3-2.1 1-.5.7-.7 1.7-.7 3V24h-4.1z" />
                    <path d="M13.7 5.1C16.1 2.7 19.4 1 23.2 1c7.5 0 13.6 6.1 13.6 13.6v.1c0 7.5-6.1 13.7-13.7 13.7-3.7 0-7-1.6-9.4-4.1l-.1-.2-5.7 5.7-.1-.1C3.9 28.9 1 24.7 1 19.8c0-4.9 2.9-9.1 7.1-11l.2-.1 5.4 5.4z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Isometric Illustration */}
          <div className="flex items-center justify-center">
            <div className="perspective relative h-[400px] w-full md:h-[500px]">
              {/* Main platform */}
              <div className="rotateX-[60deg] rotateZ-[45deg] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                {/* Base platform */}
                <div className="transform-style preserve-3d h-64 w-64 rounded-lg border border-indigo-500/30 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 shadow-xl">
                  {/* Grid lines on platform */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px]"></div>

                  {/* Cubes */}
                  <div className="transform-style preserve-3d absolute -top-10 left-8 h-16 w-16">
                    <div className="absolute inset-0 translate-z-8 transform bg-blue-500/80 shadow-lg"></div>
                    <div className="rotateY-90 absolute inset-0 translate-z-8 transform bg-blue-400/80 shadow-lg"></div>
                    <div className="rotateX-90 absolute inset-0 translate-z-8 transform bg-blue-600/80 shadow-lg"></div>
                  </div>

                  <div className="transform-style preserve-3d absolute top-8 right-8 h-12 w-12">
                    <div className="absolute inset-0 translate-z-6 transform bg-purple-500/80 shadow-lg"></div>
                    <div className="rotateY-90 absolute inset-0 translate-z-6 transform bg-purple-400/80 shadow-lg"></div>
                    <div className="rotateX-90 absolute inset-0 translate-z-6 transform bg-purple-600/80 shadow-lg"></div>
                  </div>

                  <div className="transform-style preserve-3d absolute right-14 bottom-12 h-14 w-14">
                    <div className="absolute inset-0 translate-z-7 transform bg-emerald-500/80 shadow-lg"></div>
                    <div className="rotateY-90 absolute inset-0 translate-z-7 transform bg-emerald-400/80 shadow-lg"></div>
                    <div className="rotateX-90 absolute inset-0 translate-z-7 transform bg-emerald-600/80 shadow-lg"></div>
                  </div>

                  <div className="transform-style preserve-3d absolute bottom-10 left-10 h-10 w-10">
                    <div className="absolute inset-0 translate-z-5 transform bg-amber-500/80 shadow-lg"></div>
                    <div className="rotateY-90 absolute inset-0 translate-z-5 transform bg-amber-400/80 shadow-lg"></div>
                    <div className="rotateX-90 absolute inset-0 translate-z-5 transform bg-amber-600/80 shadow-lg"></div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="animate-bounce-slow absolute -top-16 -left-16 h-8 w-8 rounded-full bg-pink-400 shadow-lg"></div>
                <div className="animate-bounce-slow absolute -top-12 right-0 h-6 w-6 rounded-full bg-yellow-400 shadow-lg delay-200"></div>
                <div className="animate-bounce-slow absolute -right-8 -bottom-8 h-10 w-10 rounded-full bg-blue-400 shadow-lg delay-300"></div>
                <div className="animate-bounce-slow absolute -bottom-12 left-4 h-7 w-7 rounded-full bg-green-400 shadow-lg delay-100"></div>

                {/* Code icon */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-z-24 transform">
                  <div className="bg-background flex h-16 w-16 items-center justify-center rounded-2xl shadow-xl">
                    <Code2 className="text-primary h-8 w-8" />
                  </div>
                </div>
              </div>

              {/* Shadow below platform */}
              <div className="absolute top-[60%] left-1/2 h-12 w-64 -translate-x-1/2 transform rounded-full bg-black/10 blur-xl"></div>

              {/* Decorative shapes behind */}
              <div className="border-primary/20 animate-spin-slow absolute top-1/4 right-8 h-12 w-12 rounded-full border-4"></div>
              <div className="animate-spin-slow absolute bottom-1/4 left-8 h-16 w-16 rounded-full border-4 border-dashed border-amber-500/20 delay-300"></div>

              {/* Glow effect */}
              <div className="bg-primary/5 absolute top-1/2 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
