import { AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Avatar } from '../../../ui/avatar';
import { Button } from '../../../ui/button';

export default function BigImage() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Grid */}
      <div className="md:grid md:grid-cols-2 md:items-center md:gap-10 lg:gap-16">
        <div className="mb-24 hidden sm:px-6 md:mb-0 md:block">
          <div className="relative">
            <img
              className="rounded-xl"
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=500&h=600&q=80"
              alt="Avatar"
              width={500}
              height={600}
            />

            {/* SVG Element */}
            <div className="absolute start-0 bottom-0 -z-[1] -translate-x-14 translate-y-10">
              <svg
                className="text-muted-foreground h-auto max-w-40"
                width="696"
                height="653"
                viewBox="0 0 696 653"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="72.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="29.5" r="29.5" fill="currentColor" />
                <circle cx="29.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="128.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="227.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="326.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="425.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="524.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="623.5" cy="128.5" r="29.5" fill="currentColor" />
                <circle cx="72.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="227.5" r="29.5" fill="currentColor" />
                <circle cx="29.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="128.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="227.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="326.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="425.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="524.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="623.5" cy="326.5" r="29.5" fill="currentColor" />
                <circle cx="72.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="425.5" r="29.5" fill="currentColor" />
                <circle cx="29.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="128.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="227.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="326.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="425.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="524.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="623.5" cy="524.5" r="29.5" fill="currentColor" />
                <circle cx="72.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="171.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="270.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="369.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="468.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="567.5" cy="623.5" r="29.5" fill="currentColor" />
                <circle cx="666.5" cy="623.5" r="29.5" fill="currentColor" />
              </svg>
            </div>
            {/* End SVG Element */}
          </div>
        </div>
        {/* End Col */}

        <div>
          {/* Blockquote */}
          <blockquote className="relative">
            <svg
              className="text-muted-foreground/15 absolute start-0 top-0 size-24 -translate-x-8 -translate-y-4 transform"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M7.39762 10.3C7.39762 11.0733 7.14888 11.7 6.6514 12.18C6.15392 12.6333 5.52552 12.86 4.76621 12.86C3.84979 12.86 3.09047 12.5533 2.48825 11.94C1.91222 11.3266 1.62421 10.4467 1.62421 9.29999C1.62421 8.07332 1.96459 6.87332 2.64535 5.69999C3.35231 4.49999 4.33418 3.55332 5.59098 2.85999L6.4943 4.25999C5.81354 4.73999 5.26369 5.27332 4.84476 5.85999C4.45201 6.44666 4.19017 7.12666 4.05926 7.89999C4.29491 7.79332 4.56983 7.73999 4.88403 7.73999C5.61716 7.73999 6.21938 7.97999 6.69067 8.45999C7.16197 8.93999 7.39762 9.55333 7.39762 10.3Z"
                fill="currentColor"
              />
            </svg>

            <div className="relative z-10">
              <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wide uppercase">
                Featured client
              </p>

              <p className="text-xl font-medium italic md:text-2xl md:leading-normal xl:text-3xl xl:leading-normal">
                To say that switching to Acme has been life-changing is an
                understatement. My business has tripled and I got my life back.
              </p>
            </div>

            <footer className="mt-6">
              <div className="flex items-center">
                <div className="shrink-0 md:hidden">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80"
                      alt="Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ms-4 md:ms-0">
                  <div className="text-base font-semibold">Nicole Grazioso</div>
                  <div className="text-muted-foreground text-xs">
                    Director Payments &amp; Risk | Airbnb
                  </div>
                </div>
              </div>
            </footer>

            <div className="mt-8 lg:mt-14">
              <Button>Read the story</Button>
            </div>
          </blockquote>
          {/* End Blockquote */}
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
}
