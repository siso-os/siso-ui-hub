"use client";

import { useRef } from "react";
import { Badge } from "../../../../../shadcn/ui/badge";
import { Card } from "../../../../../shadcn/ui/card";
import { motion, useInView } from "motion/react";
import { Button } from "../../../../../shadcn/ui/button";
import { ArrowRight } from "lucide-react";

type BlogData = {
  coverImage: string;
  title: string;
  date: string;
  author: string;
  category: string;
};

const blogData: BlogData[] = [
  {
    coverImage: "https://images.shadcnspace.com/assets/blog/blog-04-img2.png",
    title: "Travel trends shift globally",
    author: "Elias Thorne",
    date: "2026-12-12",
    category: "Trends",
  },
  {
    coverImage: "https://images.shadcnspace.com/assets/blog/blog-04-img3.png",
    title: "Healthcare innovation accelerates patient care",
    author: "Ava Sterling",
    date: "2026-11-29",
    category: "Updates",
  },
  {
    coverImage: "https://images.shadcnspace.com/assets/blog/blog-04-img4.png",
    title: "Sustainable energy investments sky high",
    author: "Zander Stone",
    date: "2026-12-03",
    category: "Articles",
  },
  {
    coverImage: "https://images.shadcnspace.com/assets/blog/blog-04-img5.png",
    title: "AI continues to transform industries",
    author: "Elowen Hayes",
    date: "2026-11-22",
    category: "Reports",
  },
];

const Blog = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section ref={sectionRef} className="lg:py-20 sm:py-16 py-8 bg-muted">
      <div className="max-w-7xl xl:px-16 lg:px-8 px-4 mx-auto">
        <div className="flex flex-col md:gap-12 gap-8">
          {/* header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            {/* title */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
              className="flex md:flex-row flex-col  gap-6 justify-between w-full md:items-center"
            >
              {/* Heading */}
              <h2 className="text-foreground text-3xl sm:text-5xl font-semibold">
                Latest insights
              </h2>
              <Button
                className="rounded-full px-5 gap-2 min-h-10 w-fit dark:bg-card dark:border-0 hover:cursor-pointer shadow-xs"
                variant="outline"
              >
                View All <ArrowRight className="size-4" />
              </Button>
            </motion.div>
          </div>
          {/* blogs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* LEFT – Featured Blog */}

            <motion.a
              href="#"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className=""
            >
              <Card className="p-0 border-0! ring-0! shadow-none! rounded-t-2xl gap-0 overflow-hidden">
                <div className="overflow-hidden ">
                  <img
                    src="https://images.shadcnspace.com/assets/blog/blog-04-img1.png"
                    alt="featured"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="md:py-8 md:px-8 py-6 px-4 flex flex-col md:gap-10 gap-6">
                  <div>
                    <h3 className="text-2xl font-medium text-foreground">
                      Global markets will bloom in early 2026
                    </h3>

                    <p className="text-lg text-muted-foreground ">
                      Economic indicators point toward renewed investor
                      confidence as global markets rebound.
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex  gap-4">
                      <img
                        src="https://images.shadcnspace.com/assets/profiles/rough.webp"
                        alt="featured"
                        className="h-12 w-12 rounded-full"
                      />
                      <div>
                        <p className="text-lg font-medium text-foreground">
                          Evelyn Hayes
                        </p>
                        <span className="text-sm text-muted-foreground">
                          Nov 15, 2026
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant="secondary"
                      className="min-h-7 px-3 dark:bg-white dark:text-card"
                    >
                      Insights
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.a>

            <div className="flex flex-col gap-4">
              {blogData.map((blog, index) => (
                <motion.a
                  key={index}
                  href="#"
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                >
                  <Card className="md:px-6 px-4 py-5 border-0! ring-0! shadow-none! rounded-t-2xl has-[>img:first-child]:pt-5 flex md:flex-row flex-col gap-3 md:items-center w-full">
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />

                    <div className="flex flex-col md:gap-3 gap-2">
                      <h4 className="font-medium text-lg text-foreground line-clamp-1">
                        {blog.title}
                      </h4>
                      <div className="flex items-center gap-3">
                        <p className="text-base text-foreground">
                          {blog.author}
                        </p>
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground opacity-30"></span>
                        <p className="text-sm text-muted-foreground">
                          {new Date(blog.date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                          })}
                        </p>
                        <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground opacity-30"></span>
                        <Badge
                          variant="secondary"
                          className="min-h-6 px-3 dark:bg-white dark:text-card"
                        >
                          {blog.category}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
