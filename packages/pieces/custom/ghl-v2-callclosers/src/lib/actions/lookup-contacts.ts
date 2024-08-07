import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const lookupContacts = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'lookupContacts',
  displayName: 'lookup Contacts',
  description: 'Get Contacts of sub-account credentials locations',
  props: {
    query: Property.ShortText({
      displayName: 'Query',
      description: 'The search term for the contact is matched based on the contact full name, email or phone',
      required: false
    }),
    contactId: Property.ShortText({
      displayName: 'Contact ID',
      description: 'Using The ID to find single contact',
      required: false
    }),
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    // if id not exists https://highlevel.stoplight.io/docs/integrations/ab55933a57f6f-get-contacts
    // if id exists https://highlevel.stoplight.io/docs/integrations/00c5ff21f0030-get-contact
    let query_params = '?locationId='+parameters.auth.locationId;
    if (parameters.contactId == undefined){
      if (parameters.query != undefined){
        query_params += '&query='+parameters.query;
      }
    }else
      query_params = '';

    const path_url = parameters.contactId != undefined ? '/'+parameters.contactId : '/';
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: setting.baseUrl+'/contacts'+path_url+query_params,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {contacts: res.body};
  }
});
