import { Button } from '../../../ui/button';
import { Checkbox } from '../../../ui/checkbox';
import { ArrowUpDown, Heart, Star } from 'lucide-react';
import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
}

export default function TableList() {
  const [sortBy, setSortBy] = useState<keyof Product>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const products: Product[] = [
    {
      id: 1,
      name: 'Classic Leather Watch',
      category: 'Accessories',
      price: 299,
      originalPrice: 399,
      rating: 4.9,
      reviews: 128,
      stock: 45,
    },
    {
      id: 2,
      name: 'Premium Steel Watch',
      category: 'Accessories',
      price: 499,
      originalPrice: 599,
      rating: 4.8,
      reviews: 96,
      stock: 32,
    },
    {
      id: 3,
      name: 'Smart Watch Pro',
      category: 'Electronics',
      price: 399,
      originalPrice: 449,
      rating: 4.7,
      reviews: 256,
      stock: 18,
    },
    {
      id: 4,
      name: 'Minimalist Watch',
      category: 'Accessories',
      price: 199,
      originalPrice: 249,
      rating: 4.6,
      reviews: 64,
      stock: 56,
    },
    {
      id: 5,
      name: 'Sport Watch Elite',
      category: 'Sports',
      price: 349,
      originalPrice: 399,
      rating: 4.8,
      reviews: 192,
      stock: 27,
    },
  ];

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    return sortOrder === 'asc'
      ? aValue > bValue
        ? 1
        : -1
      : aValue < bValue
        ? 1
        : -1;
  });

  const handleSort = (key: keyof Product) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
  };

  const handleSelectAll = () => {
    if (selectedItems.length === products.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map((p) => p.id));
    }
  };

  const handleSelect = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((i) => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  return (
    <div className="mx-auto w-full max-w-7xl p-6">
      <div className="bg-card rounded-xl border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b">
                <th className="w-12 p-4">
                  <Checkbox
                    checked={selectedItems.length === products.length}
                    onCheckedChange={handleSelectAll}
                    aria-label="Select all"
                  />
                </th>
                <th className="p-4 text-left">Product</th>
                <th className="p-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('category')}
                    className="flex h-8 items-center gap-1 font-medium"
                  >
                    Category
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </th>
                <th className="p-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('price')}
                    className="flex h-8 items-center gap-1 font-medium"
                  >
                    Price
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </th>
                <th className="p-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('rating')}
                    className="flex h-8 items-center gap-1 font-medium"
                  >
                    Rating
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </th>
                <th className="p-4">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort('stock')}
                    className="flex h-8 items-center gap-1 font-medium"
                  >
                    Stock
                    <ArrowUpDown className="h-4 w-4" />
                  </Button>
                </th>
                <th className="w-24 p-4"></th>
              </tr>
            </thead>
            <tbody>
              {sortedProducts.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-4">
                    <Checkbox
                      checked={selectedItems.includes(product.id)}
                      onCheckedChange={() => handleSelect(product.id)}
                      aria-label={`Select ${product.name}`}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-muted relative h-12 w-12 overflow-hidden rounded-lg">
                        <img
                          src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                          alt={product.name}
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="text-muted-foreground text-sm">
                          SKU: {product.id.toString().padStart(4, '0')}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="bg-secondary text-secondary-foreground inline-block rounded-md px-2 py-1 text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="font-medium">${product.price}</div>
                    <div className="text-muted-foreground text-sm line-through">
                      ${product.originalPrice}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="fill-primary text-primary h-4 w-4" />
                      <span>{product.rating}</span>
                      <span className="text-muted-foreground">
                        ({product.reviews})
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span
                      className={`text-sm font-medium ${
                        product.stock < 20
                          ? 'text-destructive'
                          : product.stock < 50
                            ? 'text-orange-500'
                            : 'text-green-500'
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="w-full">
                        Buy
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
