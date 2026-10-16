import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { GalleryVerticalEnd, Mic, UploadCloud } from 'lucide-react';

export default function WelcomePage() {
  return (
    <>
      {/* Content */}
      <div className="flex min-h-screen flex-col pb-6">
        <div className="flex flex-grow flex-col justify-center py-24 lg:py-32">
          <div className="mx-auto mt-0 w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-4 flex items-center justify-center">
              {/* Logo */}
              <a
                href="#"
                className="flex items-center gap-2 self-center font-medium"
              >
                <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                Acme Inc.
              </a>
              {/* End Logo */}
            </div>
            <h1 className="text-primary text-3xl font-bold sm:text-4xl">
              Welcome to Your Application
            </h1>
            <p className="text-muted-foreground mt-3">
              Your AI-powered copilot for the web
            </p>
          </div>
          {/* Search */}
          <div className="mx-auto mt-10 w-full max-w-2xl px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <Input
                type="text"
                className="block w-full rounded-full p-4"
                placeholder="Ask me anything..."
              />
              <div className="absolute top-1/2 right-2 -translate-y-1/2">
                <Button size="sm" variant="ghost" className="rounded-full">
                  <UploadCloud className="h-6 w-6 shrink-0" />
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full">
                  <Mic className="h-6 w-6 shrink-0" />
                </Button>
              </div>
            </div>
          </div>
          {/* End Search */}
        </div>
        <footer className="mx-auto mt-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-xs">© 2025 Acme Inc.</p>
        </footer>
      </div>
      {/* End Content */}
    </>
  );
}
