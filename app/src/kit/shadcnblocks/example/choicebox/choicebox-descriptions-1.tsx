import {
  Choicebox,
  ChoiceboxIndicator,
  ChoiceboxItem,
  ChoiceboxItemDescription,
  ChoiceboxItemHeader,
  ChoiceboxItemTitle,
} from "@/components/kibo-ui/choicebox";

export const title = "Options with descriptions";

const Example = () => (
  <div className="w-full max-w-md">
    <Choicebox className="grid gap-2" defaultValue="email">
      <ChoiceboxItem id="email" value="email">
        <ChoiceboxItemHeader>
          <ChoiceboxItemTitle>Email</ChoiceboxItemTitle>
          <ChoiceboxItemDescription>
            Receive updates in your inbox.
          </ChoiceboxItemDescription>
        </ChoiceboxItemHeader>
        <ChoiceboxIndicator id="email" />
      </ChoiceboxItem>
      <ChoiceboxItem id="sms" value="sms">
        <ChoiceboxItemHeader>
          <ChoiceboxItemTitle>SMS</ChoiceboxItemTitle>
          <ChoiceboxItemDescription>
            Get text alerts on your phone.
          </ChoiceboxItemDescription>
        </ChoiceboxItemHeader>
        <ChoiceboxIndicator id="sms" />
      </ChoiceboxItem>
    </Choicebox>
  </div>
);

export default Example;
