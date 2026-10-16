import { Button } from "../../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import { Input } from "../../../ui/input";
import { Search } from "lucide-react";

export default function PageHeadingWithSearchFilters() {
  return (
    <div className="border-b bg-muted/40">
      <div className="container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-16">
        <div className="flex flex-col items-center text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Find Your Next Job
          </h1>
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground">
            Search through thousands of job listings to find your perfect role
          </p>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-4xl rounded-lg bg-background p-4 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1fr,200px,200px,auto]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Job title or keyword..."
                  className="pl-8"
                />
              </div>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                  <SelectItem value="onsite">On-site</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time</SelectItem>
                  <SelectItem value="part-time">Part-time</SelectItem>
                  <SelectItem value="contract">Contract</SelectItem>
                </SelectContent>
              </Select>
              <Button className="w-full">Search Jobs</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
