/**
 * Shared demo media. Files live in `public/media/`, credits in `public/media/CREDITS.md`.
 * Portraits are 400 px squares; photos are 1600 px on the long side.
 */

export interface MediaPerson {
  id: string;
  name: string;
  role?: string;
  src: string;
}

export interface MediaPhoto {
  id: string;
  alt: string;
  src: string;
  width: number;
  height: number;
}

export const people = [
  { id: "emma-collins", name: "Emma Collins", role: "Product designer", src: new URL("../media/media/people/emma-collins.jpg", import.meta.url).href },
  { id: "marcus-johnson", name: "Marcus Johnson", role: "Frontend engineer", src: new URL("../media/media/people/marcus-johnson.jpg", import.meta.url).href },
  { id: "jasmine-brooks", name: "Jasmine Brooks", role: "Design lead", src: new URL("../media/media/people/jasmine-brooks.jpg", import.meta.url).href },
  { id: "olivia-bennett", name: "Olivia Bennett", role: "Platform engineer", src: new URL("../media/media/people/olivia-bennett.jpg", import.meta.url).href },
  { id: "sofia-ramirez", name: "Sofia Ramirez", role: "Operations lead", src: new URL("../media/media/people/sofia-ramirez.jpg", import.meta.url).href },
  { id: "ryan-sullivan", name: "Ryan Sullivan", role: "Account executive", src: new URL("../media/media/people/ryan-sullivan.jpg", import.meta.url).href },
  { id: "hannah-walsh", name: "Hannah Walsh", role: "Customer success", src: new URL("../media/media/people/hannah-walsh.jpg", import.meta.url).href },
  { id: "chloe-nguyen", name: "Chloe Nguyen", role: "Data analyst", src: new URL("../media/media/people/chloe-nguyen.jpg", import.meta.url).href },
  { id: "ava-mitchell", name: "Ava Mitchell", role: "Marketing manager", src: new URL("../media/media/people/ava-mitchell.jpg", import.meta.url).href },
  { id: "daniel-kim", name: "Daniel Kim", role: "Backend engineer", src: new URL("../media/media/people/daniel-kim.jpg", import.meta.url).href },
  { id: "jordan-reyes", name: "Jordan Reyes", role: "Support specialist", src: new URL("../media/media/people/jordan-reyes.jpg", import.meta.url).href },
  { id: "mateo-alvarez", name: "Mateo Alvarez", role: "Mobile engineer", src: new URL("../media/media/people/mateo-alvarez.jpg", import.meta.url).href },
  { id: "tyler-hayes", name: "Tyler Hayes", role: "Sales lead", src: new URL("../media/media/people/tyler-hayes.jpg", import.meta.url).href },
  { id: "andre-williams", name: "Andre Williams", role: "Finance partner", src: new URL("../media/media/people/andre-williams.jpg", import.meta.url).href },
  { id: "nathan-cole", name: "Nathan Cole", role: "Engineering manager", src: new URL("../media/media/people/nathan-cole.jpg", import.meta.url).href },
  { id: "diane-foster", name: "Diane Foster", role: "Chief operating officer", src: new URL("../media/media/people/diane-foster.jpg", import.meta.url).href },
] as const satisfies readonly MediaPerson[];

export const photos = [
  { id: "lounge-chair", alt: "A woven oak lounge chair with a sheepskin and linen cushion on a concrete floor", src: new URL("../media/media/photos/lounge-chair.jpg", import.meta.url).href, width: 1280, height: 1600 },
  { id: "table-lamp", alt: "A white mushroom table lamp glowing beside books and a small vase", src: new URL("../media/media/photos/table-lamp.jpg", import.meta.url).href, width: 1600, height: 900 },
  { id: "linen-throw", alt: "Folded natural linen throws with fringed edges in soft window light", src: new URL("../media/media/photos/linen-throw.jpg", import.meta.url).href, width: 1067, height: 1600 },
  { id: "glass-carafe", alt: "A hand pouring water from a ribbed glass carafe into tumblers", src: new URL("../media/media/photos/glass-carafe.jpg", import.meta.url).href, width: 1280, height: 1600 },
  { id: "stoneware-cups", alt: "Two speckled stoneware cups with a lid on a pale table", src: new URL("../media/media/photos/stoneware-cups.jpg", import.meta.url).href, width: 1067, height: 1600 },
  { id: "stacked-bowls", alt: "Two stacked speckled ceramic bowls against a dark wall", src: new URL("../media/media/photos/stacked-bowls.jpg", import.meta.url).href, width: 1600, height: 1067 },
  { id: "ceramic-lamp", alt: "A sculptural ceramic lamp with a linen shade on a walnut sideboard", src: new URL("../media/media/photos/ceramic-lamp.jpg", import.meta.url).href, width: 1067, height: 1600 },
  { id: "living-room", alt: "A bright living room with timber beams, arched windows, and cream sofas", src: new URL("../media/media/photos/living-room.jpg", import.meta.url).href, width: 1200, height: 1600 },
  { id: "sunroom", alt: "A sunroom with a round dining table, plants, and windows on three sides", src: new URL("../media/media/photos/sunroom.jpg", import.meta.url).href, width: 1600, height: 1067 },
  { id: "home-office", alt: "A home office with a wooden desk and deep green walls", src: new URL("../media/media/photos/home-office.jpg", import.meta.url).href, width: 1600, height: 1200 },
  { id: "reading-chair", alt: "A grey armchair and ottoman with a knit throw in a dark green room", src: new URL("../media/media/photos/reading-chair.jpg", import.meta.url).href, width: 1600, height: 900 },
  { id: "bedroom", alt: "A made bed with striped linen pillows against an oak headboard", src: new URL("../media/media/photos/bedroom.jpg", import.meta.url).href, width: 1067, height: 1600 },
  { id: "restaurant", alt: "A warm restaurant dining room with woven pendant lights and a tree", src: new URL("../media/media/photos/restaurant.jpg", import.meta.url).href, width: 1067, height: 1600 },
  { id: "wine-bar", alt: "A glass carafe of red wine on a bar table in low evening light", src: new URL("../media/media/photos/wine-bar.jpg", import.meta.url).href, width: 1600, height: 1067 },
  { id: "concert-hall", alt: "Curved stainless steel panels of the Walt Disney Concert Hall against a blue sky", src: new URL("../media/media/photos/concert-hall.jpg", import.meta.url).href, width: 1600, height: 1143 },
  { id: "curved-facade", alt: "A white tiled building facade with curved balconies", src: new URL("../media/media/photos/curved-facade.jpg", import.meta.url).href, width: 1600, height: 1067 },
  { id: "pool-house", alt: "A modern glass house beside a long pool under a clear sky", src: new URL("../media/media/photos/pool-house.jpg", import.meta.url).href, width: 1600, height: 900 },
  { id: "terracotta-waves", alt: "Wavy terracotta walls rising toward a blue sky", src: new URL("../media/media/photos/terracotta-waves.jpg", import.meta.url).href, width: 1067, height: 1600 },
  { id: "mountain-ridges", alt: "Layered mountain ridges under a warm evening sky", src: new URL("../media/media/photos/mountain-ridges.jpg", import.meta.url).href, width: 1600, height: 1068 },
  { id: "alpine-lake", alt: "A calm alpine lake reflecting a rocky peak at golden hour", src: new URL("../media/media/photos/alpine-lake.jpg", import.meta.url).href, width: 1067, height: 1600 },
  { id: "coastline", alt: "A long coastline with waves rolling onto a beach below green cliffs", src: new URL("../media/media/photos/coastline.jpg", import.meta.url).href, width: 1200, height: 1600 },
  { id: "sea-at-dusk", alt: "A calm sea at dusk with a low island on the horizon", src: new URL("../media/media/photos/sea-at-dusk.jpg", import.meta.url).href, width: 1067, height: 1600 },
  { id: "lisbon-tram", alt: "A yellow tram on a street lined with historic buildings in Lisbon", src: new URL("../media/media/photos/lisbon-tram.jpg", import.meta.url).href, width: 1600, height: 1064 },
  { id: "lisbon-bridge", alt: "The 25 de Abril Bridge crossing the Tagus in Lisbon", src: new URL("../media/media/photos/lisbon-bridge.jpg", import.meta.url).href, width: 1600, height: 1166 },
  { id: "lisbon-rooftops", alt: "Terracotta rooftops of Lisbon running down to the river", src: new URL("../media/media/photos/lisbon-rooftops.jpg", import.meta.url).href, width: 1280, height: 1600 },
  { id: "salmon-dinner", alt: "Seared salmon with a bright herb salsa and a glass of red wine", src: new URL("../media/media/photos/salmon-dinner.jpg", import.meta.url).href, width: 1067, height: 1600 },
  { id: "chef-plating", alt: "A chef spooning sauce onto a plated dish in a dark kitchen", src: new URL("../media/media/photos/chef-plating.jpg", import.meta.url).href, width: 1600, height: 1600 },
] as const satisfies readonly MediaPhoto[];

export type PersonId = (typeof people)[number]["id"];
export type PhotoId = (typeof photos)[number]["id"];

/** Looks up a person by id. */
export function person(id: PersonId): MediaPerson {
  return people.find(entry => entry.id === id)!;
}

/** Looks up a photo by id. */
export function photo(id: PhotoId): MediaPhoto {
  return photos.find(entry => entry.id === id)!;
}

/** Square 400 px avatar path for a person id, for `src` props. */
export const avatar = (id: PersonId) => person(id).src;

/** 800 × 1000 portrait crop of the same photo, for image-led layouts. */
export const portrait = (id: PersonId) => `/media/people/portrait/${id}.jpg`;

/** The first `count` people, for avatar stacks and lists. */
export const peopleSample = (count: number) => people.slice(0, count);
