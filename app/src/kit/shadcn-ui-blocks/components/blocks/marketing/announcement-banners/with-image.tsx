import { Button } from '../../../ui/button';
import { ArrowRight } from 'lucide-react';

export default function WithImage() {
  return (
    <div className="bg-muted relative isolate flex items-center gap-x-6 overflow-hidden px-6 py-2.5 sm:px-3.5">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        <div className="flex flex-wrap items-center justify-between gap-x-2 gap-y-2">
          <div className="flex items-center gap-2">
            <img
              src="https://placehold.co/32x32/jpeg"
              alt="Announcement"
              className="rounded-full"
              width={32}
              height={32}
            />
            <p className="text-sm leading-6">
              <strong className="font-semibold">New update</strong>
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx={1} cy={1} r={1} />
              </svg>
              We&apos;ve just released new components
            </p>
          </div>
          <Button size="sm" variant="secondary">
            Learn more
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
