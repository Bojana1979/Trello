///<reference types="cypress" />

describe("Assert hooks", () => {

    beforeEach("login", ()=> {
        cy.request('DELETE', '/api/boards')
        cy.intercept('/login').as('login')
        cy.visit('/')
        cy.get('nav > div:nth-of-type(2) > svg').click()
        cy.get("input#loginEmail").type(Cypress.env('username'))
        cy.get('input#loginPassword').type(Cypress.env('password'))
        cy.get('div:nth-of-type(2) > .credentials > .LoginModule_buttons > .Button').click()
        cy.wait('@login')
        cy.get('div#loginMessage')
        .should('be.visible')
        .and('have.text', "User is logged in")
        
    })

    afterEach("logout", ()=> {
        cy.get('nav > div:nth-of-type(3)').click()
        cy.get('[data-cy=logged-user] > #myDropdown > span').click()
        cy.get('nav > div:nth-of-type(2)').should('have.text','\n        Log in\n      ')
    })

    it("I can create a board", () => {
      cy.get('div#new-board > .board_title').click()
      cy.get('div#new-board > .board_addBoard').type('prvi')
      cy.get('div#new-board  .Button').click()
      cy.url().should('include', '/board/')
      cy
      .url()
      .then((url) => {
          const id = url.match(/\/(\d+?)$/)

          cy
              .url()
              .should(
                  'eq',
                  `${Cypress.config('baseUrl')}/board/${id[1]}`
              )
      });
      cy.go('back')
      cy.get('[data-cy=board-item]').trigger('mouseover');
      cy.get('[data-cy=star]').should('be.visible').click();
      cy.get('[data-cy=favorite-boards]').children().should('have.length',1)
   
    })
    it("create a lists", () => {
        cy.get('div#new-board > .board_title').click()
        cy.get('div#new-board > .board_addBoard').type('prvi')
        cy.get('div#new-board  .Button').click()
        cy.wait(3000)
        cy.get('[data-cy=add-list]').click()
        cy.get('[data-cy=add-list-input').type('New list{enter}');

        for (let i=0; i<=2; i++) {
            cy.get('[data-cy=new-task]').click()
            cy.get('[data-cy=task-input]').type(`Task ${i+1}{enter}`)
        }
    })

});