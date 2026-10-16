"use client";

import { Plus } from "lucide-react";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
} from "../../../../../shadcn/ui/empty";
import { Button } from "../../../../../shadcn/ui/button";
import { Card, CardContent } from "../../../../../shadcn/ui/card";

const NoDataEmptyState = () => {
  return (
    <Card className="w-full max-w-md">
      <CardContent>
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Plus />
            </EmptyMedia>

            <EmptyTitle className="text-base">No projects yet</EmptyTitle>
            <EmptyDescription className="text-sm">
              Start your first project to see it here.
            </EmptyDescription>
          </EmptyHeader>

          <EmptyContent>
            <Button className="gap-1.5">
              <Plus className="size-3.5" />
              Create Project
            </Button>
          </EmptyContent>
        </Empty>
      </CardContent>
    </Card>
  );
};

export default NoDataEmptyState;
