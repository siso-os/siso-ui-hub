import { Button } from "../../shadcn/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../shadcn/ui/card";
import { SidebarInput } from "../../shadcn/ui/sidebar";

export function SidebarOptInForm() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Subscribe to our newsletter</CardTitle>
				<CardDescription>
					Opt-in to receive updates and news about the sidebar.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form>
					<div className="grid gap-2.5">
						<SidebarInput type="email" placeholder="Email" />
						<Button>Subscribe</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
