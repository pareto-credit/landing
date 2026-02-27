import adaptiveLogo from "../assets/images/operators/adaptive.png";
import adaptiveBackground from "../assets/images/operators/adaptiveBg.svg";
import bastionLogo from "../assets/images/operators/bastion.png";
import bastionBackground from "../assets/images/operators/bastionBg.svg";
import falconxLogo from "../assets/images/operators/falconx.png";
import falconxBackground from "../assets/images/operators/falconxBg.svg";
import fasanaraLogo from "../assets/images/operators/fasanara.png";
import fasanaraBackground from "../assets/images/operators/fasanaraBg.svg";
import gauntletLogo from "../assets/images/operators/gauntlet.svg";
import m11Logo from "../assets/images/operators/m11.png";
import paretoLogo from "../assets/images/operators/pareto.png";
import rockawayBackground from "../assets/images/operators/rockawayBg.svg";
import rockawayLogo from "../assets/images/operators/rockawayx.png";

const OPERATOR_LOGOS: Record<string, string> = {
  adaptive: adaptiveLogo,
  bastion: bastionLogo,
  falconx: falconxLogo,
  fasanara: fasanaraLogo,
  gauntlet: gauntletLogo,
  m11: m11Logo,
  maven11: m11Logo,
  pareto: paretoLogo,
  rockaway: rockawayLogo,
  rockawayx: rockawayLogo,
};

const OPERATOR_BACKGROUNDS: Record<string, string> = {
  adaptive: adaptiveBackground,
  bastion: bastionBackground,
  falconx: falconxBackground,
  fasanara: fasanaraBackground,
  rockaway: rockawayBackground,
  rockawayx: rockawayBackground,
};

const normalizeOperatorKey = (value?: string) =>
  (value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

const resolveOperatorAsset = (
  mapping: Record<string, string>,
  operatorCode?: string,
  operatorName?: string,
): string | null => {
  const directCode = normalizeOperatorKey(operatorCode);
  if (mapping[directCode]) return mapping[directCode];

  const fromName = normalizeOperatorKey(operatorName);
  if (mapping[fromName]) return mapping[fromName];

  const partialMatch = Object.keys(mapping).find(
    (key) => fromName.includes(key) || directCode.includes(key),
  );

  return partialMatch ? mapping[partialMatch] : null;
};

export const getOperatorLogo = (operatorCode?: string, operatorName?: string): string | null => {
  return resolveOperatorAsset(OPERATOR_LOGOS, operatorCode, operatorName);
};

export const getOperatorBackground = (
  operatorCode?: string,
  operatorName?: string,
): string | null => {
  return resolveOperatorAsset(OPERATOR_BACKGROUNDS, operatorCode, operatorName);
};
