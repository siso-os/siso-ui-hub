"use client";

import { GithubStars } from "../../components/shadcnblocks/github-stars";

export const title = "GitHub Icon Count";

const Example = () => (
  <GithubStars
    repoUrl="https://github.com/shadcn-ui/ui"
    starCount="1.2k"
    display="count"
    variant="badge"
  />
);

export default Example;
