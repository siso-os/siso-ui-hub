import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

import { cn } from '@/arc-shims/kit-utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import { Switch } from '../../../ui/switch';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';

interface AddOnItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface UpsellBundleBuilderProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  };
  addOns: AddOnItem[];
}

export default function UpsellBundleBuilder({
  product = {
    id: 'main-product',
    name: 'Premium Wireless Headphones',
    description:
      'Studio-quality sound with active noise cancellation and 30-hour battery life.',
    price: 199.99,
    image: '/placeholder.svg?height=200&width=200',
  },
  addOns = [
    {
      id: 'addon-1',
      name: 'Protective Case',
      description:
        'Durable hardshell case with water-resistant exterior and custom fit.',
      price: 29.99,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      id: 'addon-2',
      name: 'Extended Warranty',
      description:
        'Additional 2-year coverage for accidental damage and technical support.',
      price: 39.99,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      id: 'addon-3',
      name: 'Premium Audio Cable',
      description:
        'Gold-plated 3.5mm audio cable for lossless wired listening experience.',
      price: 19.99,
      image: '/placeholder.svg?height=100&width=100',
    },
    {
      id: 'addon-4',
      name: 'Wireless Charging Pad',
      description:
        'Fast-charging Qi wireless charging pad compatible with your headphones.',
      price: 34.99,
      image: '/placeholder.svg?height=100&width=100',
    },
  ],
}: UpsellBundleBuilderProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>(
    {}
  );

  const handleToggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const calculateTotal = () => {
    const addOnsTotal = addOns.reduce((sum, addon) => {
      return sum + (selectedAddOns[addon.id] ? addon.price : 0);
    }, 0);

    return product.price + addOnsTotal;
  };

  const selectedCount = Object.values(selectedAddOns).filter(Boolean).length;

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-8 md:py-12">
      {/* Main Product */}
      <Card className="mb-6 border-2">
        <CardHeader className="pb-3">
          <div className="flex flex-col items-start gap-4 md:flex-row">
            <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-md md:w-1/3">
              <img
                src={product.image || '/placeholder.svg'}
                alt={product.name}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <Badge variant="secondary" className="mb-2">
                Base Product
              </Badge>
              <CardTitle className="text-xl md:text-2xl">
                {product.name}
              </CardTitle>
              <CardDescription className="mt-2 text-sm md:text-base">
                {product.description}
              </CardDescription>
            </div>
            <div className="text-xl font-bold md:text-2xl">
              ${product.price.toFixed(2)}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Add-ons Section */}
      <div className="mb-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-medium">Customize Your Bundle</h3>
          <span className="text-muted-foreground text-sm">
            {selectedCount} add-on{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="space-y-4">
          {addOns.map((addon) => (
            <Card
              key={addon.id}
              className={cn(
                'hover:border-primary/50 border transition-all',
                selectedAddOns[addon.id] ? 'border-primary/50 bg-primary/5' : ''
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-muted relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={addon.image || '/placeholder.svg'}
                      alt={addon.name}
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="truncate font-medium">{addon.name}</h4>
                    <p className="text-muted-foreground line-clamp-2 text-sm">
                      {addon.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="font-medium">
                      ${addon.price.toFixed(2)}
                    </span>
                    <Switch
                      checked={selectedAddOns[addon.id] || false}
                      onCheckedChange={() => handleToggleAddOn(addon.id)}
                      aria-label={`Add ${addon.name} to bundle`}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Summary and CTA */}
      <Card className="sticky bottom-0 border-t shadow-lg">
        <CardContent className="p-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <p className="text-muted-foreground text-sm">Bundle Total</p>
              <p className="text-2xl font-bold">
                ${calculateTotal().toFixed(2)}
              </p>
            </div>

            <div className="w-full md:w-auto">
              <Button size="lg" className="w-full md:w-auto">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add Bundle to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
