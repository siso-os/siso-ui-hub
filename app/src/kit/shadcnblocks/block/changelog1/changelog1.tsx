import { ArrowUpRight } from "lucide-react";
import { cn } from "@/arc-shims/kit-utils";

import { Badge } from "../../../shadcn/ui/badge";
import { Button } from "../../../shadcn/ui/button";

interface ChangelogTag {
  label: string;
  dotClassName: string;
}
interface ChangelogEntry {
  date: string;
  title: string;
  version?: string;
  description?: string;
  items?: string[];
  image?: Image;
  imageClassName?: string;
  button?: Button;
  tags?: ChangelogTag[];
  body?: React.ReactNode;
  contributors?: Image[];
  category?: string;
  author?: string;
  role?: string;
  avatar?: Image;
}
interface Image {
  src: string;
  alt: string;
  srcDark?: string;
}
interface Button {
  text: string;
  url: string;
  icon?: React.ReactNode;
}

interface ChangelogProps {
  heading: string;
  description?: string;
  entries: ChangelogEntry[];
  className?: string;
}

interface Changelog1Props extends ChangelogProps {}
type Props = Partial<Changelog1Props>;

const defaultProps: Changelog1Props = {
  heading: "Changelog",
  description: "Get the latest updates and improvements to our platform.",
  entries: [
    {
      version: "Version 1.3.0",
      date: "15 November 2024",
      title: "Enhanced Analytics Dashboard",
      category: "New feature",
      author: "Emily Chen",
      role: "Product Manager",
      avatar: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Contributor",
      },
      description:
        "We've completely redesigned our analytics dashboard to provide deeper insights and improved visualizations of your data.",
      tags: [
        { label: "Feature", dotClassName: "bg-blue-500" },
        { label: "Documentation", dotClassName: "bg-purple-500" },
      ],
      image: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/changelog/analytics-16x9.png",
        alt: "Analytics dashboard",
      },
      imageClassName: "object-top-left",
      button: {
        url: "https://shadcnblocks.com",
        text: "Learn more",
      },
      contributors: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
          alt: "Contributor",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
          alt: "Contributor",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
          alt: "Contributor",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
          alt: "Contributor",
        },
      ],
      body: (
        <>
          <p>
            We&apos;ve completely redesigned the analytics dashboard so you can
            see what changed in a release without leaving the page. The new
            charts update as data arrives, and you can open the{" "}
            <a href="#">analytics guide</a> for the full walkthrough.
          </p>
          <p>
            Exports now cover the views people ask for most. Read the{" "}
            <a href="#">release notes</a> for the file formats and the filters
            that ship with this version.
          </p>
        </>
      ),
    },
    {
      version: "Version 1.2.1",
      date: "23 September 2024",
      title: "New features and improvements",
      category: "Improvement",
      author: "Sam Washington",
      role: "Lead Product Designer",
      avatar: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
        alt: "Contributor",
      },
      description:
        "Here are the latest updates and improvements to our platform. We are always working to improve our platform and your experience.",
      items: [
        "Added new feature to export data",
        "Improved performance and speed",
        "Fixed minor bugs and issues",
        "Added new feature to import data",
      ],
      tags: [
        { label: "Maintenance", dotClassName: "bg-amber-400" },
        { label: "Security", dotClassName: "bg-red-500" },
      ],
      contributors: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
          alt: "Contributor",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-4.webp",
          alt: "Contributor",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-5.webp",
          alt: "Contributor",
        },
      ],
      body: (
        <>
          <p>
            Here are the latest updates and improvements to our platform. We are
            always working to improve our platform and your experience.
          </p>
          <ul>
            <li>Added new feature to export data</li>
            <li>Improved performance and speed</li>
            <li>Fixed minor bugs and issues</li>
            <li>Added new feature to import data</li>
          </ul>
        </>
      ),
    },
    {
      version: "Version 1.2.5",
      date: "7 October 2024",
      title: "Mobile App Launch",
      category: "Update",
      author: "Alex Rivera",
      role: "AI Research Lead",
      avatar: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
        alt: "Contributor",
      },
      description:
        "We're excited to announce the launch of our mobile application, available now on iOS and Android platforms.",
      items: [
        "Native mobile experience for on-the-go productivity",
        "Offline mode support for working without internet connection",
        "Push notifications for important updates",
        "Biometric authentication for enhanced security",
      ],
      tags: [
        { label: "Feature", dotClassName: "bg-blue-500" },
        { label: "Maintenance", dotClassName: "bg-amber-400" },
      ],
      image: {
        src: "https://cdn.shadcnblocks.com/shadcnblocks/image-set/modern/changelog/phones-16x9.jpg",
        alt: "iPhone and Android phones",
      },
      button: {
        url: "https://shadcnblocks.com",
        text: "Learn more",
      },
      contributors: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-2.webp",
          alt: "Contributor",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-3.webp",
          alt: "Contributor",
        },
      ],
      body: (
        <>
          <p>
            We&apos;re excited to announce the launch of our mobile application,
            available now on iOS and Android platforms.
          </p>
          <ul>
            <li>Native mobile experience for on-the-go productivity</li>
            <li>
              Offline mode support for working without internet connection
            </li>
            <li>Push notifications for important updates</li>
            <li>Biometric authentication for enhanced security</li>
          </ul>
        </>
      ),
    },
    {
      version: "Version 1.0.0",
      date: "31 August 2024",
      title: "First version of our platform",
      category: "New feature",
      author: "Emily Chen",
      role: "Product Manager",
      avatar: {
        src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
        alt: "Contributor",
      },
      description:
        "Introducing a new platform to help you manage your projects and tasks. We are excited to launch our platform and help you get started. We are always working to improve our platform and your experience.",
      tags: [{ label: "Feature", dotClassName: "bg-blue-500" }],
      button: {
        url: "https://shadcnblocks.com",
        text: "Learn more",
      },
      contributors: [
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-1.webp",
          alt: "Contributor",
        },
        {
          src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/avatar-6.webp",
          alt: "Contributor",
        },
      ],
      body: (
        <>
          <p>
            Introducing a new platform to help you manage your projects and
            tasks. We are excited to launch our platform and help you get
            started.
          </p>
          <ul>
            <li>Project and task management in one place</li>
            <li>Shared workspaces for your team</li>
            <li>A first set of reports and exports</li>
          </ul>
          <p>
            Install the first release from the{" "}
            <a href="#">getting started guide</a>.
          </p>
          <pre>
            <code>npm install @shadcnblocks/platform</code>
          </pre>
        </>
      ),
    },
  ],
};

const Changelog1 = (props: Props) => {
  const { heading, description, entries, className } = {
    ...defaultProps,
    ...props,
  };
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            {heading}
          </h1>
          <p className="mb-6 text-base text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-4xl space-y-16 md:mt-24 md:space-y-24">
          {entries.map((entry, index) => (
            <div
              key={index}
              className="relative flex flex-col gap-4 md:flex-row md:gap-16"
            >
              <div className="top-8 flex h-min w-64 shrink-0 items-center gap-4 md:sticky">
                <Badge variant="secondary" className="text-xs">
                  {entry.version}
                </Badge>
                <span className="text-xs font-medium text-muted-foreground">
                  {entry.date}
                </span>
              </div>
              <div className="flex flex-col">
                <h2 className="mb-3 text-lg leading-tight font-bold text-foreground/90 md:text-2xl">
                  {entry.title}
                </h2>
                {entry.items && entry.items.length > 0 ? (
                  <>
                    <p className="text-sm text-muted-foreground md:text-base">
                      {entry.description}
                    </p>
                    <ul className="mt-4 ml-4 space-y-1.5 text-sm text-muted-foreground md:text-base">
                      {entry.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="list-disc">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="prose text-sm text-muted-foreground md:text-base dark:prose-invert">
                    {entry.body ?? <p>{entry.description}</p>}
                  </div>
                )}
                {entry.image && (
                  <img
                    src={entry.image.src}
                    alt={entry.image.alt}
                    className="mt-8 w-full rounded-lg border border-border object-cover"
                  />
                )}
                {entry.button && (
                  <Button variant="link" className="mt-4 self-end" asChild>
                    <a href={entry.button.url} target="_blank">
                      {entry.button.text} <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { Changelog1 };
