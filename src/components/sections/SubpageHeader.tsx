import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { PageLink } from "../ui/PageLink";
import { SectionContainer } from "../ui/Section";
import "./subpage-header.css";

interface HeaderImage {
  mobile: string;
  mobileAvif: string;
  desktop: string;
  large: string;
  largeWidth: number;
}

interface SubpageHeaderProps {
  category: "Clients" | "Solutions";
  pageName: string;
  titleId: string;
  title: ReactNode;
  description: string;
  image: HeaderImage;
  children: ReactNode;
}

export default function SubpageHeader({
  category,
  pageName,
  titleId,
  title,
  description,
  image,
  children,
}: SubpageHeaderProps) {
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
          srcSet={`${image.desktop} 1920w, ${image.large} ${image.largeWidth}w`}
          sizes="100vw"
          alt=""
          width={1920}
          height={1152}
        />
      </picture>
      <SectionContainer className="subpage-header__inner">
        <nav className="subpage-header__breadcrumbs" aria-label="Breadcrumb">
          <ol role="list">
            <li>
              <PageLink to="/">Home</PageLink>
            </li>
            <li>
              <ChevronRight size={12} aria-hidden="true" /> {category}
            </li>
            <li>
              <ChevronRight size={12} aria-hidden="true" />
              <span aria-current="page">{pageName}</span>
            </li>
          </ol>
        </nav>

        <div className="subpage-header__copy">
          <h1 id={titleId} tabIndex={-1}>
            {title}
          </h1>
          <p>{description}</p>
          <div className="subpage-header__actions">{children}</div>
        </div>
      </SectionContainer>
    </section>
  );
}
