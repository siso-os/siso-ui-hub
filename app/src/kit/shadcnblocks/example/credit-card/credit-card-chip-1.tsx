import {
  CreditCard,
  CreditCardChip,
  CreditCardFront,
  CreditCardNumber,
  CreditCardServiceProvider,
} from "@/components/kibo-ui/credit-card";

export const title = "With chip";

const Example = () => (
  <div className="w-full max-w-md">
    <CreditCard>
      <CreditCardFront className="bg-slate-900">
        <CreditCardChip />
        <CreditCardNumber className="absolute bottom-0 left-0">
          4242 4242 4242 4242
        </CreditCardNumber>
        <CreditCardServiceProvider type="Visa" />
      </CreditCardFront>
    </CreditCard>
  </div>
);

export default Example;
