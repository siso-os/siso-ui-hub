// uihub: siso:page-not-found
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h1 className="text-xl font-semibold">Page not found</h1>
      <p className="mt-2 text-sm text-muted-foreground">There is no page at this address.</p>
      <Button asChild variant="outline" className="mt-6">
        <Link to="/">Home</Link>
      </Button>
    </div>
  )
}
