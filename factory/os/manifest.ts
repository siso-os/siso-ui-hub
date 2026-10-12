// uihub: siso:factory-manifest
// The App Factory in SISO OS: ONE module, one icon (Shaan, 10 Oct 05:48: "I want to have an icon which says apps
// factory When you click on it, it opens"). It draws its own side nav (@siso/side-nav HubNav: HALO's four tools, search,
// the hubs grouped; a hub opens its own side nav with a breadcrumb back), so the OS's side-nav slot stays empty.
// Until AGENT-BASE's contract lands it's a URL module on the laptop (render service, launchd com.siso.app-factory-render,
// port 8850); under way 4 it becomes a package in SISO OS's build. The page tells the shell its title with
// postMessage({ source: "siso-module", module: "app-factory", type: "title", title, href }).
export const appFactoryModule = {
  id: "app-factory",
  name: "App Factory",
  space: "app-factory",
  icon: "Factory",
  order: 10,
  entry: { kind: "url", url: "http://127.0.0.1:8850/app?embed=1#/projects" },
  sidenav: "none", // it draws its own, inside the module
  commands: [
    { id: "af.open", title: "App Factory" },
    { id: "af.projects", title: "App Factory: Projects" },
    { id: "af.ui", title: "App Factory: UI Hub" },
    { id: "af.ui.picks", title: "App Factory: SISO UI v0.1, take or skip" },
    { id: "af.industries", title: "App Factory: Industries" },
  ],
  host: "local",
  appfactory: "~/SISO_Workspace/Great_Library_of_SISO/banks/siso-ui-hub/.appfactory",
} as const;
