describe("Network stubbing", () => {
    it("I can change the network response", () => {
        cy.intercept('/api/boards', {fixture: 'boardsNew.json'}).as('false');
        cy.visit('/')
    })
    it("Promena responsa dinamicki", () => {
        cy.intercept({
            method: 'GET',
            url: '/api/boards'
          }, (req) => {
            req.reply((res) => {
              res.body[0].starred = true
              res.body[1].name = 'Nesto drugo'
        
              return res
            })
          }).as("nameChanged")
        cy.visit('/');
        cy.get("div[data-cy='board-item'] > h1[class='board_title']").eq(1).should("have.text", "Nesto drugo");
        cy.get("@nameChanged").its('response').then((res) => {
            expect(res.body[0].name).to.eq('First Board');
         expect(res.statusCode).to.eq(200);
        })
    })
    it.only("Create board", () => {
        // cy.intercept({
        //     method: 'POST',
        //     url: 'http://localhost:3000/api/boards'
        // }, (req) => {
        //     req.replay((res) => {
        //         res.body[0].name = 'Prvi board'

        //         return res
        //     })
        // })
        cy.request('POST', '/api/boards', {name : "Novi Board"})
        cy.request('DELETE', '/api/boards')
        
        cy.intercept('/api/boards', [
            {
                name : "Novi Board"
            }
        ])
        cy.visit('/')
        cy.get("div[id='new-board']").click()
        cy.get("[data-cy='new-board-input']").clear().type("Novi board")
        cy.get("[data-cy='new-board-create']").click()
})
})