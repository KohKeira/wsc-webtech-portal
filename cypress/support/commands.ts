/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

export {};

declare global {
    namespace Cypress {
        interface Chainable {
            login(email: string, password: string): Chainable<void>;
            fillUserForm(
                role: string,
                name: string,
                email: string,
                gender: string,
                phone_number: string,
            ): Chainable<void>;
        }
    }
}

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('/');
    // visit login page and login as admin
    cy.get('button').click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name=password]').type(password);
    cy.get('button').click();

    // verfiy successfully login
    cy.url().should('match', /dashboard/);
});
Cypress.Commands.add(
    'fillUserForm',
    (
        role: string,
        name: string,
        email: string,
        gender: string,
        phone_number: string,
    ) => {
        if (role === 'student') {
            // uncheck default student radio button
            cy.get('input[name="role"]').check('lecturer', { force: true });
        }
        cy.get('input[name="role"]').check(role, { force: true });
        cy.get('input[name="role"]:checked')
            .should('be.checked')
            .and('have.value', role);

        cy.get('input[name="name"]').type(name);
        cy.get('input[name="name"]').should('have.value', name);

        cy.get('input[name="email"]').type(email);
        cy.get('input[name="email"]').should('have.value', email);

        if (gender === 'male') {
            // simulate selecting different radio buttons
            cy.get('input[name="gender"]').check('female', { force: true });
        } else {
            cy.get('input[name="gender"]').check('male', { force: true });
        }

        cy.get('input[name="gender"]').check(gender, { force: true });
        cy.get('input[name="gender"]:checked')
            .should('be.checked')
            .and('have.value', gender);

        // type no input for phone
        cy.get('input[name="phone_number"]').clear();
        cy.get('input[name="phone_number"]').type(phone_number);
        cy.get('input[name="phone_number"]').should('have.value', phone_number);
    },
);
