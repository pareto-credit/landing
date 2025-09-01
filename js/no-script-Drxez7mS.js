import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead, b as addAttribute, d as createAstro } from './astro/server-CgvuF3dj.js';
import 'kleur/colors';
import { $ as $$Section, N as NoScript, a as $$Page } from './section-CWF9P--B.js';
/* empty css                            */
import { l as logo } from './logo-CJf9w-ca.js';

const $$View = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "no-script__section", "id": "no-script" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="no-script__container"> <div class="no-script__logo-block"> <img${addAttribute(logo, "src")} alt="Zajno logo" class="no-script__logo-block__image"> </div> <div class="no-script__text-block"> <h2 class="no-script__text-block__title title-no-script">JavaScript Required</h2> <p class="no-script__text-block__subtitle subtitle-no-script">
We’re sorry, but this website needs JavaScript enabled to run correctly. Please, turn it on and come back later. Thank you!
</p> <p class="no-script__text-block__desc desc-no-script">
If you need help, use
<a href="https://www.enablejavascript.io/en" class="no-script__text-block__link" target="_blank" rel="nofollow noreferrer noopener">this link</a>
to get more information how to turn on JavaScript on your browser.
</p> </div> </div> ` })}`;
}, "/Users/nikiman/Projects/pareto-landing/src/components/sections/noScript/main/view.astro", void 0);

const $$Astro = createAstro("https://pareto.credit/");
const $$NoScript = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$NoScript;
  const { locale = "en" } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "PageLayot", $$Page, { ...NoScript, "locale": locale, "isActiveHeader": false, "isActiveFooter": false, "isActiveMobileMenu": false, "isActivePreloader": false }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MainSection", $$View, {})} ` })}`;
}, "/Users/nikiman/Projects/pareto-landing/src/pages/no-script.astro", void 0);

const $$file = "/Users/nikiman/Projects/pareto-landing/src/pages/no-script.astro";
const $$url = "/no-script";

export { $$NoScript as default, $$file as file, $$url as url };
