import { Button } from '../../../ui/button';
import {
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Package,
  X,
  ShoppingBag,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';
import { Progress } from '../../../ui/progress';

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

export default function SidebarCart() {
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
    {
      id: '3',
      name: 'Leather Strap Watch',
      price: 249.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
      color: 'Brown',
      size: 'Standard',
      stock: 7,
    },
  ]);

  const [isOpen, setIsOpen] = useState(true);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 200 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Calculate how close to free shipping
  const freeShippingThreshold = 200;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(
    100,
    (subtotal / freeShippingThreshold) * 100
  );

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
      <div className="relative h-[650px] p-6">
        {/* Cart Toggle Button */}
        {!isOpen && (
          <Button
            variant="outline"
            size="icon"
            className="fixed top-6 right-6 z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {items.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center p-0"
                >
                  {totalItems}
                </Badge>
              )}
            </div>
          </Button>
        )}

        {/* Sidebar Cart */}
        <div
          className={`bg-background fixed top-0 right-0 z-40 h-full w-80 transform border-l shadow-xl transition-transform duration-300 md:w-96 ${
            isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b p-4">
              <div>
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <p className="text-muted-foreground text-sm">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Free Shipping Progress */}
            <div className="bg-muted/30 px-4 py-3">
              {amountToFreeShipping > 0 ? (
                <div className="space-y-2">
                  <div className="text-sm">
                    Add ${amountToFreeShipping.toFixed(2)} more for free
                    shipping
                  </div>
                  <Progress value={freeShippingProgress} className="h-2" />
                </div>
              ) : (
                <div className="text-primary flex items-center gap-2 text-sm">
                  <Package className="h-4 w-4" />
                  <span>You&apos;ve unlocked free shipping!</span>
                </div>
              )}
            </div>

            {/* Cart Items */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 border-b pb-4 last:border-0"
                >
                  {/* Product Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="truncate pr-6 text-sm font-medium">
                          {item.name}
                        </h3>
                        <p className="text-muted-foreground text-xs">
                          {item.color} • {item.size}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
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
                        <span className="w-7 text-center text-sm">
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
            <div className="space-y-4 border-t p-4">
              <div className="space-y-2">
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
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Checkout
                </Button>
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
