"use client";

import { CircleAlert } from "lucide-react";

import {
  Banner,
  BannerAction,
  BannerClose,
  BannerIcon,
  BannerTitle,
} from "@/components/kibo-ui/banner";

export const title = "Dismissible announcement";

const Example = () => (
  <Banner className="w-full max-w-2xl">
    <BannerIcon icon={CircleAlert} />
    <BannerTitle>Scheduled maintenance starts tonight at 11pm UTC.</BannerTitle>
    <BannerAction>View status</BannerAction>
    <BannerClose />
  </Banner>
);

export default Example;
