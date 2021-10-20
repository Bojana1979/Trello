///<reference types = "cypress"/>
import names from "../fixtures/data.json"
import locators from "../fixtures/boardCreation.json"

let res1
let res2
let res3
let list1_id
let list2_id
let list3_id
let boardInQa_id
let todo_id
let inProgress_id
let done_id

describe("board and lists creation", () => {
    it("Todo board creation", () => {
        cy.intercept(
            'POST',
            '/api/boards'
        ).as('todoBoard')
        cy.visit('/')
        cy.get(locators.createBoard).click({force:true})
        cy.get(locators.boardNameField).type(names.boards.firstBoardTName)
        cy.get(locators.saveButton).click()
        cy.wait('@todoBoard').then((interception) => {
            todo_id = interception.response.body.id
            cy.log(todo_id)
            expect(interception.response.body.name).to.eq(names.boards.firstBoardTName)
            expect(interception.response.statusCode).to.eq(201)
        })
    });
    it("In progress board creation", () => {
        cy.intercept(
            'POST',
            '/api/boards'
        ).as('inProgressBoard')
        cy.visit('/')
        cy.get(locators.createBoard).click()
        cy.get(locators.boardNameField).clear().type(names.boards.secondBoardName)
        cy.get(locators.saveButton).click()
        cy.wait('@inProgressBoard').then((interception) => {
            inProgress_id = interception.response.body.id
            cy.log(inProgress_id)
            expect(interception.response.body.name).to.eq(names.boards.secondBoardName)
            expect(interception.response.statusCode).to.eq(201)
        })
    });
    it("Favorite board", () => {
        cy.intercept({
            method : 'GET',
            url : '/api/boards'
        }, (req) => {
            req.reply((res) => {
                res.body[1].starred = false

                return res
            })
        }).as("sucessfulyStarred")
        cy.visit('/')
    });
    it("In QA board creation", () => {
        cy.intercept(
            'POST',
            'api/boards', 
        ).as('boardcreated')
        cy.visit('/')
        cy.get(locators.createBoard).click()
        cy.get(locators.boardNameField).clear().type(names.boards.thirdBoardName)
        cy.get(locators.saveButton).click()
        cy.wait('@boardcreated').then((interception) => {
            boardInQa_id = interception.response.body.id
            cy.log(boardInQa_id);
            expect(interception.response.body.name).to.eq(names.boards.thirdBoardName)
            expect(interception.response.statusCode).to.eq(201)
        })
    });
    it("Lists creation in In QA board", () => {
        cy.request('POST', '/api/lists', {
            title : names.lists.list1,
            boardId : `${boardInQa_id}`
        }).as('list1').then(({body}) => {
            res1 = body
            list1_id = res1.id
            cy.log(list1_id)
            expect(res1.title).to.eq(names.lists.list1)
        })
        cy.request('POST', '/api/lists', {
            title : names.lists.list2,
            boardId : `${boardInQa_id}`
        }).as('list2').then(({body}) => {
            res2 = body
            list2_id = res2.id
            cy.log(list2_id)
            expect(res2.title).to.eq(names.lists.list2)
        })
        cy.request('POST', '/api/lists', {
            title : names.lists.list3,
            boardId : `${boardInQa_id}`
        }).as('list3').then(({body}) => {
            res3 = body
            list3_id = res3.id
            cy.log(list3_id)
            expect(res3.title).to.eq(names.lists.list3)
        })
        cy.visit('/')
    });
    it('Done board creation', () => {
        cy.intercept(
            'POST',
            '/api/boards'
        ).as('doneBoard')
        cy.visit('/')
        cy.get(locators.createBoard).click()
        cy.get(locators.boardNameField).clear().type(names.boards.fourthBoardName)
        cy.get(locators.saveButton).click()
        cy.wait('@doneBoard').then((interception) => {
            done_id = interception.response.body.id
            cy.log(done_id)
            expect(interception.response.body.name).to.eq(names.boards.fourthBoardName)
            expect(interception.response.statusCode).to.eq(201)
        })
    });
    it("delete", () => {
        cy.request('DELETE', '/api/boards')
    })
})