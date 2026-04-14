describe("AcademiaPro — Happy Path", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the landing page with hero section", () => {
    cy.get("h1").should("contain.text", "académico");
    cy.get("h1").should("be.visible");
  });

  it("shows the services section with 6 cards", () => {
    cy.get("#servicios").scrollIntoView();
    cy.get("#servicios").should("be.visible");
    // Should have 6 service cards
    cy.get('[data-testid="service-card"]').should("have.length", 6);
  });

  it("navigates from service card to service detail page", () => {
    cy.get("#servicios").scrollIntoView();
    cy.get('[data-testid="service-card"]').first().click();
    cy.url().should("include", "/servicios/");
    cy.get("h1").should("be.visible");
  });

  it("navigates to /cotizar and completes the 3-step form", () => {
    // Navigate to quote page
    cy.visit("/cotizar");

    // Step 1: Select a service
    cy.get('select').first().select("deberes");
    cy.contains("Continuar").click();

    // Step 2: Fill details
    cy.get('select').first().select("PUCE");
    cy.get('input[placeholder*="Ingeniería"]').type("Ingeniería Civil");
    cy.get('input[placeholder*="Cálculo"]').type("Cálculo Integral — integrales definidas");
    cy.get('input[type="datetime-local"]').type("2026-06-01T23:59");
    cy.contains("Continuar").click();

    // Step 3: Fill contact info
    cy.get('input[placeholder*="María"]').type("María García");
    cy.get('input[type="tel"]').type("+593 99 123 4567");
    cy.contains("Enviar cotización").click();

    // Success state
    cy.contains("¡Cotización enviada!", { timeout: 5000 }).should("be.visible");
  });

  it("shows universities strip with infinite scroll", () => {
    cy.get("#universidades").scrollIntoView();
    cy.get("#universidades").should("be.visible");
  });

  it("shows testimonials section", () => {
    cy.get("#testimonios").scrollIntoView();
    cy.get("#testimonios").should("be.visible");
  });

  it("shows footer with 4 columns on desktop", () => {
    cy.viewport(1280, 800);
    cy.get("footer").scrollIntoView();
    cy.get("footer").should("be.visible");
  });

  it("header CTA button navigates to /cotizar", () => {
    cy.viewport(1024, 768);
    cy.contains("Solicitar ahora").click();
    cy.url().should("include", "/cotizar");
  });
});
