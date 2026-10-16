// From Arc's docs page (Usage), imports pointed at the copied source
import { Carousel } from "../carousel/carousel";

export function Suites() {
  return (
    <Carousel label="Harbour suites" interval={5000}>
      <img src={new URL("../media/suite-1.jpg", import.meta.url).href} alt="Sea view suite" />
      <img src={new URL("../media/suite-2.jpg", import.meta.url).href} alt="Garden suite" />
      <img src={new URL("../media/suite-3.jpg", import.meta.url).href} alt="Loft suite" />
    </Carousel>
  );
}
