export const campaignsPage = {
  navigateToList() {
    cy.visit('/campaigns');
    cy.contains('Campaigns', { timeout: 10000 }).should('be.visible');
  },

  clickAddNewCampaign() {
    cy.contains('Add New Campaign', { timeout: 10000 })
      .should('be.visible')
      .click();
  },

  fillForm(campaignData) {
    cy.get('input[name="campaign[name]"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(campaignData.name);

    cy.get('input[name="campaign[description]"]', { timeout: 10000 })
      .should('be.visible')
      .clear()
      .type(campaignData.description);

    if (campaignData.type) {
      if (campaignData.type === 'one_time') {
        cy.get('input[type="radio"][value="one_time"]', { timeout: 10000 })
          .should('be.visible')
          .check();
      } else if (campaignData.type === 'repeatable') {
        cy.get('input[type="radio"][value="repeatable"]', { timeout: 10000 })
          .should('be.visible')
          .check();
      }
    }
  },

  submitCreate() {
    cy.get('input[type="submit"][value="Create Campaign"]', { timeout: 10000 })
      .should('be.visible')
      .click();
  },

  submitUpdate() {
    cy.get('input[type="submit"][value="Update Campaign"]', { timeout: 10000 })
      .should('be.visible')
      .click();
  },

  clickEditFirstCampaign() {
    cy.get('table tbody tr:first-child', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.get('a').contains('Edit').click();
      });
  },

  verifyCampaignExists(campaignName) {
    cy.contains(campaignName, { timeout: 10000 }).should('be.visible');
  },

  deleteFirstCampaign() {
    cy.get('table tbody tr:first-child', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.contains('Delete').click();
      });
    
    cy.get('body').then(($body) => {
      if ($body.find('[data-confirm]').length > 0) {
        cy.window().then((win) => {
          cy.stub(win, 'confirm').returns(true);
        });
      }
    });
  },

  deleteCampaignByName(campaignName) {
    cy.get('body').then(($body) => {
      if ($body.find('table tbody tr').length > 0) {
        cy.window().then((win) => {
          cy.stub(win, 'confirm').as('confirmStub').returns(true);
        });
        
        cy.get('table tbody tr').contains(campaignName).parent('tr').within(() => {
          cy.contains('Destroy').click();
        });
        
        cy.wait(2000);
        cy.get('@confirmStub').should('have.been.called');
      }
    });
  },

  clickEditCampaignByName(campaignName) {
    cy.get('table tbody tr', { timeout: 10000 }).each(($row) => {
      cy.wrap($row).within(() => {
        cy.get('td').first().then(($nameCell) => {
          if ($nameCell.text().trim() === campaignName) {
            cy.contains('Edit').click();
          }
        });
      });
    });
  },

  createNewCampaign(campaignData) {
    this.clickAddNewCampaign();
    this.fillForm(campaignData);
    this.submitCreate();
  },

  editCampaign(originalName, updatedData) {
    this.clickEditCampaignByName(originalName);
    this.fillForm(updatedData);
    this.submitUpdate();
  },

  verifySuccessMessage() {
    cy.contains('Campaign was successfully created.').should('be.visible');
  },

  verifyUpdateMessage() {
    cy.contains('Campaign was successfully updated', { timeout: 3000 }).should('be.visible');
  },
};
