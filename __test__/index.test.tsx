import { render, screen } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("Tests SEO Homepage title and description", () => {
    render(<Home />);
    expect(document.title).toBe("Aftin");
  });
});
