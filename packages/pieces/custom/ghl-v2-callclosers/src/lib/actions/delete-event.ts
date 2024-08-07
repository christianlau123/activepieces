import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const deleteEvent = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'deleteEvent',
  displayName: 'delete event',
  description: 'Delete event by ID',
  props: {
    eventId: Property.ShortText({
      displayName: 'eventId',
      required: true
    })
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    // https://highlevel.stoplight.io/docs/integrations/96b85108e6d3b-delete-event
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.DELETE,
      url: setting.baseUrl+'/calendars/events/'+parameters.eventId,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-04-15'
      },
    });

    return {calendar_event: res.body};
  },
});
