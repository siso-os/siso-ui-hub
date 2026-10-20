// Sample data for the charts desk demos: months, days, shares. Seeded so every build draws the same picture.
let s = 7
const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
export const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]
export const monthly = MONTHS.map((month) => ({ month, desktop: Math.round(250 + rnd() * 700), mobile: Math.round(150 + rnd() * 600), tablet: Math.round(80 + rnd() * 300) }))
export const shares = [{ name: "Chrome", value: 420 }, { name: "Safari", value: 290 }, { name: "Firefox", value: 170 }, { name: "Edge", value: 120 }, { name: "Other", value: 60 }]
export const skills = ["Speed","Reach","Power","Craft","Care","Range"].map((skill) => ({ skill, a: Math.round(40 + rnd() * 60), b: Math.round(30 + rnd() * 60) }))
const day = (i: number) => new Date(Date.UTC(2026, 0, 1) + i * 864e5)
export const days = (n: number) => Array.from({ length: n }, (_, i) => { const d = day(i); const iso = d.toISOString().slice(0, 10); return { iso, label: d.toUTCString().slice(0, 11), short: String(d.getUTCDate()), v: Math.round(8 + rnd() * 40 + (i % 7 < 2 ? -6 : 8)) } })
export const heat = days(370).map((d) => ({ date: d.iso, count: rnd() < 0.18 ? 0 : Math.round(rnd() * 12) }))
export const series2 = (n: number) => days(n).map((d, i) => ({ key: d.iso, label: d.label, axisLabel: i % 5 === 0 ? d.short : undefined, values: { a: d.v, b: Math.round(d.v * (0.5 + rnd() * 0.5)), c: Math.round(10 + rnd() * 25) } }))
