"use client";

import { GithubStars } from "../../components/shadcnblocks/github-stars";

export const title = "GitHub Icon";

const Example = () => (
  <GithubStars
    repoUrl="https://github.com/shadcn-ui/ui"
    starCount="1.2k"
    display="icon"
    variant="outline"
  />
);

export default Example;
