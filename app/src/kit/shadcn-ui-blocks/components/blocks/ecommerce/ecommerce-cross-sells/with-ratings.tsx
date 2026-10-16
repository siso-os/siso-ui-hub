import { Star } from 'lucide-react';
import { Card, CardContent } from '../../../ui/card';

interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
}

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: maxStars }, (_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= rating;
        const isHalfFilled = starValue - 0.5 <= rating && starValue > rating;

        return (
          <Star
            key={index}
            className={`h-4 w-4 ${
              isFilled
                ? 'fill-yellow-400 text-yellow-400'
                : isHalfFilled
                  ? 'fill-yellow-400/50 text-yellow-400'
                  : 'fill-muted text-muted-foreground'
            }`}
          />
        );
      })}
    </div>
  );
}

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="group cursor-pointer p-0 transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4">
        <div className="bg-muted relative mb-3 aspect-square overflow-hidden rounded-lg">
          <img
            src={product.image || '/placeholder.svg'}
            alt={product.name}
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="space-y-2">
          <h3 className="line-clamp-2 text-sm leading-tight font-medium">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <StarRating rating={product.rating} />
            <span className="text-muted-foreground text-sm">
              ({product.rating})
            </span>
          </div>
          <p className="text-lg font-semibold">${product.price.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  );
}

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    rating: 4.5,
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: '2',
    name: 'Portable Phone Charger Power Bank',
    price: 29.99,
    rating: 4.2,
    image: '/placeholder.svg?height=300&width=300',
  },
  {
    id: '3',
    name: 'USB-C Cable Fast Charging',
    price: 12.99,
    rating: 4.8,
    image: '/placeholder.svg?height=300&width=300',
  },
];

export default function CrossSellWithRatings() {
  return (
    <div className="px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-muted-foreground mb-8 text-center text-xl font-semibold">
          You May Also Like
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {sampleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
