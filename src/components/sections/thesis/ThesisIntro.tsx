import viaduct from "../../../assets/images/thesis/facility-viaduct.webp";
import { SectionContainer } from "../../ui/Section";

const ThesisIntro = () => (
  <div id="thesis-intro" className="thesis-chapter thesis-intro">
    <SectionContainer className="thesis-intro__content">
      <p id="thesis-intro-copy" tabIndex={-1}>
        <span className="thesis-intro__statement">
          Pareto is building the infrastructure to bring that <em>credit onchain,</em>
        </span>{" "}
        <span className="thesis-intro__continuation">
          connecting origination, servicing and distribution in one facility.
        </span>
      </p>
      <img
        className="thesis-intro__plate"
        src={viaduct}
        alt=""
        width={1120}
        height={1120}
        decoding="async"
        loading="lazy"
      />
    </SectionContainer>
  </div>
);

export default ThesisIntro;
