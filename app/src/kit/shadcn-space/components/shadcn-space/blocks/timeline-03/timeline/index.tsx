"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Circle } from "lucide-react";
import { Button } from "../../../../../../shadcn/ui/button";
import { cn } from "@/arc-shims/kit-utils";

export interface TimelineItem {
    year: string;
    title: string;
    description: string;
    bullets: string[];
    mainImage: string;
    secondaryImage: string;
    link?: string;
}

export interface TimelineProps {
    title?: string;
    items?: TimelineItem[];
    className?: string;
}

const defaultItems: TimelineItem[] = [
    {
        year: "2005",
        title: "2005",
        description: "Founding of the company with a vision to revolutionize urban living through sustainable architecture and innovative design solutions.",
        bullets: ["Sustainable Urban Design", "Community-Focused Planning"],
        mainImage: "https://images.shadcnspace.com/assets/backgrounds/contact-4-img-1.webp",
        secondaryImage: "https://images.shadcnspace.com/assets/backgrounds/contact-4-img-1.webp",
    },
    {
        year: "2006",
        title: "2006",
        description: "Successfully completed our first major commercial project, setting new standards for energy-efficient office spaces.",
        bullets: ["Energy-Efficient Systems", "Modern Office Concepts"],
        mainImage: "https://images.shadcnspace.com/assets/services/services-7-img-2.webp",
        secondaryImage: "https://images.shadcnspace.com/assets/gallery/gallery-4-img-4.webp",
    },
    {
        year: "2007",
        title: "2007",
        description: "Expanded into residential developments focused on innovation, comfort, and value.",
        bullets: ["Comfort-Driven Living Spaces", "Future-Ready Designs"],
        mainImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-3.webp",
        secondaryImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-2.webp",
    },
    {
        year: "2008",
        title: "2008",
        description: "Launched our luxury division, bringing high-end architectural excellence to premium residential markets.",
        bullets: ["Premium Finishings", "Bespoke Architecture"],
        mainImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-2.webp",
        secondaryImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-1.webp",
    },
    {
        year: "2009",
        title: "2009",
        description: "Pioneered smart home integration in all our new developments, enhancing the living experience through technology.",
        bullets: ["Smart Home Ecosystems", "Intuitive Living Control"],
        mainImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-2.webp",
        secondaryImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-2.webp",
    },
    {
        year: "2010",
        title: "2010",
        description: "Celebrated our 5th anniversary with the unveiling of a landmark mixed-use development in the heart of the city.",
        bullets: ["Mixed-Use Excellence", "Urban Landmark Creation"],
        mainImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-2.webp",
        secondaryImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-2.webp",
    },
    {
        year: "2011",
        title: "2011",
        description: "Expanded our operations internationally, bringing our signature design philosophy to global markets.",
        bullets: ["Global Design Reach", "International Standards"],
        mainImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-2.webp",
        secondaryImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-2.webp",
    },
    {
        year: "2012",
        title: "2012",
        description: "Received prestigious awards for architectural innovation and sustainability in multiple residential projects.",
        bullets: ["Award-Winning Concepts", "Sustainable Excellence"],
        mainImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-2.webp",
        secondaryImage: "https://images.shadcnspace.com/assets/gallery/gallery-3-img-2.webp",
    },
];

export const Timeline = ({
    items = defaultItems,
    className,
}: TimelineProps) => {
    const [activeIndex, setActiveIndex] = useState(2);
    const activeItem = items[activeIndex];
    const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [indicator, setIndicator] = useState({ width: 0, x: 0 });

    useEffect(() => {
        const btn = buttonsRef.current[activeIndex];
        const container = scrollContainerRef.current;
        if (btn && container) {
            const x = btn.offsetLeft + btn.offsetWidth / 2;
            setIndicator({ width: x, x });
            btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }, [activeIndex]);

    return (
        <section className={cn("w-full bg-background overflow-hidden", className)}>
            <div className="flex flex-col gap-8 md:gap-16 py-10 md:py-16 lg:py-20 ">
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 w-full">
                    <div className="max-w-165.5">
                        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-foreground">
                            As trusted partners, we created spaces that elevate everyday living.
                        </h2>
                    </div>
                </div>
                <div className="relative w-full">
                    <div className="absolute top-1.5 left-0 right-0 h-px bg-border" />
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto no-scrollbar scroll-smooth relative justify-between"
                    >
                        <motion.div
                            className="absolute top-1.5 left-0 h-0.5 bg-foreground z-10 origin-left"
                            animate={{ width: indicator.width }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        <motion.div
                            className="absolute top-0.5 size-2.5 rounded-full bg-foreground outline-2 outline-primary/20 z-20"
                            animate={{ x: indicator.x }}
                            style={{ marginLeft: "-5px" }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />

                        {items.map((item, index) => (
                            <button
                                key={item.year}
                                ref={(el) => {
                                    buttonsRef.current[index] = el;
                                }}
                                onClick={() => setActiveIndex(index)}
                                className={cn(
                                    "relative shrink-0 w-32 md:w-44 py-3 md:py-4 text-sm font-medium transition-colors",
                                    activeIndex === index
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <span className="relative z-0">{item.year}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeItem.year}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start"
                        >
                            <div className="md:col-span-5 col-span-4 w-full aspect-4/3 md:aspect-square lg:aspect-4/3 rounded-2xl overflow-hidden">
                                <img
                                    src={activeItem.mainImage}
                                    alt={activeItem.year}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex justify-center items-center h-full col-span-4 lg:ps-10">
                                <div className="flex flex-col sm:flex-row gap-5">
                                    <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-foreground">
                                        {activeItem.year}
                                    </h3>

                                    <div className="flex flex-col gap-4">
                                        <p className="text-base text-muted-foreground leading-relaxed">
                                            {activeItem.description}
                                        </p>
                                        <ul className="flex flex-col gap-3">
                                            {activeItem.bullets.map((bullet, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                                                    <Circle className="size-1.5 fill-muted-foreground" />
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="flex items-center">
                                            <Button variant="ghost" className="group p-0 h-auto hover:bg-transparent text-foreground font-medium">
                                                Discover More
                                                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-start h-full pb-6 col-span-3 lg:ps-10">
                                <div className="aspect-4/3 rounded-2xl overflow-hidden max-h-41">
                                    <img
                                        src={activeItem.secondaryImage}
                                        alt={`${activeItem.year} secondary`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section >
    );
};

export default Timeline;