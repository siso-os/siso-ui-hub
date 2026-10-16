import { useState } from 'react';

import { Button } from '../../../ui/button';
import { PlayCircle, X } from 'lucide-react';

export default function VideoCTA() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <>
      {/* Video CTA Section */}
      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="inline-block">
                <span className="bg-primary/10 text-primary inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors">
                  Watch How It Works
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  See our platform in action
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Our short video walkthrough demonstrates how easy it is to get
                  started and shows the key features that make our solution
                  stand out.
                </p>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
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
                  <span>Quick setup process</span>
                </li>
                <li className="flex items-center gap-2">
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
                  <span>Intuitive user interface</span>
                </li>
                <li className="flex items-center gap-2">
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
                  <span>Advanced features walkthrough</span>
                </li>
              </ul>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                <Button size="lg" asChild>
                  <a href="#">Try It Free</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="#">Schedule Demo</a>
                </Button>
              </div>
            </div>
            <div className="relative aspect-video overflow-hidden rounded-xl border shadow-lg">
              {isPlaying ? (
                <div className="relative h-full w-full">
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="bg-background/80 hover:bg-background absolute top-2 right-2 z-10 rounded-full p-1.5 backdrop-blur-sm transition-colors"
                    aria-label="Close video"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <iframe
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="Product Demo Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                  ></iframe>
                </div>
              ) : (
                <div
                  className="group relative h-full w-full cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <img
                    src="https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                    alt="Product walkthrough video thumbnail showing interface demo"
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-2 transition-transform group-hover:scale-110">
                      <PlayCircle className="h-12 w-12" />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/40" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* End Video CTA Section */}
    </>
  );
}
