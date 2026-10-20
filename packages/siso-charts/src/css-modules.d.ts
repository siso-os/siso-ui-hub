// CSS modules: Vite, Next and esbuild resolve them; this tells tsc their shape
declare module "*.module.css" { const styles: Record<string, string>; export default styles }
