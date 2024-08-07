import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const updateSaasSubscription = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'updateSaasSubscription',
  displayName: 'update saas subscription',
  description: 'Update SaaS subscription for given customerId, locationId is based on credentials. ex vshred, nyc-user-test',
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
    // https://highlevel.stoplight.io/docs/integrations/3ed6984d6d3d3-update-saa-s-subscription
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    const build_body = {
      customerId: parameters.customerId,
      subscriptionId: parameters.subscriptionId,
      locationId: parameters.auth.locationId,
      companyId: parameters.auth.companyId
    }
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.PUT,
      url: setting.baseUrl+'/saas-api/public-api/update-saas-subscription/'+parameters.userId,
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
