import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { defaultSetting } from '../../index';

export const lookupUsers = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'lookupUsers',
  displayName: 'lookup users',
  description: 'lookup users based on query filter or by id of sub-account locations',
  props: {
    query: Property.ShortText({
      displayName: 'Query',
      description: 'The search term for the user is matched based on the user full name, email or phone',
      required: false
    }),
    userId: Property.ShortText({
      displayName: 'User ID',
      description: 'Using The ID to find single user',
      required: false
    })
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    // if id exists use: https://highlevel.stoplight.io/docs/integrations/a815845536249-get-user
    // if id doesnt exists use: https://highlevel.stoplight.io/docs/integrations/6fac93869cd3f-search-users
    const query_params = (parameters.userId != undefined) ? '' : '?query='+parameters.query+'&companyId='+parameters.auth.companyId+'&locationId='+parameters.auth.locationId
    const path_url = (parameters.userId != undefined) ? '/'+ parameters.userId : '/search';
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: setting.baseUrl+'/users'+path_url+query_params,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {users: res.body};
  },
});
