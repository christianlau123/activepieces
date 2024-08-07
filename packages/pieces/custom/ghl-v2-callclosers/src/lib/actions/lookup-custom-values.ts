import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const lookupCustomValues = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'lookupCustomValues',
  displayName: 'lookup Custom Values',
  description: 'Get Custom Values of sub-account credentials locations',
  props: {},
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    // https://highlevel.stoplight.io/docs/integrations/d40742c5e3e7d-get-custom-values
    const path_url = '/'+parameters.auth.locationId;
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: setting.baseUrl+'/locations'+path_url+'/customValues',
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {custom_values: res.body};
  }
});
