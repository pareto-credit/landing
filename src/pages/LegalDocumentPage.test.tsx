import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import LegalDocumentPage from "./LegalDocumentPage";

const navigate = vi.fn();
const getLegalPageReturnScroll = vi.fn();

vi.mock("../lib/legalPageScroll", () => ({
  getLegalPageReturnScroll: () => getLegalPageReturnScroll(),
}));

vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigate,
}));

describe("LegalDocumentPage", () => {
  beforeEach(() => {
    navigate.mockReset();
    getLegalPageReturnScroll.mockReset();
  });

  it("navigates home without resetting scroll when a saved home position exists", () => {
    getLegalPageReturnScroll.mockReturnValue(1420);

    render(<LegalDocumentPage content="<h1>Privacy Policy</h1>" />);

    fireEvent.click(screen.getByRole("button", { name: /back to home/i }));

    expect(navigate).toHaveBeenCalledWith({ to: "/", resetScroll: false });
  });

  it("falls back to navigating home when no return target is available", () => {
    getLegalPageReturnScroll.mockReturnValue(null);

    render(<LegalDocumentPage content="<h1>Privacy Policy</h1>" />);

    fireEvent.click(screen.getByRole("button", { name: /back to home/i }));

    expect(navigate).toHaveBeenCalledWith({ to: "/" });
  });
});
