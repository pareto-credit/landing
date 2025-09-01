import { d as createAstro, c as createComponent, r as renderTemplate, a as renderComponent } from './astro/server-CgvuF3dj.js';
import 'kleur/colors';
import { c as createStaticPathGetter } from './section-CWF9P--B.js';
import $$Index$1 from './index-CCYXuK2K.js';

const $$Astro = createAstro("https://pareto.credit/");
const getStaticPaths = createStaticPathGetter();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { lang } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "IndexPage", $$Index$1, { "locale": lang })}`;
}, "/Users/nikiman/Projects/pareto-landing/src/pages/[lang]/index.astro", void 0);

const $$file = "/Users/nikiman/Projects/pareto-landing/src/pages/[lang]/index.astro";
const $$url = "/[lang]";

export { $$Index as default, $$file as file, getStaticPaths, $$url as url };
