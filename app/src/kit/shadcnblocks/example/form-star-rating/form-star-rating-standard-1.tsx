import { FormStarRating } from "../../components/shadcnblocks/form-star-rating";

export const title = "Default stars";

const Example = () => (
  <div className="mx-auto flex w-full max-w-md flex-col items-center">
    <FormStarRating defaultValue="4" showLabel />
  </div>
);

export default Example;
