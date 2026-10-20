// uihub: siso:charts
// Independently authored SVG behavior. No Arc or Tweenly implementation imports.
import { SpecialFrame, specialColors, type SisoSpecialChartProps } from './frame'

interface BasicProps extends SisoSpecialChartProps { label?: string; color?: string }
const accent = 'var(--chart-1, #38bdf8)'
const finite = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)
function numericScale(values: number[]) {
  const magnitude = Math.max(1, ...values.map(Math.abs))
  const low = Math.min(0,...values.map(v => v / magnitude)), high = Math.max(0,...values.map(v => v / magnitude))
  return (value: number) => high === low ? 150 : 270 - (value / magnitude - low) / (high-low) * 230
}
export interface SisoCompactBarDatum { key: string; label: string; axisLabel?: string; value: number }
export interface SisoCompactBarsProps extends BasicProps {
  data: readonly SisoCompactBarDatum[]; period?: string; unit?: string; showAverage?: boolean
  averageLabel?: string; valueLabel?: string; categoryLabel?: string; formatValue?: (value: number) => string
}
export function SisoCompactBars({ data, label = 'Bars', color = accent, period, unit = '', showAverage = true, formatValue = String, ...props }: SisoCompactBarsProps) {
  const rows = data.filter(d => finite(d.value)), y = numericScale(rows.map(d => d.value))
  const step = 560 / Math.max(1,rows.length), average = rows.reduce((n,d) => n + d.value / Math.max(1,rows.length), 0)
  return <SpecialFrame {...props} title={props.title || label} description={[props.description,period].filter(Boolean).join('. ')} empty={!rows.length} summary={rows.map(d => `${d.label}: ${formatValue(d.value)} ${unit}`).join('; ')}>
    <line x1="20" x2="580" y1={y(0)} y2={y(0)} stroke="currentColor" opacity=".3" />
    {rows.map((d,i) => <g key={`${d.key}-${i}`}><rect x={20+i*step+step*.15} y={Math.min(y(0),y(d.value))} width={step*.7} height={Math.abs(y(0)-y(d.value))} fill={color}><title>{`${d.label}: ${formatValue(d.value)} ${unit}`}</title></rect>{d.axisLabel && step>22 && <text x={20+(i+.5)*step} y="291" textAnchor="middle" fill="currentColor" fontSize="11">{d.axisLabel}</text>}</g>)}
    {showAverage && rows.length>0 && finite(average) && <line x1="20" x2="580" y1={y(average)} y2={y(average)} stroke="currentColor" strokeDasharray="4 4"><title>{`Average: ${formatValue(average)} ${unit}`}</title></line>}
  </SpecialFrame>
}
export interface SisoMultiLineSeries { key: string; label: string; color?: string; dashed?: boolean; area?: boolean }
export interface SisoMultiLineDatum { key: string; label: string; axisLabel?: string; values: Record<string, number | undefined | null> }
export interface SisoMultiLineProps extends BasicProps { data: readonly SisoMultiLineDatum[]; series: readonly SisoMultiLineSeries[]; unit?: string; hiddenSeries?: readonly string[]; formatValue?: (value: number, series: SisoMultiLineSeries) => string; legend?: boolean }
export function SisoMultiLine({ data, series, label = 'Series', color, hiddenSeries = [], unit = '', formatValue = String, legend = true, ...props }: SisoMultiLineProps) {
  const visible = series.filter(s => !hiddenSeries.includes(s.key))
  const values = data.flatMap(d => visible.flatMap(s => finite(d.values[s.key]) ? [d.values[s.key] as number] : [])), y = numericScale(values)
  const x = (i: number) => data.length < 2 ? 300 : 35+i/(data.length-1)*530
  const summary = data.map(d => `${d.label}: ${visible.map(s => `${s.label} ${finite(d.values[s.key]) ? formatValue(d.values[s.key] as number,s)+' '+unit : 'missing'}`).join(', ')}`).join('; ')
  return <SpecialFrame {...props} title={props.title || label} empty={!values.length} summary={summary}>
    {legend && visible.map((s,i) => <text key={`${s.key}-${i}`} x={20+i*560/Math.max(1,visible.length)} y="18" fill={s.color || color || specialColors[i%specialColors.length]} fontSize="11">{s.label.slice(0,28)}</text>)}
    {visible.map((s,j) => {
      const chunks: number[][] = []; let current: number[] = []
      data.forEach((d,i) => { if(finite(d.values[s.key])) current.push(i); else if(current.length) {chunks.push(current);current=[]} }); if(current.length) chunks.push(current)
      return <g key={`${s.key}-${j}`} fill="none" stroke={s.color || color || specialColors[j%specialColors.length]} strokeWidth="2.5" strokeDasharray={s.dashed ? '6 4' : undefined}>
        {chunks.map((indices,k) => { const points=indices.map(i => `${x(i)},${y(data[i]!.values[s.key] as number)}`).join(' '); return <g key={k}>{s.area && <polygon points={`${x(indices[0]!)},${y(0)} ${points} ${x(indices[indices.length-1]!)},${y(0)}`} fill={s.color || color || specialColors[j%specialColors.length]} fillOpacity=".12" stroke="none" />}<polyline points={points} />{indices.length===1 && <circle cx={x(indices[0]!)} cy={y(data[indices[0]!]!.values[s.key] as number)} r="3" />}</g> })}
      </g>
    })}
  </SpecialFrame>
}
export interface SisoRadialSlicesProps<T extends object = Record<string, unknown>> extends BasicProps {
  data: readonly T[]; nameKey?: keyof T & string; valueKey?: keyof T & string; innerRadius?: number; holeRatio?: number; size?: number
  showLegend?: boolean; center?: string; showLabels?: string; surface?: 'dark'|'light'; bare?: boolean
}
export function SisoRadialSlices<T extends object>({ data, nameKey = 'name' as keyof T & string, valueKey = 'value' as keyof T & string, innerRadius = .65, holeRatio = innerRadius, size, label = 'Distribution', color, ...props }: SisoRadialSlicesProps<T>) {
  const rows = data.flatMap((d,i) => { const value=d[valueKey]; return finite(value) && value>0 ? [{name:String(d[nameKey] ?? i+1),value,color:'color' in d && typeof d.color==='string' ? d.color : color || specialColors[i%specialColors.length]}] : [] })
  const max=Math.max(0,...rows.map(d=>d.value)), total=rows.reduce((n,d)=>n+d.value/max,0)
  const hole=finite(holeRatio) ? Math.min(.95,Math.max(0,holeRatio)) : .65, radius=130*(1+hole)/2, width=130*(1-hole), circumference=2*Math.PI*radius
  let offset=0
  return <SpecialFrame {...props} height={size || props.height} title={props.title || label} empty={!rows.length} summary={rows.map(d=>`${d.name}: ${d.value}`).join('; ')}>
    {rows.map((d,i)=>{ const share=d.value/max/total, start=offset;offset+=share;return <circle key={i} cx="300" cy="150" r={radius} fill="none" stroke={d.color} strokeWidth={width} strokeDasharray={`${share*circumference} ${circumference}`} strokeDashoffset={-start*circumference} transform="rotate(-90 300 150)"><title>{`${d.name}: ${d.value}`}</title></circle> })}
  </SpecialFrame>
}
export interface SisoDonutDatum { key: string; label: string; value: number; color?: string }
export interface SisoDonutChartProps extends BasicProps { data: readonly SisoDonutDatum[]; unit?: string; size?: number; thickness?: number; legend?: boolean; hiddenKeys?: readonly string[] }
export function SisoDonutChart({ data, hiddenKeys = [], thickness = 24, size = 260, unit, legend, ...props }: SisoDonutChartProps) {
  const safeSize=finite(size) && size>0 ? size : 260
  return <SisoRadialSlices {...props} data={data.filter(d=>!hiddenKeys.includes(d.key))} nameKey="label" valueKey="value" holeRatio={finite(thickness) ? Math.max(0,1-2*Math.max(0,thickness)/safeSize) : .65} size={safeSize} />
}
export interface SisoSparklineProps extends BasicProps { data: readonly number[]; value?: string; change?: string; tone?: string; width?: number; labels?: readonly string[]; area?: boolean; interactive?: boolean; formatValue?: (value:number,index:number)=>string }
export function SisoSparkline({ data, value, change, labels, area=true, height=70, formatValue=String, label='Sparkline', color=accent, ...props }: SisoSparklineProps) {
  const values=data.filter(finite), y=numericScale(values),x=(i:number)=>data.length<2 ? 300 : 20+i/(data.length-1)*560
  const chunks:number[][]=[];let current:number[]=[]
  data.forEach((n,i)=>{if(finite(n)) current.push(i);else if(current.length){chunks.push(current);current=[]}});if(current.length)chunks.push(current)
  return <SpecialFrame {...props} title={props.title || label} height={height} empty={!values.length} summary={[value,change,...data.map((n,i)=>`${labels?.[i] || i+1}: ${finite(n) ? formatValue(n,i) : 'missing'}`)].filter(Boolean).join('; ')}>
    {chunks.map((indices,k)=>{const points=indices.map(i=>`${x(i)},${y(data[i]!)}`).join(' ');return <g key={k}>{area&&<polygon points={`${x(indices[0]!)},${y(0)} ${points} ${x(indices[indices.length-1]!)},${y(0)}`} fill={color} fillOpacity=".12" />}<polyline points={points} fill="none" stroke={color} strokeWidth="3" />{indices.length===1&&<circle cx={x(indices[0]!)} cy={y(data[indices[0]!]!)} r="3" fill={color} />}</g>})}
  </SpecialFrame>
}
export interface SisoGaugeProps extends BasicProps { value: number; min?: number; max?: number; detail?: string; tone?: string; thresholds?: readonly {from:number;tone:string;label:string}[] }
export function SisoGauge({ value,min=0,max=100,label='Gauge',detail,color=accent,...props }: SisoGaugeProps) {
  const valid=[value,min,max].every(finite)&&max>min, magnitude=Math.max(1,Math.abs(min),Math.abs(max)), share=valid ? Math.max(0,Math.min(1,(value/magnitude-min/magnitude)/(max/magnitude-min/magnitude))) : 0
  return <SpecialFrame {...props} title={props.title || label} empty={!valid} summary={`${value}; minimum ${min}; maximum ${max}${value<min||value>max ? '; visually clipped to range' : ''}${detail ? '; '+detail : ''}`}>
    <path d="M170 210 A130 130 0 0 1 430 210" pathLength="100" fill="none" stroke="currentColor" opacity=".15" strokeWidth="24" />
    <path d="M170 210 A130 130 0 0 1 430 210" pathLength="100" fill="none" stroke={color} strokeWidth="24" strokeDasharray={`${share*100} 100`} />
    <text x="300" y="190" textAnchor="middle" fill="currentColor" fontSize="36">{valid ? value : ''}</text><text x="170" y="250" fill="currentColor" fontSize="12">{min}</text><text x="430" y="250" textAnchor="end" fill="currentColor" fontSize="12">{max}</text>
  </SpecialFrame>
}
export interface SisoGoalRingProps extends BasicProps { value:number; goal:number; size?:number; surface?:'dark'|'light' }
export function SisoGoalRing({value,goal,label='of',size=220,color=accent,...props}:SisoGoalRingProps){
  const valid=finite(value)&&finite(goal)&&value>=0&&goal>0,share=valid ? Math.min(1,value/goal) : 0
  return <SpecialFrame {...props} title={props.title || 'Goal progress'} height={size} empty={!valid} summary={`${value} ${label} ${goal}${value>goal ? '; ring capped at goal' : ''}`}>
    <circle cx="300" cy="150" r="110" fill="none" stroke="currentColor" strokeWidth="28" opacity=".15" /><circle cx="300" cy="150" r="110" pathLength="100" fill="none" stroke={color} strokeWidth="28" strokeDasharray={`${share*100} 100`} transform="rotate(-90 300 150)" /><text x="300" y="145" textAnchor="middle" fill="currentColor" fontSize="38">{valid ? value : ''}</text><text x="300" y="175" textAnchor="middle" fill="currentColor" fontSize="17">{`${label} ${goal}`}</text>
  </SpecialFrame>
}
export interface SisoContributionDay { date:string; count:number }
export interface SisoContributionHeatmapProps extends BasicProps { days:readonly SisoContributionDay[]; period?:string; weekStartsOn?:0|1; thresholds?:readonly [number,number,number]; unit?:{one:string;other:string} }
export function SisoContributionHeatmap({days,label='Contributions',period,weekStartsOn=0,color=accent,thresholds,...props}:SisoContributionHeatmapProps){
  const valid=days.flatMap(d=>{const time=Date.parse(d.date+'T00:00:00Z');return /^\d{4}-\d{2}-\d{2}$/.test(d.date)&&finite(time)&&new Date(time).toISOString().slice(0,10)===d.date&&finite(d.count)&&d.count>=0 ? [{...d,time}] : []}).sort((a,b)=>a.time-b.time)
  const byDate=new Map(valid.map(d=>[d.date,d])), start=valid[0]?.time || 0, end=valid[valid.length-1]?.time || 0, length=valid.length ? Math.round((end-start)/86400000)+1 : 0
  const bounded=length>0&&length<=3660,lead=(new Date(start).getUTCDay()-weekStartsOn+7)%7,weeks=Math.ceil((lead+length)/7),w=560/Math.max(1,weeks),max=Math.max(0,...valid.map(d=>d.count))
  const bounds=thresholds && thresholds.every(finite)&&thresholds[0]>=0&&thresholds[0]<=thresholds[1]&&thresholds[1]<=thresholds[2] ? thresholds : [max*.25,max*.5,max*.75]
  return <SpecialFrame {...props} title={props.title || label} description={[props.description,period].filter(Boolean).join('. ')} empty={!bounded} summary={valid.map(d=>`${d.date}: ${d.count}`).join('; ')}>
    {bounded&&Array.from({length},(_,i)=>{const date=new Date(start+i*86400000).toISOString().slice(0,10),d=byDate.get(date),level=d ? d.count===0 ? 0 : d.count<=bounds[0]! ? 1 : d.count<=bounds[1]! ? 2 : d.count<=bounds[2]! ? 3 : 4 : -1;return <rect key={date} x={20+Math.floor((lead+i)/7)*w} y={20+(lead+i)%7*37} width={Math.max(.1,w-1)} height="33" fill={color} fillOpacity={level<0 ? 0 : .08+level*.23} stroke={level<0 ? 'currentColor' : 'none'} strokeOpacity=".15"><title>{`${date}: ${d ? d.count : 'missing'}`}</title></rect> })}
  </SpecialFrame>
}
