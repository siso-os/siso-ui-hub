import { SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';

import { Linkedin, Twitter } from '../../../ui/brand-icons';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { title: 'Overview', href: '#' },
      { title: 'Features', href: '#' },
      { title: 'Solutions', href: '#' },
      { title: 'Pricing', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Blog', href: '#' },
      { title: 'Developers', href: '#' },
      { title: 'Support', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About', href: '#' },
      { title: 'Careers', href: '#' },
      { title: 'Contact', href: '#' },
      { title: 'Partners', href: '#' },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: SiInstagram, href: '#', label: 'Instagram' },
  { icon: SiYoutube, href: '#', label: 'YouTube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

const partners = [
  {
    name: 'Company 1',
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="40" rx="6" className="fill-muted" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="12"
        >
          Logo 1
        </text>
      </svg>
    ),
  },
  {
    name: 'Company 2',
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="40" rx="6" className="fill-muted" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="12"
        >
          Logo 2
        </text>
      </svg>
    ),
  },
  {
    name: 'Company 3',
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="40" rx="6" className="fill-muted" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="12"
        >
          Logo 3
        </text>
      </svg>
    ),
  },
  {
    name: 'Company 4',
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="40" rx="6" className="fill-muted" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="12"
        >
          Logo 4
        </text>
      </svg>
    ),
  },
  {
    name: 'Company 5',
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="40" rx="6" className="fill-muted" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="12"
        >
          Logo 5
        </text>
      </svg>
    ),
  },
  {
    name: 'Company 6',
    logo: (props: React.SVGProps<SVGSVGElement>) => (
      <svg
        {...props}
        viewBox="0 0 100 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="40" rx="6" className="fill-muted" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize="12"
        >
          Logo 6
        </text>
      </svg>
    ),
  },
];

export default function FooterLogoCloud() {
  return (
    <footer className="bg-background w-full border-t">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px]">
        {/* Logo Cloud */}
        <div className="border-border border-b py-12">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-lg font-semibold">
              Trusted by leading companies
            </h2>
            <p className="text-muted-foreground text-sm">
              Join 50,000+ companies already growing with us
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href="#"
                className="text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
              >
                <partner.logo className="h-10 w-auto" />
                <span className="sr-only">{partner.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Footer Content */}
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-4 md:py-16">
          <div className="md:col-span-1">
            <a href="#" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Your Company</span>
            </a>
            <p className="text-muted-foreground mt-4 text-sm">
              Building the future of digital experiences.
            </p>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-medium">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.title}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-primary text-sm transition-colors"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-border flex flex-col items-center justify-between gap-6 border-t py-6 md:flex-row">
          <p className="text-muted-foreground text-center text-sm md:text-left">
            &copy; {new Date().getFullYear()} Your Company, Inc. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
