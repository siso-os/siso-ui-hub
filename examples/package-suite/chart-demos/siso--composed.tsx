// uihub: siso:package-workbench
import { SisoComposedChart, makeConfig } from "@siso/charts"
import { monthly } from "./data"
export default function Demo() {
  const C = SisoComposedChart
  const palette = makeConfig(["desktop","mobile"],"aurora")
  const config = { desktop: palette.desktop, mobile: palette.mobile }
  return <div className="mx-auto h-96 w-full max-w-3xl p-4"><C data={monthly} config={config} xDataKey="month" className="h-full w-full"><C.Grid/><C.XAxis dataKey="month"/><C.YAxis/><C.Legend isClickable/><C.Tooltip variant="frosted-glass"/><C.Bar dataKey="desktop" variant="gradient"/><C.Line dataKey="mobile"/></C></div>
}
