import { useState } from 'react';
import { Check, Filter, X } from 'lucide-react';
import { cn } from '@/arc-shims/kit-utils';
import { Button } from '../../../ui/button';
import { Badge } from '../../../ui/badge';
import { Checkbox } from '../../../ui/checkbox';
import { Slider } from '../../../ui/slider';
import { Separator } from '../../../ui/separator';
import { ScrollArea } from '../../../ui/scroll-area';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../../../ui/drawer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../ui/accordion';

interface FilterDrawerProps {
  className?: string;
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  brands: string[];
  colors: string[];
  sizes: string[];
  ratings: number[];
}

export default function FilterDrawer({
  className,
  onFilterChange,
}: FilterDrawerProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 500],
    brands: [],
    colors: [],
    sizes: [],
    ratings: [],
  });

  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [open, setOpen] = useState(false);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);

    // Count active filters
    let count = 0;
    if (updated.categories.length) count += updated.categories.length;
    if (updated.brands.length) count += updated.brands.length;
    if (updated.colors.length) count += updated.colors.length;
    if (updated.sizes.length) count += updated.sizes.length;
    if (updated.ratings.length) count += updated.ratings.length;
    if (updated.priceRange[0] > 0 || updated.priceRange[1] < 500) count += 1;

    setActiveFiltersCount(count);
    onFilterChange?.(updated);
  };

  const toggleFilter = (type: keyof FilterState, value: string | number) => {
    const currentValues = filters[type] as (string | number)[];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];

    updateFilters({ [type]: newValues } as Partial<FilterState>);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500],
      brands: [],
      colors: [],
      sizes: [],
      ratings: [],
    });
    setActiveFiltersCount(0);
    onFilterChange?.({
      categories: [],
      priceRange: [0, 500],
      brands: [],
      colors: [],
      sizes: [],
      ratings: [],
    });
  };

  const categories = [
    'Clothing',
    'Shoes',
    'Accessories',
    'Sportswear',
    'Outerwear',
    'Formal Wear',
    'Casual Wear',
  ];

  const brands = [
    'Nike',
    'Adidas',
    'Puma',
    'Under Armour',
    'New Balance',
    'Levi&apos;s',
    'H&M',
    'Zara',
  ];

  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Purple', value: '#800080' },
    { name: 'Orange', value: '#FFA500' },
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  const ratings = [4, 3, 2, 1];

  const ActiveFilterBadges = () => {
    const activeFilters = [
      ...filters.categories.map((cat) => ({ type: 'categories', value: cat })),
      ...filters.brands.map((brand) => ({ type: 'brands', value: brand })),
      ...filters.colors.map((color) => ({ type: 'colors', value: color })),
      ...filters.sizes.map((size) => ({ type: 'sizes', value: size })),
      ...filters.ratings.map((rating) => ({
        type: 'ratings',
        value: `${rating} Stars & Up`,
      })),
      ...(filters.priceRange[0] > 0 || filters.priceRange[1] < 500
        ? [
            {
              type: 'price',
              value: `$${filters.priceRange[0]} - $${filters.priceRange[1]}`,
            },
          ]
        : []),
    ];

    if (activeFilters.length === 0) return null;

    return (
      <div className="mt-3 flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <Badge
            key={`${filter.type}-${filter.value}-${index}`}
            variant="outline"
            className="flex items-center gap-1 px-2 py-1"
          >
            {filter.value}
            <Button
              variant="ghost"
              size="icon"
              className="ml-1 h-4 w-4 p-0"
              onClick={() =>
                toggleFilter(filter.type as keyof FilterState, filter.value)
              }
            >
              <X className="h-3 w-3" />
            </Button>
          </Badge>
        ))}
        {activeFilters.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs"
            onClick={clearFilters}
          >
            Clear all
          </Button>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Height is set to 800px for demo purposes */}
      <div className={cn('h-[800px] w-full p-6', className)}>
        <div className="mb-4 flex items-center justify-between">
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="border-b pb-4">
                <DrawerTitle>Filters</DrawerTitle>
                <DrawerDescription>
                  Refine your product search with filters
                </DrawerDescription>
              </DrawerHeader>
              <ScrollArea className="h-[60vh] px-4 py-2">
                <Accordion type="multiple" className="w-full">
                  <AccordionItem value="categories">
                    <AccordionTrigger className="py-3">
                      Categories
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div
                            key={category}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`category-${category}`}
                              checked={filters.categories.includes(category)}
                              onCheckedChange={() =>
                                toggleFilter('categories', category)
                              }
                            />
                            <label
                              htmlFor={`category-${category}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price">
                    <AccordionTrigger className="py-3">
                      Price Range
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 px-1 pt-4">
                        <Slider
                          value={filters.priceRange}
                          min={0}
                          max={500}
                          step={10}
                          onValueChange={(value) =>
                            updateFilters({
                              priceRange: value as [number, number],
                            })
                          }
                        />
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground text-sm">
                            ${filters.priceRange[0]}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            ${filters.priceRange[1]}
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="brands">
                    <AccordionTrigger className="py-3">Brands</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {brands.map((brand) => (
                          <div
                            key={brand}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`brand-${brand}`}
                              checked={filters.brands.includes(brand)}
                              onCheckedChange={() =>
                                toggleFilter('brands', brand)
                              }
                            />
                            <label
                              htmlFor={`brand-${brand}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="colors">
                    <AccordionTrigger className="py-3">Colors</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-4 gap-3">
                        {colors.map((color) => (
                          <div
                            key={color.name}
                            className="flex flex-col items-center gap-1"
                          >
                            <button
                              className={cn(
                                'border-input flex h-8 w-8 items-center justify-center rounded-full border',
                                filters.colors.includes(color.name) &&
                                  'ring-primary ring-2'
                              )}
                              style={{ backgroundColor: color.value }}
                              onClick={() => toggleFilter('colors', color.name)}
                            >
                              {filters.colors.includes(color.name) && (
                                <Check
                                  className={cn(
                                    'h-4 w-4',
                                    ['White', 'Yellow'].includes(color.name)
                                      ? 'text-black'
                                      : 'text-white'
                                  )}
                                />
                              )}
                            </button>
                            <span className="text-xs">{color.name}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="sizes">
                    <AccordionTrigger className="py-3">Sizes</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-3 gap-2">
                        {sizes.map((size) => (
                          <Button
                            key={size}
                            variant={
                              filters.sizes.includes(size)
                                ? 'default'
                                : 'outline'
                            }
                            size="sm"
                            onClick={() => toggleFilter('sizes', size)}
                            className="h-8"
                          >
                            {size}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="ratings" className="border-b-0">
                    <AccordionTrigger className="py-3">Rating</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {ratings.map((rating) => (
                          <div
                            key={rating}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`rating-${rating}`}
                              checked={filters.ratings.includes(rating)}
                              onCheckedChange={() =>
                                toggleFilter('ratings', rating)
                              }
                            />
                            <label
                              htmlFor={`rating-${rating}`}
                              className="flex items-center text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {Array.from({ length: rating }).map((_, i) => (
                                <svg
                                  key={i}
                                  className="h-4 w-4 fill-current text-yellow-400"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                </svg>
                              ))}
                              <span className="ml-1">& Up</span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </ScrollArea>
              <DrawerFooter className="border-t pt-4">
                <div className="flex w-full items-center justify-between">
                  <Button variant="outline" onClick={clearFilters}>
                    Clear all
                  </Button>
                  <DrawerClose asChild>
                    <Button>Apply filters</Button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="hidden sm:flex"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Active Filter Badges */}
        <ActiveFilterBadges />

        <Separator className="my-4" />
      </div>
    </>
  );
}
