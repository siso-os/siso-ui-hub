// From Arc's docs page (Usage), imports pointed at the copied source
import { ImageCompare } from "../image-compare/image-compare";

export function Retouch() {
  return (
    <ImageCompare
      before={<img src={new URL("../media/photo-raw.jpg", import.meta.url).href} alt="Unedited photo" />}
      after={<img src={new URL("../media/photo-edit.jpg", import.meta.url).href} alt="Retouched photo" />}
      aspectRatio="4 / 3"
    />
  );
}
