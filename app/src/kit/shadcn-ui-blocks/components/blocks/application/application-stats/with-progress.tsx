import { Progress } from "../../../ui/progress";
import { Card, CardContent } from "../../../ui/card";

export default function WithProgress() {
  return (
    <div className="container mx-auto px-4 py-10 md:px-6 2xl:max-w-[1400px]">
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Storage Used
                </p>
                <div className="mt-1">
                  <h3 className="text-xl font-medium sm:text-2xl">78.2%</h3>
                </div>
              </div>
              <Progress value={78.2} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  CPU Load
                </p>
                <div className="mt-1">
                  <h3 className="text-xl font-medium sm:text-2xl">32.5%</h3>
                </div>
              </div>
              <Progress value={32.5} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Memory Usage
                </p>
                <div className="mt-1">
                  <h3 className="text-xl font-medium sm:text-2xl">89.2%</h3>
                </div>
              </div>
              <Progress value={89.2} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Card */}
        <Card className="pt-0">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-muted-foreground text-xs tracking-wide uppercase">
                  Network Load
                </p>
                <div className="mt-1">
                  <h3 className="text-xl font-medium sm:text-2xl">45.8%</h3>
                </div>
              </div>
              <Progress value={45.8} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
