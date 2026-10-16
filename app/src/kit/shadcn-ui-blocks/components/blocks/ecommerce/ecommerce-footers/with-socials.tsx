import { SiInstagram } from '@icons-pack/react-simple-icons';

import { Linkedin, Twitter } from '../../../ui/brand-icons';

export default function EcommerceFooterWithSocials() {
  return (
    <footer className="bg-muted/30 border-t px-4 py-8 md:py-12">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          {/* Company Info */}
          <div className="col-span-2 lg:col-span-2">
            <h3 className="mb-4 text-lg font-semibold">ShopCraft</h3>
            <p className="text-muted-foreground mb-4 max-w-xs text-sm">
              Premium quality products for modern living. Discover our curated
              collection of essentials.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on X"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Follow us on Instagram"
              >
                <SiInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sale
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h4 className="mb-4 font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Accessibility
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-border mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 ShopCraft. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-sm">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sitemap
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Affiliate Program
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Partner Portal
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
