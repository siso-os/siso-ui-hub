import { useState } from 'react';
import { Card, CardContent } from '../../../ui/card';
import { Checkbox } from '../../../ui/checkbox';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';

interface AddOn {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
}

interface UpsellBundleProps {
  mainProduct: {
    name: string;
    price: number;
    image: string;
    description: string;
  };
  addOns: AddOn[];
  bundleDiscount?: number;
}

export default function UpsellBundleSideBySide({
  mainProduct = {
    name: 'Premium Wireless Headphones',
    price: 199.99,
    image: '/placeholder.svg?height=300&width=300',
    description:
      'High-quality noise-canceling headphones with 30-hour battery life',
  },
  addOns = [
    {
      id: 'case',
      name: 'Premium Carrying Case',
      price: 29.99,
      originalPrice: 39.99,
      image: '/placeholder.svg?height=120&width=120',
      description: 'Protective hard case with custom foam insert',
    },
    {
      id: 'cable',
      name: 'USB-C Charging Cable (3ft)',
      price: 19.99,
      originalPrice: 24.99,
      image: '/placeholder.svg?height=120&width=120',
      description: 'Fast charging cable with premium braided design',
    },
    {
      id: 'stand',
      name: 'Desktop Headphone Stand',
      price: 34.99,
      originalPrice: 44.99,
      image: '/placeholder.svg?height=120&width=120',
      description: 'Elegant aluminum stand with cable management',
    },
  ],
  bundleDiscount = 15,
}: UpsellBundleProps) {
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const handleAddOnToggle = (addOnId: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addOnId)
        ? prev.filter((id) => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  const selectedAddOnItems = addOns.filter((addOn) =>
    selectedAddOns.includes(addOn.id)
  );
  const addOnsTotal = selectedAddOnItems.reduce(
    (sum, addOn) => sum + addOn.price,
    0
  );
  const subtotal = mainProduct.price + addOnsTotal;
  const discount =
    selectedAddOns.length > 0 ? (subtotal * bundleDiscount) / 100 : 0;
  const bundleTotal = subtotal - discount;
  const totalSavings =
    selectedAddOnItems.reduce(
      (sum, addOn) =>
        sum + (addOn.originalPrice ? addOn.originalPrice - addOn.price : 0),
      0
    ) + discount;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8 md:py-12">
      <div className="space-y-2 px-2 text-center">
        <h2 className="text-xl font-bold sm:text-2xl">Complete Your Setup</h2>
        <p className="text-muted-foreground text-sm">
          Add these recommended items and save {bundleDiscount}% on your bundle
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Main Product */}
        <Card className="h-fit">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-4">
              <div className="bg-muted relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={mainProduct.image || '/placeholder.svg'}
                  alt={mainProduct.name}
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold sm:text-xl">
                  {mainProduct.name}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm">
                  {mainProduct.description}
                </p>
                <div className="text-xl font-bold sm:text-2xl">
                  ${mainProduct.price.toFixed(2)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Add-ons */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Recommended Add-ons</h3>
          <div className="space-y-3">
            {addOns.map((addOn) => (
              <Card
                key={addOn.id}
                className="hover:bg-muted/50 transition-colors"
              >
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-start space-x-2 sm:space-x-4">
                    <Checkbox
                      id={addOn.id}
                      checked={selectedAddOns.includes(addOn.id)}
                      onCheckedChange={() => handleAddOnToggle(addOn.id)}
                      className="mt-1 h-5 w-5"
                    />
                    <div className="flex-shrink-0">
                      <div className="bg-muted relative h-12 w-12 overflow-hidden rounded-md sm:h-16 sm:w-16">
                        <img
                          src={addOn.image || '/placeholder.svg'}
                          alt={addOn.name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <label
                        htmlFor={addOn.id}
                        className="block cursor-pointer text-sm font-medium sm:text-base"
                      >
                        {addOn.name}
                      </label>
                      <p className="text-muted-foreground mt-1 text-xs sm:text-sm">
                        {addOn.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <span className="font-semibold">
                          ${addOn.price.toFixed(2)}
                        </span>
                        {addOn.originalPrice && (
                          <>
                            <span className="text-muted-foreground text-xs line-through sm:text-sm">
                              ${addOn.originalPrice.toFixed(2)}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              Save $
                              {(addOn.originalPrice - addOn.price).toFixed(2)}
                            </Badge>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Bundle Summary */}
      <Card className="border-2">
        <CardContent className="p-4 sm:p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Bundle Summary</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="pr-2">{mainProduct.name}</span>
                <span>${mainProduct.price.toFixed(2)}</span>
              </div>
              {selectedAddOnItems.map((addOn) => (
                <div
                  key={addOn.id}
                  className="text-muted-foreground flex justify-between"
                >
                  <span className="pr-2">{addOn.name}</span>
                  <span>${addOn.price.toFixed(2)}</span>
                </div>
              ))}
              {selectedAddOns.length > 0 && (
                <>
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Bundle Discount ({bundleDiscount}%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="border-t pt-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="text-xl font-bold sm:text-2xl">
                    ${bundleTotal.toFixed(2)}
                  </div>
                  {totalSavings > 0 && (
                    <div className="text-sm text-green-600">
                      Total savings: ${totalSavings.toFixed(2)}
                    </div>
                  )}
                </div>
                <Button
                  size="lg"
                  className="w-full sm:w-auto sm:min-w-[140px]"
                  disabled={selectedAddOns.length === 0}
                >
                  {selectedAddOns.length === 0
                    ? 'Select Add-ons'
                    : 'Add Bundle to Cart'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
