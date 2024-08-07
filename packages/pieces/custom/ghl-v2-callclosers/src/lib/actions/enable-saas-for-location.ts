import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const enableSaasForLocation = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'enableSaasForLocation',
  displayName: 'enable saas for location',
  description: 'enable saas for sub-account location',
  props: {
    stripeCustomerId: Property.ShortText({
      displayName: 'Stripe Customer Id',
      required: true
    }),
    stripeAccountId: Property.ShortText({
      displayName: 'Stripe Account Id',
      required: true
    }),
    name: Property.ShortText({
      displayName: 'Name',
      required: true
    }),
    email: Property.ShortText({
      displayName: 'Email',
      required: true
    })
  },
  async run(context) {
    // https://highlevel.stoplight.io/docs/integrations/3ed6984d6d3d3-update-saa-s-subscription
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    const build_body = {
      stripeCustomerId: parameters.stripeCustomerId,
      stripeAccountId: parameters.stripeAccountId,
      name: parameters.name,
      email: parameters.email,
      companyId: parameters.auth.companyId
    }
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.POST,
      url: setting.baseUrl+'/saas-api/public-api/enable-saas/'+parameters.auth.locationId,
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
