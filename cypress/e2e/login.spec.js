const Username = '[name="username"]';
const Password = '[name="password"]';
const Url = 'https://opensource-demo.orangehrmlive.com/';
const LoginButton = '[class="oxd-button oxd-button--medium oxd-button--main orangehrm-login-button"]';
const ResetButton = '[class="oxd-button oxd-button--large oxd-button--secondary orangehrm-forgot-password-button orangehrm-forgot-password-button--reset"]'; 


beforeEach(() => {
  cy.visit(Url);
});

describe('Login invalid', () =>{

  it('should login invalid', () => {
      cy.get(Username).type('Admin34');
      cy.get(Password).type('123');
      cy.get(LoginButton).click();
      cy.wait(2000);
      cy.get('p').contains('Invalid credentials').should('be.visible');
  });

  it('should empty fields', () => {
    cy.get(LoginButton).click();
    cy.wait(2000);
    cy.get('span').contains('Required').should('be.visible');
});
});

describe('Login successfully', () =>{
  it('should login successfully', () => {
      cy.get(Username).type('Admin');
      cy.get(Password).type('admin123');
      cy.get(LoginButton).click();
      cy.wait(2000);
      cy.url().should('include', '/dashboard/index'); 
  });
});

describe('Forgot Password', () =>{

  beforeEach(() => {
    const ForgotLink = cy.get('[class="orangehrm-login-forgot"]').click();
    const  ForgotUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode';
    cy.visit(ForgotUrl);
  });

  it('should show an error message if the field is not filled and button is clicked', () => {
      
      //Reset button empty field
      cy.get(ResetButton).click();
      cy.wait(2000);
      cy.get('span').contains('Required'); 

  });


  it('should navigate to another page if the field is filled and button is clicked', () => {
      
      //Reset button filling out all the information
      const Username1 = cy.get('[name="username"]').type('Pepito1534');
      cy.get(ResetButton).click();
      cy.url('https://opensource-demo.orangehrmlive.com/web/index.php/auth/sendPasswordReset');
      cy.wait(2000);
      cy.get('h6').contains('Reset Password link sent successfully').should('be.visible');

  });


  it('Navigate through the login page again once it clicked the cancel button', () => {
      
    //Cancel button
    const CancelButton = cy.get('[class="oxd-button oxd-button--large oxd-button--ghost orangehrm-forgot-password-button orangehrm-forgot-password-button--cancel"]');
    CancelButton.click();
    cy.wait(2000);
    cy.url().should('include', '/auth/login');

}); 


});
