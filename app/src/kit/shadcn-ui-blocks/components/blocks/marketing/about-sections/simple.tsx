import { Button } from "../../../ui/button";

export default function AboutSectionSimple() {
  return (
    <section className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">About Our Company</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          We&apos;re on a mission to transform the way people interact with
          technology. Our team brings decades of experience and passion to every
          project.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Our Mission</h3>
          <p className="text-muted-foreground">
            To build intuitive, powerful solutions that solve real problems and
            make technology more accessible for everyone.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Our Vision</h3>
          <p className="text-muted-foreground">
            We envision a world where technology enhances human potential,
            enabling people to focus on what truly matters.
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-xl font-bold">Our Values</h3>
          <p className="text-muted-foreground">
            We believe in transparency, innovation, and putting our customers
            first in everything we do.
          </p>
        </div>
      </div>

      <div className="flex justify-center pt-8">
        <Button>
          <a href="#" className="font-medium">
            Learn more about us
          </a>
        </Button>
      </div>
    </section>
  );
}
