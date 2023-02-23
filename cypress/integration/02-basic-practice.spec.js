/// <reference types="cypress" />

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test="new-item-input"]').type("Flight tickets")
      cy.get('[data-test="add-item"]').click()

      cy.contains("Flight tickets");
    });

    it('should put a new item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type("Flight tickets")
      cy.get('[data-test="add-item"]').click()

      cy.get('[data-test="items-unpacked"]').contains("Flight tickets");  
    });

    it('should put a new item as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type("Flight tickets")
      cy.get('[data-test="add-item"]').click()

      cy.get('[data-test="items-unpacked"] li').last().contains("Flight tickets");
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="new-item-input"]').type("food for cat");
      cy.get('[data-test="add-item"]').click();
      cy.get('[data-test="filter-items"]').type("food");
      cy.get('[data-test="items-unpacked"]').contains("food");
    });
    

    it('should hide items that do not match whatever is in the filter field', () => {
      cy.get('[data-test="new-item-input"]').type("food for cat");
      cy.get('[data-test="add-item"]').click();
      cy.get('[data-test="filter-items"]').type("food");
      cy.get('[data-test="items-unpacked"]').contains("tooth").should('not.exist')
    });
      
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
      cy.get('[data-test="remove-all"]').click();
      cy.get('[data-test="items-unpacked"] li').should('not.exist')
      });
      
    });

    describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items-unpacked"] li [data-test="remove"]').should('exist');
      });

      it('should remove an item from the page', () => {
        const item = 'Flight tickets'

        cy.get('[data-test="new-item-input"]').type(item)
        cy.get('[data-test="add-item"]').click()
        
        cy.get('[data-test="items-unpacked"] li [data-test="remove"]').last().click()
        cy.get('[data-test="items-unpacked"] li').contains(item).should('not.exist');
        
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();
      cy.get('[data-test="items-packed"] li').should('not.exist');
    });

    it('should empty have all of the items in the "Unpacked" list', () => {
      cy.get('#jetsetter-application li').then(elements => {
        cy.get('[data-test="mark-all-as-unpacked"]').click() 
        cy.get('[data-test="items-unpacked"] li').should('have.length', elements.length);
      })
    });
  });

  describe('Mark individual item as packed', () => {
    it('should move an individual item from "Unpacked" to "Packed"', () => {
      cy.get('[data-test="items-unpacked"] li').each(element => {
        cy.wrap(element).find('input').click();
      })
      cy.get('[data-test="items-unpacked"] li').should('not.exist');
    });
  });
});
