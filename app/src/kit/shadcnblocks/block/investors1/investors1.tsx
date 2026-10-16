import { cn } from "@/arc-shims/kit-utils";

interface Investors1Logo {
  src: string;
  alt: string;
}

interface Investors1Item {
  name: string;
  logo: Investors1Logo;
}

interface Investors1Props {
  label?: string;
  heading?: string;
  description?: string;
  investors?: Investors1Item[];
  className?: string;
}

const defaultProps: Investors1Props = {
  heading: "Backed by operators",
  description:
    "Eight firms from Sand Hill Road and South Park, from the first check through the last round.",
  investors: [
    {
      name: "Sequoia Capital",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/investors/sequoia.svg",
        alt: "Sequoia Capital",
      },
    },
    {
      name: "Andreessen Horowitz",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/investors/a16z.svg",
        alt: "Andreessen Horowitz",
      },
    },
    {
      name: "Accel",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/investors/accel.svg",
        alt: "Accel",
      },
    },
    {
      name: "Kleiner Perkins",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/investors/kleiner-perkins.svg",
        alt: "Kleiner Perkins",
      },
    },
    {
      name: "Greylock",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/investors/greylock.svg",
        alt: "Greylock",
      },
    },
    {
      name: "Lightspeed",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/investors/lightspeed.svg",
        alt: "Lightspeed",
      },
    },
    {
      name: "Founders Fund",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/investors/founders-fund.svg",
        alt: "Founders Fund",
      },
    },
    {
      name: "Khosla Ventures",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/investors/khosla.svg",
        alt: "Khosla Ventures",
      },
    },
  ],
};

const MAX_INVESTORS = 8;

const Investors1 = (props: Partial<Investors1Props>) => {
  const { label, heading, description, investors, className } = {
    ...defaultProps,
    ...props,
  };

  const firms = (investors ?? []).slice(0, MAX_INVESTORS);

  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col items-center gap-3 text-center">
            {label ? (
              <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                {label}
              </p>
            ) : null}
            {heading ? (
              <h2 className="max-w-xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {heading}
              </h2>
            ) : null}
            {description ? (
              <p className="max-w-2xl text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-border sm:grid-cols-4">
            {firms.map((firm) => (
              <li
                key={firm.name}
                className="flex flex-col items-center justify-center gap-5 bg-background px-6 py-12"
              >
                <img
                  src={firm.logo.src}
                  alt={firm.logo.alt}
                  className="h-8 w-full max-w-36 object-contain"
                />
                <p className="text-sm font-medium">{firm.name}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export { Investors1 };
