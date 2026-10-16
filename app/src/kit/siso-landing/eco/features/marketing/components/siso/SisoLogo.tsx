// uihub: siso:landing (copied from the SISO landing, eco/features/marketing/components/siso/SisoLogo.tsx)
// The SISO lockup from the brand kit (public/brand/kit/siso-lockup-white.svg: the lion and the wordmark as drawn), not typed
// text. Shaan, 9 Oct: "I don't think I like the SISO font where it says SISO in the top nav". 26 px tall, as the old logo.
export function SisoLogo({ title = 'SISO' }: { title?: string }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', height: 32 }} aria-label={title} role="img">
      <img src="/brand/kit/siso-lockup-white.svg" alt="" width={83} height={26} style={{ width: 83, height: 26, display: 'block' }} />
    </span>
  );
}
