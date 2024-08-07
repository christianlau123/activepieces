import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const disableSaasForLocations = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'disableSaasForLocations',
  displayName: 'disable saas for locations',
  description: 'Disable SaaS for locations for given locationIds',
  props: {
    locationIds: Property.Array({
      displayName: 'Location IDS',
      required: true,
      defaultValue: []
    })
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    const build_body = {
      locationIds: parameters.locationIds
    }
    //https://highlevel.stoplight.io/docs/integrations/ae2bab1a54b4b-disable-saa-s-for-locations
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.POST,
      url: setting.baseUrl+'/saas-api/public-api/bulk-disable-saas/'+parameters.auth.companyId,
      body: build_body,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-04-15',
        channel: 'OAUTH',
        source: 'INTEGRATION'
      },
    });

    return {saas: res.body};
  },
});
