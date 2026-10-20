// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { Carousel } from "@siso/ui/blocks/source";

export function Suites() {
  return (
    <Carousel label="Harbour suites" interval={5000}>
      <img src={"/art/bg/agency.webp"} alt="SISO-owned preview fixture" />
      <img src={"/art/bg/agency.webp"} alt="SISO-owned preview fixture" />
      <img src={"/art/bg/agency.webp"} alt="SISO-owned preview fixture" />
    </Carousel>
  );
}
