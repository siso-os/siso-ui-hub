import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Check } from 'lucide-react';

export default function LargeImageSplitPromo() {
  return (
    <div className="bg-background relative overflow-hidden">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        {/* Content Section */}
        <div className="px-6 pt-10 pb-24 sm:pb-32 lg:col-span-7 lg:px-0 lg:pt-48 lg:pb-56 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <Badge variant="secondary" className="mb-4">
              Premium Quality
            </Badge>
            <h1 className="text-foreground mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Handcrafted Leather Goods
            </h1>
            <p className="text-muted-foreground mt-6 text-lg leading-8">
              Discover timeless style and durability with our collection of
              artisanal leather bags, wallets, and accessories. Made to last a
              lifetime.
            </p>
            <ul
              role="list"
              className="text-muted-foreground mt-8 space-y-3 text-sm leading-6"
            >
              <li className="flex items-center gap-x-3">
                <Check
                  className="text-primary h-5 w-5 flex-none"
                  aria-hidden="true"
                />
                Full-grain Italian leather
              </li>
              <li className="flex items-center gap-x-3">
                <Check
                  className="text-primary h-5 w-5 flex-none"
                  aria-hidden="true"
                />
                Expert craftsmanship
              </li>
              <li className="flex items-center gap-x-3">
                <Check
                  className="text-primary h-5 w-5 flex-none"
                  aria-hidden="true"
                />
                Sustainable sourcing
              </li>
            </ul>
            <div className="mt-10 flex items-center gap-x-6">
              <Button size="lg" asChild>
                <a href="#">Shop Collection</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#">Our Story</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-y-0 xl:right-0 xl:w-1/2">
          <img
            className="bg-muted aspect-[3/2] w-full object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1200&auto=format&fit=crop"
            alt="Collection of handcrafted leather goods"
            width={900}
            height={600}
          />
        </div>
      </div>
    </div>
  );
}
