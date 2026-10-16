import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';

export default function EcommerceFooterWithNewsletter() {
  return (
    <footer className="bg-muted/30 border-t px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                About Us
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Careers
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Press
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Blog
              </a>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Help Center
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Contact Us
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Shipping Info
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Returns
              </a>
            </nav>
          </div>

          {/* Shop Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                New Arrivals
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Best Sellers
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Sale
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Gift Cards
              </a>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <nav className="flex flex-col space-y-2">
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
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Cookie Policy
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                Accessibility
              </a>
            </nav>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-muted-foreground text-sm">
              Get the latest deals and new product announcements.
            </p>
            <form className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-border mt-8 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-4">
              <a href="#" className="text-xl font-bold">
                StoreName
              </a>
              <span className="text-muted-foreground text-sm">
                © 2024 All rights reserved
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground text-sm">Follow us:</span>
              <div className="flex space-x-3">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323C6.001 8.198 7.152 7.708 8.449 7.708s2.448.49 3.323 1.416c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.323c-.875.807-2.026 1.218-3.323 1.218zm7.718 0c-1.297 0-2.448-.49-3.323-1.297-.875-.896-1.365-2.047-1.365-3.344s.49-2.448 1.365-3.323c.875-.875 2.026-1.365 3.323-1.365s2.448.49 3.323 1.365c.875.875 1.365 2.026 1.365 3.323s-.49 2.448-1.365 3.344c-.875.807-2.026 1.297-3.323 1.297z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
