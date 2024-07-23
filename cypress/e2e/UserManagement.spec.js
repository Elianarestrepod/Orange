import { faker } from '@faker-js/faker';

// Function to generate username with minimun 5 characters
const generateRandomUsername = () => {
  let username;
  do {
    username = faker.internet.userName();
  } while (username.length < 5);
  return username;
};

// Function to select an option from the dropdown
const selectDropdownOption = (dropdownSelector, optionText) => {
    cy.get(dropdownSelector).contains('Select').click();
    cy.get('div[role="listbox"]').contains(optionText).click();
  };

// Funtion to fill out a field based on the label
const fillTextField = (labelText, value) => {
  cy.contains(labelText) // Find out the label
    .parent() // Navigates to the label container
    .next() // Navigates to the next container
    .find('input') // Find the the specific field
    .should('be.visible')
    .type(value);
};

// Global variables
const AdminModule = '[href="/web/index.php/admin/viewAdminModule"]';
const AddButton = '[class="oxd-button oxd-button--medium oxd-button--secondary"]';
const UserCreationUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/admin/saveSystemUser';
const EmployeeName = '[placeholder="Type for hints..."]';
const SaveButton = 'button[class="oxd-button oxd-button--medium oxd-button--secondary orangehrm-left-space"]';

beforeEach(() => {
    cy.loginSuccessfully(); 
  });
  
  describe('User Management successfully', () => {
  
    it('should create a new user successfully with Admin and Enabled options', () => {
      const randomUsername = generateRandomUsername();
      
      cy.get(AdminModule).click();  
      cy.get(AddButton).click(); 
      cy.wait(2000);
      cy.url().should('include', '/admin/saveSystemUser');
  
      // User role dropdown
      selectDropdownOption('div[class="oxd-select-text-input"]', 'Admin');
  
      // Employee name field
      cy.get(EmployeeName).type('lname');
      cy.wait(2000);
      cy.get('div[role="listbox"]').first().click(); // We selected the firs element
  
      // Status dropdown
      selectDropdownOption('div[class="oxd-select-text-input"]', 'Enabled');
  
      // Username field
      fillTextField('Username', randomUsername);
  
      // Password field
      fillTextField('Password', 'Welcome1!');
  
      // Confirm password field
      fillTextField('Confirm Password', 'Welcome1!');
      
      cy.get(SaveButton).click(); 
      cy.wait(2000);
      cy.get('p').contains('Successfully Saved').should('be.visible');
      cy.get('div').contains('LName').should('be.visible');
    });
  
    it('should create a new user successfully with Admin and Disabled options', () => {
      const randomUsername = generateRandomUsername();
  
      cy.get(AdminModule).click();  
      cy.get(AddButton).click(); 
      cy.wait(2000);
      cy.url().should('include', '/admin/saveSystemUser');
  
      // User role dropdown
      selectDropdownOption('div[class="oxd-select-text-input"]', 'Admin');
  
      // Employee name field
      cy.get(EmployeeName).type('lname');
      cy.wait(2000);
      cy.get('div[role="listbox"]').first().click(); // We selected the firs element
  
      // Status dropdown
      selectDropdownOption('div[class="oxd-select-text-input"]', 'Disabled');
  
      // Username field
      fillTextField('Username', randomUsername);
  
      // Password field
      fillTextField('Password', 'Welcome1!');
  
      // Confirm password field
      fillTextField('Confirm Password', 'Welcome1!');
      
      cy.get(SaveButton).click(); 
      cy.get('p').contains('Successfully Saved').should('be.visible');
      cy.get('div').contains('LName').should('be.visible');
    });
  });
  