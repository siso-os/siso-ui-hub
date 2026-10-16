// uihub: siso:hub-app
import { StrictMode, Suspense, lazy } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import "@fontsource/geist-sans/latin-400.css"
import "@fontsource/geist-sans/latin-500.css"
import "@fontsource/geist-sans/latin-600.css"
import "@fontsource/geist-mono/latin-400.css"
import "./index.css"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppShell } from "@/components/AppShell"
import { loadIndex, loadMeta } from "@/lib/data"
import Home from "@/pages/Home"
import Arc from "@/pages/Arc"
import KitCharts from "@/pages/KitCharts"
// the kit page carries a map of 10,000 parts: it loads only when opened
const Kit = lazy(() => import("@/pages/Kit"))
const KitLayer = lazy(() => import("./pages/KitLayer"))
const KitV1 = lazy(() => import("@/pages/KitV1"))
const KitAtom = lazy(() => import("@/pages/KitAtom"))
const KitMap = lazy(() => import("@/pages/KitMap"))
const KitDashboard = lazy(() => import("@/pages/KitDashboard"))
const KitShell = lazy(() => import("@/pages/KitShell"))
const KitPages = lazy(() => import("@/pages/KitPages"))
const KitAppFrame = lazy(() => import("@/pages/KitAppFrame"))
const KitFrame = lazy(() => import("@/pages/KitFrame"))
import KitIcons from "@/pages/KitIcons"
import Browse from "@/pages/Browse"
import ComponentPage from "@/pages/ComponentPage"
import Bookmarks from "@/pages/Bookmarks"
import Industries, { IndustryPage } from "@/pages/Industries"
import Shells from "@/pages/Shells"
import Tools from "@/pages/Tools"
import Discover from "@/pages/Discover"
import { Authors, AuthorPage } from "@/pages/Authors"
import Libraries from "@/pages/Libraries"
import Library from "@/pages/Library"
import Agents from "@/pages/Agents"
import NotFound from "@/pages/NotFound"
import Gallery from "@/pages/Gallery"
import Packages from "@/pages/Packages"
import Factory from "@/pages/Factory"
import Siso from "@/pages/Siso"
import NodePage from "@/pages/Node"
import Papers from "@/pages/Papers"
import Ours from "@/pages/Ours"
import MapPage from "@/pages/MapPage"
import VsPage from "@/pages/VsPage"
import CorePage from "@/pages/Core"
import Projects from "@/pages/Projects"
import Compare from "@/pages/Compare"
import Build from "@/pages/Build"
import Coverage from "@/pages/Coverage"
import { Auth, hosted } from "@/lib/auth"

// the hosted hub loads its data after sign-in (lib/auth.tsx); everywhere else, at once
if (!hosted) {
  loadIndex()
  loadMeta()
}

const router = createBrowserRouter([
  // one part alone, no hub chrome: the device frames on /kit/shells load this in an iframe
  { path: "/frame", element: <Suspense fallback={null}><KitFrame /></Suspense> },
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <Arc /> },
      { path: "/arc", element: <Arc /> },
      { path: "/kit", element: <Suspense fallback={null}><Kit /></Suspense> },
      { path: "/kit/l/:tab", element: <Suspense fallback={null}><KitLayer /></Suspense> },
      { path: "/kit/v1", element: <Suspense fallback={null}><KitV1 /></Suspense> },
      { path: "/kit/map", element: <Suspense fallback={null}><KitMap /></Suspense> },
      { path: "/kit/app-frame", element: <Suspense fallback={null}><KitAppFrame /></Suspense> },
      { path: "/kit/pages", element: <Suspense fallback={null}><KitPages /></Suspense> },
      { path: "/kit/pages/:type", element: <Suspense fallback={null}><KitPages /></Suspense> },
      { path: "/kit/shells/:kind", element: <Suspense fallback={null}><KitShell /></Suspense> },
      { path: "/kit/atoms/:kind", element: <Suspense fallback={null}><KitAtom /></Suspense> },
      { path: "/kit/charts", element: <KitCharts /> },
      { path: "/kit/dashboard", element: <Suspense fallback={null}><KitDashboard /></Suspense> },
      { path: "/kit/icons", element: <KitIcons /> },
      { path: "/home", element: <Home /> },
      { path: "/browse", element: <Browse /> },
      { path: "/browse/s/:slug", element: <Browse /> },
      { path: "/browse/:group", element: <Browse /> },
      { path: "/browse/:group/:category", element: <Browse /> },
      { path: "/c/:id", element: <ComponentPage /> },
      { path: "/templates", element: <Gallery kind="templates" key="templates" /> },
      { path: "/themes", element: <Gallery kind="themes" key="themes" /> },
      { path: "/bookmarks", element: <Bookmarks /> },
      { path: "/build", element: <Build /> },
      { path: "/build/:surface", element: <Build /> },
      { path: "/build/:surface/:slot", element: <Build /> },
      { path: "/compare", element: <Compare /> },
      { path: "/compare/:group/:category", element: <Compare /> },
      { path: "/industries", element: <Industries /> },
      { path: "/industries/:id", element: <IndustryPage /> },
      { path: "/shells", element: <Shells /> },
      { path: "/tools", element: <Tools /> },
      { path: "/discover", element: <Discover /> },
      { path: "/authors", element: <Authors /> },
      { path: "/authors/:name", element: <AuthorPage /> },
      { path: "/libraries", element: <Libraries /> },
      { path: "/coverage", element: <Coverage /> },
      { path: "/libraries/:id", element: <Library /> },
      { path: "/agents", element: <Agents /> },
      { path: "/packages", element: <Packages /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:id", element: <Projects /> },
      { path: "/factory", element: <Factory /> },
      { path: "/siso", element: <Siso /> },
      // the library by scale (catalogue/schema/ontology.json): a node of atoms, components, sections, pages or looks
      { path: "/x/:scale/:node", element: <NodePage /> },
      { path: "/papers", element: <Papers /> },
      { path: "/ours", element: <Ours /> },
      { path: "/map", element: <MapPage /> },
      { path: "/vs", element: <VsPage /> },
      { path: "/cores/:id", element: <CorePage /> },
      { path: "*", element: <NotFound /> },
    ],
  },
])

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Auth>
      <TooltipProvider delayDuration={300}>
        <RouterProvider router={router} />
      </TooltipProvider>
    </Auth>
  </StrictMode>,
)
