// From Arc's docs page (Usage), imports pointed at the copied source
import { useState } from "react";
import { SignaturePad, signatureToSvg } from "../signature-pad/signature-pad";
import type { InkStroke } from "../signature-pad/signature-pad";

export function SignContract() {
  const [strokes, setStrokes] = useState<InkStroke[]>([]);

  return (
    <form onSubmit={event => { event.preventDefault(); submit(signatureToSvg(strokes)); }}>
      <SignaturePad signer="Ada Lovelace" fileName="ada-signature" onChange={setStrokes} />
      <button type="submit" disabled={!strokes.length}>Sign</button>
    </form>
  );
}
