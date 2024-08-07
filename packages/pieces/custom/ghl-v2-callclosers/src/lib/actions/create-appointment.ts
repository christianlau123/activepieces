import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { createAction, Property } from '@activepieces/pieces-framework';

export const createAppointment = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'createAppointment',
  displayName: 'create appointment',
  description: 'Create Appointment',
  props: {
    contactId: Property.ShortText({
      displayName: 'Contact ID',
      required: true
    }),
    calendarId: Property.ShortText({
      displayName: 'Calendar ID',
      required: true
    }),
    startTime: Property.ShortText({
      displayName: 'Start Time',
      description: '2021-06-23T03:30:00+05:30',
      required: true
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
    assignedUserId: Property.ShortText({
      displayName: 'Assigned UserId',
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
    //https://highlevel.stoplight.io/docs/integrations/4c8362223c17b-create-contact
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    const build_body = {
      ...{calendarId: parameters.calendarId},
      ...{locationId: parameters.auth.locationId},
      ...{contactId: parameters.contactId},
      ...{startTime: parameters.startTime},
      ...(parameters.endTime == undefined ? {} : {endTime: parameters.endTime}),
      ...(parameters.title == undefined ? {} : {title: parameters.title}),
      ...(parameters.appointmentStatus == undefined ? {} : {appointmentStatus: parameters.appointmentStatus}),
      ...(parameters.assignedUserId == undefined ? {} : {assignedUserId: parameters.assignedUserId}),
      ...(parameters.address == undefined ? {} : {address: parameters.address}),
      ...(parameters.ignoreDateRange == undefined ? {} : {ignoreDateRange: parameters.ignoreDateRange}),
      ...(parameters.toNotify == undefined ? {} : {toNotify: parameters.toNotify})
    }
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.POST,
      url: setting.baseUrl+'/calendars/events/appointments',
      body: build_body,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-04-15'
      },
    });

    return {appointment: res.body};
  },
});
