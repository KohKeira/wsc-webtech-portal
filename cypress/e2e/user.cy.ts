describe('Add User Functionality', () => {
    const phoneNumberTestCases = [
        {
            phoneNumber: '12345678',
            description:
                'should not add user if phone number does not start with 6, 8 or 9',
            errorMessage: 'The phone number field format is invalid.',
        },
        {
            phoneNumber: '2345678',
            description:
                'should not add user if phone number does not have 8 digits',
            errorMessage: 'The phone number field format is invalid.',
        },
        {
            phoneNumber: '62345678',
            description: 'should add user if phone number starts with 6',
            errorMessage: null,
        },
        {
            phoneNumber: '82345678',
            description: 'should add user if phone number starts with 8',
            errorMessage: null,
        },
        {
            phoneNumber: '92345678',
            description: 'should add user if phone number starts with 9',
            errorMessage: null,
        },
    ];
    before(() => {
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
        cy.fillUserForm(
            'lecturer',
            'James Kim',
            'james_kim',
            'male',
            '90123456',
        );

        // submit form
        cy.get('[data-cy="add-button"]').click();

        // check if redirected to users page with success message
        cy.url().should('match', /users/);
        cy.contains('User created successfully').should('exist');
    });
    it('should not add new user with empty fields', () => {
        //login with lecturer account
        cy.login('ana_yap@tp.edu.sg', 'test');

        cy.visit('users/create');
        cy.get('[data-cy="add-button"]').click();

        // ensure user is still on the add user form
        cy.url().should('match', /users\/create/);

        // validation errors for required inputs
        cy.get('input[name="name"]').then(($input) => {
            expect(($input[0] as HTMLInputElement).validationMessage).to.eq(
                'Please fill out this field.',
            );
        });
        cy.get('input[name="name"]').then(($input) => {
            expect(($input[0] as HTMLInputElement).validationMessage).to.eq(
                'Please fill out this field.',
            );
        });
        cy.get('input[name="email"]').then(($input) => {
            expect(($input[0] as HTMLInputElement).validationMessage).to.eq(
                'Please fill out this field.',
            );
        });
        cy.get('input[name="phone_number"]').then(($input) => {
            expect(($input[0] as HTMLInputElement).validationMessage).to.eq(
                'Please fill out this field.',
            );
        });
    });
    it('should not add user with invalid student email', () => {
        //login with lecturer account
        cy.login('ana_yap@tp.edu.sg', 'test');

        cy.visit('users/create');

        cy.fillUserForm('student', 'lily_tan', '2301234', 'female', '90123457');

        cy.get('[data-cy="add-button"]').click();

        cy.url().should('match', /users\/create/);

        cy.get('[data-cy="email-error"]')
            .should('exist')
            .and('contain', 'Student email format is invalid');
    });
    phoneNumberTestCases.forEach((test) => {
        it(test.description, () => {
            //login with lecturer account
            cy.login('ana_yap@tp.edu.sg', 'test');

            cy.visit('users/create');

            cy.fillUserForm(
                'student',
                'lily_tan',
                '2301234B',
                'female',
                test.phoneNumber,
            );

            cy.get('[data-cy="add-button"]').click();

            if (test.errorMessage) {
                cy.url().should('match', /users\/create/);

                cy.get('[data-cy="phone-error"]')
                    .should('exist')
                    .and(
                        'contain',
                        'The phone number field format is invalid.',
                    );
            } else {
                cy.url().should('match', /users/);

                cy.get('[data-cy="phone-error"]').should('not.exist');
            }
        });
    });
    it('should not add user with duplicated email, name and phone_number', () => {
        //login with lecturer account
        cy.login('ana_yap@tp.edu.sg', 'test');

        cy.visit('users/create');

        cy.fillUserForm(
            'student',
            'James Lee',
            '2301234A',
            'female',
            '91234567',
        );

        cy.get('[data-cy="add-button"]').click();

        cy.url().should('match', /users\/create/);

        // validation error for duplicated user
        cy.get('[data-cy="email-error"]')
            .should('exist')
            .and('contain', 'The email has already been taken.');
        cy.get('[data-cy="name-error"]')
            .should('exist')
            .and('contain', 'The name has already been taken.');
        cy.get('[data-cy="phone-error"]')
            .should('exist')
            .and('contain', 'The phone number has already been taken.');
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
    it('should upload image and add user successfully', () => {
        //login with lecturer account
        cy.login('ana_yap@tp.edu.sg', 'test');

        cy.visit('users/create');

        // fill up the form
        cy.fillUserForm(
            'student',
            'Lily Kim',
            '2210000A',
            'female',
            '80123456',
        );
        cy.get('input[type=file]').selectFile('public/images/logo.png');
        // submit form
        cy.get('[data-cy="add-button"]').click();

        // check if redirected to users page with success message
        cy.url().should('match', /users/);
        cy.contains('User created successfully').should('exist');
    });
    it('should fail to upload non-image files and add user successfully', () => {
        //login with lecturer account
        cy.login('ana_yap@tp.edu.sg', 'test');

        cy.visit('users/create');

        // fill up the form
        cy.fillUserForm(
            'student',
            'Lily Koh',
            '2310000A',
            'female',
            '60123456',
        );
        cy.get('input[type=file]').selectFile('public/index.php');
        // submit form
        cy.get('[data-cy="add-button"]').click();

        cy.get('[data-cy="avatar-error"]')
            .should('exist')
            .and(
                'contain',
                'The avatar file field must be a file of type: png, jpg, jpeg.',
            );
    });
});
