import bastionEco from "../assets/images/partners/bastion.svg";
import adaptiveFrontierEco from "../assets/images/operators/adaptivefrontier.png";
import eulerEco from "../assets/images/operators/euler.svg";
import falconEco from "../assets/images/partners/falconx.svg";
import digitalEco from "../assets/images/partners/fasanara.png";
import gauntletEco from "../assets/images/operators/gauntletlogo.svg";
import keyringEco from "../assets/images/operators/keyring.svg";
import rockawayEco from "../assets/images/partners/rockawayx.svg";
import m11Eco from "../assets/images/partners/m11credit.svg";
import morphoEco from "../assets/images/partners/morpho.svg";
import steakhouseEco from "../assets/images/operators/steakhouse.svg";
import redstoneEco from "../assets/images/operators/redstone.svg";
import twoPrimeEco from "../assets/images/operators/twoprime-wordmark.svg";
import pendleEco from "../assets/images/partners/pendle.png";
import threeFEco from "../assets/images/partners/3f.png";
import etherfiEco from "../assets/images/partners/etherfi.png";
import sygnumEco from "../assets/images/partners/sygnum.png";
import nestEco from "../assets/images/partners/nest.svg";

export type PartnerGroup = "credit" | "infrastructure";

export interface Partner {
  group: PartnerGroup;
  name: string;
  link: string;
  src: string;
  visualScale: number;
  verticalOffset?: number;
  /**
   * Background the original artwork is drawn for (default dark). Colours only
   * return on hover where the logo sits on a matching background; elsewhere
   * the monochrome mark simply strengthens.
   */
  colorSurface?: "light" | "dark";
}

/**
 * Display order for the carousel and the Ecosystem grid: credit and
 * institutional partners first, then integrators and infrastructure, then DeFi
 * venues and curators. Groups are not labelled in the carousel.
 */
export const partners: Partner[] = [
  {
    group: "credit",
    name: "FalconX",
    colorSurface: "light",
    link: "https://www.falconx.io/",
    src: falconEco,
    visualScale: 1.2,
    verticalOffset: -2.5,
  },
  {
    group: "credit",
    name: "RockawayX",
    colorSurface: "light",
    link: "https://www.rockawayx.com/",
    src: rockawayEco,
    visualScale: 1.16,
    verticalOffset: 1,
  },
  {
    group: "credit",
    name: "Fasanara Digital",
    link: "https://www.fasanara.com/",
    src: digitalEco,
    visualScale: 1.04,
    verticalOffset: 1.5,
  },
  {
    group: "credit",
    name: "Two Prime",
    link: "https://twoprime.com/",
    src: twoPrimeEco,
    verticalOffset: 1.5,
    visualScale: 1.1,
  },
  {
    group: "credit",
    name: "M11 Credit",
    link: "https://www.maven11.com/",
    src: m11Eco,
    visualScale: 1.14,
    verticalOffset: 0.5,
  },
  {
    group: "credit",
    name: "Bastion Trading",
    link: "https://bastiontrading.com/",
    src: bastionEco,
    visualScale: 1.08,
    verticalOffset: 2,
  },
  {
    group: "credit",
    name: "Adaptive Frontier",
    link: "https://www.adaptivefrontier.com/",
    src: adaptiveFrontierEco,
    visualScale: 1.08,
    verticalOffset: 0,
  },
  {
    group: "infrastructure",
    name: "Sygnum",
    colorSurface: "light",
    link: "https://www.sygnum.com/",
    src: sygnumEco,
    visualScale: 0.85,
    verticalOffset: 0.5,
  },
  {
    group: "infrastructure",
    name: "ether.fi",
    colorSurface: "light",
    link: "https://www.ether.fi/",
    src: etherfiEco,
    visualScale: 1,
    verticalOffset: 1,
  },
  {
    group: "infrastructure",
    name: "Nest",
    link: "https://nest.credit/",
    src: nestEco,
    visualScale: 0.95,
    verticalOffset: 1.5,
  },
  {
    group: "infrastructure",
    name: "Keyring",
    colorSurface: "light",
    link: "https://www.keyring.network/",
    src: keyringEco,
    visualScale: 0.8,
    verticalOffset: 1,
  },
  {
    group: "infrastructure",
    name: "RedStone",
    colorSurface: "light",
    link: "https://www.redstone.finance/",
    src: redstoneEco,
    verticalOffset: 0.5,
    visualScale: 0.9,
  },
  {
    group: "infrastructure",
    name: "Pendle",
    colorSurface: "light",
    link: "https://www.pendle.finance/",
    src: pendleEco,
    visualScale: 0.95,
    verticalOffset: 0.5,
  },
  {
    group: "infrastructure",
    name: "Morpho",
    colorSurface: "light",
    link: "https://morpho.org/",
    src: morphoEco,
    visualScale: 0.8,
    verticalOffset: 1,
  },
  {
    group: "infrastructure",
    name: "Gauntlet",
    link: "https://www.gauntlet.xyz/",
    src: gauntletEco,
    visualScale: 0.8,
    verticalOffset: 1,
  },
  {
    group: "infrastructure",
    name: "Steakhouse",
    colorSurface: "light",
    link: "https://www.steakhouse.financial/",
    src: steakhouseEco,
    visualScale: 0.8,
    verticalOffset: 1,
  },
  {
    group: "infrastructure",
    name: "3F",
    colorSurface: "light",
    link: "https://3f.xyz/",
    src: threeFEco,
    visualScale: 0.9,
    verticalOffset: 1,
  },
  {
    group: "infrastructure",
    name: "Euler",
    link: "https://euler.finance/",
    src: eulerEco,
    visualScale: 0.6,
    verticalOffset: 1,
  },
];
