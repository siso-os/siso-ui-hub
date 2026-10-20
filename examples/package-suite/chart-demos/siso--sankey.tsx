// uihub: siso:package-workbench
import { SisoSankeyChart, makeConfig } from "@siso/charts"
const names = ["Search","Direct","Social","Browse","Return","Complete"]
const data = {nodes:names.map(name=>({name})),links:[{source:0,target:3,value:480},{source:1,target:3,value:260},{source:2,target:3,value:160},{source:3,target:4,value:320},{source:3,target:5,value:580},{source:4,target:5,value:220}]}
export default function Demo() {
 const C = SisoSankeyChart
 return <div className="mx-auto h-96 w-full max-w-3xl p-4"><C data={data} config={makeConfig(names,"aurora")} className="h-full w-full"><C.Node/><C.NodeLabel/><C.Link variant="gradient"/><C.Tooltip/></C></div>
}
