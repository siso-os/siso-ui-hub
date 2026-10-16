"use client";
import { Label } from "../../../../shadcn/ui/label";
import { SidebarInput } from "../../../../shadcn/ui/sidebar";

export function SearchForm({ ...props }: React.ComponentProps<"form">) {
	return (
		<form {...props}>
			<div className="relative">
				<Label htmlFor="search" className="sr-only">
					Search
				</Label>
				<SidebarInput
					id="search"
					placeholder="Type to search..."
					className="h-8 pl-7"
				/>
			</div>
		</form>
	);
}
