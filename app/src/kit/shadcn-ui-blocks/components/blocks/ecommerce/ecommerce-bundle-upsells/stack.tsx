import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '../../../ui/button';
import { Card, CardContent } from '../../../ui/card';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description?: string;
}

interface UpsellBundleStackProps {
  mainProduct: Product;
  upsellItems: Product[];
  bundleDiscount?: number;
}

export default function UpsellBundleStack({
  mainProduct = {
    id: 'main-1',
    name: 'Premium Wireless Headphones',
    price: 199.99,
    originalPrice: 249.99,
    image: '/placeholder.svg?height=300&width=300',
    description:
      'High-quality noise-canceling headphones with 30-hour battery life',
  },
  upsellItems = [
    {
      id: 'upsell-1',
      name: 'Wireless Charging Case',
      price: 49.99,
      originalPrice: 69.99,
      image: '/placeholder.svg?height=120&width=120',
    },
    {
      id: 'upsell-2',
      name: 'Premium Audio Cable',
      price: 29.99,
      image: '/placeholder.svg?height=120&width=120',
    },
    {
      id: 'upsell-3',
      name: 'Protective Carrying Case',
      price: 39.99,
      originalPrice: 54.99,
      image: '/placeholder.svg?height=120&width=120',
    },
  ],
  bundleDiscount = 0.1,
}: UpsellBundleStackProps) {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(
    new Set([mainProduct.id])
  );

  const handleItemToggle = (itemId: string, checked: boolean) => {
    const newSelected = new Set(selectedItems);
    if (checked) {
      newSelected.add(itemId);
    } else {
      newSelected.delete(itemId);
    }
    setSelectedItems(newSelected);
  };

  const calculateTotal = () => {
    let total = 0;
    if (selectedItems.has(mainProduct.id)) {
      total += mainProduct.price;
    }
    upsellItems.forEach((item) => {
      if (selectedItems.has(item.id)) {
        total += item.price;
      }
    });

    // Apply bundle discount if more than one item is selected
    if (selectedItems.size > 1) {
      total = total * (1 - bundleDiscount);
    }

    return total;
  };

  const calculateSavings = () => {
    let originalTotal = 0;
    if (selectedItems.has(mainProduct.id)) {
      originalTotal += mainProduct.originalPrice || mainProduct.price;
    }
    upsellItems.forEach((item) => {
      if (selectedItems.has(item.id)) {
        originalTotal += item.originalPrice || item.price;
      }
    });

    const currentTotal = calculateTotal();
    return originalTotal - currentTotal;
  };

  const selectedCount = selectedItems.size;
  const savings = calculateSavings();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 md:py-12">
      <div className="mb-6 text-center sm:mb-8">
        <h2 className="text-foreground mb-2 text-xl font-bold sm:text-2xl">
          Complete Your Bundle
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Save {Math.round(bundleDiscount * 100)}% when you buy together
        </p>
      </div>

      <div className="space-y-3 sm:space-y-4">
        {/* Main Product */}
        <Card className="border-primary/20 from-muted/50 to-muted border-2 bg-gradient-to-r shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="relative flex-shrink-0">
                  <div className="border-primary h-16 w-16 overflow-hidden rounded-lg border-2 bg-white shadow-sm sm:h-20 sm:w-20">
                    <img
                      src={mainProduct.image || '/placeholder.svg'}
                      alt={mainProduct.name}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-foreground text-base leading-tight font-semibold sm:text-lg">
                    {mainProduct.name}
                  </h3>
                  {mainProduct.description && (
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-xs sm:text-sm">
                      {mainProduct.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center">
                <div className="flex items-center space-x-2">
                  <span className="text-foreground text-lg font-bold sm:text-xl">
                    ${mainProduct.price.toFixed(2)}
                  </span>
                  {mainProduct.originalPrice && (
                    <span className="text-muted-foreground text-xs line-through sm:text-sm">
                      ${mainProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs font-medium sm:mt-1 sm:text-sm">
                  Selected
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upsell Items */}
        {upsellItems.map((item) => (
          <Card
            key={item.id}
            className="shadow-md transition-shadow duration-200 hover:shadow-lg"
          >
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="relative flex-shrink-0">
                  <div
                    className={`bg-muted h-12 w-12 overflow-hidden rounded-lg shadow-sm sm:h-16 sm:w-16 ${
                      selectedItems.has(item.id)
                        ? 'border-primary border-2'
                        : ''
                    }`}
                  >
                    <img
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-foreground text-sm leading-tight font-medium sm:text-base">
                    {item.name}
                  </h4>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className="text-foreground text-base font-semibold sm:text-lg">
                      ${item.price.toFixed(2)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-muted-foreground text-xs line-through sm:text-sm">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex-shrink-0">
                  {selectedItems.has(item.id) ? (
                    <Button
                      variant={'outline'}
                      size="sm"
                      onClick={() => handleItemToggle(item.id, false)}
                    >
                      <Minus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      Remove
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleItemToggle(item.id, true)}
                    >
                      <Plus className="mr-1 h-3 w-3 sm:h-4 sm:w-4" />
                      Add
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bundle Summary */}
      <Card className="border-border mt-4 border-2 shadow-lg sm:mt-6">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <span className="text-foreground text-base font-medium sm:text-lg">
                Bundle Total ({selectedCount}{' '}
                {selectedCount === 1 ? 'item' : 'items'})
              </span>
              <div className="text-left sm:text-right">
                <div className="text-foreground text-xl font-bold sm:text-2xl">
                  ${calculateTotal().toFixed(2)}
                </div>
                {savings > 0 && (
                  <div className="text-sm font-medium text-emerald-600">
                    You save ${savings.toFixed(2)}
                  </div>
                )}
              </div>
            </div>

            {selectedCount > 1 && (
              <div className="flex items-center justify-center space-x-2 rounded-lg bg-emerald-50 p-2 text-xs text-emerald-600 sm:p-3 sm:text-sm dark:bg-emerald-900 dark:text-emerald-400">
                <Plus className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4" />
                <span className="text-center font-medium">
                  Bundle discount applied: {Math.round(bundleDiscount * 100)}%
                  off
                </span>
              </div>
            )}

            <Button
              className="h-10 w-full text-base font-semibold sm:h-12 sm:text-lg"
              disabled={selectedCount === 0}
            >
              Add Selected to Cart
            </Button>

            <p className="text-muted-foreground text-center text-xs leading-relaxed">
              Free shipping on orders over $100 • 30-day return policy
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
