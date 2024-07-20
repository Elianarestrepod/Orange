const AdminModule = '[href="/web/index.php/admin/viewAdminModule"]';
const AddButton = '[class="oxd-button oxd-button--medium oxd-button--secondary"]';
const UserCreationUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser';

beforeEach(() => {
    cy.loginSuccessfully(); 

});


describe('User Management sucessfully', () => {
  
    it('should create a new user sucessfully', () => {
      
      cy.get(AdminModule).click();  
      cy.get(AddButton).click(); 
      cy.wait(2000);
      cy.url(UserCreationUrl).should('include', '/admin/saveSystemUser'); 


     
    });


  });
  