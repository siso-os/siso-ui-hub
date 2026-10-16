import { Button } from "../../../ui/button";
import { Card, CardContent } from "../../../ui/card";
import { Progress } from "../../../ui/progress";
import { Badge } from "../../../ui/badge";
import { CheckCircle2, Circle, CircleDot } from "lucide-react";

const steps = [
  {
    title: "Complete your profile",
    description: "Add your personal information and preferences",
    status: "completed",
    tasks: [
      { name: "Upload profile picture", completed: true },
      { name: "Add bio information", completed: true },
      { name: "Set notification preferences", completed: true },
    ],
  },
  {
    title: "Team setup",
    description: "Configure your team and workspace settings",
    status: "current",
    tasks: [
      { name: "Invite team members", completed: true },
      { name: "Set team permissions", completed: false },
      { name: "Configure workspace", completed: false },
    ],
  },
  {
    title: "Project configuration",
    description: "Set up your first project and workflows",
    status: "pending",
    tasks: [
      { name: "Create first project", completed: false },
      { name: "Set project goals", completed: false },
      { name: "Configure workflows", completed: false },
    ],
  },
];

export default function UserOnboarding() {
  const completedSteps = steps.filter(
    (step) => step.status === "completed",
  ).length;
  const progress = (completedSteps / steps.length) * 100;

  return (
    <div className="container mx-auto px-4 py-6 md:px-6 2xl:max-w-[1400px]">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <h1 className="text-2xl font-semibold">Welcome, John!</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Let&apos;s get your account set up
            </p>
          </div>
          <Badge variant="secondary" className="rounded-md px-4 py-1">
            {Math.round(progress)}% Complete
          </Badge>
        </div>

        {/* Progress */}
        <Card className="mb-8 p-0">
          <CardContent className="p-6">
            <Progress value={progress} className="h-2" />
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="text-primary size-4" />
                <span className="text-sm">Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleDot className="text-muted-foreground size-4" />
                <span className="text-sm">In Progress</span>
              </div>
              <div className="flex items-center gap-2">
                <Circle className="text-muted-foreground size-4" />
                <span className="text-sm">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step) => (
            <Card key={step.title} className="p-0">
              <CardContent className="p-6">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {step.status === "completed" ? (
                        <CheckCircle2 className="text-primary size-5" />
                      ) : step.status === "current" ? (
                        <CircleDot className="text-muted-foreground size-5" />
                      ) : (
                        <Circle className="text-muted-foreground size-5" />
                      )}
                      <h2 className="text-lg font-semibold">{step.title}</h2>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                  {step.status === "current" && <Button>Continue Setup</Button>}
                </div>

                <div className="mt-4 space-y-3">
                  {step.tasks.map((task) => (
                    <div
                      key={task.name}
                      className="flex items-center gap-2 text-sm"
                    >
                      {task.completed ? (
                        <CheckCircle2 className="text-primary size-4" />
                      ) : (
                        <Circle className="text-muted-foreground size-4" />
                      )}
                      <span
                        className={
                          task.completed ? "text-muted-foreground" : undefined
                        }
                      >
                        {task.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
