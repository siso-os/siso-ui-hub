import { Avatar, AvatarImage } from "../../../ui/avatar";

export default function MiniWithDividersInGrid() {
  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      {/* Grid */}
      <div className="divide-border grid grid-cols-1 gap-x-3 divide-y border-y sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        <div className="py-6 sm:-ms-4 sm:px-4">
          {/* Review */}
          <blockquote>
            <span className="text-sm">
              I&apos;m absolutely floored by the level of care and attention to
              detail Eliana has put into this project and for one can guarantee
              that we will be a return customer.
            </span>

            <footer className="mt-3">
              <div className="flex items-center gap-x-2">
                <Avatar className="size-5 shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" />
                </Avatar>
                <div className="grow">
                  <div className="text-muted-foreground text-xs">
                    Josh Grazioso
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
          {/* End Review */}
        </div>

        <div className="py-6 sm:px-4">
          {/* Review */}
          <blockquote>
            <span className="text-sm">
              To say that hiring Eliana has been life-changing is an
              understatement. My business has tripled and I got my life back.
            </span>

            <footer className="mt-3">
              <div className="flex items-center gap-x-2">
                <Avatar className="size-5 shrink-0">
                  <AvatarImage src="https://images.unsplash.com/photo-1671726203390-cdc4354ee2eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=320&h=320&q=80" />
                </Avatar>
                <div className="grow">
                  <div className="text-muted-foreground text-xs">
                    Nicole Grazioso
                  </div>
                </div>
              </div>
            </footer>
          </blockquote>
          {/* End Review */}
        </div>
      </div>
      {/* End Grid */}
    </div>
  );
}
