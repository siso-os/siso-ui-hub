"use client";

import { useState } from "react";

import { Button } from "../../../shadcn/ui/button";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../../../shadcn/ui/carousel";

export const title = "Carousel with Thumbnails";

const slides = [
  {
    id: 1,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/images/1-16x9.jpg",
  },
  {
    id: 2,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/images/2-16x9.jpg",
  },
  {
    id: 3,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/images/3-16x9.jpg",
  },
  {
    id: 4,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/images/4-16x9.jpg",
  },
  {
    id: 5,
    image:
      "https://deifkwefumgah.cloudfront.net/shadcnblocks/image-set/placeholder/images/5-16x9.jpg",
  },
];

const Example = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleApiChange = (newApi: CarouselApi) => {
    setApi(newApi);

    if (newApi) {
      setCurrent(newApi.selectedScrollSnap());

      newApi.on("select", () => {
        setCurrent(newApi.selectedScrollSnap());
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <Carousel setApi={handleApiChange}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="flex aspect-[2/1] items-center justify-center rounded-md border bg-background">
                <span className="text-4xl font-semibold">{slide.id}</span>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center gap-2">
        {slides.map((slide, index) => (
          <Button
            key={slide.id}
            onClick={() => api?.scrollTo(index)}
            variant={current === index ? "default" : "outline"}
          >
            {slide.id}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Example;
