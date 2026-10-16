import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Tabs, TabsList, TabsTrigger } from '../../../ui/tabs';
import { Star, ThumbsUp, ThumbsDown, Award, AlertCircle } from 'lucide-react';
import { Progress } from '../../../ui/progress';

export default function ReviewComparison() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    {
      id: 1,
      name: 'Premium Wireless Earbuds',
      category: 'audio',
      averageRating: 4.8,
      totalReviews: 847,
      price: '$149',
      image:
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      pros: [
        { text: 'Excellent sound quality', mentions: 412 },
        { text: 'Comfortable fit', mentions: 389 },
        { text: 'Long battery life', mentions: 356 },
        { text: 'Quick charging', mentions: 298 },
      ],
      cons: [
        { text: 'Expensive', mentions: 124 },
        { text: 'Case feels fragile', mentions: 87 },
        { text: 'Limited color options', mentions: 45 },
      ],
      ratings: {
        5: 74,
        4: 18,
        3: 5,
        2: 2,
        1: 1,
      },
    },
    {
      id: 2,
      name: 'Budget Wireless Earbuds',
      category: 'audio',
      averageRating: 4.2,
      totalReviews: 1243,
      price: '$49',
      image:
        'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      pros: [
        { text: 'Great value', mentions: 678 },
        { text: 'Good sound for price', mentions: 534 },
        { text: 'Lightweight', mentions: 423 },
        { text: 'Easy setup', mentions: 387 },
      ],
      cons: [
        { text: 'Average battery life', mentions: 234 },
        { text: 'Build quality concerns', mentions: 189 },
        { text: 'Occasional connectivity issues', mentions: 156 },
      ],
      ratings: {
        5: 45,
        4: 32,
        3: 15,
        2: 6,
        1: 2,
      },
    },
    {
      id: 3,
      name: 'Pro Studio Headphones',
      category: 'audio',
      averageRating: 4.9,
      totalReviews: 523,
      price: '$299',
      image:
        'https://images.unsplash.com/photo-1545127398-14699f92334b?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3',
      pros: [
        { text: 'Studio-quality sound', mentions: 487 },
        { text: 'Durable construction', mentions: 456 },
        { text: 'Comfortable for long sessions', mentions: 421 },
        { text: 'Excellent noise isolation', mentions: 398 },
      ],
      cons: [
        { text: 'Heavy', mentions: 98 },
        { text: 'Not portable', mentions: 67 },
        { text: 'Premium price', mentions: 54 },
      ],
      ratings: {
        5: 85,
        4: 12,
        3: 2,
        2: 1,
        1: 0,
      },
    },
  ];

  const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'audio', label: 'Audio' },
    { value: 'smart', label: 'Smart Devices' },
    { value: 'accessories', label: 'Accessories' },
  ];

  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Compare Customer Reviews
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          See what customers are saying about our top products
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex justify-center">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="relative overflow-hidden">
            {/* Best Value Badge */}
            {product.id === 2 && (
              <Badge className="absolute top-4 right-4 gap-1">
                <Award className="size-3" />
                Best Value
              </Badge>
            )}

            <CardHeader>
              <div className="bg-muted mb-4 aspect-video overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardTitle className="text-xl">{product.name}</CardTitle>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-2xl font-bold">{product.price}</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="size-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">
                      {product.averageRating}
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm">
                    ({product.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Rating Distribution */}
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Rating Distribution</h4>
                {Object.entries(product.ratings)
                  .reverse()
                  .map(([stars, percentage]) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="w-4 text-sm">{stars}</span>
                      <Star className="size-3 fill-yellow-400 text-yellow-400" />
                      <Progress value={percentage} className="h-2 flex-1" />
                      <span className="text-muted-foreground w-10 text-right text-sm">
                        {percentage}%
                      </span>
                    </div>
                  ))}
              </div>

              {/* Pros */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <ThumbsUp className="size-4 text-green-600" />
                  What customers love
                </h4>
                <div className="space-y-2">
                  {product.pros.map((pro, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{pro.text}</span>
                      <Badge variant="secondary" className="text-xs">
                        {pro.mentions}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cons */}
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                  <ThumbsDown className="size-4 text-orange-600" />
                  Common concerns
                </h4>
                <div className="space-y-2">
                  {product.cons.map((con, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="text-sm">{con.text}</span>
                      <Badge variant="outline" className="text-xs">
                        {con.mentions}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-4">
                <Button className="w-full">View All Reviews</Button>
                <Button variant="outline" className="w-full">
                  Compare Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-muted/50 mt-12 rounded-lg p-6">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <AlertCircle className="size-4" />
          <span>
            Based on verified customer reviews from the last 12 months
          </span>
        </div>
      </div>
    </div>
  );
}
