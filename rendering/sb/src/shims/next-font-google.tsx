const f: any = () => ({ className: "", variable: "", style: { fontFamily: "inherit" } })
Object.assign(f, f())
module.exports = new Proxy({}, { get: (_: any, k: string) => (k === "__esModule" ? false : f) })
