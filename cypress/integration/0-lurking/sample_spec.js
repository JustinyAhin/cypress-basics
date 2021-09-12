describe('Test todomvc.com frontend output', () => {
    it('correctly adds a new task to the task list', function() {
        cy.visit('https://todomvc.com/examples/vanillajs/');
        cy.get('.new-todo').type(`Test task 1{enter}`);
        cy.get('ul.todo-list label').should('contain', 'Test task 1');
        cy.get('span.todo-count').should('contain', '1 item left');
    })

    it('correctly shows new task as active', function() {
        cy.visit('https://todomvc.com/examples/vanillajs/');
        cy.get('.new-todo').type(`Test task 1{enter}`);
        cy.get('a').contains('Active').click();
        cy.get('ul.todo-list label').should('contain', 'Test task 1');
    })
})