import { CircleHelp } from "lucide-react";

const faqs = [
  {
    question: "Can I cancel at anytime?",
    answer:
      "Yes, you can cancel anytime no questions are asked while you cancel but we would highly appreciate if you will give us some feedback.",
  },
  {
    question: "My team has credits. How do we use them?",
    answer:
      "Once your team signs up for a subscription plan. This is where we sit down, grab a cup of coffee and dial in the details.",
  },
  {
    question: "How does Acme's pricing work?",
    answer:
      "Our subscriptions are tiered. Understanding the task at hand and ironing out the wrinkles is key.",
  },
  {
    question: "How secure is Acme?",
    answer:
      "Protecting the data you trust to Acme is our first priority. This part is really crucial in keeping the project in line to completion.",
  },
  {
    question: "How do I get access to a theme I purchased?",
    answer:
      "If you lose the link for a theme you purchased, don't panic! We've got you covered. You can login to your account, tap your avatar in the upper right corner, and tap Purchases. If you didn't create a login or can't remember the information, you can use our handy Redownload page, just remember to use the same email you originally made your purchases with.",
  },
  {
    question: "Upgrade License Type",
    answer:
      "There may be times when you need to upgrade your license from the original type you purchased and we have a solution that ensures you can apply your original purchase cost to the new license purchase.",
  },
];

export default function FAQsSimpleWithDividerAndIcon() {
  return (
    <>
      <div className="max-w-[85rem] container mx-auto px-4 md:px-6 2xl:max-w-[1400px] py-24 lg:py-32">
        {/* <!-- Title --> */}
        <div className="max-w-2xl mx-auto mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            You might be wondering...
          </h2>
        </div>
        {/* <!-- End Title --> */}

        {/* <!-- FAQs --> */}
        <div className="max-w-2xl mx-auto divide-y divide-border">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-8 first:pt-0 last:pb-0">
              <div className="flex gap-x-5">
                <CircleHelp className="shrink-0 mt-1 size-6 text-muted-foreground" />
                <div className="grow">
                  <h3 className="md:text-lg font-semibold">{faq.question}</h3>
                  <p className="mt-1 text-muted-foreground">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <!-- End FAQs --> */}
      </div>
    </>
  );
}
