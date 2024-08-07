import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

// https://highlevel.stoplight.io/docs/integrations/52e75431abf04-update-user
export const updateUser = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'updateUser',
  displayName: 'update user',
  description: 'Update User',
  props: {
    userId: Property.ShortText({
      displayName: 'User ID',
      description: 'User ID',
      required: true
    }),
    firstName: Property.ShortText({
      displayName: 'First Name',
      description: 'First Name',
      required: false
    }),
    lastName: Property.ShortText({
      displayName: 'Last Name',
      description: 'Last Name',
      required: false
    }),
    phone: Property.ShortText({
      displayName: 'Phone',
      description: 'Phone',
      required: false
    }),
    type: Property.StaticDropdown({
      displayName: 'User Type',
      description: 'User Type',
      required: false,
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
      required: false,
      options: {
        options: [
          {label: 'Admin', value: 'admin'},
          {label: 'User', value: 'user'},
        ]
      }
    }),
    locationIds: Property.Array({
      displayName: 'Location IDS',
      description: 'Location IDS',
      required: false,
      defaultValue: []
    }),
    profilePhoto: Property.ShortText({
      displayName: 'Profile Photo',
      description: 'Profile Photo',
      required: false
    }),
    permissions: Property.Json({
      displayName: 'Permissions',
      description: 'Enter JSON data',
      required: false,
      defaultValue: {}
    })
  },
  async run(context) {
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    // https://highlevel.stoplight.io/docs/integrations/52e75431abf04-update-user
    const build_body = {
      ...(parameters.firstName == undefined ? {} : {firstName: parameters.firstName}),
      ...(parameters.lastName == undefined ? {} : {lastName: parameters.lastName}),
      ...(parameters.phone == undefined ? {} : {phone: parameters.phone}),
      ...(parameters.type == undefined ? {} : {type: parameters.type}),
      ...(parameters.role == undefined ? {} : {role: parameters.role}),
      ...((parameters.locationIds == undefined || parameters.locationIds.length < 1) ? {} : {locationIds: parameters.locationIds}),
      ...(parameters.profilePhoto == undefined ? {} : {profilePhoto: parameters.profilePhoto}),
      ...((parameters.permissions == undefined || Object.keys(parameters.permissions).length < 1) ? {} : {permissions: parameters.permissions})
    }
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.PUT,
      url: setting.baseUrl+'/users/'+parameters.userId,
      body: build_body,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {user: res.body};
  }
});
