import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const lookupCalendarDetail = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'lookupCalendarDetail',
  displayName: 'lookup calendar detail',
  description: 'Get calendar by ID',
  props: {
    calendarId: Property.ShortText({
      displayName: 'Calendar ID',
      description: 'Calendar ID',
      required: true
    }),
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    // https://highlevel.stoplight.io/docs/integrations/946f5e91e2532-get-calendar
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: setting.baseUrl+'/calendars/'+parameters.calendarId,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-04-15'
      },
    });

    return {calendar: res.body};
  }
});
