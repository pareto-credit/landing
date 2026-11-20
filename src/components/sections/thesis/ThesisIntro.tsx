import bridge from "../../../assets/images/thesis/thesis-bridge-1536.jpg";
import bridgeSmall from "../../../assets/images/thesis/thesis-bridge-900.jpg";

const ThesisIntro = () => (
  <div id="thesis-intro" className="thesis-chapter thesis-intro">
    <div className="thesis-intro__content">
      <p id="thesis-intro-copy" tabIndex={-1}>
        <span className="thesis-intro__phrase">
          Pareto is building the infrastructure to bring that <em>credit onchain,</em>
        </span>{" "}
        <span className="thesis-intro__phrase">
          connecting origination, servicing and distribution in <em>one facility.</em>
        </span>
      </p>
      <div className="thesis-intro__bridge" aria-hidden="true">
        {["deck", "arch", "cables"].map((detail) => (
          <span key={detail} className={`thesis-intro__panel thesis-intro__panel--${detail}`}>
            <img
              src={bridge}
              srcSet={`${bridgeSmall} 900w, ${bridge} 1536w`}
              sizes="(max-width: 767px) 90vw, (max-width: 1920px) 46vw, 884px"
              alt=""
              width={1536}
              height={1024}
              loading="lazy"
              decoding="async"
            />
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default ThesisIntro;
