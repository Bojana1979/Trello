///<reference types = "cypress"/>


let res
let res1
let res2
let res3
let res4
let response
let board_id
let list1_id
let list2_id
let list3_id
let board4_name
let boardInQa_id
let todo_id
let inProgress_id
let done_id

describe("board and lists creation", () => {
    it("Todo board creation", () => {
        // cy.request('POST', '/api/boards', {name : 'Todo'})
        cy.intercept(
            'POST',
            '/api/boards'
        ).as('todoBoard')
        cy.visit('/')
        cy.get("div[id='new-board']").click()
        cy.get("[data-cy='new-board-input']").clear().type("Todo")
        cy.get("[data-cy='new-board-create']").click()
        // 
        cy.wait('@todoBoard').then((interception) => {
            console.log(interception)
            todo_id = interception.response.body.id
            cy.log(todo_id)
            expect(interception.response.body.name).to.eq('Todo')
            expect(interception.response.statusCode).to.eq(201)
        })
    });
    it("In progress board creation", () => {
        // cy.request('POST', '/api/boards', {name : 'In progress'})
        cy.intercept(
            'POST',
            '/api/boards'
        ).as('inProgressBoard')
        cy.visit('/')
        cy.get("div[id='new-board']").click()
        cy.get("[data-cy='new-board-input']").clear().type("In Progress")
        cy.get("[data-cy='new-board-create']").click()
        cy.wait('@inProgressBoard').then((interception) => {
            console.log(interception)
            inProgress_id = interception.response.body.id
            cy.log(inProgress_id)
            expect(interception.response.body.name).to.eq('In Progress')
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
        cy.get("div[id='new-board']").click()
        cy.get("[data-cy='new-board-input']").clear().type("In QA")
        cy.get("[data-cy='new-board-create']").click()
        cy.wait('@boardcreated').then((interception) => {
            console.log(interception);
            boardInQa_id = interception.response.body.id
            cy.log(boardInQa_id);
            expect(interception.response.body.name).to.eq("In QA")
            expect(interception.response.statusCode).to.eq(201)
        })
    })
    it("Lists creation in In QA board", () => {
        
    //     cy.request('POST', '/api/boards', {name : 'In QA'}
    //     ).then(({body}) => {
    //         res = body
    //         board_id = res.id
    //         cy.log(board_id);
    //     })
        cy.request('POST', '/api/lists', {
            title : 'Stubbing network responses',
            boardId : `${boardInQa_id}`
        }).as('list1').then(({body}) => {
            res1 = body
            list1_id = res1.id
            cy.log(list1_id)
            expect(res1.title).to.eq('Stubbing network responses')
        })
        cy.request('POST', '/api/lists', {
            title : 'Changing parts of response data',
            boardId : `${boardInQa_id}`
        }).as('list2').then(({body}) => {
            res2 = body
            list2_id = res2.id
            cy.log(list2_id)
            expect(res2.title).to.eq('Changing parts of response data')
        })
        cy.request('POST', '/api/lists', {
            title : 'Intercepting',
            boardId : `${boardInQa_id}`
        }).as('list3').then(({body}) => {
            res3 = body
            list3_id = res3.id
            cy.log(list3_id)
            expect(res3.title).to.eq('Intercepting')
        })
        cy.visit('/')
    });
    // // it("GET In QA board", () => {
    // //     cy.intercept({
    // //         method : 'GET',
    // //         url : `/api/boards/${board_id}`
    // //     }).as('boardInQa')
    // //     cy.visit('/api/boards')
    // //     cy.wait('@boardInQa').then((({intercept}) => {
    // //         response = intercept
    // //         expect(response.body.name).to.eq('In QA')
    // //     }))
    // // });
    it('done board creation', () => {
        cy.intercept(
            'POST',
            '/api/boards'
        ).as('doneBoard')
        cy.visit('/')
        cy.get("div[id='new-board']").click()
        cy.get("[data-cy='new-board-input']").clear().type("Done")
        cy.get("[data-cy='new-board-create']").click()
        cy.wait('@doneBoard').then((interception) => {
            console.log(interception)
            done_id = interception.response.body.id
            cy.log(done_id)
            expect(interception.response.body.name).to.eq('Done')
            expect(interception.response.statusCode).to.eq(201)
        })
        // cy.request('POST', '/api/boards/',{name : 'Done'}
        // ).as('boardDone').then(({body}) => {
        //     res4 = body
        //     board4_name = res4.name
        //     cy.log(board4_name)
        // })
    })
    it("delete", () => {
        cy.request('DELETE', '/api/boards')
    })
})