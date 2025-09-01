import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, b as addAttribute, d as createAstro } from './astro/server-CgvuF3dj.js';
import 'kleur/colors';
import { $ as $$Section, P as Page404, a as $$Page } from './section-CWF9P--B.js';
/* empty css                      */

const visual = "/assets/img/404-bg-Ca5pfBEg.png";

const visualTablet = "/assets/img/404-bg-tablet-CZ0FAmCf.png";

const $$View = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "page-404__section", "id": "page-404" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <div class="left-wrap"> <div class="title-wrap"> <h2 class="title-h2 emerald">404</h2> <p class="title-h3 emerald">Something went wrong</p> </div> <ul class="menu-list"> <li class="menu-list__item"> <a href="/" class="nav up-text emerald">Home</a> </li> <li class="menu-list__item"> <a href="/" class="nav up-text emerald">Product</a> </li> <li class="menu-list__item"> <a href="/" class="nav up-text emerald">Features</a> </li> <li class="menu-list__item"> <a href="/" class="nav up-text emerald">Partners</a> </li> </ul> </div> <div class="visual"> <img${addAttribute(visual, "src")} alt="404-visual" class="desktop"> <img${addAttribute(visualTablet, "src")} alt="404-visual-tablet" class="tablet"> </div> </div> ` })}`;
}, "/Users/nikiman/Projects/pareto-landing/src/components/sections/page404/main/view.astro", void 0);

const $$Astro = createAstro("https://pareto.credit/");
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const { locale = "en" } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PageLayot", $$Page, { ...Page404, "locale": locale, "isActiveFooter": false, "isActiveMobileMenu": false, "isActivePreloader": false }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainSection", $$View, {})} ` })}`;
}, "/Users/nikiman/Projects/pareto-landing/src/pages/404.astro", void 0);

const $$file = "/Users/nikiman/Projects/pareto-landing/src/pages/404.astro";
const $$url = "/404";

export { $$404 as default, $$file as file, $$url as url };
