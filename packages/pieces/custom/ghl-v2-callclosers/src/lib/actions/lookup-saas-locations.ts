import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const lookupSaasLocations = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'lookupSaasLocations',
  displayName: 'lookup Saas Locations',
  description: 'Get locations by stripeCustomerId or stripeSubscriptionId with companyId',
  props: {
    customerId: Property.ShortText({
      displayName: 'Customer Id',
      required: true
    }),
    subscriptionId: Property.ShortText({
      displayName: 'Subscription ID',
      required: true
    })
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    // if https://highlevel.stoplight.io/docs/integrations/17e63a64621dc-get-locations-by-stripe-id-with-company-id
    const query_params = '?customerId='+parameters.customerId+'&companyId='+parameters.auth.companyId+'&subscriptionId='+parameters.subscriptionId
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: setting.baseUrl+'/saas-api/public-api/locations'+query_params,
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
