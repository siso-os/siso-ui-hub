import {
  CreditCard,
  CreditCardBack,
  CreditCardCvv,
  CreditCardExpiry,
  CreditCardMagStripe,
} from "@/components/kibo-ui/credit-card";

export const title = "Card back";

const Example = () => (
  <div className="w-full max-w-md">
    <CreditCard>
      <CreditCardBack className="bg-slate-900">
        <CreditCardMagStripe />
        <div className="absolute top-1/2 flex -translate-y-1/2 gap-4">
          <CreditCardExpiry>12/28</CreditCardExpiry>
          <CreditCardCvv>123</CreditCardCvv>
        </div>
      </CreditCardBack>
    </CreditCard>
  </div>
);

export default Example;
