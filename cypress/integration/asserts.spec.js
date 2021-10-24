///<reference types = "cypress"/>

describe("use hooks", () => {
    beforeEach("user log in", () => {
        cy.request('DELETE', '/api/boards');
        cy.intercept('/login').as('login');
        cy.visit("/");
        cy.get("div[data-cy='login-menu']").click();
        cy.get("input[data-cy='login-email']").type(Cypress.env("email"))
        cy.get("input[data-cy='login-password']").type(Cypress.env("password"))
        cy.get("button[data-cy='login']").click()
        cy.wait('@login');
        cy.get('[data-cy=loggedin-bar').should('be.visible').and('contain', 'User is logged in')
    });
    afterEach("user logout", () => {
        cy.get("[data-cy='logged-user']").click()
        cy.get("[data-cy=logout]").click()
        cy.get('data-cy=login-menu]>svg').should('be.visible')
        cy.get('data-cy=login-menu]>svg').should('contain', 'Log in')
    })

    it("I can create a board", () => {
        cy.get('div#new-board > .board_title').click()
        cy.get('div#new-board > .board_addBoard').type('prvi')
        cy.get('div#new-board  .Button').click()
        cy.url().should('include', '/board/')
     
    })
    it("create board", () => {

    })
})