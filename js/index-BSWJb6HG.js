import { d as createAstro, c as createComponent, r as renderTemplate, m as maybeRenderHead, b as addAttribute, a as renderComponent, u as unescapeHTML, F as Fragment } from './astro/server-CgvuF3dj.js';
import 'kleur/colors';
import { C as CommonComponents, $ as $$Section, H as HomePage, d as defaultLang, a as $$Page } from './section-zRDsU9C6.js';
/* empty css                        */
import 'clsx';

const $$Astro$j = createAstro("https://pareto.credit/");
const $$TabItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$TabItem;
  const props = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="tabs-list__item"${addAttribute(`https://app.pareto.credit/vault#${props.address}`, "href")}${addAttribute(props._id, "data-id")}${addAttribute(props.address, "data-address")}${addAttribute(props.index, "data-nav-id")} target="_blank"> <div class="tabs-list__item-header"> <div class="icon"> <img src="#"${addAttribute(props.icon, "data-src")} class="lazy" data-load-priority="1" alt="icon"> </div> <div class="title-wrap"> <div class="title-wrap__title"> <h4 class="title-h4 deep-forest"> ${props.title} </h4> </div> <div class="title-wrap__description"> <p class="desc-4 muted-green"> ${props.description} </p> </div> </div> <div class="bg"> ${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(props.bgImage)}` })} </div> </div> <div class="tabs-list__item-body"> <div> <div class="badge-list"> ${props.badges.map((badge) => renderTemplate`<div class="badge"> <span class="desc-5 deep-forest">${badge}</span> </div>`)} </div> <div class="item-description"> <p class="desc-4 muted-green"> ${props.itemDescription} </p> </div> </div> <div class="info-block"> ${props.infoBlock.map((item) => renderTemplate`<div class="info-block__item"${addAttribute(item.id, "data-id")}> <div class="title desc-4 muted-green"> <span class="desc-4 muted-green">${item.title}</span> </div> <div class="value "> <h4 class="title-h4 deep-forest">${item.value}</h4> </div> </div>`)} </div> </div> </a>`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/common/tabs/tabItem.astro", void 0);

const $$Astro$i = createAstro("https://pareto.credit/");
const $$View$c = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$View$c;
  const { Tabs } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="tabs"${addAttribute(CommonComponents.HeroTabs, "id")}> <div class="tabs-list"> ${Tabs.map((item, index) => renderTemplate`${renderComponent($$result, "TabItem", $$TabItem, { "index": index, "icon": item.icon, "title": item.title, "address": item.address, "description": item.description, "bgImage": item.bgImage, "badges": item.badges, "itemDescription": item.itemDescription, "infoBlock": item.infoBlock, "isActive": item.isActive })}`)} <div class="tabs-list__placeholder"> <div class="tabs-list__placeholder-header"></div> </div> </div> <div class="tabs-links"> <ul class="tabs-links__list"> ${Tabs.map((item, index) => renderTemplate`<li class="tabs-links__item"${addAttribute(index, "data-nav-target")}> <span class="tabs-links__link desc-4 up-text">${item.title}</span> </li>`)} </ul> </div> </div>`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/common/tabs/view.astro", void 0);

const $$Astro$h = createAstro("https://pareto.credit/");
const $$View$b = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$View$b;
  const { COPY, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "hero-section", "id": id }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="timeline"></div> <div class="canvas-placeholder"> <img src="/desktop/frame_001.webp" alt="canvas-placeholder" class="canvas-placeholder__img"> </div> <canvas class="canvas"></canvas> <div class="container"> <div class="hero-section__title-wrap"> <div class="hero-section__title"> <h1 class="title-h1 emerald"> ${COPY.title} </h1> </div> <div class="hero-section__description"> <p class="desc-1 muted-green"> ${COPY.description} </p> </div> </div> ${renderComponent($$result2, "HeroTabs", $$View$c, { "Tabs": COPY.tabs })} <div class="hero-section__info-blocks-list"> ${COPY.infoBlocks.map((item) => renderTemplate`<div class="hero-section__info-blocks-item"${addAttribute(item.id, "data-id")}> <div class="hero-section__info-blocks-item-title"> <h4 class="desc-4 teal"> ${item.title} </h4> </div> <div class="hero-section__info-blocks-item-description"> <p class="title-h2 deep-forest"> ${item.value} </p> </div> </div>`)} </div> </div> ` })} `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/hero/view.astro", void 0);

const bg = "/assets/img/bg-BPF5tqrH.png";

const $$Astro$g = createAstro("https://pareto.credit/");
const $$SolutionItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$SolutionItem;
  const props = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`solution-item ${props.className}`, "class")}> <div class="solution-item__card"> <div class="z-index-2 position-relative"> <div class="solution-item__card-title"> <h3 class="title-h2">${props.title}</h3> </div> <div class="solution-item__card-description"> <p class="desc-2 emerald">${props.description}</p> </div> <div class="solution-item__card-visual desktop-mobile"> <img src="#" class="lazy"${addAttribute(props.visual, "data-src")} alt="Lend" data-load-priority="2"> </div> <div class="solution-item__card-btn"> ${props.btns.map((btn) => btn.isAnchor ? renderTemplate`<a${addAttribute("#", "href")}${addAttribute(`btn btn-primary anchor-item ${btn.className}`, "class")}${addAttribute(btn.parentId, "data-parentId")}${addAttribute(btn.link, "data-anchor")}> <span class="desc-4 deep-forest">${btn.text}</span> </a>` : renderTemplate`<a${addAttribute(btn.link, "href")}${addAttribute(`btn btn-primary ${btn.className}`, "class")}${addAttribute(btn.parentId, "data-parentId")} target="_blank"> <span class="desc-4 deep-forest">${btn.text}</span> </a>`)} </div> </div> <div class="z-index-2 position-relative"> <div class="solution-item__card-visual tablet"> <img src="#" class="lazy"${addAttribute(props.visual, "data-src")} alt="Lend"> </div> </div> <div class="solution-item__card-bg"> <img src="#" class="lazy"${addAttribute(bg, "data-src")} alt="Lend"> </div> </div> <div class="solution-item__futures"> <ul class="futures-list"> ${props.futures.map((item, index) => renderTemplate`<li class="futures-list__item"> <div class="futures-list__item-title"> <h4 class="title-h4 emerald">${index + 1}. ${item.title}</h4> </div> <div class="futures-list__item-description"> <p class="desc-3 muted-green">${item.description}</p> </div> </li>`)} </ul> </div> </div>`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/solution/solutionItem.astro", void 0);

const $$Astro$f = createAstro("https://pareto.credit/");
const $$View$a = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$View$a;
  const { COPY, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "solution-section", "id": id }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container container-big"> <div class="solution-section__title-wrap"> <div class="solution-section-title"> <span class="desc-4 teal text-up">${COPY.subTitle}</span> <h2 class="title-h2 emerald">${COPY.title}</h2> </div> <div class="solution-section-description"> <p class="desc-2 muted-green"> ${COPY.description} </p> </div> </div> <div class="solution-list"> ${COPY.solutionList.map((item) => renderTemplate`${renderComponent($$result2, "SolutionItem", $$SolutionItem, { "className": item.className, "title": item.title, "description": item.description, "visual": item.visual, "btns": item.btns, "futures": item.futures })}`)} </div> </div> ` })} `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/solution/view.astro", void 0);

var HomePageSections = /* @__PURE__ */ ((HomePageSections2) => {
  HomePageSections2["Hero"] = "homepage-hero";
  HomePageSections2["Solution"] = "homepage-solution";
  HomePageSections2["HowItWorks"] = "homepage-how-it-works";
  HomePageSections2["OurAdvantage"] = "homepage-our-advantage";
  HomePageSections2["Transparent"] = "homepage-transparent";
  HomePageSections2["Ecosystem"] = "homepage-ecosystem";
  HomePageSections2["GetInTouch"] = "homepage-get-in-touch";
  HomePageSections2["Community"] = "homepage-community";
  HomePageSections2["News"] = "homepage-news";
  HomePageSections2["OurProducts"] = "homepage-our-products";
  return HomePageSections2;
})(HomePageSections || {});

const Desktop = "/assets/visual-BZrNsdXW.svg";

const Tablet = "/assets/visual-tablet-BFtOq-PD.svg";

const Mobile = "/assets/visual-mobile-Gkbjni7B.svg";

const $$Astro$e = createAstro("https://pareto.credit/");
const $$View$9 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$View$9;
  const { COPY, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "HIW-section", "id": id }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="title-wrap"> <span class="desc-4 teal">${COPY.subTitle}</span> <h2 class="title-h2 emerald">${COPY.title}</h2> </div> <div class="visual-wrap"> <img src="#"${addAttribute(Desktop, "data-src")} class="lazy desktop" alt="HIW visual" data-load-priority="3"> <img src="#"${addAttribute(Tablet, "data-src")} class="lazy tablet" alt="HIW visual" data-load-priority="3"> <img src="#"${addAttribute(Mobile, "data-src")} class="lazy mobile" alt="HIW visual" data-load-priority="3"> </div> ` })} `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/how-it-works/view.astro", void 0);

const $$Astro$d = createAstro("https://pareto.credit/");
const $$View$8 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$View$8;
  const { COPY } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(CommonComponents.AccordionsList, "id")} class="faqs-accordion accordion"> ${COPY.map((item, i) => renderTemplate`<div class="accordion-item"> <button${addAttribute(`accordion-button-${i}`, "id")} class="accordion-button"${addAttribute(i === 0 ? "true" : "false", "aria-expanded")}${addAttribute(`accordion-content-${i}`, "aria-controls")}> <div class="accordion-title"> <div class="title-close"> <div class="accordion-title__icon"> <div class="img"> <img${addAttribute(item.icon, "data-src")} class="lazy" data-load-priority="4" alt=""> </div> </div> <div class="title-overflow"> <h3 class="title-h3 emerald"> ${item.title} </h3> </div> </div> <div class="title-open title-overflow"> <h3 class="title-h3 emerald"> ${item.title} </h3> </div> </div> <span class="icon" aria-hidden="true"> <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.85313 14.3917C7.23161 14.7702 7.84526 14.7702 8.22377 14.3918L14.3919 8.22421C14.7704 7.84574 14.7704 7.23208 14.392 6.85358C14.0135 6.47507 13.3998 6.47504 13.0213 6.85351L7.53855 12.3358L2.05627 6.853C1.6778 6.4745 1.06414 6.47447 0.685635 6.85294C0.307128 7.23141 0.307099 7.84506 0.685572 8.22357L6.85313 14.3917Z" fill="#1D4133"></path> </svg> </span> </button> <div${addAttribute(`accordion-content-${i}`, "id")} class="accordion-content"> <div class="inner"> <p class="desc-2 emerald ">${unescapeHTML(item.desc)}</p> </div> </div> </div>`)} </div> `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/common/accordionsList/view.astro", void 0);

const $$Astro$c = createAstro("https://pareto.credit/");
const $$View$7 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$View$7;
  const { COPY, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "our-advantage", "id": id }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container container-big"> <div class="title-wrap"> <span class="desc-4 teal">${COPY.subTitle}</span> <h2 class="title-h2 emerald title-wrap__title">${COPY.title}</h2> <p class="desc-2 emerald">${COPY.description}</p> </div> ${renderComponent($$result2, "AccordionsList", $$View$8, { "COPY": COPY.list })} </div> ` })} `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/our-advantage/view.astro", void 0);

const $$Astro$b = createAstro("https://pareto.credit/");
const $$View$6 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$View$6;
  const { COPY, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "transparent-section", "id": id }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <div class="title-wrap"> <span class="nav up-text bright-mint">${COPY.subTitle}</span> <h2 class="title-h2 dusty-mint">${COPY.title}</h2> </div> <div class="content-wrap"> <div class="content-wrap__top"> <div class="content-wrap__top__left"> <h4 class="title-h4 dusty-mint">${COPY.leftBlock.title}</h4> <p class="desc-2 sage">${COPY.leftBlock.description}</p> <div class="btn-wrap"> ${COPY.leftBlock.btns.map((el) => renderTemplate`<a${addAttribute(el.link, "href")} class="btn black btn-primary up-text" target="_blank"> <span class="desc-4 dusty-mint">${el.text}</span> </a>`)} </div> </div> <div class="content-wrap__top__right"> <h4 class="title-h4 dusty-mint">${COPY.rightBlock.title}</h4> <ul class="logo-list"> ${COPY.rightBlock.logos.map((el) => renderTemplate`<li class="logo-list__item"> <img src="#"${addAttribute(el.src, "data-src")}${addAttribute(el.alt, "alt")} class="lazy" data-load-priority="3"> </li>`)} </ul> <a${addAttribute(COPY.rightBlock.btn.link, "href")} class="btn black btn-primary up-text" target="_blank"> <span class="desc-4 dusty-mint">${COPY.rightBlock.btn.text}</span> </a> </div> </div> <div class="content-wrap__bottom"> <div class="title-wrap"> <h4 class="title-h3 dusty-mint">${COPY.bottomBlock.title}</h4> <img src="#"${addAttribute(COPY.bottomBlock.logo, "data-src")} alt="placeholder" class="lazy imm-logo" data-load-priority="3"> </div> <div class="count"> <span class="title-h1 bright-mint">${COPY.bottomBlock.count}</span> </div> <p class="desc-2 sage"> ${COPY.bottomBlock.description} </p> <a${addAttribute(COPY.bottomBlock.btn.link, "href")} class="btn black btn-primary up-text" target="_blank"> <span class="desc-4 dusty-mint">${COPY.bottomBlock.btn.text}</span> </a> </div> </div> </div> ` })} `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/transparent/view.astro", void 0);

const $$Astro$a = createAstro("https://pareto.credit/");
const $$View$5 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$View$5;
  const { className, tickerLiElement } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="ticker-container"${addAttribute(`${className} my-reel`, "class")}> ${renderTemplate`<ul${addAttribute("ticker text-js  my-reel-wrap", "class")}> ${tickerLiElement.map((image) => {
    return renderTemplate`<li class="ticker__li my-reel-item"> <a${addAttribute(image.link, "href")} target="_blank"> <img${addAttribute(image.src, "src")} alt="logo"> </a> </li>`;
  })} </ul>`} </div> `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/common/runningLine/view.astro", void 0);

const $$Astro$9 = createAstro("https://pareto.credit/");
const $$View$4 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$View$4;
  const { COPY, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "ecosystem-section", "id": id }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <div class="title-wrap"> <span class="desc-4 teal">${COPY.subTitle}</span> <h2 class="title-h2 dusty-mint">${COPY.title}</h2> <p class="desc-2 sage">${COPY.description}</p> </div> ${renderComponent($$result2, "RunningLine", $$View$5, { "className": "ecosystem-section__line", "tickerLiElement": COPY.images })} </div> ` })} `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/ecosystem/view.astro", void 0);

const $$Astro$8 = createAstro("https://pareto.credit/");
const $$View$3 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$View$3;
  const { className } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="form-component"${addAttribute(`form-container ${className ? className : ""} `, "class")}> <form id="contact-form" class="contact-form" name="contact-form" action="https://formspree.io/f/xkgjlnwg" method="post"> <ul class="form-list"> <li class="form-list-item form-list-item--column"> <span class="desc-2 radio-title">Your role:</span> <ul class="radio-list"> <li class="radio-item"> <input type="radio" value="lender" id="lender" name="role" checked> <label class="desc-4 up-text" for="lender">Lender</label> </li> <li class="radio-item"> <input type="radio" value="borrower" id="borrower" name="role"> <label class="desc-4 up-text" for="borrower">Borrower</label> </li> <li class="radio-item"> <input type="radio" value="curator" id="curator" name="role"> <label class="desc-4 up-text" for="curator">Curator</label> </li> </ul> </li> <li class="form-list-item"> <div class="input-wrap"> <input class="input-item input-item--small desc-1" required type="text" name="name" id="name" placeholder="Name*"> <span class="error-message desc-4">This field is required.</span> </div> <input class="input-item input-item--small desc-1" type="text" name="surname" id="surname" placeholder="Surname"> </li> <li class="form-list-item"> <input class="input-item desc-1" type="text" name="company" id="company" placeholder="Company*" required> </li> <li class="form-list-item"> <input class="input-item desc-1" type="text" name="job-title" id="job-title" placeholder="Job Title"> </li> <li class="form-list-item form-list-item--column form-list-item--focus"> <span class="desc-2 radio-title">Do you already have a borrower?*</span> <ul class="radio-list"> <li class="radio-item"> <input type="radio" value="have-borrower" id="have-borrower" name="curator-check"> <label class="desc-4 up-text" for="have-borrower">YES</label> </li> <li class="radio-item"> <input type="radio" value="havent-borrower" id="havent-borrower" name="curator-check"> <label class="desc-4 up-text" for="havent-borrower">NO</label> </li> </ul> </li> <li class="form-list-item form-list-item--deposit"> <input class="input-item input-item desc-1" type="text" name="deposit" id="deposit" placeholder="Expected deposit ($)*" required> </li> <li class="form-list-item form-list-item--borrow"> <input class="input-item input-item desc-1" type="text" name="borrow-capacity" id="borrow-capacity" placeholder="Expected borrow capacity ($)*" required> </li> <li class="form-list-item form-list-item--focus"> <input class="input-item input-item desc-1" type="text" name="vertical-focus" id="vertical-focus" placeholder="Vertical of focus*" required> </li> <li class="form-list-item"> <div class="input-wrap"> <input required class="input-item desc-1" type="text" name="contact-info" id="contact-info" placeholder="E-mail or Telegram handle*"> <span class="error-message desc-4">This field is required.</span> </div> </li> </ul> <div class="form-footer-wrap"> <input type="submit" data-wait="Please wait..." class="submit-button btn-green nav" value="SUBMIT"> <span class="success-message desc-4">Form submitted successfully!</span> </div> </form> </div> `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/common/formComponent/view.astro", void 0);

const $$Astro$7 = createAstro("https://pareto.credit/");
const $$View$2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$View$2;
  const { COPY, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "get-in-touch", "id": id }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container container-big"> <div class="title-wrap"> <span class="desc-4 teal up-text">${COPY.subTitle}</span> <h2 class="title-h2 emerald">${COPY.title}</h2> <p class="desc-2 emerald description">${COPY.description}</p> </div> <div class="form-container"> ${renderComponent($$result2, "FormComponent", $$View$3, {})} </div> </div> ` })} `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/get-in-touch/view.astro", void 0);

const $$Astro$6 = createAstro("https://pareto.credit/");
const $$NewsItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$NewsItem;
  const { COPY, id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="news-section__list__item"> <a${addAttribute(COPY.btn.link, "href")} class="news-section__list__item__link" target="_blank"> <div class="news-section__list__item__wrap"> <div class="news-section__list__item__img"> <img src="#"${addAttribute(COPY.img, "data-src")} alt="icon" class="lazy" data-load-priority="4"> </div> <div class="news-section__list__item__text"> <h4 class="title-h3 dark-green">${COPY.title}</h4> <p class="desc-2 sage">${COPY.description}</p> </div> </div> <span class="btn btn-secondary"> <span class="nav up-text">${COPY.btn.text}</span> </span> </a> </div>`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/news/newsItem.astro", void 0);

const $$Astro$5 = createAstro("https://pareto.credit/");
const $$View$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$View$1;
  const { COPY, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "news-section", "id": id }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <div class="title-wrap"> <span class="desc-4 teal up-text">${COPY.subTitle}</span> <h2 class="title-h2 emerald">${COPY.title}</h2> </div> <div class="news-section__list"> ${COPY.list.map((item, id2) => renderTemplate`${renderComponent($$result2, "NewsItem", $$NewsItem, { "id": `list-item-${id2}`, "COPY": item })}`)} </div> </div> ` })} `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/news/view.astro", void 0);

const $$Astro$4 = createAstro("https://pareto.credit/");
const $$FutureItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$FutureItem;
  const { icon, title, description, id } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`future-item content-item-${id}`, "class")}> <div class="future-item__icon"> <img${addAttribute(icon, "src")} alt="Future Icon"> </div> <div class="future-item__title"> <p class="title-h4"> ${title}</p> </div> <div class="future-item__desc"> <p class="desc-3">${description}</p> </div> </div>`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/our-products/futureItem.astro", void 0);

const $$Astro$3 = createAstro("https://pareto.credit/");
const $$InfoItem = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$InfoItem;
  const { parentId, index, label, value } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(`info-item content-item-${index}`, "class")}${addAttribute(parentId + "-" + label.toLowerCase(), "data-id")}> <div class="info-item__label"> <p class="desc-4">${label}</p> </div> <div class="info-item__value"> <p class="title-h3">${value}</p> </div> </div>`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/our-products/infoItem.astro", void 0);

const $$Astro$2 = createAstro("https://pareto.credit/");
const $$ToggleSwitch = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ToggleSwitch;
  Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="toggle-switch"> <button class="toggle-button active" data-id="0"> <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_495_103472)"> <path d="M21.748 11C21.748 16.799 17.0471 21.5 11.248 21.5C5.44906 21.5 0.748047 16.799 0.748047 11C0.748047 5.20101 5.44906 0.5 11.248 0.5C17.0471 0.5 21.748 5.20101 21.748 11Z" fill="#70B19E"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.248 20.9324C16.7336 20.9324 21.1805 16.4855 21.1805 11C21.1805 5.51447 16.7336 1.06757 11.248 1.06757C5.76252 1.06757 1.31561 5.51447 1.31561 11C1.31561 16.4855 5.76252 20.9324 11.248 20.9324ZM11.248 21.5C17.0471 21.5 21.748 16.799 21.748 11C21.748 5.20101 17.0471 0.5 11.248 0.5C5.44906 0.5 0.748047 5.20101 0.748047 11C0.748047 16.799 5.44906 21.5 11.248 21.5Z" fill="#48685A"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2461 19.8938C16.1583 19.8938 20.1404 15.9117 20.1404 10.9996C20.1404 6.08735 16.1583 2.10525 11.2461 2.10525C6.33394 2.10525 2.35183 6.08735 2.35183 10.9996C2.35183 15.9117 6.33394 19.8938 11.2461 19.8938ZM11.2461 20.4752C16.4793 20.4752 20.7217 16.2328 20.7217 10.9996C20.7217 5.7663 16.4793 1.52393 11.2461 1.52393C6.01288 1.52393 1.77051 5.7663 1.77051 10.9996C1.77051 16.2328 6.01288 20.4752 11.2461 20.4752Z" fill="#74FBC9"></path> <path d="M20.3198 11.0417C20.3198 16.0288 16.2769 20.0717 11.2898 20.0717C6.30264 20.0717 2.25977 16.0288 2.25977 11.0417C2.25977 6.05458 6.30264 2.01172 11.2898 2.01172C16.2769 2.01172 20.3198 6.05458 20.3198 11.0417Z" fill="#2C4739"></path> <path d="M10.7477 5.10986H11.6702V16.3781H10.7477V5.10986ZM8.85471 12.9314C8.91834 13.1789 9.0456 13.4086 9.23649 13.6207C9.43795 13.8329 9.70836 14.0052 10.0477 14.1377C10.3871 14.2703 10.806 14.3366 11.3044 14.3366C12.0466 14.3366 12.5928 14.1952 12.9427 13.9124C13.3033 13.6207 13.4836 13.2805 13.4836 12.8916C13.4836 12.5734 13.3722 12.3128 13.1496 12.1095C12.9375 11.8974 12.6405 11.7206 12.2587 11.5792C11.8876 11.4289 11.4582 11.2964 10.9703 11.1815C10.5461 11.0754 10.1272 10.965 9.71369 10.85C9.3107 10.7263 8.94487 10.5761 8.61615 10.3993C8.28736 10.2137 8.02759 9.97952 7.8367 9.69672C7.64582 9.4051 7.55038 9.04271 7.55038 8.60969C7.55038 8.07055 7.70415 7.60659 8.0117 7.2177C8.31921 6.82883 8.74866 6.53276 9.30012 6.32949C9.86215 6.11738 10.509 6.01133 11.2407 6.01133C11.8558 6.01133 12.4072 6.08645 12.895 6.2367C13.3828 6.3781 13.7911 6.58579 14.1198 6.85977C14.4592 7.1249 14.7084 7.44749 14.8674 7.82751L13.42 8.26501C13.3563 8.07055 13.2238 7.88939 13.0223 7.72146C12.8208 7.54471 12.5663 7.40329 12.2587 7.29724C11.9512 7.19119 11.6066 7.13816 11.2248 7.13816C10.8325 7.12932 10.4772 7.18235 10.1591 7.29724C9.85158 7.40329 9.60231 7.55794 9.41149 7.76122C9.23117 7.9645 9.14108 8.20754 9.14108 8.49034C9.14108 8.79967 9.24706 9.04271 9.45916 9.21946C9.67126 9.39621 9.95231 9.54209 10.3022 9.65696C10.6628 9.77183 11.0552 9.88229 11.4794 9.98834C11.9247 10.1033 12.3595 10.227 12.7837 10.3595C13.2079 10.4921 13.5897 10.6601 13.9289 10.8633C14.2789 11.0666 14.5599 11.3229 14.772 11.6322C14.9841 11.9327 15.0902 12.3128 15.0902 12.7723C15.0902 13.2672 14.9523 13.7179 14.6765 14.1245C14.4009 14.5311 13.982 14.858 13.42 15.1055C12.8685 15.353 12.1739 15.4767 11.3361 15.4767C10.6469 15.4767 10.0265 15.3883 9.47512 15.2115C8.92366 15.0348 8.46768 14.7917 8.10711 14.4824C7.75718 14.1643 7.52387 13.7975 7.40723 13.3821L8.85471 12.9314Z" fill="#F1F3ED"></path> </g> <defs> <clipPath id="clip0_495_103472"> <rect width="21" height="21" fill="white" transform="translate(0.749023 0.5)"></rect> </clipPath> </defs> </svg> <span class="desc-4">USP</span> </button> <button class="toggle-button" data-id="1"> <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_495_103478)"> <path d="M21.748 11C21.748 16.799 17.0471 21.5 11.248 21.5C5.44906 21.5 0.748047 16.799 0.748047 11C0.748047 5.20101 5.44906 0.5 11.248 0.5C17.0471 0.5 21.748 5.20101 21.748 11Z" fill="#48685A"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.248 20.9324C16.7336 20.9324 21.1805 16.4855 21.1805 11C21.1805 5.51447 16.7336 1.06757 11.248 1.06757C5.76252 1.06757 1.31561 5.51447 1.31561 11C1.31561 16.4855 5.76252 20.9324 11.248 20.9324ZM11.248 21.5C17.0471 21.5 21.748 16.799 21.748 11C21.748 5.20101 17.0471 0.5 11.248 0.5C5.44906 0.5 0.748047 5.20101 0.748047 11C0.748047 16.799 5.44906 21.5 11.248 21.5Z" fill="#2C4739"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2461 19.8938C16.1583 19.8938 20.1404 15.9117 20.1404 10.9996C20.1404 6.08735 16.1583 2.10525 11.2461 2.10525C6.33394 2.10525 2.35183 6.08735 2.35183 10.9996C2.35183 15.9117 6.33394 19.8938 11.2461 19.8938ZM11.2461 20.4752C16.4793 20.4752 20.7217 16.2328 20.7217 10.9996C20.7217 5.7663 16.4793 1.52393 11.2461 1.52393C6.01288 1.52393 1.77051 5.7663 1.77051 10.9996C1.77051 16.2328 6.01288 20.4752 11.2461 20.4752Z" fill="#74FBC9"></path> <path d="M20.3198 11.0417C20.3198 16.0288 16.2769 20.0717 11.2898 20.0717C6.30264 20.0717 2.25977 16.0288 2.25977 11.0417C2.25977 6.05458 6.30264 2.01172 11.2898 2.01172C16.2769 2.01172 20.3198 6.05458 20.3198 11.0417Z" fill="#F1F3ED"></path> <path d="M10.7477 5.10986H11.6702V16.3781H10.7477V5.10986ZM8.85471 12.9314C8.91834 13.1789 9.0456 13.4086 9.23649 13.6207C9.43795 13.8329 9.70836 14.0052 10.0477 14.1377C10.3871 14.2703 10.806 14.3366 11.3044 14.3366C12.0466 14.3366 12.5928 14.1952 12.9427 13.9124C13.3033 13.6207 13.4836 13.2805 13.4836 12.8916C13.4836 12.5734 13.3722 12.3128 13.1496 12.1095C12.9375 11.8974 12.6405 11.7206 12.2587 11.5792C11.8876 11.4289 11.4582 11.2964 10.9703 11.1815C10.5461 11.0754 10.1272 10.965 9.71369 10.85C9.3107 10.7263 8.94487 10.5761 8.61615 10.3993C8.28736 10.2137 8.02759 9.97952 7.8367 9.69672C7.64582 9.4051 7.55038 9.04271 7.55038 8.60969C7.55038 8.07055 7.70415 7.60659 8.0117 7.2177C8.31921 6.82883 8.74866 6.53276 9.30012 6.32949C9.86215 6.11738 10.509 6.01133 11.2407 6.01133C11.8558 6.01133 12.4072 6.08645 12.895 6.2367C13.3828 6.3781 13.7911 6.58579 14.1198 6.85977C14.4592 7.1249 14.7084 7.44749 14.8674 7.82751L13.42 8.26501C13.3563 8.07055 13.2238 7.88939 13.0223 7.72146C12.8208 7.54471 12.5663 7.40329 12.2587 7.29724C11.9512 7.19119 11.6066 7.13816 11.2248 7.13816C10.8325 7.12932 10.4772 7.18235 10.1591 7.29724C9.85158 7.40329 9.60231 7.55794 9.41149 7.76122C9.23117 7.9645 9.14108 8.20754 9.14108 8.49034C9.14108 8.79967 9.24706 9.04271 9.45916 9.21946C9.67126 9.39621 9.95231 9.54209 10.3022 9.65696C10.6628 9.77183 11.0552 9.88229 11.4794 9.98834C11.9247 10.1033 12.3595 10.227 12.7837 10.3595C13.2079 10.4921 13.5897 10.6601 13.9289 10.8633C14.2789 11.0666 14.5599 11.3229 14.772 11.6322C14.9841 11.9327 15.0902 12.3128 15.0902 12.7723C15.0902 13.2672 14.9523 13.7179 14.6765 14.1245C14.4009 14.5311 13.982 14.858 13.42 15.1055C12.8685 15.353 12.1739 15.4767 11.3361 15.4767C10.6469 15.4767 10.0265 15.3883 9.47512 15.2115C8.92366 15.0348 8.46768 14.7917 8.10711 14.4824C7.75718 14.1643 7.52387 13.7975 7.40723 13.3821L8.85471 12.9314Z" fill="#2C4739"></path> </g> <defs> <clipPath id="clip0_495_103478"> <rect width="21" height="21" fill="white" transform="translate(0.749023 0.5)"></rect> </clipPath> </defs> </svg> <span class="desc-4">sUSP</span> </button> <div class="toggle-slider"></div> </div>`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/our-products/toggleSwitch.astro", void 0);

const $$Astro$1 = createAstro("https://pareto.credit/");
const $$View = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$View;
  const { COPY, id } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Section", $$Section, { "className": "our-products-section", "id": id }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container"> <div class="title-wrap"> <span class="desc-4 teal">${COPY.subTitle}</span> <h2 class="title-h2">${COPY.title}</h2> </div> <div class="toggle-container"> <div class="maine-block"> ${renderComponent($$result2, "ToggleSwitch", $$ToggleSwitch, {})} <div class="text-wrap"> <div class="maine-block__title"> <h3 class="title-h2"> ${COPY.list.map((item, index) => renderTemplate`<span${addAttribute(`content-item-${index}`, "class")}> ${item.title} </span>`)} </h3> </div> <div class="maine-block__desc"> <p class="desc-3"> ${COPY.list.map((item, index) => renderTemplate`<span${addAttribute(`content-item-${index}`, "class")}> ${item.description} </span>`)} </p> </div> <div class="info-list mobile"> <div class="info-wrap"> ${COPY.list.map((item, index) => renderTemplate`${renderComponent($$result2, "InfoItem", $$InfoItem, { "parentId": item.id, "index": `${index}`, "label": item.infoBlocks[0].label, "value": item.infoBlocks[0].value })}`)} </div> <div class="info-wrap"> ${COPY.list.map((item, index) => renderTemplate`${renderComponent($$result2, "InfoItem", $$InfoItem, { "parentId": item.id, "index": `${index}`, "label": item.infoBlocks[1].label, "value": item.infoBlocks[1].value })}`)} </div> <div class="info-wrap"> ${COPY.list.map((item, index) => renderTemplate`${renderComponent($$result2, "InfoItem", $$InfoItem, { "parentId": item.id, "index": `${index}`, "label": item.infoBlocks[2].label, "value": item.infoBlocks[2].value })}`)} </div> </div> <div class="maine-block__btn"> ${COPY.list.map((item, index) => renderTemplate`<div${addAttribute(`content-item-${index} maine-block__btn-wrap`, "class")}> <a${addAttribute("btn btn-primary", "class")}${addAttribute(item.btn[0].link, "href")} target="_blank"> <span class="desc-4 deep-forest">${item.btn[0].label} </span> </a> <a${addAttribute("btn btn-primary", "class")}${addAttribute(item.btn[1].link, "href")} target="_blank"> <span class="desc-4 deep-forest">${item.btn[1].label} </span> </a> </div>`)} </div> </div> <div class="info-list desktop"> <div class="info-wrap"> ${COPY.list.map((item, index) => renderTemplate`${renderComponent($$result2, "InfoItem", $$InfoItem, { "parentId": item.id, "index": `${index}`, "label": item.infoBlocks[0].label, "value": item.infoBlocks[0].value })}`)} </div> <div class="info-wrap"> ${COPY.list.map((item, index) => renderTemplate`${renderComponent($$result2, "InfoItem", $$InfoItem, { "parentId": item.id, "index": `${index}`, "label": item.infoBlocks[1].label, "value": item.infoBlocks[1].value })}`)} </div> <div class="info-wrap"> ${COPY.list.map((item, index) => renderTemplate`${renderComponent($$result2, "InfoItem", $$InfoItem, { "parentId": item.id, "index": `${index}`, "label": item.infoBlocks[2].label, "value": item.infoBlocks[2].value })}`)} </div> </div> </div> <div class="futures-block"> <div class="futures-list"> <div class="future-wrap"> ${COPY.list.map((item, index) => renderTemplate`${renderComponent($$result2, "FutureItem", $$FutureItem, { "id": `${index}`, "icon": item.futureBlocks[0].icon, "title": item.futureBlocks[0].title, "description": item.futureBlocks[0].description })}`)} </div> <div class="future-wrap"> ${COPY.list.map((item, index) => renderTemplate`${renderComponent($$result2, "FutureItem", $$FutureItem, { "id": `${index}`, "icon": item.futureBlocks[1].icon, "title": item.futureBlocks[1].title, "description": item.futureBlocks[1].description })}`)} </div> <div class="future-wrap"> ${COPY.list.map((item, index) => renderTemplate`${renderComponent($$result2, "FutureItem", $$FutureItem, { "id": `${index}`, "icon": item.futureBlocks[2].icon, "title": item.futureBlocks[2].title, "description": item.futureBlocks[2].description })}`)} </div> </div> </div> </div> </div> ` })} `;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/components/sections/home/our-products/view.astro", void 0);

const $$Astro = createAstro("https://pareto.credit/");
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const { locale = defaultLang } = Astro2.props;
  const COPY = HomePage.copy[locale];
  return renderTemplate`${renderComponent($$result, "PageLayot", $$Page, { ...HomePage, "locale": locale }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroSection", $$View$b, { "COPY": COPY.heroSection, "id": HomePageSections.Hero })} ${renderComponent($$result2, "OurProducts", $$View, { "COPY": COPY.ourProductsSection, "id": HomePageSections.OurProducts })} ${renderComponent($$result2, "Ecosystem", $$View$4, { "COPY": COPY.Ecosystem, "id": HomePageSections.Ecosystem })} ${renderComponent($$result2, "SolutionSection", $$View$a, { "COPY": COPY.solutionSection, "id": HomePageSections.Solution })} ${renderComponent($$result2, "HowItWorks", $$View$9, { "COPY": COPY.HowItWorks, "id": HomePageSections.HowItWorks })} ${renderComponent($$result2, "OurAdvantage", $$View$7, { "COPY": COPY.OurAdvantage, "id": HomePageSections.OurAdvantage })} ${renderComponent($$result2, "Transparent", $$View$6, { "COPY": COPY.Transparent, "id": HomePageSections.Transparent })} ${renderComponent($$result2, "GetInTouch", $$View$2, { "COPY": COPY.GetInTouch, "id": HomePageSections.GetInTouch })} ${renderComponent($$result2, "NewsSection", $$View$1, { "COPY": COPY.NewsSection, "id": HomePageSections.News })}  ` })}`;
}, "/Users/samuelecester/Desktop/git/pareto-landing/src/pages/index.astro", void 0);

const $$file = "/Users/samuelecester/Desktop/git/pareto-landing/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
