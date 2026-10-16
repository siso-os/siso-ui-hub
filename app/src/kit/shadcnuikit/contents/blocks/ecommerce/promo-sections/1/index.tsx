"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { ArrowRightIcon } from "lucide-react";
import { MarqueeEffect } from "../../../../../components/marquee-effect";
import { Button } from "../../../../../../shadcn/ui/button";

const images = [
  "https://images.unsplash.com/photo-1502389614483-e475fc34407e?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=500&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=500&auto=format&fit=crop",
];

const columns = [
  { reverse: false, images: images.slice(0, 5) },
  { reverse: true, images: images.slice(5, 10) },
];

export default function PromoSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="w-full py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center lg:grid-cols-2">
          <header className="relative z-10 mx-auto mb-8 max-w-xl text-center lg:mb-10 lg:text-start">
            <h2 className="mb-4 text-4xl leading-tight font-bold text-balance md:text-5xl">
              Summer styles are finally here
            </h2>
            <p className="text-muted-foreground text-balance lg:text-lg">
              Our new summer collection is made for long, bright days: light
              fabrics, easy fits and fresh colors that keep you cool from
              morning to night.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link href="#">
                Shop Collection
                <ArrowRightIcon aria-hidden="true" />
              </Link>
            </Button>
          </header>
          <div className="absolute grid h-96 grid-cols-2 gap-4 overflow-hidden mask-t-from-80% mask-r-from-10% mask-b-from-80% mask-l-from-10% lg:static lg:h-150 lg:mask-r-from-70% lg:mask-l-from-70%">
            {columns.map((column, columnIndex) => {
              const items = column.images.map((image, i) => (
                <figure key={image}>
                  <Image
                    src={image}
                    className="aspect-square object-cover"
                    alt={`Summer collection look ${columnIndex * 5 + i + 1}`}
                    width={400}
                    height={400}
                  />
                </figure>
              ));

              return reduceMotion ? (
                <div key={columnIndex} className="flex flex-col gap-3">
                  {items}
                </div>
              ) : (
                <MarqueeEffect
                  key={columnIndex}
                  gap={12}
                  direction="vertical"
                  reverse={column.reverse}
                  speed={30}
                  speedOnHover={1}
                >
                  {items}
                </MarqueeEffect>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
