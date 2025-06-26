import { campaignsPage } from '../support/pages/campaigns';

describe('Campaigns', () => {
  let createdCampaignNames = [];

  beforeEach(() => {
    cy.login();
    campaignsPage.navigateToList();
  });

  afterEach(() => {
    createdCampaignNames.forEach(campaignName => {
      campaignsPage.deleteCampaignByName(campaignName);
    });
    createdCampaignNames = [];
  });

  it('should create new campaign', () => {
    const campaignData = {
      name: `Test Campaign ${Date.now()}`,
      description: 'Test Campaign Description',
      type: 'one_time',
    };

    campaignsPage.clickAddNewCampaign();
    campaignsPage.fillForm(campaignData);
    campaignsPage.submitCreate();

    cy.contains('Campaign was successfully created.').should('be.visible');
    cy.contains(campaignData.name).should('be.visible');

    createdCampaignNames.push(campaignData.name);
  });

  it('should edit existing campaign', () => {
    const originalCampaignData = {
      name: `Original Campaign ${Date.now()}`,
      description: 'Original Description',
      type: 'one_time',
    };

    const updatedCampaignData = {
      name: `Updated Campaign ${Date.now()}`,
      description: 'Updated Description',
      type: 'repeatable',
    };

    campaignsPage.clickAddNewCampaign();
    campaignsPage.fillForm(originalCampaignData);
    campaignsPage.submitCreate();

    cy.contains('Campaign was successfully created.').should('be.visible');
    createdCampaignNames.push(originalCampaignData.name);

    campaignsPage.clickEditCampaignByName(originalCampaignData.name);
    campaignsPage.fillForm(updatedCampaignData);
    campaignsPage.submitUpdate();

    cy.contains('Campaign was successfully updated.').should('be.visible');
    cy.contains(updatedCampaignData.name).should('be.visible');

    createdCampaignNames.pop();
    createdCampaignNames.push(updatedCampaignData.name);
  });
});
