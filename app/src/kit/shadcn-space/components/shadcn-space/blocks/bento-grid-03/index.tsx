import { BentoGridHeader } from "./bento-grid-header";
import { FeatureGrid } from "./feature-grid";

const BentoGrid03 = () => {
  return (
    <section className="relative py-10 md:py-20 w-full overflow-hidden">
      {/* Background Vertical Lines extending full height of the section */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="h-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <div className="h-full w-full border-x border-border" />
        </div>
      </div>

      {/* Header section with screen-wide bottom border */}
      <div className="w-full border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <BentoGridHeader />
        </div>
      </div>

      {/* Feature grid section with screen-wide bottom border */}
      <div className="w-full border-b border-border">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
          <FeatureGrid />
        </div>
      </div>
    </section>
  );
};

export default BentoGrid03;
