import type { ReactNode } from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Footer from "./Footer";

const saveLegalPageReturnScroll = vi.fn();

vi.mock("../../lib/legalPageScroll", () => ({
  saveLegalPageReturnScroll: () => saveLegalPageReturnScroll(),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    className,
    onClick,
  }: {
    to: string;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <a href={to} className={className} onClick={onClick}>
      {children}
    </a>
  ),
}));

describe("Footer", () => {
  beforeEach(() => {
    saveLegalPageReturnScroll.mockReset();
  });

  it("renders the updated platform, ecosystem, and company links", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Web App" })).toHaveAttribute(
      "href",
      "https://app.pareto.credit",
    );
    expect(screen.getByRole("link", { name: "Manager App" })).toHaveAttribute(
      "href",
      "https://manager.pareto.credit",
    );
    expect(
      screen.getByRole("link", { name: "Smart Contracts" }),
    ).toHaveAttribute(
      "href",
      "https://docs.pareto.credit/developers/addresses/product/credit-vaults",
    );

    expect(
      screen.getByRole("link", { name: "Documentation" }),
    ).toHaveAttribute("href", "https://docs.pareto.credit/");
    expect(screen.getByRole("link", { name: "Governance" })).toHaveAttribute(
      "href",
      "https://gov.pareto.credit/",
    );
    expect(screen.getByRole("link", { name: "Github" })).toHaveAttribute(
      "href",
      "https://github.com/pareto-credit/",
    );

    expect(
      screen.getByRole("link", { name: "Security Audits" }),
    ).toHaveAttribute(
      "href",
      "https://docs.pareto.credit/developers/security/audits",
    );
    expect(screen.getByRole("link", { name: "Media Kit" })).toHaveAttribute(
      "href",
      "https://docs.pareto.credit/resources/media-kit",
    );
  });

  it("removes the old placeholder footer entries", () => {
    render(<Footer />);

    expect(
      screen.queryByRole("link", { name: "Live Vaults" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Risk Framework" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Compliance" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Pareto Studio" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "White Label" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "API Documentation" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Partners" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Insights" }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Careers" }),
    ).not.toBeInTheDocument();
  });

  it("renders the updated social links", () => {
    render(<Footer />);

    const xLink = screen.getByRole("link", { name: "X" });

    expect(xLink).toHaveAttribute(
      "href",
      "https://x.com/paretocredit",
    );
    expect(xLink.querySelector("span")).toHaveClass(
      "[&_svg]:fill-current",
      "[&_svg]:w-full",
      "[&_svg]:h-full",
    );
    expect(screen.getByRole("link", { name: "Discord" })).toHaveAttribute(
      "href",
      "https://discord.com/invite/mpySAJp",
    );
    expect(screen.getByRole("link", { name: "Telegram" })).toHaveAttribute(
      "href",
      "https://t.me/paretocredit",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/company/paretocredit/",
    );
    expect(screen.getByRole("link", { name: "Paragraph" })).toHaveAttribute(
      "href",
      "https://paragraph.com/refresh?redirect=%2F%40pareto",
    );

    expect(
      screen.queryByRole("link", { name: "Twitter" }),
    ).not.toBeInTheDocument();
  });

  it("renders legal links in the Company column under Media Kit", () => {
    render(<Footer />);

    const companyLinks = within(
      screen.getByTestId("footer-company-links"),
    ).getAllByRole("link");

    expect(
      companyLinks.map((link) => link.textContent?.replace("›", "")),
    ).toEqual([
      "Security Audits",
      "Media Kit",
      "Privacy Policy",
      "Terms of Service",
    ]);
    expect(screen.queryByTestId("footer-actions")).not.toBeInTheDocument();
  });

  it("stores the current home scroll before opening a legal page", () => {
    render(<Footer />);

    fireEvent.click(screen.getByRole("link", { name: "Privacy Policy" }));

    expect(saveLegalPageReturnScroll).toHaveBeenCalledTimes(1);
  });
});
