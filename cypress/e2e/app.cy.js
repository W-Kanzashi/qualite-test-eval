describe("Navigation", () => {
  it("The page should exist", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    cy.get("p[data-cy=no-tasks-found]").should("exist");

    cy.get("form[data-cy=task-form]").should("exist").should("be.visible");
  });

  it("The page should display a list of tasks", () => {
    cy.visit("http://localhost:3000/");

    // NOTE: Create some tasks
    for (let i = 0; i < 5; i++) {
      cy.get("input[data-cy=task-form-message]").type(`Task ${i + 1}`);
      cy.get("input[data-cy=task-form-completed]").check();
      cy.get("button[data-cy=task-form-submit]").click();
    }

    cy.get("div[data-cy=task-list]").children().should("have.length", 5);

    cy.get("div[data-cy=task-list]")
      .children()
      .each(($task) => {
        cy.wrap($task).within(() => {
          // NOTE: Delete the task
          cy.get("button[type=button]").click();
        });
      });

    //NOTE: Verify that the task list is empty
    cy.get("p[data-cy=no-tasks-found]").should("exist");

    cy.get("form[data-cy=task-form]").should("exist").should("be.visible");
  });
});
