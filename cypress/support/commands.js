const Username = '[name="username"]';
const Password = '[name="password"]';
const Url = 'https://opensource-demo.orangehrmlive.com/';
const LoginButton = '[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]';

Cypress.Commands.add('visitLoginPage', () => {
    cy.visit(Url);
  });

Cypress.Commands.add('loginSuccessfully', () => {
    cy.visitLoginPage();
    cy.get(Username).type('Admin');
    cy.get(Password).type('admin123');
    cy.get(LoginButton).click();
    cy.wait(2000);
    cy.url().should('include', '/dashboard/index'); 
  });