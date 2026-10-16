import { Zap, Shield, Headphones } from 'lucide-react';
import { Card, CardContent } from '../../../ui/card';

export default function CrossSellFeatureIcons() {
  const products = [
    {
      id: 1,
      title: 'Wireless Charging Pad',
      image: '/placeholder.svg?height=200&width=200',
      feature: {
        icon: Zap,
        label: 'Fast 15W Charging',
      },
      price: '$29.99',
    },
    {
      id: 2,
      title: 'Phone Case Pro',
      image: '/placeholder.svg?height=200&width=200',
      feature: {
        icon: Shield,
        label: 'Military Grade Protection',
      },
      price: '$24.99',
    },
    {
      id: 3,
      title: 'Bluetooth Earbuds',
      image: '/placeholder.svg?height=200&width=200',
      feature: {
        icon: Headphones,
        label: 'Active Noise Cancelling',
      },
      price: '$79.99',
    },
  ];

  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-2xl font-bold tracking-tight">
            Complete Your Setup
          </h2>
          <p className="text-muted-foreground">
            Perfect accessories to enhance your experience
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const IconComponent = product.feature.icon;
            return (
              <Card
                key={product.id}
                className="group cursor-pointer gap-0 transition-all duration-200 hover:shadow-lg"
              >
                <CardContent>
                  <div className="bg-muted mb-4 aspect-square overflow-hidden rounded-lg">
                    <img
                      src={product.image || '/placeholder.svg'}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-lg leading-tight font-semibold">
                      {product.title}
                    </h3>

                    <div className="text-muted-foreground flex items-center gap-2 text-sm">
                      <IconComponent className="text-primary h-4 w-4" />
                      <span>{product.feature.label}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold">{product.price}</span>
                      <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
