import { Button } from '../../../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Package,
  X,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';

interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  color: string;
  size: string;
  stock: number;
}

export default function FloatingCart() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Classic Chronograph Watch',
      price: 299.99,
      originalPrice: 399.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      color: 'Black',
      size: 'Standard',
      stock: 5,
    },
    {
      id: '2',
      name: 'Sport Diver Watch',
      price: 199.99,
      quantity: 2,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      color: 'Blue',
      size: 'Standard',
      stock: 3,
    },
  ]);

  const [isOpen, setIsOpen] = useState(true);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 5.99;
  const total = subtotal + shipping;

  const updateQuantity = (id: string, change: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(
            1,
            Math.min(item.stock, item.quantity + change)
          );
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Height set for example purpose only */}
      <div className="relative h-[750px] p-6">
        {/* Cart Toggle Button */}
        <Button
          variant="outline"
          size="icon"
          className="fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <div className="relative">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-3 -right-3 flex h-5 w-5 items-center justify-center p-0"
                >
                  {totalItems}
                </Badge>
              )}
            </div>
          )}
        </Button>

        {/* Floating Cart Panel */}
        {isOpen && (
          <Card className="animate-in slide-in-from-bottom-5 fixed right-6 bottom-24 z-40 w-80 border-2 shadow-xl duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Cart</CardTitle>
                <Badge variant="outline" className="font-normal">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </Badge>
              </div>
              <CardDescription>
                Review your items before checkout
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              {/* Cart Items */}
              <div className="max-h-[300px] overflow-y-auto px-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 border-b py-3 last:border-0"
                  >
                    {/* Product Image */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="w-40 truncate text-sm font-medium">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-xs">
                            {item.color} • {item.size}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-6 h-6 w-6"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-md border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-none"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-xs">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-none"
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          {item.originalPrice && (
                            <div className="text-muted-foreground text-xs line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="bg-muted/30 space-y-3 px-6 py-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-2 pt-4 pb-6">
              <div className="text-muted-foreground mb-2 flex items-center gap-2 text-xs">
                <Package className="h-3 w-3" />
                <span>Free shipping on orders over $200</span>
              </div>

              <Button className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Checkout
              </Button>

              <Button variant="outline" className="w-full" size="sm">
                <span>View Cart</span>
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}
