import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const lookupCalendars = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'lookupCalendars',
  displayName: 'lookup Calendars',
  description: 'Get all calendars of credentials sub-account location.',
  props: {// https://highlevel.stoplight.io/docs/integrations/e55dec1be7bee-get-calendars
    groupId: Property.ShortText({
      displayName: 'Group ID',
      description: 'Group Id',
      required: false
    }),
    showDrafted: Property.Checkbox({
      displayName: 'Show Drafted',
      description: 'Show drafted',
      required: false,
      defaultValue: true
    })
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    
    let query_params = '?locationId='+parameters.auth.locationId;
    if (parameters.groupId != undefined)
      query_params += '&groupId='+parameters.groupId;

    if (parameters.showDrafted != undefined)
      query_params += '&showDrafted='+parameters.showDrafted;

    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: setting.baseUrl+'/calendars/'+query_params,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-04-15'
      },
    });

    return {calendars: res.body};
  }
});
