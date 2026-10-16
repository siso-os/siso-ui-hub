import { sub } from "date-fns";
import { Note } from "./types";

export const notesData: Note[] = [
  {
    id: 1,
    color: "primary",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    datef: sub(new Date(), { days: 0 }).toISOString(),
  },
  {
    id: 2,
    color: "destructive",
    title:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    datef: sub(new Date(), { days: 1 }).toISOString(),
  },
  {
    id: 3,
    color: "chart-4",
    title:
      "Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    datef: sub(new Date(), { days: 2 }).toISOString(),
  },
  {
    id: 4,
    color: "chart-3",
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    datef: sub(new Date(), { days: 3 }).toISOString(),
  },
  {
    id: 5,
    color: "chart-2",
    title:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    datef: sub(new Date(), { days: 4 }).toISOString(),
  },
];
