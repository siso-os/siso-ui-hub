import {
  Choicebox,
  ChoiceboxIndicator,
  ChoiceboxItem,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemSubtitle,
  ChoiceboxItemTitle,
} from "@/components/kibo-ui/choicebox";

export const title = "Billing plan selector";

const Example = () => (
  <div className="w-full max-w-md space-y-3">
    <div>
      <p className="text-sm font-medium">Billing cycle</p>
      <p className="text-sm text-muted-foreground">
        Choose how often you want to be billed.
      </p>
    </div>
    <Choicebox className="grid gap-2" defaultValue="annual">
      <ChoiceboxItem id="monthly-billing" value="monthly">
        <ChoiceboxItemHeader>
          <ChoiceboxItemTitle>
            Monthly
            <ChoiceboxItemSubtitle>$29 / month</ChoiceboxItemSubtitle>
          </ChoiceboxItemTitle>
          <ChoiceboxItemDescription>
            Pay as you go with no long-term commitment.
          </ChoiceboxItemDescription>
        </ChoiceboxItemHeader>
        <ChoiceboxIndicator id="monthly-billing" />
      </ChoiceboxItem>
      <ChoiceboxItem id="annual-billing" value="annual">
        <ChoiceboxItemHeader>
          <ChoiceboxItemTitle>
            Annual
            <ChoiceboxItemSubtitle>$290 / year</ChoiceboxItemSubtitle>
          </ChoiceboxItemTitle>
          <ChoiceboxItemDescription>
            Save two months compared to monthly billing.
          </ChoiceboxItemDescription>
        </ChoiceboxItemHeader>
        <ChoiceboxIndicator id="annual-billing" />
      </ChoiceboxItem>
    </Choicebox>
  </div>
);

export default Example;
