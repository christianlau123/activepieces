import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

// = In Progress
export const createUser = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'createUser',
  displayName: 'create user',
  description: 'create user',
  props: {
    firstName: Property.ShortText({
      displayName: 'First Name',
      description: 'First Name',
      required: true
    }),
    lastName: Property.ShortText({
      displayName: 'Last Name',
      description: 'Last Name',
      required: true
    }),
    email: Property.ShortText({
      displayName: 'Email',
      description: 'Email',
      required: true
    }),
    password: Property.ShortText({
      displayName: 'Password',
      description: 'Password',
      required: true
    }),
    phone: Property.ShortText({
      displayName: 'Phone',
      description: 'Phone',
      required: false
    }),
    type: Property.StaticDropdown({
      displayName: 'User Type',
      description: 'User Type',
      required: true,
      options: {
        options: [
          {label: 'Agency', value: 'agency'},
          {label: 'Account', value: 'account'},
        ]
      }
    }),
    role: Property.StaticDropdown({
      displayName: 'User Role',
      description: 'User Role',
      required: true,
      options: {
        options: [
          {label: 'Admin', value: 'admin'},
          {label: 'User', value: 'user'},
        ]
      }
    }),
    locationIds: Property.Array({
      displayName: 'Location IDS',
      description: 'Location IDS ["C2QujeCh8ZnC7al2InWR"]',
      required: true,
      defaultValue: []
    }),
    profilePhoto: Property.ShortText({
      displayName: 'Profile Photo',
      description: 'Profile Photo',
      required: false
    }),
    permissions: Property.Json({
      displayName: 'Permissions',
      description: 'Enter JSON permissions',
      required: true,
      defaultValue: {}
    })
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    // https://highlevel.stoplight.io/docs/integrations/cf3f982337757-create-user
    const build_body = {
      ...(parameters.firstName == undefined ? {} : {firstName: parameters.firstName}),
      ...(parameters.lastName == undefined ? {} : {lastName: parameters.lastName}),
      ...(parameters.email == undefined ? {} : {email: parameters.email}),
      ...(parameters.phone == undefined ? {} : {phone: parameters.phone}),
      ...(parameters.type == undefined ? {} : {type: parameters.type}),
      ...(parameters.role == undefined ? {} : {role: parameters.role}),
      ...((parameters.locationIds == undefined || parameters.locationIds.length < 1) ? {} : {locationIds: parameters.locationIds}),
      ...(parameters.profilePhoto == undefined ? {} : {profilePhoto: parameters.profilePhoto}),
      ...{permissions: parameters.permissions},
      ...((parameters.locationIds == undefined || parameters.locationIds.length < 1) ? {} : {locationIds: parameters.locationIds}),
      ...{companyId: parameters.auth.companyId}
    }
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.POST,
      url: setting.baseUrl+'/users/',
      body: build_body,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {user: res.body};
  }
});
