///<reference types = "cypress"/>

describe("Stubbing", () => {
    it("Boards stubbing", () => {
        cy.intercept('/api/boards',{fixture : 'fourBoards'}).as('stubbedBoards')
        cy.visit("/")
        cy.get('@stubbedBoards').its('response').then((res) => {
            console.log(res);
            expect(res.body.boards[0].name).to.eq("Todo")
            expect(res.body.boards[0].starred).to.eq(false)
            expect(res.statusCode).to.eq(200)
            expect(res.body.boards[1].name).to.eq("In progress")
            expect(res.body.boards[1].starred).to.eq(true)
            expect(res.body.boards[2].name).to.eq("In QA")
            expect(res.body.boards[2].starred).to.eq(false)
            expect(res.body.boards[3].name).to.eq("Done")
            expect(res.body.boards[3].starred).to.eq(false)
            expect(res.body.lists[0].title).to.eq("Stubbing network responses")
            expect(res.body.lists[1].title).to.eq("Changing parts of response data")
            expect(res.body.lists[2].title).to.eq("Intercepting")
        })
    })
})