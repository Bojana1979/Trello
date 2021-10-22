///<reference types = "cypress"/>
import liste from "../fixtures/threeLists.json";
import boards from "../fixtures/fourBoards.json";

describe("Stubbing", () => {
    it("Boards stubbing", () => {
        cy.intercept('/api/boards',{fixture : 'fourBoards.json'}).as('stubbedBoards')
        cy.visit("/")
        cy.get('@stubbedBoards').its('response').then((res) => {
            console.log(res);
            expect(res.body[0].name).to.eq(boards[0].name)
            expect(res.body[0].starred).to.eq(false)
            expect(res.statusCode).to.eq(200)
            expect(res.body[1].name).to.eq(boards[1].name)
            expect(res.body[1].starred).to.eq(true)
            expect(res.body[2].name).to.eq(boards[2].name)
            expect(res.body[2].starred).to.eq(false)
            expect(res.body[3].name).to.eq(boards[3].name)
            expect(res.body[3].starred).to.eq(false)
        })
    });
    it("OA board stubbing", () => {
        cy.intercept('/api/boards',{fixture : 'threeLists.json'}).as('stubbedQa')
        cy.visit("/")
        cy.get('@stubbedQa').its('response').then((res) => {
            console.log(res);
            expect(res.body[0].name).to.eq(liste[0].name)
            expect(res.body[0].id).to.eq(65810796973)
            expect(res.body[0].starred).to.eq(false)
            expect(res.body[0].lists[0].title).to.eq(liste[0].lists[0].title)
            expect(res.body[0].lists[0].boardId).to.eq(65810796973)
            expect(res.body[0].lists[1].title).to.eq(liste[0].lists[1].title)
            expect(res.body[0].lists[1].boardId).to.eq(65810796973)
            expect(res.body[0].lists[2].title).to.eq(liste[0].lists[2].title)
            expect(res.body[0].lists[2].boardId).to.eq(65810796973)
        })
    })
})