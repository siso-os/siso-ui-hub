import { Badge } from "../../../ui/badge";
import { Verified } from "lucide-react";

export default function OneMainWithThreeFollowUps() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
      {/* Grid */}
      <div className="grid items-center lg:grid-cols-12 gap-6 lg:gap-12">
        <div className="lg:col-span-4">
          {/* Stats */}
          <div className="lg:pe-6 xl:pe-12">
            <p className="text-6xl font-bold leading-10">
              92%
              <Badge variant="secondary" className="gap-1">
                <Verified className="size-4 shrink-0" />
                +7% this month
              </Badge>
            </p>
            <p className="mt-2 sm:mt-3 text-muted-foreground">
              of U.S. adults have bought from businesses using Space
            </p>
          </div>
          {/* End Stats */}
        </div>
        {/* End Col */}

        <div className="lg:col-span-8 relative lg:before:absolute lg:before:top-0 lg:before:-start-12 lg:before:w-px lg:before:h-full lg:before:bg-border">
          <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-3 sm:gap-8">
            {/* Stats */}
            <div>
              <p className="text-3xl font-semibold">99.95%</p>
              <p className="mt-1 text-muted-foreground">in fulfilling orders</p>
            </div>
            {/* End Stats */}

            {/* Stats */}
            <div>
              <p className="text-3xl font-semibold">2,000+</p>
              <p className="mt-1 text-muted-foreground">partner with Acme</p>
            </div>
            {/* End Stats */}

            {/* Stats */}
            <div>
              <p className="text-3xl font-semibold">85%</p>
              <p className="mt-1 text-muted-foreground">this year alone</p>
            </div>
            {/* End Stats */}
          </div>
        </div>
        {/* End Col */}
      </div>
      {/* End Grid */}
    </div>
  );
}
