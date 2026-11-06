import { useId, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useMinWidth } from "../../../hooks/useMinWidth";
import {
  facilityModuleGroups,
  facilityTemplates,
  type FacilityModuleId,
} from "../../../data/facilityTemplates";
import { usePageVisibility } from "../../../hooks/usePageVisibility";
import { requestContact } from "../../../lib/siteNavigation";
import "./facility-modules.css";

const allModules = facilityModuleGroups.flatMap((group) => group.modules);

export default function FacilityModules() {
  const desktop = useMinWidth(1024);
  const [activeGroup, setActiveGroup] = useState(0);
  const instanceId = useId();
  const id = `cv-facility-${instanceId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.12 });
  const visible = usePageVisibility();
  const reduced = useReducedMotion();
  const [templateId, setTemplateId] = useState<string | null>(facilityTemplates[0].id);
  const [selected, setSelected] = useState<Set<FacilityModuleId>>(
    () => new Set(facilityTemplates[0].modules)
  );
  const [animate, setAnimate] = useState(false);
  const template = facilityTemplates.find((item) => item.id === templateId);
  const configurationName = template?.name ?? "Custom configuration";
  const toggleModule = (moduleId: FacilityModuleId) => {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
    setTemplateId(null);
  };
  const selectedNames = allModules
    .filter((item) => selected.has(item.id))
    .map((item) => item.name);

  return (
    <section
      ref={ref}
      id="modules"
      className="product-section cv-modules"
      aria-labelledby={`${id}-heading`}
    >
      <div className="cv-product-shell">
        <div className="cv-module-workbench">
          <aside className="cv-module-controls">
            <div className="cv-modules__intro">
              <div>
                <p className="product-kicker cv-product-kicker">
                  02 / Configurable by design
                </p>
                <h2 id={`${id}-heading`}>A common core. Your configuration.</h2>
              </div>
              <p>
                Choose a template, then connect the modules your facility needs.
                Structure, collateral, covenants and operations share a common core.
              </p>
            </div>

            <div className="cv-module-controls__heading">
              <p id={`${id}-instructions`}>Choose a template. Select modules to customize.</p>
              <span>Example templates</span>
            </div>
            {desktop ? <div
              className="cv-module-templates"
              role="group"
              aria-label="Facility templates"
              aria-describedby={`${id}-instructions`}
            >
              {facilityTemplates.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className="cv-module-template"
                  aria-pressed={item.id === templateId}
                  aria-controls={`${id}-diagram`}
                  onClick={(event) => {
                    setAnimate(event.detail > 0);
                    setTemplateId(item.id);
                    setSelected(new Set(item.modules));
                  }}
                >
                  <span className="cv-module-template__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{item.name}</span>
                  <Check
                    size={14}
                    className="cv-module-template__check"
                    aria-hidden="true"
                  />
                </button>
              ))}
            </div> : (
              <label className="cv-module-template-select">
                <span>Example template</span>
                <select
                  value={templateId ?? "custom"}
                  aria-controls={`${id}-diagram`}
                  onChange={(event) => {
                    const next = facilityTemplates.find((item) => item.id === event.target.value);
                    if (!next) return;
                    setAnimate(false);
                    setTemplateId(next.id);
                    setSelected(new Set(next.modules));
                  }}
                >
                  {!template && <option value="custom">Custom configuration</option>}
                  {facilityTemplates.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>
              </label>
            )}
          </aside>
          <figure className="cv-module-figure" aria-labelledby={`${id}-caption`}>
            <figcaption
              className="cv-module-figure__caption"
              id={`${id}-caption`}
            >
              <span>
                Facility architecture{" "}
                <span className="cv-module-figure__template">
                  / {configurationName}
                </span>
              </span>
              <span className="cv-module-figure__count">
                {String(selected.size).padStart(2, "0")} / {allModules.length}{" "}
                modules included
              </span>
            </figcaption>
            {desktop ? <div
              className="cv-module-figure__scroller"
              tabIndex={0}
              role="region"
              aria-label="Facility architecture; scroll horizontally on smaller screens"
            >
              <svg
                id={`${id}-diagram`}
                className="cv-module-svg"
                viewBox="0 0 960 576"
                role="group"
                aria-labelledby={`${id}-title`}
                aria-describedby={`${id}-desc`}
                data-running={inView && visible && !reduced && animate}
              >
                <title id={`${id}-title`}>Credit Vault configuration</title>
                <desc id={`${id}-desc`}>
                  {configurationName}: {selectedNames.length ? selectedNames.join(", ") : "No optional modules selected"}. {selected.size} of{" "}
                  {allModules.length} modules included in this illustrative
                  example. Select each module to add or remove it.
                </desc>
                <rect width="960" height="576" fill="#f8faf7" />
                {facilityModuleGroups.map((group) => (
                  <path
                    key={group.name}
                    d={group.connector}
                    className="cv-module-connector"
                    fill="none"
                  />
                ))}
                <g className="cv-module-core">
                  <rect
                    x="360"
                    y="208"
                    width="240"
                    height="160"
                    rx="6"
                    fill="#0c271e"
                  />
                  <text
                    className="cv-module-svg__tag cv-module-svg__tag--core"
                    x="480"
                    y="238"
                    textAnchor="middle"
                  >
                    COMMON CORE
                  </text>
                  <text
                    className="cv-module-svg__core-name"
                    x="480"
                    y="276"
                    textAnchor="middle"
                  >
                    Credit Vault
                  </text>
                  <text
                    className="cv-module-svg__core-description"
                    x="480"
                    y="304"
                    textAnchor="middle"
                  >
                    Asset · rate · fees
                  </text>
                  <text
                    className="cv-module-svg__core-count"
                    x="480"
                    y="340"
                    textAnchor="middle"
                  >
                    {selected.size} modules included
                  </text>
                </g>
                {facilityModuleGroups.map((group) => (
                  <g key={group.name} className="cv-module-group" role="group" aria-label={group.name}>
                    <rect
                      x={group.x}
                      y={group.y}
                      width="296"
                      height="164"
                      rx="6"
                      fill="#f8faf7"
                    />
                    <rect
                      x={group.x}
                      y={group.y}
                      width="296"
                      height="164"
                      rx="6"
                      className="cv-module-group__box"
                    />
                    <text
                      x={group.x + 20}
                      y={group.y + 23}
                      className="cv-module-svg__tag"
                    >
                      {group.name.toUpperCase()}
                    </text>
                    {group.modules.map((module, index) => {
                      const included = selected.has(module.id);
                      const rowY = group.y + 32 + index * 40;
                      return (
                        <g
                          key={module.id}
                          role="checkbox"
                          tabIndex={0}
                          aria-label={module.name}
                          aria-checked={included}
                          aria-describedby={`${id}-${module.id}-description`}
                          onClick={(event) => {
                            setAnimate(event.detail > 0);
                            toggleModule(module.id);
                          }}
                          onKeyDown={(event) => {
                            if (event.key === " " || event.key === "Enter") {
                              event.preventDefault();
                              if (!event.repeat) {
                                setAnimate(false);
                                toggleModule(module.id);
                              }
                            }
                          }}
                          className={`cv-module-node ${
                            included ? "is-included" : ""
                          }`}
                        >
                          <rect
                            x={group.x + 12}
                            y={rowY}
                            width="272"
                            height="38"
                            rx="4"
                            className="cv-module-node__box"
                          />
                          <text
                            x={group.x + 24}
                            y={rowY + 15}
                            className="cv-module-svg__name"
                          >
                            {module.name}
                          </text>
                          <text
                            id={`${id}-${module.id}-description`}
                            x={group.x + 24}
                            y={rowY + 30}
                            className="cv-module-svg__sublabel"
                          >
                            {module.sublabel}
                          </text>
                          <rect
                            x={group.x + 252}
                            y={rowY + 9}
                            width="16"
                            height="16"
                            rx="3"
                            className="cv-module-node__status"
                          />
                          {included ? (
                            <path
                              key={`${templateId ?? "custom"}-${module.id}`}
                              d={`M${group.x + 256} ${rowY + 17} l3 3 5-6`}
                              className="cv-module-node__check"
                              fill="none"
                            />
                          ) : null}
                        </g>
                      );
                    })}
                  </g>
                ))}
                <g className="cv-module-svg__legend">
                  <line x1="32" y1="552" x2="928" y2="552" stroke="#d8dfd6" />
                  <rect
                    x="32"
                    y="562"
                    width="12"
                    height="12"
                    rx="2"
                    fill="#254839"
                  />
                  <text x="52" y="572">
                    Selected modules
                  </text>
                  <rect
                    x="252"
                    y="562"
                    width="12"
                    height="12"
                    rx="2"
                    fill="none"
                    stroke="#a4b1a6"
                  />
                  <text x="272" y="572">
                    Select modules to customize
                  </text>
                  <text x="928" y="572" textAnchor="end">
                    Configuration links, not fund flows
                  </text>
                </g>
              </svg>
            </div> : (
              <div className="cv-module-mobile" id={`${id}-diagram`} role="group" aria-label="Credit Vault configuration" aria-describedby={`${id}-desc`}>
                <p className="sr-only" id={`${id}-desc`}>{configurationName}: {selectedNames.join(", ")}. Select a group to customize its modules.</p>
                <div className="cv-module-mobile__overview">
                  <svg viewBox="0 0 360 208" preserveAspectRatio="none" fill="none" aria-hidden="true">
                    <path d="M115 32H122V88H130 M245 32H238V88H230 M115 104H130 M245 104H230 M115 176H122V120H130 M245 176H238V120H230" />
                  </svg>
                  <div className="cv-module-mobile__core"><span>Common core</span><strong>Credit Vault</strong><small>Asset · rate · fees</small></div>
                  {facilityModuleGroups.map((group, index) => (
                    <button key={group.name} type="button" style={{ gridColumn: index % 2 === 0 ? 1 : 3, gridRow: Math.floor(index / 2) + 1 }} aria-pressed={activeGroup === index} aria-controls={`${id}-mobile-options`} onClick={() => setActiveGroup(index)}>
                      {group.name}<small>{group.modules.filter((item) => selected.has(item.id)).length} / {group.modules.length} selected</small>
                    </button>
                  ))}
                </div>
                <div className="cv-module-mobile__options" id={`${id}-mobile-options`} role="group" aria-label={facilityModuleGroups[activeGroup].name}>
                  {facilityModuleGroups[activeGroup].modules.map((module) => (
                    <label key={module.id}>
                      <input type="checkbox" checked={selected.has(module.id)} onChange={() => toggleModule(module.id)} />
                      <span><strong>{module.name}</strong><small>{module.sublabel}</small></span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </figure>
        </div>

        <p className="sr-only" role="status">
          {configurationName}{template ? " template" : ""}. {selected.size} of {allModules.length}{" "}
          modules included.
        </p>
        <div className="cv-modules__footer">
          <p>
            Illustrative templates combine vault settings, integrations and
            facility agreements. We define the final configuration with your team.
          </p>
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              requestContact("Borrowing");
            }}
          >
            Build your facility with us{" "}
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
