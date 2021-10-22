///<reference types = "cypress"/>
import liste from "../fixtures/threeLists.json";
import boards from "../fixtures/fourBoards.json";
import tasks from "../fixtures/fourTasks.json";

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
    });
    it("tasks in QA boards stubbing", () => {
        cy.intercept('/api/boards', {fixture : 'fourTasks.json'}).as('stubbedTasks')
        cy.visit("/")
        cy.get('@stubbedTasks').its('response').then((res) => {
            console.log(res)
            expect(res.statusCode).to.eq(200)
            expect(res.body.id).to.eq(tasks.id)
            expect(res.body.name).to.eq(tasks.name)
            expect(res.body.lists[0].title).to.eq(tasks.lists[0].title)
            expect(res.body.lists[1].title).to.eq(tasks.lists[1].title)
            expect(res.body.lists[2].title).to.eq(tasks.lists[2].title)
            expect(res.body.tasks[0].title).to.eq(tasks.tasks[0].title)
            expect(res.body.tasks[0].boardId).to.eq(tasks.id)
            expect(res.body.tasks[0].listId).to.eq(tasks.lists[0].id)
            expect(res.body.tasks[1].title).to.eq(tasks.tasks[1].title)
            expect(res.body.tasks[1].boardId).to.eq(tasks.id)
            expect(res.body.tasks[1].listId).to.eq(tasks.lists[0].id)
            expect(res.body.tasks[2].title).to.eq(tasks.tasks[2].title)
            expect(res.body.tasks[2].boardId).to.eq(tasks.id)
            expect(res.body.tasks[2].listId).to.eq(tasks.lists[0].id)
            expect(res.body.tasks[3].title).to.eq(tasks.tasks[3].title)
            expect(res.body.tasks[3].boardId).to.eq(tasks.id)
            expect(res.body.tasks[3].listId).to.eq(tasks.lists[0].id)
        })
    })
})