import { Input } from '../../../ui/input';
import { Button } from '../../../ui/button';
import { ArrowRightIcon } from 'lucide-react';
import {
  SiFacebook,
  SiGithub,
  SiInstagram,
} from '@icons-pack/react-simple-icons';
import { Linkedin, Twitter } from '../../../ui/brand-icons';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { title: 'Features', href: '#' },
      { title: 'Pricing', href: '#' },
      { title: 'Integrations', href: '#' },
      { title: 'Changelog', href: '#' },
      { title: 'Documentation', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About us', href: '#' },
      { title: 'Blog', href: '#' },
      { title: 'Careers', href: '#' },
      { title: 'Customers', href: '#' },
      { title: 'Brand', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Community', href: '#' },
      { title: 'Contact', href: '#' },
      { title: 'Support', href: '#' },
      { title: 'FAQ', href: '#' },
      { title: 'Terms of service', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { title: 'API', href: '#' },
      { title: 'Status', href: '#' },
      { title: 'GitHub', href: 'https://github.com', external: true },
      { title: 'Team', href: '#' },
      { title: 'Developer Blog', href: '#' },
    ],
  },
];

const socialLinks = [
  { icon: SiFacebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: SiInstagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: SiGithub, href: 'https://github.com', label: 'GitHub' },
];

export default function FooterMultiColumn() {
  return (
    <footer className="bg-background w-full border-t">
      <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20 2xl:max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center space-x-2">
              <span className="text-xl font-bold">Your Company</span>
            </a>
            <p className="text-muted-foreground mt-4 max-w-xs text-sm">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
            <div className="mt-6">
              <p className="text-sm font-medium">Subscribe to our newsletter</p>
              <div className="mt-2 flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-[240px]"
                />
                <Button type="submit" size="icon">
                  <ArrowRightIcon className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                Get the latest news and updates from our team.
              </p>
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-medium">{group.title}</h3>
              <ul className="mt-4 space-y-2">
                {group.links.map((link) => (
                  <li key={link.title}>
                    {link.external ? (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                      >
                        {link.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t pt-8 md:flex-row">
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
                target="_blank"
                rel="noreferrer"
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="text-muted-foreground text-center text-sm md:text-left">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
