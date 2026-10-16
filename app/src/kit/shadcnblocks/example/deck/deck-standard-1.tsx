"use client";

import {
  Deck,
  DeckCards,
  DeckEmpty,
  DeckItem,
} from "@/components/kibo-ui/deck";

export const title = "Swipe card deck";

const cards = [
  { title: "Nora Blake", body: "Product designer exploring spatial UI." },
  { title: "Sam Ortiz", body: "Engineer shipping realtime collaboration." },
  { title: "Ava Chen", body: "Founder building calm productivity tools." },
];

const Example = () => (
  <div className="flex w-full flex-col items-center gap-3">
    <p className="text-sm text-muted-foreground">Drag left or right</p>
    <Deck className="relative h-80 w-72 max-w-full">
      <DeckCards>
        {cards.map((card) => (
          <DeckItem
            key={card.title}
            className="flex flex-col justify-end gap-2 bg-card p-5"
          >
            <p className="text-lg font-semibold">{card.title}</p>
            <p className="text-sm text-muted-foreground">{card.body}</p>
          </DeckItem>
        ))}
      </DeckCards>
      <DeckEmpty className="text-sm text-muted-foreground">
        No more cards
      </DeckEmpty>
    </Deck>
  </div>
);

export default Example;
