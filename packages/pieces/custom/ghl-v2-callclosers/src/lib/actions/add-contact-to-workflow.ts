import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';

export const addContactToWorkflow = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'addContactToWorkflow',
  displayName: 'add contact to workflow',
  description: 'Add Contact to Workflow',
  props: {
    contactId: Property.ShortText({
      displayName: 'Contact ID',
      required: true
    }),
    workflowId: Property.ShortText({
      displayName: 'Workflow ID',
      required: true
    }),
    eventStartTime: Property.ShortText({
      displayName: 'Event Start Time',
      description: '2021-06-23T03:30:00+01:00',
      required: false
    }),
  },
  async run(context) {
    // https://highlevel.stoplight.io/docs/integrations/fe0f421553a9e-add-contact-to-workflow
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);
    const build_body = {
      ...(parameters.eventStartTime == undefined ? {} : {eventStartTime: parameters.eventStartTime}),
    }
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.POST,
      url: setting.baseUrl+'/contacts/'+parameters.contactId+'/workflow/'+parameters.workflowId,
      body: build_body,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {status: res.body};
  },
});
