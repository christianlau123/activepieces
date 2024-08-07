import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const lookupLocations = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'lookupLocations',
  displayName: 'lookup Locations',
  description: 'Search Sub-Account (Formerly Location)',
  props: {
    email: Property.ShortText({
      displayName: 'Email',
      description: 'Search for a location via Email Address',
      required: false
    }),
    locationId: Property.ShortText({
      displayName: 'Location',
      description: 'Search for a location via Id',
      required: false
    })
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    // if locationId exists, use: https://highlevel.stoplight.io/docs/integrations/d777490312af4-get-sub-account-formerly-location
    // if email exists, use: https://highlevel.stoplight.io/docs/integrations/12f3fb56990d3-search
    // if both not exists, use: https://highlevel.stoplight.io/docs/integrations/12f3fb56990d3-search
    let query_params = '?companyId='+parameters.auth.companyId;
    if (parameters.email != undefined )
      query_params += '&email='+parameters.email;

    const path_url = (parameters.locationId != undefined) ? '/'+parameters.locationId : '/search';
    if (path_url != '/search')
      query_params = '';
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: setting.baseUrl+'/locations'+path_url+query_params,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {locations: res.body};
  }
});
