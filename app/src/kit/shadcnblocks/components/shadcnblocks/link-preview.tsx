"use client";
import { HoverCard } from "radix-ui";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/arc-shims/kit-utils";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  quality = 50,
  layout = "fixed",
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = new URLSearchParams({
      url,
      screenshot: "true",
      meta: "false",
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": "true",
      "viewport.deviceScaleFactor": "1",
      "viewport.width": String(width * 3),
      "viewport.height": String(height * 3),
    });
    src = `https://api.microlink.io/?${params.toString()}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  /** Plain state avoids motion/react useMotionValue (can break in iframe bundles with duplicate React). */
  const [parallaxX, setParallaxX] = React.useState(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    setParallaxX(offsetFromCenter);
  };

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <img src={src} width={width} height={height} alt="hidden image" />
        </div>
      ) : null}

      <HoverCard.Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCard.Trigger
          onMouseMove={handleMouseMove}
          className={cn("text-black dark:text-white", className)}
          href={url}
        >
          {children}
        </HoverCard.Trigger>

        <HoverCard.Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="rounded-xl shadow-xl"
                style={{
                  x: parallaxX,
                }}
              >
                <a
                  href={url}
                  className="block rounded-xl border-2 border-transparent bg-white p-1 shadow hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                >
                  <img
                    src={isStatic ? imageSrc : src}
                    width={width}
                    height={height}
                    className="rounded-lg"
                    alt="preview image"
                  />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </HoverCard.Content>
      </HoverCard.Root>
    </>
  );
};

/* component forked from Aceternity UI so we could update the radix import to radix-ui */
