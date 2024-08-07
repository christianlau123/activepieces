import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const addContactToCampaign = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'addContactToCampaign',
  displayName: 'add contact to campaign',
  description: 'Add Contact to Campaign',
  props: {
    contactId: Property.ShortText({
      displayName: 'Contact ID',
      required: true
    }),
    campaignId: Property.ShortText({
      displayName: 'Campaign ID',
      required: true
    })
  },
  async run(context) {
    // https://highlevel.stoplight.io/docs/integrations/ecf9b5b45deaf-add-contact-to-campaign
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);
    
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.POST,
      url: setting.baseUrl+'/contacts/'+parameters.contactId+'/campaigns/'+parameters.campaignId,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {status: res.body};
  },
});
