import adaptiveLogo from "../assets/images/operators/adaptive.png";
import adaptiveBackground from "../assets/images/operators/adaptiveBg.svg";
import bastionLogo from "../assets/images/operators/bastion.png";
import bastionBackground from "../assets/images/operators/bastionBg.svg";
import falconxLogo from "../assets/images/operators/falconx.png";
import falconxBackground from "../assets/images/operators/falconxBg.svg";
import fasanaraLogo from "../assets/images/operators/fasanara.png";
import fasanaraBackground from "../assets/images/operators/fasanaraBg.svg";
import gauntletLogo from "../assets/images/operators/gauntlet.svg";
import m1CapitalLogo from "../assets/images/operators/m1capital.png";
import m1CapitalBackground from "../assets/images/operators/m1capitalBg.svg";
import m11Logo from "../assets/images/operators/m11.png";
import northbridgeLogo from "../assets/images/operators/northbridge.png";
import paretoLogo from "../assets/images/operators/pareto.png";
import rockawayBackground from "../assets/images/operators/rockawayBg.svg";
import rockawayLogo from "../assets/images/operators/rockawayx.png";
import twoPrimeBackground from "../assets/images/operators/twoprimeBg.svg";
import twoPrimeLogo from "../assets/images/operators/twoprime.svg";
import adaptiveSquareLogo from "../assets/images/operators/adaptive-frontier-square.svg";
import bastionSquareLogo from "../assets/images/operators/bastion-square.svg";
import falconxSquareLogo from "../assets/images/operators/falconx-square.svg";
import fasanaraSquareLogo from "../assets/images/operators/fasanara-square.svg";
import gauntletSquareLogo from "../assets/images/operators/gauntlet-square.svg";
import m1CapitalSquareLogo from "../assets/images/operators/m1capital-square.svg";
import m11SquareLogo from "../assets/images/operators/m11-square.svg";
import rockawaySquareLogo from "../assets/images/operators/rockawayx-square.svg";

const OPERATOR_LOGOS: Record<string, string> = {
  adaptive: adaptiveLogo,
  bastion: bastionLogo,
  falconx: falconxLogo,
  fasanara: fasanaraLogo,
  gauntlet: gauntletLogo,
  m1capital: m1CapitalLogo,
  m11: m11Logo,
  maven11: m11Logo,
  northbridge: northbridgeLogo,
  pareto: paretoLogo,
  rockaway: rockawayLogo,
  rockawayx: rockawayLogo,
  twoprime: twoPrimeLogo,
};

const OPERATOR_BACKGROUNDS: Record<string, string> = {
  adaptive: adaptiveBackground,
  bastion: bastionBackground,
  falconx: falconxBackground,
  fasanara: fasanaraBackground,
  m1capital: m1CapitalBackground,
  rockaway: rockawayBackground,
  rockawayx: rockawayBackground,
  twoprime: twoPrimeBackground,
};

/** Square vector assets for the vault header's rounded-square tiles. */
const OPERATOR_SQUARE_LOGOS: Record<string, string> = {
  adaptive: adaptiveSquareLogo,
  bastion: bastionSquareLogo,
  falconx: falconxSquareLogo,
  fasanara: fasanaraSquareLogo,
  gauntlet: gauntletSquareLogo,
  m1capital: m1CapitalSquareLogo,
  m11: m11SquareLogo,
  maven11: m11SquareLogo,
  rockaway: rockawaySquareLogo,
  rockawayx: rockawaySquareLogo,
  twoprime: twoPrimeLogo,
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

export const getOperatorSquareLogo = (
  operatorCode?: string,
  operatorName?: string,
): string | null => {
  return resolveOperatorAsset(OPERATOR_SQUARE_LOGOS, operatorCode, operatorName);
};
