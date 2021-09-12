describe('Test todomvc.com frontend output', () => {
    beforeEach(function() {
        cy.fixture('task').then(task => {
            this.task = task;
            cy.visit('https://todomvc.com/examples/vanillajs/');
            cy.get('.new-todo').type(`${task["task1"]}{enter}`);
        });
    });

    it('correctly adds a new task to the task list', function() {
        cy.get('ul.todo-list label').should('contain', this.task["task1"]);;
        cy.get('span.todo-count').should('contain', '1 item left');
    })

    it('correctly shows new task as active', function() {
        cy.get('a').contains('Active').click();
        cy.get('ul.todo-list label').should('contain', this.task["task1"]);;
    })

    it('correctly delete from the view a task ' +
        'on a click on the delete button',
        function() {
            cy.get('button.destroy')
                .invoke('show')
                .click();
            cy.get('ul.todo-list').should('not.be.visible');
        })

    it('correctly mark a task as completed ' +
        'on a click on the completion checkbox',
        function() {
            cy.get('input.toggle').check();
            cy.get('li.completed label')
                .should('have.css', 'text-decoration', 'line-through solid rgb(217, 217, 217)');
            cy.get('span.todo-count').should('contain', '0 items left');
            cy.get('a').contains('Completed').click();
            cy.get('ul.todo-list label').should('contain', this.task["task1"]);
        })

    it('correctly mark all task as completed on a click on all completion toggle', function() {
        cy.get('.new-todo').type(`${this.task["task2"]}{enter}`);
        cy.get('label[for="toggle-all"]').click();
        cy.get('li.completed label')
            .should('have.css', 'text-decoration', 'line-through solid rgb(217, 217, 217)');
    });

    it('correctly removes completed tasks on a click on "Clear completed"', function() {
        cy.get('label[for="toggle-all"]').click();
        cy.get('button').contains('Clear completed').click();
        cy.get('ul.todo-list').should('not.be.visible');
    })
})