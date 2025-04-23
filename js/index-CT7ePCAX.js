import { d as createAstro, c as createComponent, r as renderTemplate, a as renderComponent } from './astro/server-CgvuF3dj.js';
import 'kleur/colors';
import { c as createStaticPathGetter } from './section-CJzLl3Tv.js';
import $$Index$1 from './index-BlDHMSef.js';

const $$Astro = createAstro("https://real-not-now.web.app/");
const getStaticPaths = createStaticPathGetter();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { lang } = Astro2.params;
  return renderTemplate`${renderComponent($$result, "IndexPage", $$Index$1, { "locale": lang })}`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/pages/[lang]/index.astro", void 0);

const $$file = "/Users/samuelecester/Desktop/git/pareto-landing/src/pages/[lang]/index.astro";
const $$url = "/[lang]";

export { $$Index as default, $$file as file, getStaticPaths, $$url as url };
