describe("CRUD", () => {
  it("The page should display a form to add a new task", () => {
    cy.visit("http://localhost:3000/");

    cy.get("p[data-cy=no-tasks-found]").should("exist");

    cy.get("form[data-cy=task-form]").should("exist").should("be.visible");
  });

  it("The form should create a new task", () => {
    cy.visit("http://localhost:3000/");

    cy.get("input[data-cy=task-form-message]").type("New Cypress task");
    cy.get("input[data-cy=task-form-completed]").check();

    cy.get("button[data-cy=task-form-submit]").click();

    cy.wait(1000);

    cy.get("div[data-cy=task-list]").children().should("have.length", 1);

    cy.get("div[data-cy=task-list]")
      .children()
      .last()
      .within(() => {
        cy.get("input[data-cy=task-card-message]").should(
          "have.value",
          "New Cypress task",
        );
        cy.get("input[data-cy=task-card-completed]").should("be.checked");
      });
  });

  it("The form should update a task", () => {
    cy.visit("http://localhost:3000/");

    cy.get("div[data-cy=task-list]")
      .children()
      .last()
      .within(() => {
        cy.get("input[data-cy=task-card-message]")
          .clear()
          .type("Updated Cypress task");
        cy.get("input[data-cy=task-card-completed]").check();
      });

    cy.get("div[data-cy=task-list]")
      .children()
      .last()
      .within(() => {
        cy.get("input[data-cy=task-card-message]").should(
          "have.value",
          "Updated Cypress task",
        );
        cy.get("input[data-cy=task-card-completed]").should("be.checked");
      });
  });

  it("The delete button should delete a task", () => {
    cy.visit("http://localhost:3000/");

    cy.get("div[data-cy=task-list]")
      .children()
      .last()
      .within(() => {
        cy.get("button[type=button]").click();
      });

    cy.get("p[data-cy=no-tasks-found]").should("exist");
  });
});
