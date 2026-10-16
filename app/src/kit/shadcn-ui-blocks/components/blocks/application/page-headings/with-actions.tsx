import { Button } from "../../../ui/button";
import { Calendar, Download, Share2 } from "lucide-react";

export default function PageHeadingWithActions() {
  return (
    <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Annual Report 2024
          </h1>
          <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Updated April 2024</span>
            </div>
            <div>•</div>
            <div>24 pages</div>
            <div>•</div>
            <div>PDF</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
