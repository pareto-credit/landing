import aave from "../../../assets/images/providers/aave.png";
import morpho from "../../../assets/images/partners/morpho.svg";

const logos = { aave, morpho };

/** Provider names remain in the text; the local brand marks are decorative. */
export default function ProviderLogo({ provider }: { provider: keyof typeof logos }) {
  return (
    <span className="macro-outlook__logo" data-provider={provider} aria-hidden="true">
      <img src={logos[provider]} alt="" width="32" height="32" decoding="async" />
    </span>
  );
}
