// uihub: siso:package-workbench
// From Arc's docs page (Usage), imports pointed at the copied source
import { ImageCompare } from "@siso/ui/blocks/source";

export function Retouch() {
  return (
    <ImageCompare
      before={<img src={"/art/bg/agency.webp"} alt="SISO-owned preview fixture" />}
      after={<img src={"/art/bg/agency.webp"} alt="SISO-owned preview fixture" />}
      aspectRatio="4 / 3"
    />
  );
}
