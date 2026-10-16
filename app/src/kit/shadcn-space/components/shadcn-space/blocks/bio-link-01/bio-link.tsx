"use client";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../../shadcn/ui/avatar"
import { Button } from "../../../../../shadcn/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "../../../../../shadcn/ui/card"
import { ArrowRight, Calendar, MessageCircleMore, TextInitial } from "lucide-react"
import { motion } from "motion/react"

const socialLinks = [
    {
        name: "facebook",
        url: "#",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_facebook)">
                    <path
                        d="M24 12C24 5.37075 18.6248 0 12 0C5.37075 0 0 5.37075 0 12C0 17.988 4.38675 22.953 10.125 23.8522V15.4695H7.07775V12.0007H10.125V9.3555C10.125 6.34875 11.9138 4.68825 14.6558 4.68825C15.969 4.68825 17.3438 4.92225 17.3438 4.92225V7.875H15.828C14.34 7.875 13.875 8.80125 13.875 9.75V12H17.2028L16.668 15.4688H13.875V23.8515C19.6087 22.9523 24 17.9872 24 11.9992V12Z"
                        fill="#030712"
                    />
                </g>
                <defs>
                    <clipPath id="clip0_facebook">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        name: "instagram",
        url: "#",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_567_2678)">
                    <path d="M12 2.16225C15.2041 2.16225 15.5836 2.17444 16.8489 2.23209C18.0189 2.28553 18.6544 2.481 19.0773 2.64534C19.6373 2.86303 20.0371 3.12309 20.457 3.543C20.8769 3.96291 21.137 4.36266 21.3547 4.92272C21.519 5.34562 21.7145 5.98106 21.7679 7.15097C21.8256 8.41641 21.8378 8.79591 21.8378 12C21.8378 15.2041 21.8256 15.5837 21.7679 16.849C21.7145 18.019 21.519 18.6544 21.3547 19.0773C21.137 19.6373 20.8769 20.0372 20.457 20.4571C20.0371 20.877 19.6373 21.1371 19.0773 21.3547C18.6544 21.519 18.0189 21.7146 16.8489 21.7679C15.5838 21.8257 15.2043 21.8378 12 21.8378C8.79572 21.8378 8.41613 21.8257 7.15097 21.7679C5.98097 21.7145 5.34562 21.519 4.92272 21.3547C4.36266 21.1371 3.96281 20.877 3.54291 20.4571C3.123 20.0371 2.86294 19.6373 2.64534 19.0773C2.481 18.6545 2.28544 18.019 2.23209 16.849C2.17434 15.5837 2.16216 15.2042 2.16216 12C2.16216 8.79581 2.17434 8.41641 2.23209 7.15106C2.28553 5.98106 2.481 5.34562 2.64534 4.92272C2.86294 4.36266 3.123 3.96291 3.54291 3.543C3.96291 3.123 4.36266 2.86303 4.92272 2.64534C5.34553 2.481 5.98097 2.28553 7.15097 2.23209C8.41631 2.17444 8.79581 2.16225 12 2.16225ZM12 0C8.74097 0 8.33231 0.0137812 7.05244 0.0721875C5.77509 0.1305 4.90275 0.333375 4.13953 0.63C3.35034 0.936656 2.68116 1.347 2.01403 2.01412C1.34691 2.68125 0.936656 3.35044 0.63 4.13953C0.333281 4.90284 0.1305 5.77519 0.0721875 7.05244C0.0137812 8.33231 0 8.74097 0 12C0 15.259 0.0137812 15.6677 0.0721875 16.9476C0.1305 18.2249 0.333281 19.0973 0.63 19.8605C0.936562 20.6496 1.34691 21.3188 2.01403 21.986C2.68116 22.6531 3.35034 23.0633 4.13953 23.37C4.90284 23.6667 5.77509 23.8695 7.05234 23.9278C8.33231 23.9862 8.74097 24 12 24C15.259 24 15.6677 23.9862 16.9476 23.9278C18.2248 23.8695 19.0972 23.6667 19.8604 23.37C20.6496 23.0634 21.3188 22.6531 21.9859 21.986C22.653 21.3188 23.0633 20.6497 23.37 19.8605C23.6666 19.0972 23.8695 18.2249 23.9278 16.9477C23.9862 15.6677 24 15.259 24 12C24 8.74097 23.9862 8.33231 23.9278 7.05244C23.8695 5.77519 23.6666 4.90284 23.37 4.13962C23.0633 3.35044 22.653 2.68125 21.9859 2.01412C21.3188 1.347 20.6496 0.936562 19.8605 0.63C19.0972 0.333375 18.2248 0.1305 16.9476 0.0721875C15.6677 0.0137812 15.259 0 12 0ZM12 5.83781C8.59669 5.83781 5.83781 8.59688 5.83781 12C5.83781 15.4031 8.59669 18.1622 12 18.1622C15.4032 18.1622 18.1622 15.4033 18.1622 12C18.1622 8.59678 15.4032 5.83781 12 5.83781ZM12 16C9.79088 16 7.99997 14.2091 7.99997 12C7.99997 9.79088 9.79088 7.99997 12 7.99997C14.2091 7.99997 16 9.79088 16 12C16 14.2091 14.2091 16 12 16ZM19.8456 5.59434C19.8456 6.38972 19.2009 7.03434 18.4056 7.03434C17.6102 7.03434 16.9656 6.38972 16.9656 5.59434C16.9656 4.79897 17.6103 4.15434 18.4056 4.15434C19.2008 4.15434 19.8456 4.79906 19.8456 5.59434Z" fill="#030712" />
                </g>
                <defs>
                    <clipPath id="clip0_567_2678">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ),
    },
    {
        name: "twitter",
        url: "#",
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.6864 3.28223L12.6897 8.99398L8.36947 3.28223H2.1123L9.58863 13.0584L2.5028 21.1572H5.53697L11.0058 14.9083L15.7853 21.1572H21.8875L14.094 10.8539L20.7188 3.28223H17.6864ZM16.6222 19.3422L5.65338 5.0019H7.45647L18.3024 19.3422H16.6222Z" fill="#030712" />
            </svg>
        ),
    },
    {
        name: "youtube",
        url: "#",
        icon: (

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_567_2680)">
                    <path d="M23.4704 6.22778C23.3327 5.71904 23.0642 5.25524 22.6915 4.88256C22.3188 4.50989 21.855 4.24133 21.3463 4.10365C19.4838 3.5957 11.988 3.5957 11.988 3.5957C11.988 3.5957 4.49184 3.61108 2.62937 4.11902C2.12063 4.25672 1.65684 4.52528 1.28417 4.89798C0.911512 5.27067 0.642987 5.73449 0.505339 6.24325C-0.0580142 9.55249 -0.276549 14.595 0.520808 17.7719C0.65847 18.2806 0.927002 18.7444 1.29966 19.1171C1.67232 19.4898 2.13611 19.7583 2.64484 19.896C4.50731 20.404 12.0033 20.404 12.0033 20.404C12.0033 20.404 19.4992 20.404 21.3616 19.896C21.8703 19.7583 22.3342 19.4898 22.7068 19.1171C23.0795 18.7444 23.3481 18.2806 23.4857 17.7719C24.0799 14.4579 24.263 9.41852 23.4704 6.22778Z" fill="#030712" />
                    <path d="M9.60205 15.6014L15.8204 11.9997L9.60205 8.39795V15.6014Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_567_2680">
                        <rect width="24" height="24" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        ),
    },
]

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" }
    }
}

const Biolink01 = () => {
    return (
        <div className="max-w-sm mx-auto px-3 sm:px-0 py-10">
            <div className="bg-foreground p-4">
                <motion.div
                    className="bg-foreground overflow-hidden rounded-3xl"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <Card className="bg-[url('https://images.shadcnspace.com/assets/bio-link/bio-link-01-bg.webp')] bg-no-repeat bg-cover rounded-3xl py-10 gap-5">
                        <CardHeader className="flex flex-col items-center text-center gap-6">
                            <motion.div variants={itemVariants}>
                                <Avatar className={"w-24 h-24"}>
                                    <AvatarImage src="https://images.shadcnspace.com/assets/profiles/jenny-1.webp" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </motion.div>
                            <motion.div variants={itemVariants} className="flex flex-col gap-2 items-center">
                                <h1 className="text-3xl font-medium text-gray-950">DevConnect</h1>
                                <div className="flex flex-col items-center">
                                    <p className="text-lg font-medium text-gray-950">Noah Bennett</p>
                                    <p className="text-xs font-normal text-gray-600">Startup Founder</p>
                                </div>
                            </motion.div>
                        </CardHeader>
                        <CardContent className="px-4">
                            <motion.div variants={itemVariants} className="bg-white px-3.5 sm:px-5 py-3.5 sm:py-6 rounded-[20px] flex flex-col gap-3">
                                <div className="flex flex-col gap-3">
                                    <Button variant={"outline"} className={"w-full p-3.5 text-blue-500 border border-blue-500! h-auto rounded-full hover:text-blue-500 hover:bg-blue-500/10! cursor-pointer"}>
                                        <Calendar />
                                        <span>Book a Strategy Call</span>
                                    </Button>
                                    <Button variant={"outline"} className={"w-full p-3.5 text-blue-500 border border-blue-500! h-auto rounded-full hover:text-blue-500 hover:bg-blue-500/10! cursor-pointer"}>
                                        <TextInitial />
                                        <span>Read the Blog</span>
                                    </Button>
                                    <Button variant={"outline"} className={"w-full p-3.5 text-blue-500 border border-blue-500! h-auto rounded-full hover:text-blue-500 hover:bg-blue-500/10! cursor-pointer"}>
                                        <MessageCircleMore />
                                        <span>Founder Stories</span>
                                    </Button>
                                </div>
                                <Button className={"group bg-gray-950 text-white h-auto cursor-pointer p-3.5 w-full rounded-full"}>
                                    <span>Explore All Product Launches</span>
                                    <ArrowRight className="group-hover:translate-x-1 transition-all duration-300" />
                                </Button>
                            </motion.div>
                        </CardContent>
                        <CardFooter className="bg-transparent border-t-0 flex items-center justify-center pb-10 gap-6">
                            {socialLinks?.map((value, idx) => {
                                return (
                                    <motion.a key={idx} variants={itemVariants} href={value.url} className="flex items-center justify-center hover:-translate-y-0.5 transition-all duration-300 rounded-full text-foreground">
                                        {value.icon}
                                    </motion.a>
                                )
                            })}
                        </CardFooter>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}

export default Biolink01