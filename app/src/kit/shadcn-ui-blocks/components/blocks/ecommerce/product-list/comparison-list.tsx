import { Checkbox } from '../../../ui/checkbox';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

interface Feature {
  name: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  features: Record<string, boolean>;
  specs: Record<string, string>;
}

export default function ComparisonList() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([1, 2]);

  const features: Feature[] = [
    {
      name: 'Water Resistant',
      description: 'Protected against water splashes',
    },
    {
      name: 'Heart Rate Monitor',
      description: 'Continuous heart rate tracking',
    },
    { name: 'GPS', description: 'Built-in GPS tracking' },
    { name: 'Sleep Tracking', description: 'Advanced sleep monitoring' },
    { name: 'Notifications', description: 'Smart notifications support' },
  ];

  const specs = [
    'Battery Life',
    'Display Size',
    'Case Material',
    'Band Material',
    'Weight',
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Classic Leather Watch',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      price: 299,
      features: {
        'Water Resistant': true,
        'Heart Rate Monitor': false,
        GPS: false,
        'Sleep Tracking': false,
        Notifications: true,
      },
      specs: {
        'Battery Life': '2 years',
        'Display Size': '42mm',
        'Case Material': 'Stainless Steel',
        'Band Material': 'Genuine Leather',
        Weight: '48g',
      },
    },
    {
      id: 2,
      name: 'Smart Watch Pro',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      price: 499,
      features: {
        'Water Resistant': true,
        'Heart Rate Monitor': true,
        GPS: true,
        'Sleep Tracking': true,
        Notifications: true,
      },
      specs: {
        'Battery Life': '5 days',
        'Display Size': '44mm',
        'Case Material': 'Aluminum',
        'Band Material': 'Silicone',
        Weight: '52g',
      },
    },
    {
      id: 3,
      name: 'Sport Watch Elite',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      price: 399,
      features: {
        'Water Resistant': true,
        'Heart Rate Monitor': true,
        GPS: true,
        'Sleep Tracking': false,
        Notifications: true,
      },
      specs: {
        'Battery Life': '7 days',
        'Display Size': '45mm',
        'Case Material': 'Titanium',
        'Band Material': 'Sport Band',
        Weight: '45g',
      },
    },
  ];

  const handleProductSelect = (id: number) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter((p) => p !== id));
    } else if (selectedProducts.length < 3) {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  const selectedProductsData = products.filter((p) =>
    selectedProducts.includes(p.id)
  );

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      {/* Product Selection */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className={`bg-card relative rounded-xl border p-4 ${
              selectedProducts.includes(product.id)
                ? 'ring-primary ring-2'
                : 'hover:border-primary/50'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="bg-muted relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="truncate font-medium">{product.name}</h3>
                <div className="mt-1 text-lg font-medium">${product.price}</div>
              </div>
              <Checkbox
                checked={selectedProducts.includes(product.id)}
                onCheckedChange={() => handleProductSelect(product.id)}
                disabled={
                  !selectedProducts.includes(product.id) &&
                  selectedProducts.length >= 3
                }
              />
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      {selectedProductsData.length > 0 && (
        <div className="bg-card overflow-hidden rounded-xl border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50 border-b">
                  <th className="p-4 text-left font-medium">Features</th>
                  {selectedProductsData.map((product) => (
                    <th
                      key={product.id}
                      className="p-4 text-center font-medium"
                    >
                      {product.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium">Price</td>
                  {selectedProductsData.map((product) => (
                    <td key={product.id} className="p-4 text-center">
                      ${product.price}
                    </td>
                  ))}
                </tr>
                {features.map((feature) => (
                  <tr key={feature.name} className="border-b">
                    <td className="p-4">
                      <div className="font-medium">{feature.name}</div>
                      <div className="text-muted-foreground text-sm">
                        {feature.description}
                      </div>
                    </td>
                    {selectedProductsData.map((product) => (
                      <td key={product.id} className="p-4">
                        <div className="flex justify-center">
                          {product.features[feature.name] ? (
                            <Check className="text-primary h-5 w-5" />
                          ) : (
                            <X className="text-muted-foreground h-5 w-5" />
                          )}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
                {specs.map((spec) => (
                  <tr key={spec} className="border-b">
                    <td className="p-4 font-medium">{spec}</td>
                    {selectedProductsData.map((product) => (
                      <td key={product.id} className="p-4 text-center">
                        {product.specs[spec]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
