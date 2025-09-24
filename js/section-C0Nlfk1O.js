import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as createAstro, e as defineScriptVars, a as renderComponent, b as addAttribute, F as Fragment, u as unescapeHTML, f as renderHead, g as renderTransition, h as renderSlot } from './astro/server-CgvuF3dj.js';
import 'kleur/colors';
/* empty css                        */
import 'clsx';

var __freeze$3 = Object.freeze;
var __defProp$3 = Object.defineProperty;
var __template$3 = (cooked, raw) => __freeze$3(__defProp$3(cooked, "raw", { value: __freeze$3(cooked.slice()) }));
var _a$3;
const $$CssVarsTest = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$3 || (_a$3 = __template$3(["", `<span id="css-variable-test-el" data-astro-cid-2g2mtmwx></span> <script id="css-variable-test">
    "use strict";
    window.supportsCssVars = (function() {
        var s=document.getElementById("css-variable-test-el");
        if (s) {
            return window.getComputedStyle(s,null).opacity === '1';
        }
    })();
<\/script>`])), maybeRenderHead());
}, "/Users/nikiman/Projects/pareto-landing/src/components/common/scripts/css-vars-test.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(cooked.slice()) }));
var _a$2;
const $$Window = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a$2 || (_a$2 = __template$2([`<script id="window.appReady">
    'use strict';var ild=!1,cbs=[],w=window,ercbs=[];w.addEventListener('load',function(){ild=!0,cbs.forEach(function(a){try{a()}catch(b){ercbs.forEach(function(d){return d(b)})}}),cbs=null}),w.appReady=function(a){a&&(ild?a():cbs.push(a))},w.appReady.addErrorHandler=function(a){ercbs.push(a)};
<\/script>`])));
}, "/Users/nikiman/Projects/pareto-landing/src/components/common/scripts/window.appReady.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$7 = createAstro("https://pareto.credit/");
const $$NotSupported = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$NotSupported;
  const { criticalChecks } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<script id="not-supported-fn">(function(){', '\n    "use strict";\n    var nsl = false;\n    window.loadNotSupported = function() {\n        if (nsl) return;\n        nsl = true;\n        function load(e,o){\n            var n = new XMLHttpRequest;\n            n.onload = function() {\n                o(this.responseText)\n            };\n            n.open("GET",e);\n            n.send();\n        }\n\n        var body=document.querySelector("body"),\n            elems=body.querySelectorAll("main, header, footer, #mobile-menu, #preloader");\n        elems.forEach(function(e){\n            e.parentNode.removeChild(e)\n        });\n        body.style.cursor="default";\n        var ieMain=document.createElement("main");\n        body.insertBefore(ieMain,body.firstChild).classList.add("ie__main");\n        load("/not-supported.html",function(e){\n            ieMain.innerHTML=e;\n            throw new Error("The browser is not supported. Follow links on the screen or contact site administrator.")\n        })\n    };\n\n    const checksVar = (typeof criticalChecks !== \'undefined\' && criticalChecks)\n        ? [`${criticalChecks.map(c => `${c}`).join(\', \')}`]\n        : [];\n\n    checksVar.forEach(function(c) {\n        if (!window[c]) window.loadNotSupported();\n    })\n})();<\/script> <script nomodule id="not-supported">\n    window.loadNotSupported();\n<\/script>'], ['<script id="not-supported-fn">(function(){', '\n    "use strict";\n    var nsl = false;\n    window.loadNotSupported = function() {\n        if (nsl) return;\n        nsl = true;\n        function load(e,o){\n            var n = new XMLHttpRequest;\n            n.onload = function() {\n                o(this.responseText)\n            };\n            n.open("GET",e);\n            n.send();\n        }\n\n        var body=document.querySelector("body"),\n            elems=body.querySelectorAll("main, header, footer, #mobile-menu, #preloader");\n        elems.forEach(function(e){\n            e.parentNode.removeChild(e)\n        });\n        body.style.cursor="default";\n        var ieMain=document.createElement("main");\n        body.insertBefore(ieMain,body.firstChild).classList.add("ie__main");\n        load("/not-supported.html",function(e){\n            ieMain.innerHTML=e;\n            throw new Error("The browser is not supported. Follow links on the screen or contact site administrator.")\n        })\n    };\n\n    const checksVar = (typeof criticalChecks !== \'undefined\' && criticalChecks)\n        ? [\\`\\${criticalChecks.map(c => \\`\\${c}\\`).join(\', \')}\\`]\n        : [];\n\n    checksVar.forEach(function(c) {\n        if (!window[c]) window.loadNotSupported();\n    })\n})();<\/script> <script nomodule id="not-supported">\n    window.loadNotSupported();\n<\/script>'])), defineScriptVars({ criticalChecks }));
}, "/Users/nikiman/Projects/pareto-landing/src/components/common/scripts/not-supported.astro", void 0);

const languages = Object.freeze({
  en: "English"
});
const defaultLang = "en";
const createStaticPathGetter = () => {
  const result = [];
  Object.keys(languages).forEach((locale) => {
    if (locale !== defaultLang) {
      result.push({ params: { lang: locale } });
    }
  });
  return function() {
    return result;
  };
};
const createPageAlterantes = (hostname, href, currentLocale) => {
  const pageAlternates = [];
  Object.keys(languages).forEach((locale) => {
    if (locale === currentLocale) {
      return;
    }
    pageAlternates.push({
      lang: locale,
      url: `${hostname}/${locale}${href}`
    });
  });
  return pageAlternates;
};

var links = /* @__PURE__ */ ((links2) => {
  links2["app"] = "https://app.pareto.credit/";
  links2["product"] = "#";
  links2["features"] = "homepage-our-advantage";
  links2["solutions"] = "homepage-solution";
  links2["partners"] = "homepage-ecosystem";
  links2["getInTouch"] = "homepage-get-in-touch";
  links2["discord"] = "https://discord.com/invite/mpySAJp";
  links2["linkedin"] = "https://www.linkedin.com/company/paretocredit/";
  links2["youtube"] = "https://www.youtube.com/";
  links2["x"] = "https://x.com/paretocredit";
  links2["telegram"] = "https://t.me/paretocredit";
  links2["paragraph"] = "https://paragraph.xyz/@pareto";
  links2["blog"] = "https://paragraph.com/@pareto";
  links2["documentation"] = "https://docs.pareto.credit/";
  links2["brandKit"] = "https://docs.pareto.credit/resources/media-kit";
  links2["governance"] = "https://gov.pareto.credit";
  links2["github"] = "https://github.com/pareto-credit/";
  links2["Fas_USDC"] = "https://app.pareto.credit/vault#0x45054c6753b4Bce40C5d54418DabC20b070F85bE";
  links2["BAS_USDT"] = "https://app.pareto.credit/vault#0xaE65d6C295E4a28519182a632FB25b7C1966AED7";
  links2["FAL_USDC"] = "https://app.pareto.credit/vault#0x24e16F9Fad32891f8bA69cE8fEdd273A2649331A";
  links2["sUSP_APP"] = "https://app.pareto.credit/usp";
  links2["sUSP_DOC"] = "https://docs.pareto.credit/product/usp";
  links2["USP_APP"] = "https://app.pareto.credit/usp";
  links2["USP_DOC"] = "https://docs.pareto.credit/product/usp";
  links2["IPFSapp"] = "https://idle-finance.on.fleek.co/";
  links2["TermsofService"] = "/terms-of-service";
  links2["PrivacyPolicy"] = "/privacy-policy";
  links2["CookiePolicy"] = "https://www.iubenda.com/privacy-policy/61211749/cookie-policy";
  return links2;
})(links || {});

const HeaderEnCopy = {
  appBtn: {
    title: "Enter App",
    href: links.app
  },
  links: [
    {
      title: "Solutions",
      href: links.solutions,
      isAnchor: true
    },
    {
      title: "Features",
      href: links.features,
      isAnchor: true
    },
    {
      title: "Contacts",
      href: links.getInTouch,
      isAnchor: true
    }
  ]
};

const HeaderCopyright = {
  en: HeaderEnCopy
};

const twitterIcon = "<svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M14.2353 6H16L12.7654 9.92774L16.1149 14.7308L17 16H15.4526H12.9737L10.5852 12.5751L7.76471 16H6L9.77608 11.4148L6.88512 7.26923L6 6H7.54738H10.0263L11.9562 8.76743L14.2353 6ZM13.6359 14.7308L8.4325 7.26923H9.36406L14.5675 14.7308H13.6359Z\" fill=\"#89A097\"/>\n</svg>\n";

const discordIcon = "<svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.54115 6.60763L9.30929 6.15625C8.27657 6.31823 7.70888 6.466 6.72046 6.87625C5.52777 8.25764 4.85162 11.5596 5.02766 13.7162C5.02766 13.7162 6.95359 14.9943 7.98632 15.1562L8.56962 13.7162L7.74617 13.127C8.61976 13.4995 9.66519 13.7162 10.7886 13.7162C11.9121 13.7162 13.4364 13.4995 14.31 13.127L13.4865 13.7162L14.0413 15.1562C15.0741 14.9943 17 13.7162 17 13.7162C17 11.3495 16.5847 8.46778 15.3357 6.87625C14.3473 6.466 13.7796 6.31823 12.7468 6.15625L12.515 6.60763C11.5541 6.46434 10.5035 6.46412 9.54115 6.60763ZM8.9375 10.6562C8.9375 11.2258 9.2453 11.6875 9.625 11.6875C10.0047 11.6875 10.3125 11.2258 10.3125 10.6562C10.3125 10.0867 10.0047 9.625 9.625 9.625C9.2453 9.625 8.9375 10.0867 8.9375 10.6562ZM12.375 11.6875C11.9953 11.6875 11.6875 11.2258 11.6875 10.6562C11.6875 10.0867 11.9953 9.625 12.375 9.625C12.7547 9.625 13.0625 10.0867 13.0625 10.6562C13.0625 11.2258 12.7547 11.6875 12.375 11.6875Z\" fill=\"#89A097\"/>\n</svg>\n";

const telegramIcon = "<svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M15 6L14.0625 16L10 13.7778L12.7778 10.4444L11.1111 9.33333L7.91667 12.6667L5 11L15 6Z\" fill=\"#89A097\" stroke=\"#89A097\" stroke-linejoin=\"bevel\"/>\n</svg>\n";

const linkedinIcon = "<svg width=\"22\" height=\"22\" viewBox=\"0 0 22 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M7.25 7.4933C7.94037 7.4933 8.5 6.93515 8.5 6.24665C8.5 5.55815 7.94037 5 7.25 5C6.55963 5 6 5.55815 6 6.24665C6 6.93515 6.55963 7.4933 7.25 7.4933Z\" fill=\"#89A097\"/>\n<path d=\"M9.58871 15H11.6989V11.3338C11.6989 10.7304 12.1894 10.2413 12.7944 10.2413C13.3994 10.2413 13.8898 10.7304 13.8898 11.3338V15H16V10.5563C16 9.22742 14.9198 8.15013 13.5874 8.15013C12.7222 8.15013 11.9635 8.60426 11.5376 9.28653V8.39142H9.58871V15Z\" fill=\"#89A097\"/>\n<path d=\"M8.31183 8.39142H6V15H8.31183V8.39142Z\" fill=\"#89A097\"/>\n</svg>\n";

const paragraphIcon = "<svg width=\"828\" height=\"828\" viewBox=\"0 0 828 828\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M252 193V581.993H635.198\" stroke=\"#89A097\" stroke-width=\"54.4573\" stroke-miterlimit=\"10\"/>\n<path d=\"M410.139 220.091L265 581.993L623.02 432.973\" stroke=\"#89A097\" stroke-width=\"54.4573\" stroke-linejoin=\"round\"/>\n<path d=\"M309 581.995L579.948 303.311\" stroke=\"#89A097\" stroke-width=\"54.4573\" stroke-miterlimit=\"10\"/>\n</svg>\n";

const FooterEnCopy = {
  ResourcesTitle: "Resources",
  ProductsTitle: "Products",
  InputTitle: "Subscribe to our newsletter",
  InputPlaceholder: "Email",
  InputButton: "Subscribe",
  Resources: [
    {
      title: "Governance",
      link: links.governance
    },
    {
      title: "GitHub",
      link: links.github
    },
    {
      title: "Documentation",
      link: links.documentation
    },
    {
      title: "Media kit",
      link: links.brandKit
    }
  ],
  Products: [
    {
      title: "Fas_USDC",
      link: links.Fas_USDC
    },
    {
      title: "BAS_USDT",
      link: links.BAS_USDT
    },
    {
      title: "FAL_USDC",
      link: links.FAL_USDC
    }
  ],
  Social: [
    {
      icon: twitterIcon,
      title: "Twitter",
      link: links.x
    },
    {
      icon: discordIcon,
      title: "Discord",
      link: links.discord
    },
    {
      icon: telegramIcon,
      title: "Telegram",
      link: links.telegram
    },
    {
      icon: linkedinIcon,
      title: "LinkedIn",
      link: links.linkedin
    },
    {
      icon: paragraphIcon,
      title: "Paragraph",
      link: links.paragraph
    }
  ],
  PolicyLink: [
    // {
    //     isExternal: true,
    //     title: 'IPFS app',
    //     link: links.IPFSapp,
    // },
    {
      title: "Terms of Service",
      link: links.TermsofService
    },
    {
      title: "Privacy Policy",
      link: links.PrivacyPolicy
    }
    // {
    //     title: 'Cookie Policy',
    //     link: links.CookiePolicy,
    // },
  ],
  Desc: "All content available on this Website is general in nature, not directed or tailored to any particular person, and is for informational purposes only. Neither the Website nor any of its content is offered as investment advice and should not be deemed as investment advice or a recommendation to purchase or sell any specific security. The information contained herein reflects the opinions and projections of  Pareto as of the date hereof, which are subject to change without notice at any time. Pareto does not represent that any opinion or projection will be realized. Neither Pareto nor any of its advisers, officers, directors, or affiliates represents that the information presented on this Website is accurate, current, or complete, and such information is subject to change without notice. Any performance information must be considered in conjunction with applicable disclosures. Past performance is not a guarantee of future results. Neither this Website nor its contents should be construed as legal, tax, or other advice. Individuals are urged to consult with their own tax or legal advisers before entering into any advisory contract."
};

const FooterCopyright = {
  en: FooterEnCopy
};

const lower = "/assets/lower-cost-unn5pDt4.svg";

const endToEnd = "/assets/end-to-end-D6WoEXNT.svg";

const built = "/assets/built-KuwfbLN1.svg";

const flexible = "/assets/flexible-DjQGQ5xC.svg";

const clear = "/assets/clear-CYVOKmit.svg";

const docs = "/assets/docs-Bpn4b590.svg";

const forum = "/assets/forum-CA_RYK42.svg";

const document = "/assets/document-CPGoqzsZ.svg";

const m11 = "/assets/img/m11-BtfgXDT4.png";

const opt = "/assets/img/opt-Xbxi09fx.png";

const bastion = "/assets/img/bastion-Dwycggo6.png";

const falconx = "/assets/img/falconx-Dv6s9rdb.png";

const falconxBg = "<svg width=\"119\" height=\"71\" viewBox=\"0 0 119 71\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path opacity=\"0.5\" d=\"M23.1683 -15.7778H0L33.6793 32.2147L1.06547 78.8802H24.2415L56.2936 32.2238L23.1683 -15.7778ZM66.9557 -15.7778L53.2678 3.80675L64.666 20.0371L89.9923 -15.7778H66.9557ZM64.6737 43.0741L53.2484 59.3495L66.9634 78.8889H90L64.6737 43.0828V43.0741Z\" fill=\"#EFF1EE\"/>\n</svg>\n";

const fasanra = "/assets/img/fasanara-Cw41Wgen.png";

const fasanraBg = "<svg width=\"120\" height=\"70\" viewBox=\"0 0 120 70\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g opacity=\"0.5\">\n<path d=\"M83.368 118.74C60.4375 102.233 57.6536 67.4712 81.0628 50.2567C72.9621 50.6309 67.7444 53.1445 66.4082 53.9218C59.136 65.2087 57.4551 80.2372 61.8614 93.0906C66.4781 107.137 77.7944 118.628 91.603 123.72C88.7081 122.329 86.3271 120.926 83.368 118.745V118.74Z\" fill=\"#EFF1EE\"/>\n<path d=\"M65.1382 18.678C32.3036 42.6256 28.2532 92.281 56.7166 121.057C79.5828 145.665 120.507 148.688 146.635 127.756C107.924 155.356 51.2831 132.496 45.4001 84.4892C40.6086 49.7396 68.4417 16.8074 103.979 17.9356L112.966 5.3391C96.0295 3.6206 78.7425 8.48968 65.1382 18.678Z\" fill=\"#EFF1EE\"/>\n<path d=\"M102.185 20.469C74.3399 20.7086 50.4931 43.879 48.9581 71.5503C45.3688 108.305 81.5826 140.045 117.47 132.984C81.3083 138.022 46.5244 102.179 57.4031 66.1905C61.9264 49.4731 76.1667 35.8244 93.2728 33.0479L102.179 20.469H102.185Z\" fill=\"#EFF1EE\"/>\n<path d=\"M165.818 115.906C124.866 173.376 34.4915 145.465 33.9721 74.4867C33.9896 52.1929 44.8275 30.3901 62.8089 17.2209V5.58887C22.3404 31.8573 14.5549 90.1926 47.7748 125.475C81.1054 161.429 137.916 156.811 166.426 117.408L165.813 115.906H165.818Z\" fill=\"#EFF1EE\"/>\n</g>\n</svg>\n";

const bastionIcon = "/assets/img/bastion-4ogTwmjt.png";

const bastionBg = "<svg width=\"119\" height=\"70\" viewBox=\"0 0 119 70\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g clip-path=\"url(#clip0_354_1019)\">\n<path opacity=\"0.5\" d=\"M45.11 45.1998H26.6685L20 83L57.8005 76.3305V57.89C51.9143 55.7568 47.2426 51.0864 45.11 45.1998ZM20 -7L26.6685 30.8002H45.11C47.2426 24.914 51.9143 20.2433 57.8005 18.1098V-0.330503L20 -7ZM72.2003 -0.330503V18.1098C78.0857 20.2433 82.7574 24.914 84.8898 30.8002H103.331L110 -7L72.2003 -0.330503ZM110 83L72.2003 76.3305V57.89C78.0857 55.7568 82.7574 51.0864 84.8898 45.1998H103.331L110 83Z\" fill=\"#EFF1EE\"/>\n</g>\n<defs>\n<clipPath id=\"clip0_354_1019\">\n<rect width=\"119\" height=\"70\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>\n";

const adaptiveIcon = "/assets/img/adaptive-lcDahoJX.png";

const adaptiveBg = "<svg width=\"158\" height=\"100\" viewBox=\"0 0 158 100\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<mask id=\"mask0_1_14\" style=\"mask-type:alpha\" maskUnits=\"userSpaceOnUse\" x=\"0\" y=\"0\" width=\"158\" height=\"100\">\n<rect width=\"158\" height=\"100\" fill=\"#D9D9D9\"/>\n</mask>\n<g mask=\"url(#mask0_1_14)\">\n<path opacity=\"0.5\" d=\"M138.357 -23.6939C124.264 -20.9712 112.092 -11.0416 105.846 2.572C102.322 10.259 102.162 12.501 101.682 57.505L101.201 104.43H111H120.26V75.762L120.58 48.216H138.998H157.416V39.407V30.599H138.998H120.58V21.79C120.58 5.29399 129.709 -4.475 146.685 -6.077L156.615 -7.038V-15.8463V-24.6548L151.009 -24.9751C147.966 -25.1353 142.201 -24.4947 138.357 -23.6939Z\" fill=\"#EFF1EE\"/>\n<path opacity=\"0.5\" d=\"M39.079 11.065C17.1687 14.499 0 34.611 0 56.848C0 74.181 11.2823 91.513 27.6334 99.525C34.501 102.959 37.935 103.286 64.26 103.776L93.201 104.43V75.162C93.201 48.019 92.874 45.403 89.277 37.881C80.447 18.587 60.009 7.63202 39.079 11.065ZM56.738 30.687C62.952 32.976 70.31 40.007 72.926 46.384C74.397 49.654 75.215 57.83 75.215 68.131V84.482H56.902C41.041 84.482 37.608 83.991 32.866 81.048C17.1687 71.564 13.8984 52.597 25.6712 38.535C33.193 29.706 45.783 26.435 56.738 30.687Z\" fill=\"#EFF1EE\"/>\n</g>\n</svg>\n";

const rockawayIcon = "/assets/img/rockawayx-QIXQCOeu.png";

const rockawayBg = "<svg width=\"120\" height=\"70\" viewBox=\"0 0 120 70\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g clip-path=\"url(#clip0_846_3080)\">\n<g opacity=\"0.5\">\n<path d=\"M48.5894 47.1968H30.7465L8 80.433H21.5574L39.4003 54.4085L56.949 80.433H71L48.5894 47.1968Z\" fill=\"#EFEFEF\"/>\n<path d=\"M30.4126 42.2362H48.255L71 9H57.4436L39.6012 35.0245L22.0535 9H8L30.4126 42.2362Z\" fill=\"#EFEFEF\"/>\n</g>\n</g>\n<defs>\n<clipPath id=\"clip0_846_3080\">\n<rect width=\"120\" height=\"70\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>\n";

const borrow = "/assets/borrow-DDWUC14N.svg";

const lend = "/assets/lend-DDO0RjU-.svg";

const curate = "/assets/curate-s9fOdv1L.svg";

const Sherlock = "/assets/sherlock-BJepcNkY.svg";

const Code = "/assets/code-DcbtCs9h.svg";

const Diligence = "/assets/diligence-BrwO8P37.svg";

const imm = "/assets/imm-BQydZsH_.svg";

const falconEco = "/assets/FalconX-CyUi2jB5.svg";

const rockawayEco = "/assets/RockawayX-O-Fdpq6H.svg";

const digitalEco = "/assets/Fasanara_Digital-B9dJHMY5.svg";

const bastionEco = "/assets/Bastion_Trading-CbXYrsIU.svg";

const m11Eco = "/assets/m11-Dz8nVwh0.svg";

const composable = "/assets/composable-ChixkgSO.svg";

const liquid = "/assets/liquid-Bvj40Bfu.svg";

const diversified = "/assets/diversified-B7btrTjQ.svg";

const yieldGenerating = "/assets/yield-generating-B5uAxOnh.svg";

const overcollateralized = "/assets/overcollateralized-DPhqxRI-.svg";

const safe = "/assets/safe-CwMKMzci.svg";

const HomeEnCopy = {
  heroSection: {
    title: "Radically transforming credit, on-chain",
    // description: 'Building a marketplace of scaled on-chain credit facilities that displace legacy lending infrastructure and loan origination processes at each stage of the loan lifecycle.',
    description: "Building a private credit marketplace that connects institutional lenders and borrowers, offering scalable yield opportunities",
    infoBlocks: [
      {
        id: "TVL",
        title: "TVL",
        value: "$-"
      },
      {
        id: "CE",
        title: "CREDIT EXTENDED",
        value: "$-"
      }
    ],
    tabs: [
      {
        icon: falconx,
        title: "FalconX",
        description: "Prime Brokerage",
        bgImage: falconxBg,
        badges: ["USDС", "Fixed rate"],
        address: "0xc26a6fa2c37b38e549a4a1807543801db684f99c",
        itemDescription: "Lending funds to an SPV managed by a top-tier Prime Broker, providing financing to end-counterparties while being secured by structural protections.",
        infoBlock: [
          {
            id: "TVL",
            title: "TVL",
            value: "$-"
          },
          {
            title: "Net APY",
            value: "Hidden"
          },
          {
            id: "RED",
            title: "Redemptions",
            value: "Monthly"
          }
        ],
        isActive: true
      },
      {
        icon: fasanra,
        title: "Fasanara Digital",
        description: "Basis Trade",
        bgImage: fasanraBg,
        badges: ["USDС", "Variable rate"],
        address: "0x45054c6753b4Bce40C5d54418DabC20b070F85bE",
        itemDescription: "Variable-rate loan channeling funds into delta-neutral yield strategies overperforming the BTC funding rate.",
        infoBlock: [
          {
            id: "TVL",
            title: "TVL",
            value: "$-"
          },
          {
            id: "APY",
            title: "Net APY",
            value: "-%"
          },
          {
            id: "RED",
            title: "Redemptions",
            value: "Weekly"
          }
        ],
        isActive: false
      },
      {
        icon: bastionIcon,
        title: "Bastion Trading",
        description: "Market Making",
        bgImage: bastionBg,
        badges: ["USDT", "Fixed rate"],
        address: "0xC49b4ECc14aa31Ef0AD077EdcF53faB4201b724c",
        itemDescription: "Fixed rate loan channeling funds into derivatives trading and market-making strategies.",
        infoBlock: [
          {
            id: "TVL",
            title: "TVL",
            value: "$-"
          },
          {
            id: "APY",
            title: "Net APY",
            value: "-%"
          },
          {
            id: "RED",
            title: "Redemptions",
            value: "Monthly"
          }
        ],
        isActive: false
      },
      {
        icon: adaptiveIcon,
        title: "Adaptive Frontier",
        description: "HF Trading",
        bgImage: adaptiveBg,
        badges: ["USDT", "Fixed rate"],
        address: "0xae7913c672c7F1f76C2a1a0Ac4de97d082681234",
        itemDescription: "Fixed-rate loan channeling funds into delta neutral arbitrage and market making strategies",
        infoBlock: [
          {
            id: "TVL",
            title: "TVL",
            value: "$-"
          },
          {
            id: "APY",
            title: "Net APY",
            value: "-%"
          },
          {
            id: "RED",
            title: "Redemptions",
            value: "Monthly"
          }
        ],
        isActive: false
      },
      {
        icon: rockawayIcon,
        title: "RockawayX",
        description: "Credit & DeFi Liquidity",
        bgImage: rockawayBg,
        badges: ["USDC", "Fixed rate"],
        address: "0xEC6a70F62a83418c7fb238182eD2865F80491a8B",
        itemDescription: "The vault is a fixed-rate credit facility with a 30-day notice period for redemptions.",
        infoBlock: [
          {
            id: "TVL",
            title: "TVL",
            value: "$-"
          },
          {
            id: "APY",
            title: "Net APY",
            value: "-%"
          },
          {
            id: "RED",
            title: "Redemptions",
            value: "Monthly"
          }
        ],
        isActive: false
      }
    ]
  },
  ourProductsSection: {
    subTitle: "SYNTHETIC DOLLAR",
    title: "Building blocks of the new era",
    list: [
      {
        id: "USP",
        title: "USP, the credit-based synthetic dollar",
        description: "USP is a synthetic dollar protocol backed by real-world institutional-grade private credit.",
        btn: [
          {
            label: "Open in app",
            link: links.USP_APP
          },
          {
            label: "Documents",
            link: links.USP_DOC
          }
        ],
        infoBlocks: [
          {
            label: "Price",
            value: "$1"
          },
          {
            label: "TVL",
            value: "$-"
          },
          {
            label: "Collateralization",
            value: "100%"
          }
        ],
        futureBlocks: [
          {
            icon: composable,
            title: "Composable",
            description: "USP is a transferable, permissionless asset that integrates across DeFi and CeFi – streamlining capital deployment, risk management, and settlements."
          },
          {
            icon: overcollateralized,
            title: "Capital Efficient",
            description: "Minted 1:1 against major stablecoins, USP is deployed into a diversified portfolio of liquid, short- and long-term credit – balancing liquidity and yield."
          },
          {
            icon: safe,
            title: "Protected",
            description: "USP holds senior priority in the capital stack and is shielded by a stability reserve – providing an added buffer against defaults and market stress."
          }
        ]
      },
      {
        id: "SUSP",
        title: "sUSP, the credit savings rate",
        description: "sUSP is the staking version of USP, acting like a savings account for RWA credit lines. ",
        btn: [
          {
            label: "Open in app",
            link: links.sUSP_APP
          },
          {
            label: "Documents",
            link: links.sUSP_DOC
          }
        ],
        infoBlocks: [
          {
            label: "Price",
            value: "$1"
          },
          {
            label: "TVL",
            value: "$-"
          },
          {
            label: "APY",
            value: "-%"
          }
        ],
        futureBlocks: [
          {
            icon: yieldGenerating,
            title: "Yield generating",
            description: "sUSP allows users to earn yield from Credit Vaults and participate in Pareto’s long-term growth – designed for stable, risk-adjusted returns."
          },
          {
            icon: liquid,
            title: "Liquid",
            description: "sUSP is fully liquid and non-custodial – holders can exit at any time by simply unstaking, without lockups or withdrawal restrictions."
          },
          {
            icon: diversified,
            title: "Diversified",
            description: "sUSP provides exposure to a broad set of credit lines – reducing single-counterparty risk through structured diversification."
          }
        ]
      }
    ]
  },
  solutionSection: {
    subTitle: "MODULAR SOLUTIONS",
    title: "Onchain Credit, Simplified.",
    // description: 'Built for asset managers, credit funds, and institutional investors, Pareto delivers programmable, transparent, and efficient on-chain capital markets with institutional-grade infrastructure.',
    description: "Built for asset managers, credit funds, and institutional investors, Pareto delivers programmable, transparent, and efficient on-chain capital solutions with institutional-grade infrastructure.",
    solutionList: [
      {
        className: "lend",
        title: "Lend",
        description: "Expand your fixed-income portfolio with structured yield strategies tailored to diverse risk profiles. Self-onboard seamlessly via privacy-preserving, compliant KYC, so you can focus on optimizing returns.",
        visual: lend,
        btns: [
          {
            text: "Enter App",
            link: "https://app.pareto.credit"
          },
          {
            isAnchor: true,
            text: "Contact Us",
            parentId: "lender",
            className: "contact-us-btn",
            link: "homepage-get-in-touch"
          }
        ],
        futures: [
          {
            title: "Choose Credit Vault",
            description: "Each market is uniquely structured based on borrower profiles, supported assets, blockchain networks, and loan terms."
          },
          {
            title: "Complete  KYC",
            description: "Access eligibility is verified through zk-proofed KYC, ensuring institutional compliance and privacy."
          },
          {
            title: "Execute Loan Agreement",
            description: "Formalize credit terms by signing a legally binding agreement that outlines borrower obligations and lender rights."
          },
          {
            title: "Deploy Assets",
            description: "Allocate assets to credit vaults, receive interest-bearing credit tokens in return, and use them across DeFi."
          }
        ]
      },
      {
        className: "borrow",
        title: "Borrow",
        description: "Streamline the creation and securitization of your credit – interest rates, lockup periods, withdrawal cycles, reserve ratios, risk-adjusted tranches: construct the credit line that works best for you.",
        visual: borrow,
        btns: [
          {
            isAnchor: true,
            text: "Contact Us",
            parentId: "borrower",
            className: "contact-us-btn",
            link: "homepage-get-in-touch"
          }
        ],
        futures: [
          {
            title: "Get Onboarded",
            description: "Prospective borrowers undergo a due diligence process before gaining access to a credit vault."
          },
          {
            title: "Configure Vault",
            description: "Borrowers set key parameters like loan duration, interest rate model, early exit terms, tranche structure, preferred KYC processes, and utilize an available legal framework."
          },
          {
            title: "Receive Funds",
            description: "Once a loan cycle commences, borrowers receive funds directly into their designated wallet."
          },
          {
            title: "Distribute Interest",
            description: "Credit Vaults automate accounting. Borrowers must pay interest at the end of each cycle; unclaimed interest returns to the lending pool."
          }
        ]
      },
      {
        className: "curate",
        title: "Curate",
        description: "Leverage your underwriting expertise on-chain to enhance capital efficiency, mitigate counterparty risk, and elevate market transparency with institutional-grade credit structuring.",
        visual: curate,
        btns: [
          {
            isAnchor: true,
            text: "Contact Us",
            parentId: "curator",
            className: "contact-us-btn",
            link: "homepage-get-in-touch"
          }
        ],
        futures: [
          {
            title: "Get Onboarded",
            description: "Curators undergo a comprehensive due diligence process before being authorized to manage a Credit Vault."
          },
          {
            title: "Configure Vault",
            description: "Curators can set vault fees and earn from their curatorship."
          },
          {
            title: "Access Curator App",
            description: "Curators have access to a dedicated application that provides real-time visibility into fund inflows and outflows."
          },
          {
            title: "Oversee Vault Performance",
            description: "Curators oversee the generation and distribution of reports on vault performance and risk exposures."
          }
        ]
      }
    ]
  },
  HowItWorks: {
    subTitle: "HOW IT WORKS",
    title: "Where Roles Create Value"
  },
  OurAdvantage: {
    subTitle: "OUR ADVANTAGE",
    title: "Purpose-Built for Institutions",
    description: "Experience institutional-grade on-chain credit with Pareto.",
    list: [
      {
        icon: lower,
        title: "Lower cost of capital",
        desc: "A decentralized infrastructure that compresses the costs of traditional off-chain securitization and uses open-source services to reduce the intermediary costs and complexity of TradFi."
      },
      {
        icon: endToEnd,
        title: "End-to-end transparency",
        desc: "End-to-end transparency as the entire capital structure, securitization, and servicing of debt facilities is brought onchain — multi-tranching, NAV, credit tokenization, securitization, reporting, and more."
      },
      {
        icon: built,
        title: "Built for DeFi",
        desc: "Designed from the ground-up by a DeFi-native team to work seamlessly with DeFi protocols in a compliant way. Tokens can be used as collateral, in settlement transactions, or for on-chain finance."
      },
      {
        icon: flexible,
        title: "Flexible ownership",
        desc: "Credit Vaults integrate easily with the existing workflows and custody solutions, whether you manage a crypto native fund, a DAO, or a traditional fund."
      },
      {
        icon: clear,
        title: "Clear regulatory structure",
        desc: "Credit Vaults operate within a simple regulatory framework so you can focus on utility and yield. Assets are segregated by established providers and available to Qualified Investors in supported jurisdictions."
      }
    ]
  },
  Transparent: {
    subTitle: "Transparent & Secure",
    title: "Audited by industry-leading security firms.",
    leftBlock: {
      title: "Transparency",
      description: "Pareto offers real-time transaction monitoring, on-chain verified contracts, and the source code is publicly accessible and verifiable.",
      btns: [
        {
          text: "EXPLORE SECURITY",
          link: "https://docs.pareto.credit/developers/security"
        }
      ]
    },
    rightBlock: {
      title: "Audits",
      btn: {
        text: "READ REPORTS",
        link: "https://docs.pareto.credit/developers/security/audits"
      },
      logos: [
        {
          src: Sherlock,
          alt: "sherlock"
        },
        {
          src: Code,
          alt: "code"
        },
        {
          src: Diligence,
          alt: "diligence"
        }
      ]
    },
    bottomBlock: {
      title: "Bug Bounty Program",
      logo: imm,
      count: "$50,000",
      description: "Earn rewards for reporting vulnerabilities and keeping the protocol secure.",
      btn: {
        text: "PARTICIPATE",
        link: "https://immunefi.com/bug-bounty/idlefinance/information/"
      }
    }
  },
  Ecosystem: {
    subTitle: "ECOSYSTEM",
    title: "Our partners",
    description: "Collaborating with leading traditional and digital asset investment institutions dedicated to driving the adoption of tokenization in traditional finance and credit markets.",
    images: [
      {
        link: "https://www.falconx.io/",
        src: falconEco
      },
      {
        link: "https://www.rockawayx.com/",
        src: rockawayEco
      },
      {
        link: "https://www.fasanara.com/",
        src: digitalEco
      },
      {
        link: "https://bastiontrading.com/",
        src: bastionEco
      },
      {
        link: "https://www.maven11.com/",
        src: m11Eco
      }
    ]
  },
  GetInTouch: {
    subTitle: "Get in touch",
    title: "Ready to get started?",
    description: "Scale your digital asset business with flexible, cost-effective credit lines."
  },
  CommunitySection: {
    subTitle: "Governance & Documentation",
    title: "Get Involved",
    description: "",
    list: [
      {
        img: forum,
        title: "Governance Forum",
        description: "Discuss key issues, propose changes, and help shape Pareto’s future.",
        btn: {
          text: "VISIT GOVERNANCE",
          link: "https://gov.pareto.credit/"
        }
      },
      {
        img: docs,
        title: "Developer Docs",
        description: "Learn how to interact with Pareto's smart contracts and integrate them.",
        btn: {
          text: "READ DOCS",
          link: "https://docs.pareto.credit/"
        }
      },
      {
        img: document,
        title: "Integrators Docs",
        description: "Learn how to interact with Pareto's API and integrate them.",
        btn: {
          text: "READ DOCS",
          link: "https://docs.pareto.credit/developers/api"
        }
      }
    ]
  },
  NewsSection: {
    subTitle: "Media Coverage",
    title: "News",
    description: "A collection of news about Pareto and its ecosystem",
    list: [
      {
        img: m11,
        title: "M11 Credit curates the first Prime Brokerage Credit Vault",
        description: "Overseeing a fixed-rate pool, channeling funds into prime brokerage activities",
        btn: {
          text: "Read more",
          link: "#"
        }
      },
      {
        img: opt,
        title: "Credit Vaults Launch on Optimism",
        description: "Private credit with LP rewards",
        btn: {
          text: "Read more",
          link: "#"
        }
      },
      {
        img: bastion,
        title: "Bastion Trading: a fixed yield Credit Vault",
        description: "A fixed-rate pool, channeling funds into derivatives and market-making yield strategies",
        btn: {
          text: "Read more",
          link: "#"
        }
      }
    ]
  }
};

const HomeCopyright = {
  en: HomeEnCopy
};

function indexTrim(str, ch) {
  if (str === ch) {
    return "";
  }
  let start = 0, end = str.length;
  while (start < end && str[start] === ch)
    ++start;
  while (end > start && str[end - 1] === ch)
    --end;
  return start > 0 || end < str.length ? str.substring(start, end) : str;
}
function urlJoin(...parts) {
  return parts.map((p) => indexTrim(p, "/")).filter((p) => p).join("/");
}

const DefaultOgImageUrl = "/assets/img/og-image-8h2vHxiW.png";

const FaviconDefault = "/assets/img/favicon-DYVlzzVm.ico";

const $$Astro$6 = createAstro("https://pareto.credit/");
const $$Meta = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Meta;
  const {
    locale = defaultLang,
    href,
    title = "Title",
    description = "Description",
    image = DefaultOgImageUrl,
    noIndex = false,
    maxScale = 5
  } = Astro2.props;
  const hostname = "https://pareto.credit/";
  const canonicalLocale = locale === defaultLang ? "" : `/${locale}`;
  const canonical = urlJoin(hostname, canonicalLocale, href) + "/";
  const defaultLangCanonical = urlJoin(hostname, href) + "/";
  const ogImage = {
    url: urlJoin(hostname, image || DefaultOgImageUrl),
    width: 1200,
    height: 1200
  };
  const pageAlts = {
    links: createPageAlterantes(hostname, href, locale),
    default: defaultLangCanonical
  };
  const viewportContent = `width=device-width, initial-scale=1, maximum-scale=${maxScale}`;
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<meta charset="utf-8"><title>${title}</title><meta name="description"${addAttribute(description, "content")}>${noIndex && renderTemplate`<meta name="robots" content="noindex">`}${!noIndex && renderTemplate`<meta name="generator"${addAttribute(Astro2.generator, "content")}>
		<meta http-equiv="X-UA-Compatible" content="IE=edge">

		<meta name="title"${addAttribute(title, "content")}>
		<meta name="description"${addAttribute(description, "content")}>

		<meta property="og:description"${addAttribute(description, "content")}>
		<meta property="og:title"${addAttribute(title, "content")}>
		<meta property="og:type" content="website">
		<meta property="og:url"${addAttribute(canonical, "content")}>
		<meta property="og:site_name"${addAttribute(title, "content")}>

		<meta property="og:image:width"${addAttribute(ogImage.width.toString(), "content")}>
		<meta property="og:image:height"${addAttribute(ogImage.height.toString(), "content")}>
		<meta property="og:image"${addAttribute(ogImage.url, "content")}>
		<meta property="og:image:alt"${addAttribute(description, "content")}>

		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:image"${addAttribute(ogImage.url, "content")}>

		<meta name="twitter:title"${addAttribute(title, "content")}>
		<meta name="twitter:description"${addAttribute(description, "content")}>`}<link rel="icon"${addAttribute(FaviconDefault, "href")} sizes="any">${pageAlts.links.map((page) => renderTemplate`<link rel="alternate"${addAttribute(page.lang, "hreflang")}${addAttribute(page.url, "href")}>`)}${pageAlts && renderTemplate`<link rel="alternate" hreflang="x-default"${addAttribute(pageAlts.default, "href")}>`}<meta name="viewport"${addAttribute(viewportContent, "content")}>` })}`;
}, "/Users/nikiman/Projects/pareto-landing/src/layouts/meta.astro", void 0);

const $$Fonts = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Righteous&display=swap" rel="stylesheet">` })}`;
}, "/Users/nikiman/Projects/pareto-landing/src/layouts/fonts.astro", void 0);

var CommonComponents = /* @__PURE__ */ ((CommonComponents2) => {
  CommonComponents2["Header"] = "header";
  CommonComponents2["Footer"] = "footer";
  CommonComponents2["MobileMenu"] = "mobile-menu";
  CommonComponents2["Preloader"] = "preloader";
  CommonComponents2["AccordionsList"] = "accordions-list";
  CommonComponents2["HeroTabs"] = "hero-tabs";
  return CommonComponents2;
})(CommonComponents || {});

const $$Astro$5 = createAstro("https://pareto.credit/");
const $$View$3 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$View$3;
  const { locale } = Astro2.props;
  const COPY = HeaderCopyright[locale];
  Astro2.url;
  const { lang } = Astro2.params;
  const createHref = (path) => lang ? `/${lang}${path}` : `${path}`;
  return renderTemplate`${maybeRenderHead()}<header class="header"${addAttribute(CommonComponents.Header, "id")}> <div class="container"> <div class="header-container"> <div class="header__logo"> <a href="/" class="header__logo-link"> <svg viewBox="0 0 104 27" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" class="logo-text" clip-rule="evenodd" d="M38 4.6097V21.0863H40.801V16.0021H44.8966C45.9794 16.0021 46.9523 15.7667 47.8153 15.2959C48.6941 14.8095 49.3845 14.1347 49.8867 13.2717C50.4045 12.4086 50.6634 11.42 50.6634 10.3059C50.6634 9.17606 50.4045 8.18747 49.8867 7.3401C49.3688 6.47705 48.6705 5.81014 47.7918 5.33938C46.9287 4.85293 45.9715 4.6097 44.9202 4.6097H38ZM44.5671 13.5306H40.801V7.08119H44.5906C45.1869 7.08119 45.7283 7.21457 46.2147 7.48133C46.7169 7.7324 47.1092 8.10116 47.3916 8.58762C47.6898 9.05837 47.8389 9.63898 47.8389 10.3294C47.8389 10.9885 47.6898 11.5612 47.3916 12.0477C47.1092 12.5341 46.7169 12.9029 46.2147 13.154C45.7283 13.405 45.1791 13.5306 44.5671 13.5306ZM85.6884 20.2248C86.3004 20.8368 87.1399 21.1428 88.207 21.1428H91.1963V18.8361H88.6778C88.3168 18.8361 88.0265 18.7262 87.8069 18.5065C87.5872 18.2711 87.4773 17.973 87.4773 17.6121V11.4451H91.2199V9.13843H87.4773V6.12557H84.794V9.13843H82.7227V11.4451H84.794V17.7298C84.794 18.7811 85.0921 19.6128 85.6884 20.2248ZM53.22 20.543C54.0517 21.1079 55.0403 21.3904 56.1858 21.3904C56.9233 21.3904 57.5667 21.2727 58.1159 21.0373C58.6651 20.8019 59.1281 20.4959 59.5047 20.1193C59.8813 19.727 60.1873 19.3112 60.4226 18.8718H60.4697V21.1079H63.1766V15.0822C63.1766 13.921 62.9255 12.8697 62.4234 11.9281C61.9369 10.9709 61.2308 10.2177 60.305 9.66849C59.3948 9.10358 58.2885 8.82113 56.9861 8.82113C55.668 8.82113 54.5303 9.10358 53.5731 9.66849C52.6316 10.2177 51.9019 10.9709 51.3841 11.9281C50.8819 12.8697 50.6309 13.9367 50.6309 15.1293C50.6309 16.2748 50.8505 17.3262 51.2899 18.2834C51.745 19.2249 52.3884 19.9781 53.22 20.543ZM58.7514 18.5658C58.2336 18.9111 57.6216 19.0837 56.9155 19.0837C56.1623 19.0837 55.5189 18.9111 54.9854 18.5658C54.4675 18.2049 54.0674 17.7263 53.7849 17.13C53.5025 16.518 53.3613 15.8433 53.3613 15.1058C53.3613 14.3525 53.5025 13.6778 53.7849 13.0815C54.0674 12.4852 54.4754 12.0144 55.0089 11.6692C55.5424 11.3083 56.1858 11.1278 56.939 11.1278C57.6609 11.1278 58.2807 11.3083 58.7985 11.6692C59.3164 12.0144 59.7165 12.4852 59.999 13.0815C60.2814 13.6621 60.4226 14.329 60.4226 15.0822C60.4226 15.8354 60.2736 16.518 59.9754 17.13C59.693 17.7263 59.285 18.2049 58.7514 18.5658ZM65.1387 12.5168V21.1082H67.8455V12.6345C67.8455 12.2579 67.9475 11.9598 68.1515 11.7401C68.3712 11.5204 68.6694 11.4106 69.046 11.4106H71.4468V9.10384H68.5517C67.4846 9.10384 66.6451 9.40984 66.0331 10.0218C65.4368 10.6181 65.1387 11.4498 65.1387 12.5168ZM78.2534 21.108C76.9039 21.108 75.7192 20.8569 74.6992 20.3548C73.6949 19.837 72.9103 19.1308 72.3454 18.2364C71.7805 17.3263 71.498 16.2827 71.498 15.1058C71.498 13.8662 71.7491 12.7756 72.2513 11.8341C72.7534 10.8926 73.4438 10.155 74.3226 9.6215C75.2013 9.08798 76.2135 8.82121 77.359 8.82121C78.6457 8.82121 79.7049 9.09582 80.5366 9.64504C81.3683 10.1943 81.9803 10.9318 82.3726 11.8576C82.7806 12.7834 82.9846 13.8191 82.9846 14.9646C82.9846 15.1215 82.9767 15.302 82.961 15.506C82.9453 15.71 82.9218 15.8669 82.8904 15.9767H74.3697C74.4638 16.6044 74.6913 17.1301 75.0523 17.5538C75.4132 17.9618 75.8682 18.2756 76.4175 18.4953C76.9667 18.6993 77.5787 18.8013 78.2534 18.8013H81.4781V21.108H78.2534ZM74.3461 14.1408H80.2777C80.262 13.8426 80.2149 13.5445 80.1365 13.2463C80.0737 12.9482 79.9638 12.6657 79.8069 12.399C79.6657 12.1322 79.4774 11.9047 79.242 11.7164C79.0223 11.5124 78.7556 11.3555 78.4417 11.2456C78.1279 11.1201 77.767 11.0573 77.359 11.0573C76.8882 11.0573 76.4724 11.1515 76.1115 11.3398C75.7506 11.5124 75.4446 11.7478 75.1935 12.0459C74.9424 12.3284 74.7463 12.6579 74.605 13.0345C74.4795 13.3954 74.3932 13.7642 74.3461 14.1408ZM97.6211 21.3905C96.3814 21.3905 95.283 21.1159 94.3258 20.5666C93.3686 20.0017 92.6075 19.2485 92.0426 18.307C91.4934 17.3498 91.2188 16.2827 91.2188 15.1058C91.2188 13.9289 91.4934 12.8697 92.0426 11.9282C92.6075 10.971 93.3686 10.2178 94.3258 9.66858C95.283 9.10367 96.3814 8.82121 97.6211 8.82121C98.845 8.82121 99.9356 9.10367 100.893 9.66858C101.85 10.2178 102.603 10.9632 103.152 11.9047C103.717 12.8462 104 13.9133 104 15.1058C104 16.2827 103.717 17.3498 103.152 18.307C102.603 19.2485 101.85 20.0017 100.893 20.5666C99.9356 21.1159 98.845 21.3905 97.6211 21.3905ZM97.6211 19.0838C98.3586 19.0838 99.002 18.9111 99.5512 18.5659C100.1 18.205 100.524 17.7264 100.822 17.1301C101.12 16.5338 101.269 15.8591 101.269 15.1058C101.269 14.3683 101.12 13.7014 100.822 13.1051C100.524 12.4931 100.1 12.0145 99.5512 11.6693C99.002 11.3084 98.3586 11.1279 97.6211 11.1279C96.8679 11.1279 96.2166 11.3084 95.6674 11.6693C95.1339 12.0145 94.7102 12.4853 94.3964 13.0816C94.0982 13.6779 93.9492 14.3526 93.9492 15.1058C93.9492 15.8434 94.0982 16.5181 94.3964 17.1301C94.7102 17.7264 95.1339 18.205 95.6674 18.5659C96.2166 18.9111 96.8679 19.0838 97.6211 19.0838Z" fill="#081912"></path> <rect width="28" height="27" rx="9" fill="#081912"></rect> <path d="M13.175 15.4925C13.9773 17.5806 14.9601 20.0606 13.5259 21.7773C13.0896 22.2995 12.5101 22.7192 11.8173 22.9725C9.73175 23.7349 7.4084 22.7013 6.62794 20.6639C5.84748 18.6265 6.90546 16.3567 8.991 15.5942C9.02853 15.5805 9.06613 15.5674 9.1038 15.5548L10.2185 18.3967C10.1719 18.4061 10.1255 18.4191 10.0795 18.4359C9.60042 18.611 9.35738 19.1325 9.53667 19.6005C9.71596 20.0685 10.2497 20.306 10.7288 20.1308C11.2079 19.9557 11.4509 19.4343 11.2716 18.9662C11.2669 18.9539 11.2619 18.9417 11.2567 18.9296L9.40429 14.2049L9.39344 14.2102L9.23576 13.7864C7.8419 10.1225 9.74643 6.04581 13.4957 4.67511C17.2501 3.30251 21.4327 5.16319 22.8377 8.83106L22.9105 9.02095C24.2659 12.5595 22.5337 16.5138 18.9776 17.999C17.8092 18.4869 16.5486 18.722 15.2821 18.6904L14.0497 15.5619L15.0448 15.6407C15.9713 15.7142 16.9021 15.566 17.7568 15.2091C19.7867 14.3614 20.7754 12.1042 20.0017 10.0844L19.929 9.89447C19.1252 7.796 16.7322 6.73146 14.5842 7.51676C12.4362 8.30205 11.3465 10.6398 12.1503 12.7383L12.5258 13.7476L12.5234 13.7462L12.5901 13.9204L13.175 15.4925Z" fill="#DDE5DB"></path> </svg> </a> </div> <div class="header__nav"> <nav class="header__nav-list"> ${COPY.links.map((link) => link.isAnchor ? renderTemplate`<a class="deep-forest nav up-text anchor-item"${addAttribute(createHref(link.href), "data-anchor")} href="#">${link.title}</a>` : renderTemplate`<a class="deep-forest nav up-text" target="_blank"${addAttribute(createHref(link.href), "href")}>${link.title}</a>`)} </nav> </div> <div class="header__btn"> <div class="burger"> <span></span><span></span><span></span> </div> <a target="_blank"${addAttribute(COPY.appBtn.href, "href")} class="btn btn-primary mint"> <span class="nav up-text"> ${COPY.appBtn.title} </span> </a> </div> </div> </div> </header> `;
}, "/Users/nikiman/Projects/pareto-landing/src/components/common/header/view.astro", void 0);

const $$Astro$4 = createAstro("https://pareto.credit/");
const $$View$2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$View$2;
  const { locale } = Astro2.props;
  const Strings = FooterCopyright[locale];
  return renderTemplate`${maybeRenderHead()}<footer class="footer"${addAttribute(CommonComponents.Footer, "id")}> <div class="container"> <div class="footer-container"> <div class="footer-container__first"> <div class="footer-container__first-left"> <div class="logo-wrap"> <svg viewBox="0 0 116 45" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M15.5191 26.3107L15.6295 26.6047C17.4377 31.4165 19.5467 37.0286 16.3203 40.9829C15.325 42.2027 14.0031 43.1829 12.4223 43.7745C7.66535 45.5547 2.366 43.1415 0.585847 38.3846C-1.19431 33.6277 1.21884 28.3283 5.97577 26.5482C6.06137 26.5161 6.14714 26.4854 6.23306 26.4561L8.77555 33.0912C8.66929 33.1131 8.56336 33.1435 8.45857 33.1827C7.3658 33.5916 6.81145 34.809 7.22039 35.9018C7.62933 36.9945 8.8467 37.5489 9.93947 37.14C11.0322 36.731 11.5866 35.5136 11.1777 34.4209C11.1669 34.392 11.1555 34.3635 11.1436 34.3354L6.91845 23.3044L6.89369 23.3168L6.53405 22.3273C3.35478 13.7729 7.69883 4.2549 16.2505 1.05466C24.8141 -2.15003 34.3541 2.1942 37.5588 10.7578L37.7248 11.2011C40.8165 19.4628 36.8655 28.6952 28.7543 32.1626C26.0893 33.3019 23.2139 33.8506 20.3252 33.7768L17.5143 26.4726L19.7839 26.6567C21.8971 26.8282 24.0203 26.4823 25.9698 25.6489C30.5997 23.6697 32.855 18.3998 31.0902 13.684L30.9243 13.2406C29.0908 8.34116 23.6327 5.85572 18.7333 7.6892C13.8339 9.52268 11.3484 14.9808 13.1819 19.8802L14.0384 22.2366L14.0328 22.2334L14.185 22.64L15.5191 26.3107ZM64.4921 31.6355C63.2581 31.6355 62.1931 31.3312 61.2971 30.7226C60.4011 30.114 59.7081 29.3026 59.2178 28.2883C58.7445 27.2571 58.5078 26.1245 58.5078 24.8905C58.5078 23.6057 58.7783 22.4562 59.3192 21.4419C59.8771 20.4107 60.6632 19.5993 61.6775 19.0076C62.7087 18.399 63.9343 18.0947 65.3543 18.0947C66.7574 18.0947 67.9492 18.399 68.9296 19.0076C69.927 19.5993 70.6877 20.4107 71.2118 21.4419C71.7527 22.4562 72.0232 23.5888 72.0232 24.8397V31.3312H69.1071V28.9223H69.0564C68.8028 29.3956 68.4732 29.8436 68.0675 30.2662C67.6618 30.6719 67.1631 31.0016 66.5714 31.2551C65.9797 31.5087 65.2866 31.6355 64.4921 31.6355ZM65.2782 29.1505C66.0389 29.1505 66.6982 28.9645 67.2561 28.5926C67.8308 28.2038 68.2703 27.6882 68.5746 27.0458C68.8958 26.3865 69.0564 25.6512 69.0564 24.8397C69.0564 24.0283 68.9043 23.3099 68.6 22.6844C68.2957 22.042 67.8646 21.5349 67.3068 21.163C66.7489 20.7741 66.0812 20.5797 65.3036 20.5797C64.4921 20.5797 63.799 20.7741 63.2243 21.163C62.6495 21.5349 62.21 22.042 61.9057 22.6844C61.6014 23.3268 61.4492 24.0537 61.4492 24.8651C61.4492 25.6596 61.6014 26.3865 61.9057 27.0458C62.21 27.6882 62.641 28.2038 63.1989 28.5926C63.7737 28.9645 64.4668 29.1505 65.2782 29.1505ZM74.1367 22.0772V31.3326H77.0528V22.204C77.0528 21.7983 77.1627 21.4771 77.3824 21.2404C77.6191 21.0037 77.9403 20.8854 78.346 20.8854H80.9324V18.4004H77.8135C76.664 18.4004 75.7596 18.73 75.1003 19.3893C74.4579 20.0317 74.1367 20.9277 74.1367 22.0772ZM88.2639 31.3312C86.81 31.3312 85.5337 31.0607 84.4349 30.5198C83.353 29.9619 82.5078 29.2012 81.8992 28.2376C81.2906 27.2571 80.9863 26.133 80.9863 24.8651C80.9863 23.5296 81.2568 22.3547 81.7978 21.3405C82.3387 20.3262 83.0825 19.5316 84.0292 18.9569C84.9759 18.3821 86.0662 18.0947 87.3003 18.0947C88.6865 18.0947 89.8275 18.3906 90.7235 18.9822C91.6195 19.5739 92.2787 20.3684 92.7014 21.3658C93.1409 22.3632 93.3607 23.4789 93.3607 24.713C93.3607 24.882 93.3522 25.0764 93.3353 25.2962C93.3184 25.5159 93.293 25.685 93.2592 25.8033H84.0799C84.1813 26.4795 84.4265 27.0458 84.8153 27.5023C85.2041 27.9418 85.6943 28.2799 86.286 28.5165C86.8777 28.7363 87.5369 28.8462 88.2639 28.8462H91.7378V31.3312H88.2639ZM84.0546 23.8255H90.4446C90.4277 23.5043 90.377 23.1831 90.2924 22.8619C90.2248 22.5407 90.1065 22.2364 89.9374 21.949C89.7853 21.6616 89.5824 21.4165 89.3289 21.2137C89.0922 20.9939 88.8048 20.8249 88.4667 20.7065C88.1286 20.5713 87.7398 20.5037 87.3003 20.5037C86.7931 20.5037 86.3452 20.6051 85.9563 20.8079C85.5675 20.9939 85.2379 21.2475 84.9674 21.5687C84.6969 21.873 84.4856 22.228 84.3335 22.6337C84.1982 23.0225 84.1053 23.4197 84.0546 23.8255ZM96.2751 30.3794C96.9344 31.0387 97.8388 31.3683 98.9883 31.3683H102.209V28.8833H99.4955C99.1066 28.8833 98.7939 28.765 98.5572 28.5283C98.3206 28.2748 98.2022 27.9536 98.2022 27.5648V20.9212H102.234V18.4362H98.2022V15.1904H95.3115V18.4362H93.0801V20.9212H95.3115V27.6915C95.3115 28.8242 95.6327 29.7201 96.2751 30.3794ZM109.128 31.6355C107.792 31.6355 106.609 31.3396 105.578 30.748C104.546 30.1394 103.727 29.328 103.118 28.3137C102.526 27.2825 102.23 26.133 102.23 24.8651C102.23 23.5972 102.526 22.4562 103.118 21.4419C103.727 20.4107 104.546 19.5993 105.578 19.0076C106.609 18.399 107.792 18.0947 109.128 18.0947C110.446 18.0947 111.621 18.399 112.652 19.0076C113.683 19.5993 114.495 20.4022 115.087 21.4165C115.695 22.4308 115.999 23.5803 115.999 24.8651C115.999 26.133 115.695 27.2825 115.087 28.3137C114.495 29.328 113.683 30.1394 112.652 30.748C111.621 31.3396 110.446 31.6355 109.128 31.6355ZM109.128 29.1505C109.922 29.1505 110.615 28.9645 111.207 28.5926C111.799 28.2038 112.255 27.6882 112.576 27.0458C112.897 26.4034 113.058 25.6765 113.058 24.8651C113.058 24.0706 112.897 23.3521 112.576 22.7097C112.255 22.0505 111.799 21.5349 111.207 21.163C110.615 20.7741 109.922 20.5797 109.128 20.5797C108.316 20.5797 107.615 20.7741 107.023 21.163C106.448 21.5349 105.992 22.042 105.654 22.6844C105.332 23.3268 105.172 24.0537 105.172 24.8651C105.172 25.6596 105.332 26.3865 105.654 27.0458C105.992 27.6882 106.448 28.2038 107.023 28.5926C107.615 28.9645 108.316 29.1505 109.128 29.1505ZM44.8984 13.5586V31.3086H47.9159V25.8315H52.3281C53.4945 25.8315 54.5426 25.5779 55.4724 25.0708C56.4191 24.5467 57.1629 23.8198 57.7038 22.8901C58.2617 21.9603 58.5406 20.8953 58.5406 19.695C58.5406 18.4779 58.2617 17.4129 57.7038 16.5C57.146 15.5703 56.3937 14.8518 55.447 14.3447C54.5173 13.8206 53.4861 13.5586 52.3535 13.5586H44.8984ZM51.9731 23.169H47.9159V16.2211H51.9985C52.6408 16.2211 53.2241 16.3648 53.7481 16.6522C54.2891 16.9227 54.7117 17.3199 55.016 17.844C55.3372 18.3511 55.4978 18.9766 55.4978 19.7204C55.4978 20.4304 55.3372 21.0474 55.016 21.5715C54.7117 22.0955 54.2891 22.4928 53.7481 22.7633C53.2241 23.0337 52.6324 23.169 51.9731 23.169Z" fill="#C0CAC3"></path> </svg> </div> <div class="subscribe-wrap"> <h3 class="desc-2 subscribe-label"> ${Strings.InputTitle} </h3> <div class="subscribe"> <form class="subscribe__form" action="https://formspree.io/f/xkgjlnwg" method="post"> <input name="email" type="text" class="subscribe__field desc-1"${addAttribute(Strings.InputPlaceholder, "placeholder")}> <button class="subscribe__btn nav up-text" type="submit"> ${Strings.InputButton} </button> </form> </div> </div> </div> <div class="footer-container__first-right"> <div class="resources-wrap"> <h3 class="resources desc-2">${Strings.ProductsTitle}</h3> <ul class="resources-list footer-list"> ${Strings.Products.map((el) => {
    return renderTemplate`<li class="resources-list__item footer-list__item"> <a${addAttribute(el.link, "href")} class="resources-list__link footer-link" target="_blank"> <span>${el.title}</span> </a> </li>`;
  })} </ul> </div> <div class="resources-wrap"> <h3 class="resources desc-2">${Strings.ResourcesTitle}</h3> <ul class="resources-list footer-list"> ${Strings.Resources.map((el) => {
    return renderTemplate`<li class="resources-list__item footer-list__item"> <a${addAttribute(el.link, "href")} class="resources-list__link footer-link" target="_blank"> <span>${el.title}</span> </a> </li>`;
  })} </ul> </div> </div> </div> <div class="footer-container__second"> <div class="footer-container__second-left"> <div class="social-list"> ${Strings.Social.map((el) => {
    return renderTemplate`<a${addAttribute(el.link, "href")} class="social-list__item" target="_blank"> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(el.icon)}` })} </a>`;
  })} </div> </div> <div class="footer-container__second-right"> ${Strings.PolicyLink.map((el) => {
    return renderTemplate`<a${addAttribute(el.link, "href")} class="footer-link"${addAttribute(el.isExternal ? "_blank" : "_self", "target")}> ${el.title} </a>`;
  })} </div> </div> <div class="footer-container__desc"> <p class="desc-4"> ${Strings.Desc} </p> </div> </div> </div> </footer>`;
}, "/Users/nikiman/Projects/pareto-landing/src/components/common/footer/view.astro", void 0);

const $$Astro$3 = createAstro("https://pareto.credit/");
const $$View$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$View$1;
  const { locale } = Astro2.props;
  const COPY = HeaderCopyright[locale];
  Astro2.url;
  const { lang } = Astro2.params;
  const createHref = (path) => lang ? `/${lang}${path}` : `${path}`;
  return renderTemplate`${maybeRenderHead()}<div class="mobile-menu"${addAttribute(CommonComponents.MobileMenu, "id")}> <div class="container"> <div class="mobile-menu__header"> <ul class="menu"> <div class="header__logo"> <a href="#" class="header__logo-link"> <svg viewBox="0 0 104 27" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M38 4.6097V21.0863H40.801V16.0021H44.8966C45.9794 16.0021 46.9523 15.7667 47.8153 15.2959C48.6941 14.8095 49.3845 14.1347 49.8867 13.2717C50.4045 12.4086 50.6634 11.42 50.6634 10.3059C50.6634 9.17606 50.4045 8.18747 49.8867 7.3401C49.3688 6.47705 48.6705 5.81014 47.7918 5.33938C46.9287 4.85293 45.9715 4.6097 44.9202 4.6097H38ZM44.5671 13.5306H40.801V7.08119H44.5906C45.1869 7.08119 45.7283 7.21457 46.2147 7.48133C46.7169 7.7324 47.1092 8.10116 47.3916 8.58762C47.6898 9.05837 47.8389 9.63898 47.8389 10.3294C47.8389 10.9885 47.6898 11.5612 47.3916 12.0477C47.1092 12.5341 46.7169 12.9029 46.2147 13.154C45.7283 13.405 45.1791 13.5306 44.5671 13.5306ZM85.6884 20.2248C86.3004 20.8368 87.1399 21.1428 88.207 21.1428H91.1963V18.8361H88.6778C88.3168 18.8361 88.0265 18.7262 87.8069 18.5065C87.5872 18.2711 87.4773 17.973 87.4773 17.6121V11.4451H91.2199V9.13843H87.4773V6.12557H84.794V9.13843H82.7227V11.4451H84.794V17.7298C84.794 18.7811 85.0921 19.6128 85.6884 20.2248ZM53.22 20.543C54.0517 21.1079 55.0403 21.3904 56.1858 21.3904C56.9233 21.3904 57.5667 21.2727 58.1159 21.0373C58.6651 20.8019 59.1281 20.4959 59.5047 20.1193C59.8813 19.727 60.1873 19.3112 60.4226 18.8718H60.4697V21.1079H63.1766V15.0822C63.1766 13.921 62.9255 12.8697 62.4234 11.9281C61.9369 10.9709 61.2308 10.2177 60.305 9.66849C59.3948 9.10358 58.2885 8.82113 56.9861 8.82113C55.668 8.82113 54.5303 9.10358 53.5731 9.66849C52.6316 10.2177 51.9019 10.9709 51.3841 11.9281C50.8819 12.8697 50.6309 13.9367 50.6309 15.1293C50.6309 16.2748 50.8505 17.3262 51.2899 18.2834C51.745 19.2249 52.3884 19.9781 53.22 20.543ZM58.7514 18.5658C58.2336 18.9111 57.6216 19.0837 56.9155 19.0837C56.1623 19.0837 55.5189 18.9111 54.9854 18.5658C54.4675 18.2049 54.0674 17.7263 53.7849 17.13C53.5025 16.518 53.3613 15.8433 53.3613 15.1058C53.3613 14.3525 53.5025 13.6778 53.7849 13.0815C54.0674 12.4852 54.4754 12.0144 55.0089 11.6692C55.5424 11.3083 56.1858 11.1278 56.939 11.1278C57.6609 11.1278 58.2807 11.3083 58.7985 11.6692C59.3164 12.0144 59.7165 12.4852 59.999 13.0815C60.2814 13.6621 60.4226 14.329 60.4226 15.0822C60.4226 15.8354 60.2736 16.518 59.9754 17.13C59.693 17.7263 59.285 18.2049 58.7514 18.5658ZM65.1387 12.5168V21.1082H67.8455V12.6345C67.8455 12.2579 67.9475 11.9598 68.1515 11.7401C68.3712 11.5204 68.6694 11.4106 69.046 11.4106H71.4468V9.10384H68.5517C67.4846 9.10384 66.6451 9.40984 66.0331 10.0218C65.4368 10.6181 65.1387 11.4498 65.1387 12.5168ZM78.2534 21.108C76.9039 21.108 75.7192 20.8569 74.6992 20.3548C73.6949 19.837 72.9103 19.1308 72.3454 18.2364C71.7805 17.3263 71.498 16.2827 71.498 15.1058C71.498 13.8662 71.7491 12.7756 72.2513 11.8341C72.7534 10.8926 73.4438 10.155 74.3226 9.6215C75.2013 9.08798 76.2135 8.82121 77.359 8.82121C78.6457 8.82121 79.7049 9.09582 80.5366 9.64504C81.3683 10.1943 81.9803 10.9318 82.3726 11.8576C82.7806 12.7834 82.9846 13.8191 82.9846 14.9646C82.9846 15.1215 82.9767 15.302 82.961 15.506C82.9453 15.71 82.9218 15.8669 82.8904 15.9767H74.3697C74.4638 16.6044 74.6913 17.1301 75.0523 17.5538C75.4132 17.9618 75.8682 18.2756 76.4175 18.4953C76.9667 18.6993 77.5787 18.8013 78.2534 18.8013H81.4781V21.108H78.2534ZM74.3461 14.1408H80.2777C80.262 13.8426 80.2149 13.5445 80.1365 13.2463C80.0737 12.9482 79.9638 12.6657 79.8069 12.399C79.6657 12.1322 79.4774 11.9047 79.242 11.7164C79.0223 11.5124 78.7556 11.3555 78.4417 11.2456C78.1279 11.1201 77.767 11.0573 77.359 11.0573C76.8882 11.0573 76.4724 11.1515 76.1115 11.3398C75.7506 11.5124 75.4446 11.7478 75.1935 12.0459C74.9424 12.3284 74.7463 12.6579 74.605 13.0345C74.4795 13.3954 74.3932 13.7642 74.3461 14.1408ZM97.6211 21.3905C96.3814 21.3905 95.283 21.1159 94.3258 20.5666C93.3686 20.0017 92.6075 19.2485 92.0426 18.307C91.4934 17.3498 91.2188 16.2827 91.2188 15.1058C91.2188 13.9289 91.4934 12.8697 92.0426 11.9282C92.6075 10.971 93.3686 10.2178 94.3258 9.66858C95.283 9.10367 96.3814 8.82121 97.6211 8.82121C98.845 8.82121 99.9356 9.10367 100.893 9.66858C101.85 10.2178 102.603 10.9632 103.152 11.9047C103.717 12.8462 104 13.9133 104 15.1058C104 16.2827 103.717 17.3498 103.152 18.307C102.603 19.2485 101.85 20.0017 100.893 20.5666C99.9356 21.1159 98.845 21.3905 97.6211 21.3905ZM97.6211 19.0838C98.3586 19.0838 99.002 18.9111 99.5512 18.5659C100.1 18.205 100.524 17.7264 100.822 17.1301C101.12 16.5338 101.269 15.8591 101.269 15.1058C101.269 14.3683 101.12 13.7014 100.822 13.1051C100.524 12.4931 100.1 12.0145 99.5512 11.6693C99.002 11.3084 98.3586 11.1279 97.6211 11.1279C96.8679 11.1279 96.2166 11.3084 95.6674 11.6693C95.1339 12.0145 94.7102 12.4853 94.3964 13.0816C94.0982 13.6779 93.9492 14.3526 93.9492 15.1058C93.9492 15.8434 94.0982 16.5181 94.3964 17.1301C94.7102 17.7264 95.1339 18.205 95.6674 18.5659C96.2166 18.9111 96.8679 19.0838 97.6211 19.0838Z" fill="#081912"></path> <rect width="28" height="27" rx="9" fill="#081912"></rect> <path d="M13.175 15.4925C13.9773 17.5806 14.9601 20.0606 13.5259 21.7773C13.0896 22.2995 12.5101 22.7192 11.8173 22.9725C9.73175 23.7349 7.4084 22.7013 6.62794 20.6639C5.84748 18.6265 6.90546 16.3567 8.991 15.5942C9.02853 15.5805 9.06613 15.5674 9.1038 15.5548L10.2185 18.3967C10.1719 18.4061 10.1255 18.4191 10.0795 18.4359C9.60042 18.611 9.35738 19.1325 9.53667 19.6005C9.71596 20.0685 10.2497 20.306 10.7288 20.1308C11.2079 19.9557 11.4509 19.4343 11.2716 18.9662C11.2669 18.9539 11.2619 18.9417 11.2567 18.9296L9.40429 14.2049L9.39344 14.2102L9.23576 13.7864C7.8419 10.1225 9.74643 6.04581 13.4957 4.67511C17.2501 3.30251 21.4327 5.16319 22.8377 8.83106L22.9105 9.02095C24.2659 12.5595 22.5337 16.5138 18.9776 17.999C17.8092 18.4869 16.5486 18.722 15.2821 18.6904L14.0497 15.5619L15.0448 15.6407C15.9713 15.7142 16.9021 15.566 17.7568 15.2091C19.7867 14.3614 20.7754 12.1042 20.0017 10.0844L19.929 9.89447C19.1252 7.796 16.7322 6.73146 14.5842 7.51676C12.4362 8.30205 11.3465 10.6398 12.1503 12.7383L12.5258 13.7476L12.5234 13.7462L12.5901 13.9204L13.175 15.4925Z" fill="#DDE5DB"></path> </svg> </a> </div> <li class="burger active"> <span class="burger-line"></span> <span class="burger-line"></span> </li> </ul> </div> <ul class="links-list"> ${COPY.links.map((link) => link.isAnchor ? renderTemplate`<li class="link-item"><a href="" class="link menu-label anchor-item nav"${addAttribute(createHref(link.href), "data-anchor")}>${link.title}</a></li>` : renderTemplate`<li class="link-item"><a${addAttribute(createHref(link.href), "href")} class="link menu-label nav">${link.title}</a></li>`)} </ul> <div class="header__btn"> <a target="_blank"${addAttribute(COPY.appBtn.href, "href")} class="btn btn-primary mint"> <span class="nav up-text"> ${COPY.appBtn.title} </span> </a> </div> </div> </div>`;
}, "/Users/nikiman/Projects/pareto-landing/src/components/common/mobileMenu/view.astro", void 0);

const spinnerImg = "/assets/img/preloader_v-NFqBXcx0.png";

const $$View = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="preloader"${addAttribute(CommonComponents.Preloader, "id")}> <img${addAttribute(spinnerImg, "src")} alt="spinner" class="spinner-image"> </div> `;
}, "/Users/nikiman/Projects/pareto-landing/src/components/common/preloader/view.astro", void 0);

const HomePage = {
  id: "home",
  href: "/" /* Home */,
  title: "Pareto | Radically transforming credit, on-chain",
  description: "Building a private credit marketplace that connects institutional lenders and borrowers, offering scalable yield opportunities",
  copy: HomeCopyright
};
const Page404 = {
  id: "404",
  href: "/404" /* Error404 */,
  title: "Page Not Found",
  description: "",
  copy: void 0,
  disableScripts: true
};
const NotSupported = {
  id: "not-supported",
  href: "/not-supported" /* NotSupported */,
  title: "",
  description: "",
  copy: void 0,
  disableScripts: true
};
const NoScript = {
  id: "no-script",
  href: "/no-script" /* NoScript */,
  title: "Enable JavaScript",
  description: "This website requires scripts to be enabled/allowed in your browser.",
  copy: void 0,
  noIndex: true,
  disableScripts: "force"
};
const NoScriptId = NoScript.id;

const $$Astro$2 = createAstro("https://pareto.credit/");
const $$ViewTransitions = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/nikiman/Projects/pareto-landing/node_modules/astro/components/ViewTransitions.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro$1 = createAstro("https://pareto.credit/");
const $$Page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Page;
  const {
    id,
    locale,
    title = "Title",
    description = "Description",
    href,
    image,
    noIndex = false,
    disableScripts = false,
    isActiveFooter = true,
    isActiveMobileMenu = true,
    isActiveHeader = true,
    isActivePreloader = false,
    noSmoothWrapper = true,
    isActiveContactModal = true
  } = Astro2.props;
  const bodyClass = `locale-${locale}`;
  const myFade = {
    forwards: {
      old: {
        name: "fadeOut",
        duration: "300ms",
        easing: "ease-out",
        fillMode: "forwards"
      },
      new: {
        name: "fadeIn",
        duration: "300ms",
        easing: "ease-in",
        fillMode: "backwards"
      }
    },
    backwards: {
      old: {
        name: "fadeOut",
        duration: "300ms",
        easing: "ease-out",
        fillMode: "forwards"
      },
      new: {
        name: "fadeIn",
        duration: "300ms",
        easing: "ease-in",
        fillMode: "backwards"
      }
    }
  };
  return renderTemplate`<html${addAttribute(locale, "lang")}> <head><!-- Google Tag Manager --><!-- End Google Tag Manager -->${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}${renderComponent($$result, "PageMeta", $$Meta, { "locale": locale, "href": href, "title": title, "description": description, "image": image, "noIndex": noIndex })}${renderComponent($$result, "Fonts", $$Fonts, {})}${id != NoScriptId ? renderTemplate`${maybeRenderHead()}<noscript><meta http-equiv="refresh" content="0;url=/no-script.html"></noscript>` : renderTemplate(_a || (_a = __template(["<script> window.location.href = '/' <\/script>"])))}${disableScripts !== "force" && renderTemplate`${renderComponent($$result, "WindowAppReady", $$Window, {})}`}${renderHead()}</head> <body${addAttribute(`${bodyClass}`, "class")}${addAttribute(renderTransition($$result, "b5osm7g3", myFade), "data-astro-transition-scope")}> ${isActiveHeader && renderTemplate`${renderComponent($$result, "Header", $$View$3, { "locale": locale })}`} ${noSmoothWrapper ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate(_b || (_b = __template([" <main", "", "> ", " </main> ", "<script>window.DISABLE_SMOOTHER_WRAPPER = 1<\/script> "])), addAttribute(`${id}`, "id"), addAttribute(`${id}`, "data-page-id"), renderSlot($$result2, $$slots["default"]), isActiveFooter && renderTemplate`${renderComponent($$result2, "Footer", $$View$2, { "locale": locale })}`) })}` : renderTemplate`<div id="smooth-wrapper"> <div id="smooth-content"> <main${addAttribute(`${id}`, "id")}${addAttribute(`${id}`, "data-page-id")}> ${renderSlot($$result, $$slots["default"])} </main> ${isActiveFooter && renderTemplate`${renderComponent($$result, "Footer", $$View$2, { "locale": locale })}`} </div> </div>`} ${disableScripts !== "force" && renderTemplate`${renderComponent($$result, "CssVarsTest", $$CssVarsTest, {})}
			${renderComponent($$result, "NotSupported", $$NotSupported, { "criticalChecks": ["supportsCssVars"] })}`} ${isActiveMobileMenu && renderTemplate`${renderComponent($$result, "MobileMenu", $$View$1, { "locale": locale })}`} ${isActivePreloader && renderTemplate`${renderComponent($$result, "Preloader", $$View, {})}`} </body></html>`;
}, "/Users/nikiman/Projects/pareto-landing/src/layouts/page.astro", "self");

const $$Astro = createAstro("https://pareto.credit/");
const $$Section = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Section;
  const { className, id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(className, "class")}${addAttribute(id, "id")}> ${renderSlot($$result, $$slots["default"])} </section>`;
}, "/Users/nikiman/Projects/pareto-landing/src/layouts/section.astro", void 0);

export { $$Section as $, CommonComponents as C, HomePage as H, NoScript as N, Page404 as P, $$Page as a, NotSupported as b, createStaticPathGetter as c, defaultLang as d };
