import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import {
  CONTACT_INTEREST_EVENT,
  setPendingContactInterest,
} from "../../lib/siteNavigation";
import ContactSection from "./ContactSection";

describe("ContactSection", () => {
  it("renders the heading with an explicit line break element", () => {
    render(<ContactSection />);

    const heading = screen.getByRole("heading", {
      name: /the infrastructure is ready\..*are you\?/i,
    });

    expect(heading.querySelector("br")).toBeInTheDocument();
  });

  it("renders the updated contact form copy with a single interested-in select", () => {
    render(<ContactSection />);

    expect(screen.getByText("GET IN TOUCH")).toBeInTheDocument();
    expect(screen.getByLabelText(/how can we help you\?/i)).toBeInTheDocument();

    const interestedInSelect = screen.getByRole("combobox", {
      name: /interested in/i,
    });

    expect(interestedInSelect).toHaveAttribute("name", "interestedIn");
    expect(screen.getByRole("option", { name: "Lending" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Borrowing" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Underwriting" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Integration" })
    ).toBeInTheDocument();

    expect(screen.queryByText("Role")).not.toBeInTheDocument();
    expect(screen.queryByText("Inquiry type")).not.toBeInTheDocument();
  });

  it("renders tg handle beside email in the desktop contact grid", () => {
    render(<ContactSection />);

    expect(screen.getByLabelText(/tg handle/i)).toHaveAttribute(
      "name",
      "tgHandle"
    );
    expect(screen.getByLabelText(/tg handle/i)).not.toBeRequired();
    expect(screen.getByTestId("contact-primary-grid")).toHaveClass(
      "lg:grid-cols-4"
    );
    expect(screen.getByTestId("contact-full-name-field")).toHaveClass(
      "lg:col-span-2"
    );
  });
});

describe("ContactSection interest pre-selection", () => {
  it("uses the product page default and lets a plan CTA select a different interest", () => {
    render(<ContactSection defaultInterest="Borrowing" />);
    expect(
      screen.getByRole("combobox", { name: /interested in/i })
    ).toHaveValue("Borrowing");
    act(() =>
      window.dispatchEvent(
        new CustomEvent(CONTACT_INTEREST_EVENT, { detail: "Pro plan" })
      )
    );
    expect(
      screen.getByRole("combobox", { name: /interested in/i })
    ).toHaveValue("Pro plan");
  });
  it("lists the plan and MCP interests", () => {
    render(<ContactSection />);

    for (const option of [
      "Pareto Studio (Core)",
      "Pro plan",
      "White-Glove by NorthBridge",
      "Pareto MCP early access",
    ]) {
      expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
    }
  });

  it("selects the interest requested by a CTA elsewhere on the page", () => {
    render(<ContactSection />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent(CONTACT_INTEREST_EVENT, { detail: "Pro plan" })
      );
    });

    expect(
      screen.getByRole("combobox", { name: /interested in/i })
    ).toHaveValue("Pro plan");
  });

  it("ignores unknown interests", () => {
    render(<ContactSection />);

    act(() => {
      window.dispatchEvent(
        new CustomEvent(CONTACT_INTEREST_EVENT, { detail: "Something else" })
      );
    });

    expect(
      screen.getByRole("combobox", { name: /interested in/i })
    ).toHaveValue("Pareto Studio (Core)");
  });

  it("uses an interest chosen on another page", () => {
    setPendingContactInterest("Borrowing");
    render(<ContactSection />);

    expect(
      screen.getByRole("combobox", { name: /interested in/i })
    ).toHaveValue("Borrowing");
  });
});
