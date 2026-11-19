import type { ReactNode } from "react";
import { PageLink } from "../ui/PageLink";
import { SectionContainer } from "../ui/Section";
import "./subpage-header.css";

interface HeaderImage {
  mobile: string;
  mobileAvif: string;
  desktop: string;
  desktopWidth?: number;
  large: string;
  largeWidth: number;
}

/** Divider between breadcrumb levels, kept out of the accessible trail. */
const CrumbDivider = () => (
  <span className="subpage-header__crumb-divider" aria-hidden="true">
    /
  </span>
);

interface SubpageHeaderProps {
  category: "Clients" | "Solutions";
  pageName: string;
  titleId: string;
  title: ReactNode;
  description: string;
  action?: ReactNode;
  image: HeaderImage;
}

export default function SubpageHeader({
  category,
  pageName,
  titleId,
  title,
  description,
  action,
  image,
}: SubpageHeaderProps) {
  const { desktopWidth = 1920 } = image;

  return (
    <section id="hero" className="subpage-header" aria-labelledby={titleId}>
      <picture className="subpage-header__photo">
        <source
          media="(max-width: 767px)"
          type="image/avif"
          srcSet={image.mobileAvif}
        />
        <source media="(max-width: 767px)" srcSet={image.mobile} />
        <img
          src={image.desktop}
          srcSet={`${image.desktop} ${desktopWidth}w, ${image.large} ${image.largeWidth}w`}
          sizes="100vw"
          alt=""
          width={desktopWidth}
          height={(desktopWidth * 3) / 5}
        />
      </picture>
      <SectionContainer className="subpage-header__inner">
        <nav className="subpage-header__breadcrumbs" aria-label="Breadcrumb">
          <ol role="list">
            <li>
              <PageLink to="/">Home</PageLink>
            </li>
            <li>
              <CrumbDivider />
              <span>{category}</span>
            </li>
            <li>
              <CrumbDivider />
              <span aria-current="page">{pageName}</span>
            </li>
          </ol>
        </nav>

        <div className="subpage-header__copy">
          <h1 id={titleId} tabIndex={-1}>
            {title}
          </h1>
          <p>{description}</p>
          {action && <div className="mt-6">{action}</div>}
        </div>
      </SectionContainer>
    </section>
  );
}
