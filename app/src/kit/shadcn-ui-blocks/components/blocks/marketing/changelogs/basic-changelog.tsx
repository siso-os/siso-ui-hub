import { Badge } from "../../../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../../../ui/card";
import { Separator } from "../../../ui/separator";

export default function BasicChangelog() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Changelog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Version 2.0.0</h3>
              <Badge>Latest</Badge>
            </div>
            <p className="text-muted-foreground text-sm">
              Released on April 15, 2023
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>Completely redesigned dashboard interface</li>
              <li>Added dark mode support across all pages</li>
              <li>Improved performance by 40%</li>
              <li>Fixed multiple accessibility issues</li>
            </ul>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Version 1.2.0</h3>
            <p className="text-muted-foreground text-sm">
              Released on March 2, 2023
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>Added new analytics dashboard</li>
              <li>Improved mobile responsiveness</li>
              <li>Fixed bug with user authentication</li>
            </ul>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Version 1.1.0</h3>
            <p className="text-muted-foreground text-sm">
              Released on January 15, 2023
            </p>
            <ul className="list-disc space-y-1.5 pl-5 text-sm">
              <li>Added support for custom themes</li>
              <li>Improved form validation</li>
              <li>Updated documentation</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
