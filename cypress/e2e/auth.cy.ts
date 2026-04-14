describe("AcademiaPro — Auth Flows", () => {
  it("redirects unauthenticated users from /panel to /login", () => {
    cy.visit("/panel");
    cy.url().should("include", "/login");
    cy.url().should("include", "redirect=%2Fpanel");
  });

  it("displays the login page correctly", () => {
    cy.visit("/login");
    cy.contains("Iniciar sesión").should("be.visible");
    cy.get('input[type="email"]').should("be.visible");
    cy.contains("Enviar enlace mágico").should("be.visible");
  });

  it("shows validation error for invalid email", () => {
    cy.visit("/login");
    cy.get('input[type="email"]').type("not-an-email");
    cy.contains("Enviar enlace mágico").click();
    cy.contains("email válido").should("be.visible");
  });

  it("shows validation error for empty email", () => {
    cy.visit("/login");
    cy.contains("Enviar enlace mágico").click();
    cy.contains("email válido").should("be.visible");
  });

  it("has a link back to cotizar for new users", () => {
    cy.visit("/login");
    cy.contains("Cotiza tu primer trabajo").should("be.visible");
    cy.contains("Cotiza tu primer trabajo").click();
    cy.url().should("include", "/cotizar");
  });

  it("preserves redirect parameter in login page", () => {
    cy.visit("/login?redirect=%2Fpanel");
    cy.get('input[type="email"]').should("be.visible");
  });
});

describe("AcademiaPro — Edge Cases", () => {
  it("submitting empty quote form shows validation errors", () => {
    cy.visit("/cotizar");
    // Try to submit step 1 without selecting a service
    cy.contains("Continuar").click();
    cy.contains("Selecciona un servicio").should("be.visible");
  });

  it("handles special characters in form inputs", () => {
    cy.visit("/cotizar");
    cy.get("select").first().select("deberes");
    cy.contains("Continuar").click();

    // Step 2 with special characters
    cy.get("select").first().select("PUCE");
    cy.get('input[placeholder*="Ingeniería"]').type("Ingeniería <script>alert('xss')</script>");
    cy.get('input[placeholder*="Cálculo"]').type("Test 🎓 with emojis & ampersands");
    cy.get('input[type="datetime-local"]').type("2026-06-01T23:59");
    cy.contains("Continuar").click();

    // Should proceed without crashing
    cy.contains("Tus datos de contacto").should("be.visible");
  });

  it("mobile hamburger menu works correctly", () => {
    cy.viewport(375, 812); // iPhone X
    cy.visit("/");

    // Menu should be hidden
    cy.get('nav[aria-label="Navegación principal"]').should("not.be.visible");

    // Open hamburger
    cy.get('button[aria-label="Abrir menú"]').click();
    cy.get('nav[aria-label="Navegación móvil"]').should("be.visible");

    // Close menu
    cy.get('button[aria-label="Cerrar menú"]').click();
    cy.get('nav[aria-label="Navegación móvil"]').should("not.exist");
  });

  it("security headers are present in responses", () => {
    cy.request("/").then((response) => {
      expect(response.headers).to.have.property("x-frame-options", "DENY");
      expect(response.headers).to.have.property("x-content-type-options", "nosniff");
      expect(response.headers).to.have.property("referrer-policy", "strict-origin-when-cross-origin");
    });
  });
});
