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
});
