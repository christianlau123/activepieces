import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const lookupCalendarEvents = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'lookupCalendarEvents',
  displayName: 'lookup calendar events',
  description: 'Get Calendar Events',
  props: {
    calendarId: Property.ShortText({
      displayName: 'Calendar ID',
      description: 'Either of calendarId, userId or groupId is required',
      required: false
    }),
    groupId: Property.ShortText({
      displayName: 'Group ID',
      description: 'Either of groupId, calendarId or userId is required',
      required: false
    }),
    userId: Property.ShortText({
      displayName: 'User ID',
      description: 'User Id - Owner of an appointment. Either of userId, groupId or calendarId is required',
      required: false
    }),
    endTime: Property.ShortText({
      displayName: 'End Time',
      description: 'End Time (in millis)',
      required: true
    }),
    startTime: Property.ShortText({
      displayName: 'Start Time',
      description: 'Start Time (in millis)',
      required: true
    }),
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    //https://highlevel.stoplight.io/docs/integrations/a83f44a3112a4-get-calendar-events
    let query_params = '?locationId='+parameters.auth.locationId+'&startTime='+parameters.startTime+'&endTime='+parameters.endTime;
    if (parameters.calendarId != undefined)
      query_params += '&calendarId='+parameters.calendarId;

    if (parameters.groupId != undefined)
      query_params += '&groupId='+parameters.groupId;

    if (parameters.userId != undefined)
      query_params += '&userId='+parameters.userId;

    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: setting.baseUrl+'/calendars/events'+query_params,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-04-15'
      },
    });

    return {calendar_events: res.body};
  }
});
