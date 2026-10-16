import { cn } from "@/arc-shims/kit-utils";

interface EmployerRating {
  score: string;
  source: string;
  detail: string;
  logo: Image;
}
interface Image {
  src: string;
  alt: string;
  srcDark?: string;
}
interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  company?: string;
  avatar?: string;
}

interface CompanyBenefitsProps {
  heading: string;
  description: string;
  images: Image[];
  testimonial?: Testimonial;
  ratings: EmployerRating[];
  className?: string;
}

interface CompanyBenefits1Props extends CompanyBenefitsProps {}
type Props = Partial<CompanyBenefits1Props>;

const defaultProps: CompanyBenefits1Props = {
  heading: "Company benefits you can count on",
  description:
    "Pay, time off, and equipment are written down. The rest is the room you work in and the people who already work here.",
  images: [
    {
      src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/company-benefits/photo-1-3x4.jpg",
      alt: "Two coworkers laughing across a laptop in a glass office room",
    },
    {
      src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/workplace-photos/photo-2.jpg",
      alt: "Three coworkers laughing around laptops at a wooden table",
    },
  ],
  testimonial: {
    quote:
      "I joined for the number on the posting. I stayed because December is actually off, and remote is the default, not a favor you have to ask for.",
    author: "Marcus Hale",
    role: "Staff engineer",
    avatar: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/avatars/avatar3.jpg",
  },
  ratings: [
    {
      score: "4.8",
      source: "LinkedIn",
      detail: "86 employee reviews",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/company-benefits/linkedin.svg",
        alt: "LinkedIn",
      },
    },
    {
      score: "4.6",
      source: "Glassdoor",
      detail: "124 employee reviews",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/company-benefits/glassdoor.svg",
        alt: "Glassdoor",
      },
    },
    {
      score: "4.3",
      source: "Indeed",
      detail: "210 employee reviews",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/company-benefits/indeed.svg",
        alt: "Indeed",
      },
    },
    {
      score: "Top 5%",
      source: "levels.fyi",
      detail: "Compensation reports",
      logo: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/company-benefits/levels.svg",
        alt: "levels.fyi",
      },
    },
  ],
};

const MAX_IMAGES = 1;
const MAX_RATINGS = 2;

const CompanyBenefits1 = (props: Props) => {
  const { heading, description, images, testimonial, ratings, className } = {
    ...defaultProps,
    ...props,
  };
  const photo = (images ?? []).slice(0, MAX_IMAGES)[0];
  const scores = (ratings ?? []).slice(0, MAX_RATINGS);

  return (
    <section className={cn("py-32", className)}>
      <div className="container mx-auto">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          {photo ? (
            <div className="relative lg:h-full">
              <img
                src={photo.src}
                alt={photo.alt}
                className="aspect-[4/3] w-full rounded-xl object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:size-full"
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance md:text-5xl">
                {heading}
              </h2>
              <p className="max-w-5xl text-lg text-muted-foreground">
                {description}
              </p>
            </div>
            {testimonial ? (
              <figure className="flex flex-col gap-5">
                <blockquote className="max-w-3xl text-2xl font-medium tracking-tight text-balance">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="flex items-center gap-3">
                  {testimonial.avatar ? (
                    <img
                      src={testimonial.avatar}
                      alt=""
                      className="size-10 rounded-full object-cover"
                    />
                  ) : null}
                  <div className="flex flex-col">
                    <span className="font-medium">{testimonial.author}</span>
                    {testimonial.role ? (
                      <span className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </span>
                    ) : null}
                  </div>
                </figcaption>
              </figure>
            ) : null}
            <ul className="flex flex-wrap justify-start gap-6">
              {scores.map((rating) => (
                <li key={rating.source} className="flex items-center gap-3">
                  <img src={rating.logo.src} alt="" className="size-8" />
                  <p className="flex flex-col">
                    <span className="font-semibold">{rating.score}</span>
                    <span className="text-sm text-muted-foreground">
                      {rating.source} · {rating.detail}
                    </span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export { CompanyBenefits1 };
