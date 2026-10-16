// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/layout/navbar/nav.industries.ts)
// The Agency menu's industry families: the three best-ranked industries in each module (the kind of site it needs).
// Generated 9 Oct 2026 from siso/industries/industries.json (`all` rows: name, rank, module), which comes from
// _data/siso-agency/industries/ranked-all.csv (3,665 rows, OBS 8 Oct). Colours, short names and counts are read live from
// data/agency-industries.json (the Agency card's families); its per-module counts sum to the 3,665. The third value is the
// /industries/<slug>/ page when one exists. "Core only (other)" holds three industries and is left out of the grid.
export const NAV_INDUSTRY_TOP: Record<string, [name: string, rank: number, slug: string | null][]> = {
  'Menu (food & drink)': [['Restaurant', 2, 'restaurants'], ['Coffee shop', 6, 'cafes'], ['Cafe', 7, 'cafes']],
  'Services + booking (appointments)': [['Beauty salon', 1, 'beauty-salons'], ['Hair salon', 3, 'beauty-salons'], ['Nail salon', 4, 'barbers-nails']],
  'Catalogue (retail)': [['Clothing store', 54, null], ['Furniture store', 71, null], ['Grocery store', 72, null]],
  'Schedule + membership (classes)': [['Yoga studio', 9, 'yoga-fitness'], ['Gym', 19, null], ['Pilates studio', 26, null]],
  'Services + quote (trades)': [['Contractor', 27, null], ['Auto repair shop', 40, null], ['Car detailing service', 52, null]],
  'Offers + WhatsApp (rentals, tours)': [['Boat rental service', 69, null], ['Travel agency', 77, null], ['Kilt shop and hire', 171, null]],
  'Rooms (stays)': [['Hotel', 34, null], ['Serviced apartment', 42, null], ['Lodging', 56, null]],
  'Services + consult (professional)': [['Event planner', 93, null], ['Real estate agent', 134, null], ['Insurance agency', 135, null]],
};
