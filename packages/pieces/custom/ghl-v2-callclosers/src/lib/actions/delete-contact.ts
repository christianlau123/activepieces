import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const deleteContact = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'deleteContact',
  displayName: 'delete contact',
  description: 'Delete contact by ID',
  props: {
    contactId: Property.ShortText({
      displayName: 'contactId',
      required: true
    })
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    // https://highlevel.stoplight.io/docs/integrations/96b85108e6d3b-delete-event
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.DELETE,
      url: setting.baseUrl+'/contacts/'+parameters.contactId,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {contact: res.body};
  },
});
