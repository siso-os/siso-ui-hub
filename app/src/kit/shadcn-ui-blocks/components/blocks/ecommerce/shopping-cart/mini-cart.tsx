import { Button } from '../../../ui/button';
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../ui/popover';
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Package,
} from 'lucide-react';
import { useState } from 'react';

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

export default function MiniCart() {
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

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 5.99;
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

  return (
    <>
      {/* Height and default open set for example purpose only */}
      <div className="h-[650px] p-6">
        <Popover defaultOpen>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="bg-primary text-primary-foreground absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
                  {items.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg">Shopping Cart</CardTitle>
              <CardDescription>
                {items.length} {items.length === 1 ? 'item' : 'items'} in your
                cart
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              {/* Cart Items */}
              <div className="max-h-[300px] overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b p-4 last:border-0"
                  >
                    {/* Product Image */}
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded-md object-cover"
                        sizes="64px"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between">
                        <div className="space-y-1">
                          <h3 className="truncate text-sm font-medium">
                            {item.name}
                          </h3>
                          <p className="text-muted-foreground text-xs">
                            {item.color} • {item.size}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 text-center text-sm">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
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
              <div className="space-y-4 p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4" />
                  <span>Free shipping on orders over $200</span>
                </div>

                <Button className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Checkout
                </Button>
              </div>
            </CardContent>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
