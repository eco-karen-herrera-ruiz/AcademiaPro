import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ServiceCard } from "@/components/molecules/ServiceCard";

const mockService = {
  name: "Ensayos Académicos",
  description: "Redacción de ensayos con normas APA, IEEE o Vancouver.",
  icon_emoji: "✍️",
  slug: "ensayos",
  base_price: 25,
  delivery_hours_min: 8,
};

describe("ServiceCard", () => {
  it("renders the service name", () => {
    render(<ServiceCard {...mockService} index={0} />);
    expect(screen.getByText("Ensayos Académicos")).toBeInTheDocument();
  });

  it("renders the description", () => {
    render(<ServiceCard {...mockService} index={0} />);
    expect(
      screen.getByText(/Redacción de ensayos con normas APA/)
    ).toBeInTheDocument();
  });

  it("renders the icon emoji", () => {
    render(<ServiceCard {...mockService} index={0} />);
    expect(screen.getByText("✍️")).toBeInTheDocument();
  });

  it("renders the base price", () => {
    render(<ServiceCard {...mockService} index={0} />);
    expect(screen.getByText(/\$25/)).toBeInTheDocument();
  });

  it("renders a link to the service detail page", () => {
    render(<ServiceCard {...mockService} index={0} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/servicios/ensayos");
  });

  it("has the gold top border hover class", () => {
    const { container } = render(<ServiceCard {...mockService} index={0} />);
    // Check that the card container has hover-related classes
    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("hover:");
  });
});
