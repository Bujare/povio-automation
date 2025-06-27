import { campaignsPage } from '../support/pages/campaigns';

describe('Campaigns', () => {
  let createdCampaignNames = [];

  afterEach(() => {
    if (createdCampaignNames.length > 0) {
      cy.login();
      campaignsPage.navigateToList();
      createdCampaignNames.forEach(campaignName => {
        cy.get('body').then(($body) => {
          if ($body.text().includes(campaignName)) {
            campaignsPage.deleteCampaignByName(campaignName);
          }
        });
      });
      createdCampaignNames = [];
    }
  });

  it('should add new campaign as logged-in user', () => {
    cy.login();
    campaignsPage.navigateToList();
    
    const campaignData = {
      name: `Test Campaign ${Date.now()}`,
      description: 'Test campaign description',
      type: 'repeatable'
    };

    campaignsPage.createNewCampaign(campaignData);
    campaignsPage.verifySuccessMessage();
    campaignsPage.verifyCampaignExists(campaignData.name);

    createdCampaignNames.push(campaignData.name);
  });

  it('should edit existing campaign as logged-in user', () => {
    cy.login();
    campaignsPage.navigateToList();
    
    const originalData = {
      name: `Original Test Campaign ${Date.now()}`,
      description: 'Original test description',
      type: 'one_time'
    };

    campaignsPage.createNewCampaign(originalData);
    campaignsPage.verifySuccessMessage();
    campaignsPage.navigateToList();

    const updatedData = {
      name: `Updated Test Campaign ${Date.now()}`,
      description: 'Updated test description',
      type: 'repeatable'
    };

    campaignsPage.editCampaign(originalData.name, updatedData);
    campaignsPage.verifyUpdateMessage();
    
    createdCampaignNames.push(updatedData.name);
  });
});
