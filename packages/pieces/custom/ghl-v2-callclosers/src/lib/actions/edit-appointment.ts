import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const editAppointment = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'editAppointment',
  displayName: 'edit appointment',
  description: 'Edit appointment by ID',
  props: {
    eventId: Property.ShortText({
      displayName: 'Event ID',
      required: true
    }),
    calendarId: Property.ShortText({
      displayName: 'Calendar ID',
      required: false
    }),
    startTime: Property.ShortText({
      displayName: 'Start Time',
      description: '2021-06-23T03:30:00+05:30',
      required: false
    }),
    endTime: Property.ShortText({
      displayName: 'End Time',
      description: '2021-06-23T03:30:00+05:30',
      required: false
    }),
    address: Property.ShortText({
      displayName: 'Address',
      required: false
    }),
    appointmentStatus: Property.StaticDropdown({
      displayName: 'Appointment Status',
      required: false,
      options: {
        options: [{label: 'new', value: 'new'}, {label: 'confirmed', value: 'confirmed'}, {label: 'cancelled', value: 'cancelled'}, {label: 'showed', value: 'showed'}, {label: 'noshow', value: 'noshow'}, {label: 'invalid', value: 'invalid'}]
      }
    }),
    ignoreDateRange: Property.Checkbox({
        displayName: 'Ignore Date Range',
        required: false,
    }),
    toNotify: Property.Checkbox({
      displayName: 'To Notify',
      required: false,
    }),
  },
  async run(context) {
    //https://highlevel.stoplight.io/docs/integrations/3a1380a3a9df8-edit-appointment
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    const build_body = {
      ...(parameters.calendarId == undefined ? {} : {calendarId: parameters.calendarId}),
      ...(parameters.startTime == undefined ? {} : {startTime: parameters.startTime}),
      ...(parameters.endTime == undefined ? {} : {endTime: parameters.endTime}),
      ...(parameters.title == undefined ? {} : {title: parameters.title}),
      ...(parameters.appointmentStatus == undefined ? {} : {appointmentStatus: parameters.appointmentStatus}),
      ...(parameters.address == undefined ? {} : {address: parameters.address}),
      ...(parameters.ignoreDateRange == undefined ? {} : {ignoreDateRange: parameters.ignoreDateRange}),
      ...(parameters.toNotify == undefined ? {} : {toNotify: parameters.toNotify})
    }
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.PUT,
      url: setting.baseUrl+'/calendars/events/appointments/'+parameters.eventId,
      body: build_body,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {contact: res.body};
  },
});
