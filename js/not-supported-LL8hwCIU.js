import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, b as addAttribute, d as createAstro } from './astro/server-CgvuF3dj.js';
import 'kleur/colors';
import { $ as $$Section, b as NotSupported, a as $$Page } from './section-ChIWqOql.js';
/* empty css                                */
import { l as logo } from './logo-CJf9w-ca.js';

const chromeLogo = "/assets/img/iechrome-3cCIf9IP.png";

const firefoxLogo = "/assets/img/iefirefox-zPOsOile.png";

const operaLogo = "/assets/img/ieopera-D-ow0m4G.png";

const $$View = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "section-ie", "id": "section-ie" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="ie__container"> <div class="ie__logo-block"> <img${addAttribute(logo, "src")} alt="Zajno logo" class="ie__logo-block__image"> </div> <div class="ie__text-block"> <h2 class="ie__text-block__title ie__text-block__title-font">Your browser is not supported</h2> <p class="ie__text-block__subtitle ie__text-block__subtitle-font">Please use the latest versions of these browsers:</p> <ul class="ie-browsers"> <li class="ie-browsers__item"> <a href="https://www.google.com/chrome/" class="ie-browsers__item__link" target="_blank" rel="nofollow noreferrer noopener"> <img${addAttribute(chromeLogo, "src")} alt="Google Chrome" class="ie-browsers__item__image"> </a> </li> <li class="ie-browsers__item"> <a href="http://www.getfirefox.com/" class="ie-browsers__item__link" target="_blank" rel="nofollow noreferrer noopener"> <img${addAttribute(firefoxLogo, "src")} alt="Mozilla Firefox" class="ie-browsers__item__image"> </a> </li> <li class="ie-browsers__item"> <a href="https://www.opera.com/computer/" class="ie-browsers__item__link" target="_blank" rel="nofollow noreferrer noopener"> <img${addAttribute(operaLogo, "src")} alt="Opera" class="ie-browsers__item__image"> </a> </li> </ul> </div> </div> ` })}`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/notSupported/main/view.astro", void 0);

const $$Astro = createAstro("https://real-not-now.web.app/");
const $$NotSupported = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NotSupported;
  const { locale = "en" } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PageLayot", $$Page, { ...NotSupported, "locale": locale, "isActiveHeader": false, "isActiveFooter": false, "isActiveMobileMenu": false, "isActivePreloader": false }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainSection", $$View, {})} ` })}`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/pages/not-supported.astro", void 0);

const $$file = "/Users/samuelecester/Desktop/git/pareto-landing/src/pages/not-supported.astro";
const $$url = "/not-supported";

export { $$NotSupported as default, $$file as file, $$url as url };
