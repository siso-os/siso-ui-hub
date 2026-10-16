// uihub: siso:landing-industry-hero
// Industry page hero: the SISO landing's own hero (eco/features/marketing/components/siso/industry-page/Hero.tsx), shown with its own data.
import Hero from "../eco/features/marketing/components/siso/industry-page/Hero"
import DATA from "../eco/features/marketing/data/industry-pages.json"

export default function Demo() {
  return <Hero slug="cafes" group={(DATA.groups as Record<string, never>).cafes} />
}
