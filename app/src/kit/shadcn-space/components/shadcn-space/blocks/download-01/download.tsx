"use client";

import { Badge } from "../../../../../shadcn/ui/badge";
import { Button } from "../../../../../shadcn/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

interface Platform {
    iconSrc: string;
    iconDarkSrc?: string;
    iconAlt: string;
    title: string;
    description: string;
    buttonLabel: string;
}

const platforms: Platform[] = [
    {
        iconSrc: "https://images.shadcnspace.com/assets/svgs/apple-dark.svg",
        iconDarkSrc: "https://images.shadcnspace.com/assets/svgs/apple-light.svg",
        iconAlt: "iOS",
        title: "IOS App",
        description: "Manage tasks and stay productive wherever your work takes you.",
        buttonLabel: "Download on the app store",
    },
    {
        iconSrc: "https://images.shadcnspace.com/assets/svgs/android-2.svg",
        iconAlt: "Android",
        title: "Android App",
        description: "Access projects and communicate with your team from any Android device.",
        buttonLabel: "Download on the play store",
    },
    {
        iconSrc: "https://images.shadcnspace.com/assets/svgs/html-5.svg",
        iconAlt: "HTML5",
        title: "Web App",
        description: "Work directly from your browser with access to all features and updates.",
        buttonLabel: "Open web app",
    },
    {
        iconSrc: "https://images.shadcnspace.com/assets/svgs/apple-dark.svg",
        iconDarkSrc: "https://images.shadcnspace.com/assets/svgs/apple-light.svg",
        iconAlt: "Mac",
        title: "Mac App",
        description: "Enjoy a native desktop experience with enhanced performance.",
        buttonLabel: "Download",
    },
    {
        iconSrc: "https://images.shadcnspace.com/assets/svgs/linux.svg",
        iconAlt: "Linux",
        title: "Linux App",
        description: "Built for flexibility and speed, giving users full access to every platform feature.",
        buttonLabel: "Download",
    },
    {
        iconSrc: "https://images.shadcnspace.com/assets/svgs/windows.svg",
        iconAlt: "Windows",
        title: "Windows App",
        description: "Stay focused with a powerful desktop application.",
        buttonLabel: "Download",
    },
    {
        iconSrc: "https://images.shadcnspace.com/assets/svgs/safari.svg",
        iconAlt: "Safari",
        title: "Safari Extension",
        description: "Capture ideas, save resources, & access all information without leaving browser.",
        buttonLabel: "Add extension",
    },
    {
        iconSrc: "https://images.shadcnspace.com/assets/svgs/chrome.svg",
        iconAlt: "Chrome",
        title: "Chrome Extension",
        description: "Quickly save content, manage bookmarks, & streamline your workflow across web.",
        buttonLabel: "Add extension",
    },
    {
        iconSrc: "https://images.shadcnspace.com/assets/svgs/firefox.svg",
        iconAlt: "Firefox",
        title: "Firefox Extension",
        description: "Boost productivity with one-click access to tools, notes, and saved content.",
        buttonLabel: "Add extension",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export default function Download() {
    return (
        <section className="bg-muted dark:bg-background">
            <div className="py-16 sm:py-20 lg:py-20">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="flex flex-col items-center gap-4 mb-12"
                    >
                        <Badge variant={"outline"} className="px-3 py-1 h-7 text-sm font-normal rounded-full bg-background text-foreground">
                            Platforms
                        </Badge>
                        <h2 className="text-3xl sm:text-4xl font-medium text-center tracking-tight max-w-xl leading-tight">
                            Available on every device you could possibly think about.
                        </h2>
                    </motion.div>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6"
                    >
                        {platforms.map((platform) => (
                            <motion.div
                                key={platform.title}
                                variants={itemVariants}
                                className="bg-card border border-border rounded-2xl p-8 flex flex-col gap-10 w-full overflow-hidden">
                                <div className="border border-border rounded-lg p-3 w-fit">
                                    {platform.iconDarkSrc ? (
                                        <>
                                            <img
                                                src={platform.iconSrc}
                                                alt={platform.iconAlt}
                                                width={24}
                                                height={24}
                                                className="size-6 dark:hidden"
                                            />
                                            <img
                                                src={platform.iconDarkSrc}
                                                alt={platform.iconAlt}
                                                width={24}
                                                height={24}
                                                className="size-6 hidden dark:block"
                                            />
                                        </>
                                    ) : (
                                        <img
                                            src={platform.iconSrc}
                                            alt={platform.iconAlt}
                                            width={24}
                                            height={24}
                                            className="size-6"
                                        />
                                    )}
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-lg font-medium text-card-foreground">{platform.title}</p>
                                        <p className="text-base font-normal text-muted-foreground">{platform.description}</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        className="w-fit h-9 px-4 rounded-full text-sm font-medium gap-1.5 shadow-xs cursor-pointer bg-transparent group"
                                    >
                                        {platform.buttonLabel}
                                        <ArrowRight className="size-4 group-hover:translate-x-1 group-hover:-rotate-45 transition-all duration-200 ease-in-out" />
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}