import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
    expect(
      screen.getByLabelText(/how can we help you\?/i),
    ).toBeInTheDocument();

    const interestedInSelect = screen.getByRole("combobox", {
      name: /interested in/i,
    });

    expect(interestedInSelect).toHaveAttribute("name", "interestedIn");
    expect(screen.getByRole("option", { name: "Lending" })).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Borrowing" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Underwriting" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("option", { name: "Integration" }),
    ).toBeInTheDocument();

    expect(screen.queryByText("Role")).not.toBeInTheDocument();
    expect(screen.queryByText("Inquiry type")).not.toBeInTheDocument();
  });

  it("renders tg handle beside email in the desktop contact grid", () => {
    render(<ContactSection />);

    expect(screen.getByLabelText(/tg handle/i)).toHaveAttribute(
      "name",
      "tgHandle",
    );
    expect(screen.getByLabelText(/tg handle/i)).not.toBeRequired();
    expect(screen.getByTestId("contact-primary-grid")).toHaveClass(
      "lg:grid-cols-4",
    );
    expect(screen.getByTestId("contact-full-name-field")).toHaveClass(
      "lg:col-span-2",
    );
  });
});
