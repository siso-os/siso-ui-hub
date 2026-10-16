export default function EcommerceFooterSimpleLinks() {
  return (
    <footer className="bg-background border-t">
      <div className="px-4 py-8 md:py-12">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
          {/* Brand/Logo */}
          <div className="flex items-center">
            <a
              href="#"
              className="text-foreground hover:text-foreground/80 text-xl font-bold transition-colors"
            >
              StoreName
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Shop
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              FAQ
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
