// uihub: siso:hub-app
import { StrictMode } from "react"
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
  {
    element: <AppShell />,
    children: [
      { path: "/", element: <Home /> },
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
