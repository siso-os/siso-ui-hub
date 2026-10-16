import { useState, useEffect } from 'react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { RadioGroup, RadioGroupItem } from '../../../ui/radio-group';
import { Slider } from '../../../ui/slider';
import { Switch } from '../../../ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../../../ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../../ui/tooltip';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';
import {
  InfoIcon,
  CheckIcon,
  ShoppingCartIcon,
  Share2Icon,
  HeartIcon,
} from 'lucide-react';

export default function HeroFormProductCustomizer() {
  // Product state
  const [product, setProduct] = useState({
    name: 'Custom Ergonomic Chair',
    basePrice: 299,
    color: 'black',
    material: 'fabric',
    armrests: true,
    headrest: false,
    lumbarSupport: true,
    height: 5, // 1-10 scale
    recline: 3, // 1-5 scale
    quantity: 1,
  });

  // UI state
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderComplete, setOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Calculate price based on options
  useEffect(() => {
    let price = product.basePrice;

    // Add costs for premium options
    if (product.material === 'leather') price += 100;
    else if (product.material === 'mesh') price += 50;

    if (product.headrest) price += 45;
    if (product.lumbarSupport) price += 35;

    // Multiply by quantity
    price *= product.quantity;

    setTotalPrice(price);
  }, [product]);

  // Get image URL based on product configuration
  const getProductImageUrl = () => {
    let baseImage = '';

    // Select base image based on color and material
    if (product.material === 'leather') {
      if (product.color === 'black') {
        baseImage =
          'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=2000&auto=format&fit=crop';
      } else if (product.color === 'brown') {
        baseImage =
          'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop';
      } else {
        baseImage =
          'https://images.unsplash.com/photo-1505843490701-5c4b83790555?q=80&w=1918&auto=format&fit=crop';
      }
    } else if (product.material === 'mesh') {
      baseImage =
        'https://images.unsplash.com/photo-1596079890701-dd42edf0b7d4?q=80&w=2071&auto=format&fit=crop';
    } else {
      // Fabric chair
      if (product.color === 'black') {
        baseImage =
          'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?q=80&w=2069&auto=format&fit=crop';
      } else if (product.color === 'blue') {
        baseImage =
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2158&auto=format&fit=crop';
      } else {
        baseImage =
          'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=1974&auto=format&fit=crop';
      }
    }

    return baseImage;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setOrderComplete(true);
    }, 1500);
  };

  return (
    <>
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
        <div className="bg-grid-slate-200 dark:bg-grid-slate-800/20 absolute inset-0 bg-[size:24px_24px] opacity-10"></div>

        <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 text-center">
              <Badge
                variant="outline"
                className="mb-4 px-3 py-1 text-sm font-medium"
              >
                Customizable Product
              </Badge>
              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                Design Your Perfect Chair
              </h1>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Customize every detail to create a chair that matches your exact
                needs, comfort preferences, and style.
              </p>
            </div>

            {!orderComplete ? (
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {/* Product Preview */}
                <div className="order-2 lg:order-1">
                  <Card className="flex h-full flex-col overflow-hidden p-0">
                    <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                      <img
                        src={getProductImageUrl()}
                        alt={`${product.color} ${product.material} chair`}
                        className="object-cover"
                      />
                      <div className="absolute top-4 right-4 space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900"
                        >
                          <HeartIcon className="h-4 w-4" />
                          <span className="sr-only">Add to favorites</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white dark:bg-slate-900/80 dark:hover:bg-slate-900"
                        >
                          <Share2Icon className="h-4 w-4" />
                          <span className="sr-only">Share</span>
                        </Button>
                      </div>
                    </div>
                    <CardContent className="flex-grow p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h2 className="text-2xl font-bold">{product.name}</h2>
                          <p className="text-muted-foreground">
                            Your custom configuration
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">
                            ${totalPrice}
                          </div>
                          <p className="text-muted-foreground text-xs">
                            Free shipping
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h3 className="mb-1 text-sm font-medium">
                            Selected Options
                          </h3>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Color:
                              </span>
                              <span className="capitalize">
                                {product.color}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Material:
                              </span>
                              <span className="capitalize">
                                {product.material}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Armrests:
                              </span>
                              <span>{product.armrests ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Headrest:
                              </span>
                              <span>{product.headrest ? 'Yes' : 'No'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Lumbar Support:
                              </span>
                              <span>
                                {product.lumbarSupport ? 'Yes' : 'No'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Height:
                              </span>
                              <span>{product.height}/10</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Recline:
                              </span>
                              <span>{product.recline}/5</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Quantity:
                              </span>
                              <span>{product.quantity}</span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        <div>
                          <h3 className="mb-2 text-sm font-medium">
                            Product Features
                          </h3>
                          <ul className="text-muted-foreground space-y-1 text-sm">
                            <li className="flex items-start">
                              <CheckIcon className="mt-0.5 mr-2 h-4 w-4 text-green-500" />
                              <span>5-year warranty on all parts</span>
                            </li>
                            <li className="flex items-start">
                              <CheckIcon className="mt-0.5 mr-2 h-4 w-4 text-green-500" />
                              <span>Easy assembly with included tools</span>
                            </li>
                            <li className="flex items-start">
                              <CheckIcon className="mt-0.5 mr-2 h-4 w-4 text-green-500" />
                              <span>Certified eco-friendly materials</span>
                            </li>
                            <li className="flex items-start">
                              <CheckIcon className="mt-0.5 mr-2 h-4 w-4 text-green-500" />
                              <span>30-day risk-free trial</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Customization Options */}
                <div className="order-1 lg:order-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Customize Your Chair</CardTitle>
                      <CardDescription>
                        Select your preferred options and features
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Color Selection */}
                        <div className="space-y-3">
                          <Label>Color</Label>
                          <RadioGroup
                            value={product.color}
                            onValueChange={(value) =>
                              setProduct({ ...product, color: value })
                            }
                            className="flex gap-3"
                          >
                            <div>
                              <RadioGroupItem
                                value="black"
                                id="color-black"
                                className="sr-only"
                              />
                              <Label
                                htmlFor="color-black"
                                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-900 ${
                                  product.color === 'black'
                                    ? 'ring-primary ring-2 ring-offset-2'
                                    : ''
                                }`}
                              >
                                {product.color === 'black' && (
                                  <CheckIcon className="h-4 w-4 text-white" />
                                )}
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="blue"
                                id="color-blue"
                                className="sr-only"
                              />
                              <Label
                                htmlFor="color-blue"
                                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-600 ${
                                  product.color === 'blue'
                                    ? 'ring-primary ring-2 ring-offset-2'
                                    : ''
                                }`}
                              >
                                {product.color === 'blue' && (
                                  <CheckIcon className="h-4 w-4 text-white" />
                                )}
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="brown"
                                id="color-brown"
                                className="sr-only"
                              />
                              <Label
                                htmlFor="color-brown"
                                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-amber-800 ${
                                  product.color === 'brown'
                                    ? 'ring-primary ring-2 ring-offset-2'
                                    : ''
                                }`}
                              >
                                {product.color === 'brown' && (
                                  <CheckIcon className="h-4 w-4 text-white" />
                                )}
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="gray"
                                id="color-gray"
                                className="sr-only"
                              />
                              <Label
                                htmlFor="color-gray"
                                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-400 ${
                                  product.color === 'gray'
                                    ? 'ring-primary ring-2 ring-offset-2'
                                    : ''
                                }`}
                              >
                                {product.color === 'gray' && (
                                  <CheckIcon className="h-4 w-4 text-white" />
                                )}
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        {/* Material Selection */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label>Material</Label>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <InfoIcon className="text-muted-foreground h-4 w-4" />
                                </TooltipTrigger>
                                <TooltipContent className="w-80 p-4">
                                  <p className="mb-1 font-medium">
                                    Material Details:
                                  </p>
                                  <ul className="space-y-1 text-sm">
                                    <li>
                                      <span className="font-medium">
                                        Fabric:
                                      </span>{' '}
                                      Breathable and comfortable, standard
                                      option.
                                    </li>
                                    <li>
                                      <span className="font-medium">Mesh:</span>{' '}
                                      Better airflow, ideal for warmer
                                      environments (+$50).
                                    </li>
                                    <li>
                                      <span className="font-medium">
                                        Leather:
                                      </span>{' '}
                                      Premium look and feel, more durable
                                      (+$100).
                                    </li>
                                  </ul>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                          <RadioGroup
                            value={product.material}
                            onValueChange={(value) =>
                              setProduct({ ...product, material: value })
                            }
                            className="grid grid-cols-3 gap-3"
                          >
                            <div>
                              <RadioGroupItem
                                value="fabric"
                                id="material-fabric"
                                className="sr-only"
                              />
                              <Label
                                htmlFor="material-fabric"
                                className={`bg-popover hover:bg-accent hover:text-accent-foreground flex h-20 flex-col items-center justify-center rounded-md border-2 p-2 ${
                                  product.material === 'fabric'
                                    ? 'border-primary'
                                    : 'border-muted'
                                }`}
                              >
                                <span className="text-sm font-medium">
                                  Fabric
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  Standard
                                </span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="mesh"
                                id="material-mesh"
                                className="sr-only"
                              />
                              <Label
                                htmlFor="material-mesh"
                                className={`bg-popover hover:bg-accent hover:text-accent-foreground flex h-20 flex-col items-center justify-center rounded-md border-2 p-2 ${
                                  product.material === 'mesh'
                                    ? 'border-primary'
                                    : 'border-muted'
                                }`}
                              >
                                <span className="text-sm font-medium">
                                  Mesh
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  +$50
                                </span>
                              </Label>
                            </div>
                            <div>
                              <RadioGroupItem
                                value="leather"
                                id="material-leather"
                                className="sr-only"
                              />
                              <Label
                                htmlFor="material-leather"
                                className={`bg-popover hover:bg-accent hover:text-accent-foreground flex h-20 flex-col items-center justify-center rounded-md border-2 p-2 ${
                                  product.material === 'leather'
                                    ? 'border-primary'
                                    : 'border-muted'
                                }`}
                              >
                                <span className="text-sm font-medium">
                                  Leather
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  +$100
                                </span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator />

                        {/* Optional Features */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Features</h3>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="armrests">Armrests</Label>
                              <div className="text-muted-foreground text-xs">
                                Adjustable height and width
                              </div>
                            </div>
                            <Switch
                              id="armrests"
                              checked={product.armrests}
                              onCheckedChange={(checked) =>
                                setProduct({ ...product, armrests: checked })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="headrest">Headrest</Label>
                              <div className="text-muted-foreground text-xs">
                                Additional head support (+$45)
                              </div>
                            </div>
                            <Switch
                              id="headrest"
                              checked={product.headrest}
                              onCheckedChange={(checked) =>
                                setProduct({ ...product, headrest: checked })
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="lumbarSupport">
                                Lumbar Support
                              </Label>
                              <div className="text-muted-foreground text-xs">
                                Adjustable back support (+$35)
                              </div>
                            </div>
                            <Switch
                              id="lumbarSupport"
                              checked={product.lumbarSupport}
                              onCheckedChange={(checked) =>
                                setProduct({
                                  ...product,
                                  lumbarSupport: checked,
                                })
                              }
                            />
                          </div>
                        </div>

                        <Separator />

                        {/* Adjustments */}
                        <div className="space-y-4">
                          <h3 className="text-sm font-medium">Adjustments</h3>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <Label htmlFor="height">Chair Height</Label>
                              <span className="text-muted-foreground text-sm">
                                {product.height}/10
                              </span>
                            </div>
                            <Slider
                              id="height"
                              min={1}
                              max={10}
                              step={1}
                              value={[product.height]}
                              onValueChange={(values) =>
                                setProduct({ ...product, height: values[0]! })
                              }
                            />
                            <div className="text-muted-foreground flex justify-between text-xs">
                              <span>Lower</span>
                              <span>Higher</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <Label htmlFor="recline">Recline Tension</Label>
                              <span className="text-muted-foreground text-sm">
                                {product.recline}/5
                              </span>
                            </div>
                            <Slider
                              id="recline"
                              min={1}
                              max={5}
                              step={1}
                              value={[product.recline]}
                              onValueChange={(values) =>
                                setProduct({ ...product, recline: values[0]! })
                              }
                            />
                            <div className="text-muted-foreground flex justify-between text-xs">
                              <span>Soft</span>
                              <span>Firm</span>
                            </div>
                          </div>
                        </div>

                        <Separator />

                        {/* Quantity */}
                        <div className="space-y-3">
                          <Label htmlFor="quantity">Quantity</Label>
                          <div className="flex items-center">
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() =>
                                product.quantity > 1 &&
                                setProduct({
                                  ...product,
                                  quantity: product.quantity - 1,
                                })
                              }
                              disabled={product.quantity <= 1}
                            >
                              -
                            </Button>
                            <Input
                              id="quantity"
                              type="number"
                              min={1}
                              max={10}
                              className="h-8 w-16 [appearance:textfield] rounded-none text-center [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                              value={product.quantity}
                              onChange={(e) => {
                                const value = parseInt(e.target.value);
                                if (
                                  !isNaN(value) &&
                                  value >= 1 &&
                                  value <= 10
                                ) {
                                  setProduct({ ...product, quantity: value });
                                }
                              }}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() =>
                                product.quantity < 10 &&
                                setProduct({
                                  ...product,
                                  quantity: product.quantity + 1,
                                })
                              }
                              disabled={product.quantity >= 10}
                            >
                              +
                            </Button>
                          </div>
                        </div>

                        <Separator />

                        <div className="pt-4">
                          <div className="mb-4 flex items-center justify-between">
                            <div className="text-lg font-medium">Total</div>
                            <div className="text-2xl font-bold">
                              ${totalPrice}
                            </div>
                          </div>
                          <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <span className="flex items-center">
                                <svg
                                  className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Processing...
                              </span>
                            ) : (
                              <span className="flex items-center">
                                <ShoppingCartIcon className="mr-2 h-4 w-4" />
                                Add to Cart
                              </span>
                            )}
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card className="mx-auto max-w-xl">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-2xl">
                    Order Added to Cart!
                  </CardTitle>
                  <CardDescription>
                    Your custom chair has been added to your cart.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6 flex items-start gap-4">
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-slate-100">
                      <img
                        src={getProductImageUrl()}
                        alt={`${product.color} ${product.material} chair`}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        Custom configuration
                      </p>
                      <div className="mt-1 flex text-sm">
                        <p className="text-muted-foreground">
                          {product.color.charAt(0).toUpperCase() +
                            product.color.slice(1)}
                          ,{' '}
                          {product.material.charAt(0).toUpperCase() +
                            product.material.slice(1)}
                          {product.headrest ? ', with headrest' : ''}
                        </p>
                      </div>
                      <div className="text-muted-foreground mt-1 text-sm">
                        Qty {product.quantity}
                      </div>
                    </div>
                    <div className="flex-1 text-right">
                      <p className="font-medium">${totalPrice}</p>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Tax (estimated)
                      </span>
                      <span>${Math.round(totalPrice * 0.0725)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>
                        ${totalPrice + Math.round(totalPrice * 0.0725)}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-3">
                  <Button className="w-full">Proceed to Checkout</Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setOrderComplete(false)}
                  >
                    Continue Shopping
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
