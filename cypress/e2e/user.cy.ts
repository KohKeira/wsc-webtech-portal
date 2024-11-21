describe('Add User Functionality', () => {
    beforeEach(() => {
        cy.task('artisanMigrateFreshSeed').then((output) => {
            cy.log(output as string);
        });
    });
    it('should navigate to the Users Page through navigation bar and allow lecturer to access Add User page to add user successfully', () => {
        //login with lecturer account
        cy.login('ana_yap@tp.edu.sg', 'test');

        // navigate to users page using navigation bar
        cy.get('nav').contains('Users').click();
        cy.url().should('match', /users/);

        // access add user form
        cy.get('button').contains('Add User').click();
        cy.url().should('match', /users\/create/);

        // assert form is displayed
        cy.get('form').should('be.visible');
        cy.contains('Add User').should('exist');

        // fill up the form
        cy.get('input[name="role"]').check('student');
        cy.get('input[name="role"]').should('have.value', 'student');

        cy.get('input[name="name"]').type('lily_kim');
        cy.get('input[name="name"]').should('have.value', 'lily_kim');

        cy.get('input[name="email"]').type('2301234B');
        cy.get('input[name="email"]').should('have.value', '2301234B');

        cy.get('input[name="gender"]').check('female');
        cy.get('input[name="gender"]').should('have.value', 'female');

        cy.get('input[name="phone_number"]').type('90123456');
        cy.get('input[name="phone_number"]').should('have.value', '90123456');

        // submit form
        cy.get('button').contains('Add').click();

        // check if redirected to users page with success message
        cy.url().should('match', /users/);
        cy.contains('User created successfully').should('exist');
    });
    it('should redirect to login page when accessing the Add User Page', () => {
        cy.visit('/users/create');
        cy.url().should('match', /login/);
    });
    it('should redirect to dashboard page when accessing the Add User Page with student role', () => {
        //login with lecturer account
        cy.login('2301234A@student.tp.edu.sg', 'test');

        // navigate to users page using navigation bar
        cy.get('nav').contains('Users').click();
        cy.url().should('match', /users/);

        // should not see add user button
        cy.get('button').contains('Add User').should('not.exist');

        // redirect to dashboard page when accssing add user page
        cy.visit('/users/create');
        cy.url().should('match', /dashboard/);
    });
});
