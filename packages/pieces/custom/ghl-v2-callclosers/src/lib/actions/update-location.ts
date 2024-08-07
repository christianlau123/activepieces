import { createAction, Property } from '@activepieces/pieces-framework';
import { defaultSetting } from '../../index';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';

export const updateLocation = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'updateLocation',
  displayName: 'update location',
  description: 'Update Location of sub-account location credentials. ex: vshred, nyc-user-test',
  props: {
    name: Property.ShortText({
      displayName: 'Name',
      description: 'The name for the sub-account/location',
      required: false
    }),
    phone: Property.ShortText({
      displayName: 'Phone',
      description: 'The phone number of the business for which sub-account is created',
      required: false
    }),
    address: Property.ShortText({
      displayName: 'Address',
      description: 'The address of the business for which sub-account is created',
      required: false
    }),
    city: Property.ShortText({
      displayName: 'City',
      description: 'The city where the business is located for which sub-account is created',
      required: false
    }),
    state: Property.ShortText({
      displayName: 'State',
      description: 'The state in which the business operates for which sub-account is created',
      required: false
    }),
    country: Property.StaticDropdown({
      displayName: 'Country',
      description: 'Country',
      required: false,
      options: {
        options: [{label: 'AF', value: 'AF'}, {label: 'AX', value: 'AX'}, {label: 'AL', value: 'AL'}, {label: 'DZ', value: 'DZ'}, {label: 'AS', value: 'AS'}, {label: 'AD', value: 'AD'}, {label: 'AO', value: 'AO'}, {label: 'AI', value: 'AI'}, {label: 'AQ', value: 'AQ'}, {label: 'AG', value: 'AG'}, {label: 'AR', value: 'AR'}, {label: 'AM', value: 'AM'}, {label: 'AW', value: 'AW'}, {label: 'AU', value: 'AU'}, {label: 'AT', value: 'AT'}, {label: 'AZ', value: 'AZ'}, {label: 'BS', value: 'BS'}, {label: 'BH', value: 'BH'}, {label: 'BD', value: 'BD'}, {label: 'BB', value: 'BB'}, {label: 'BY', value: 'BY'}, {label: 'BE', value: 'BE'}, {label: 'BZ', value: 'BZ'}, {label: 'BJ', value: 'BJ'}, {label: 'BM', value: 'BM'}, {label: 'BT', value: 'BT'}, {label: 'BO', value: 'BO'}, {label: 'BA', value: 'BA'}, {label: 'BW', value: 'BW'}, {label: 'BV', value: 'BV'}, {label: 'BR', value: 'BR'}, {label: 'IO', value: 'IO'}, {label: 'BN', value: 'BN'}, {label: 'BG', value: 'BG'}, {label: 'BF', value: 'BF'}, {label: 'BI', value: 'BI'}, {label: 'KH', value: 'KH'}, {label: 'CM', value: 'CM'}, {label: 'CA', value: 'CA'}, {label: 'CV', value: 'CV'}, {label: 'KY', value: 'KY'}, {label: 'CF', value: 'CF'}, {label: 'TD', value: 'TD'}, {label: 'CL', value: 'CL'}, {label: 'CN', value: 'CN'}, {label: 'CX', value: 'CX'}, {label: 'CC', value: 'CC'}, {label: 'CO', value: 'CO'}, {label: 'KM', value: 'KM'}, {label: 'CG', value: 'CG'}, {label: 'CD', value: 'CD'}, {label: 'CK', value: 'CK'}, {label: 'CR', value: 'CR'}, {label: 'CI', value: 'CI'}, {label: 'HR', value: 'HR'}, {label: 'CU', value: 'CU'}, {label: 'CY', value: 'CY'}, {label: 'CZ', value: 'CZ'}, {label: 'DK', value: 'DK'}, {label: 'DJ', value: 'DJ'}, {label: 'DM', value: 'DM'}, {label: 'DO', value: 'DO'}, {label: 'EC', value: 'EC'}, {label: 'EG', value: 'EG'}, {label: 'SV', value: 'SV'}, {label: 'GQ', value: 'GQ'}, {label: 'ER', value: 'ER'}, {label: 'EE', value: 'EE'}, {label: 'ET', value: 'ET'}, {label: 'FK', value: 'FK'}, {label: 'FO', value: 'FO'}, {label: 'FJ', value: 'FJ'}, {label: 'FI', value: 'FI'}, {label: 'FR', value: 'FR'}, {label: 'GF', value: 'GF'}, {label: 'PF', value: 'PF'}, {label: 'TF', value: 'TF'}, {label: 'GA', value: 'GA'}, {label: 'GM', value: 'GM'}, {label: 'GE', value: 'GE'}, {label: 'DE', value: 'DE'}, {label: 'GH', value: 'GH'}, {label: 'GI', value: 'GI'}, {label: 'GR', value: 'GR'}, {label: 'GL', value: 'GL'}, {label: 'GD', value: 'GD'}, {label: 'GP', value: 'GP'}, {label: 'GU', value: 'GU'}, {label: 'GT', value: 'GT'}, {label: 'GG', value: 'GG'}, {label: 'GN', value: 'GN'}, {label: 'GW', value: 'GW'}, {label: 'GY', value: 'GY'}, {label: 'HT', value: 'HT'}, {label: 'HM', value: 'HM'}, {label: 'VA', value: 'VA'}, {label: 'HN', value: 'HN'}, {label: 'HK', value: 'HK'}, {label: 'HU', value: 'HU'}, {label: 'IS', value: 'IS'}, {label: 'IN', value: 'IN'}, {label: 'ID', value: 'ID'}, {label: 'IR', value: 'IR'}, {label: 'IQ', value: 'IQ'}, {label: 'IE', value: 'IE'}, {label: 'IM', value: 'IM'}, {label: 'IL', value: 'IL'}, {label: 'IT', value: 'IT'}, {label: 'JM', value: 'JM'}, {label: 'JP', value: 'JP'}, {label: 'JE', value: 'JE'}, {label: 'JO', value: 'JO'}, {label: 'KZ', value: 'KZ'}, {label: 'KE', value: 'KE'}, {label: 'KI', value: 'KI'}, {label: 'KP', value: 'KP'}, {label: 'KR', value: 'KR'}, {label: 'XK', value: 'XK'}, {label: 'KW', value: 'KW'}, {label: 'KG', value: 'KG'}, {label: 'LA', value: 'LA'}, {label: 'LV', value: 'LV'}, {label: 'LB', value: 'LB'}, {label: 'LS', value: 'LS'}, {label: 'LR', value: 'LR'}, {label: 'LY', value: 'LY'}, {label: 'LI', value: 'LI'}, {label: 'LT', value: 'LT'}, {label: 'LU', value: 'LU'}, {label: 'MO', value: 'MO'}, {label: 'MK', value: 'MK'}, {label: 'MG', value: 'MG'}, {label: 'MW', value: 'MW'}, {label: 'MY', value: 'MY'}, {label: 'MV', value: 'MV'}, {label: 'ML', value: 'ML'}, {label: 'MT', value: 'MT'}, {label: 'MH', value: 'MH'}, {label: 'MQ', value: 'MQ'}, {label: 'MR', value: 'MR'}, {label: 'MU', value: 'MU'}, {label: 'YT', value: 'YT'}, {label: 'MX', value: 'MX'}, {label: 'FM', value: 'FM'}, {label: 'MD', value: 'MD'}, {label: 'MC', value: 'MC'}, {label: 'MN', value: 'MN'}, {label: 'ME', value: 'ME'}, {label: 'MS', value: 'MS'}, {label: 'MA', value: 'MA'}, {label: 'MZ', value: 'MZ'}, {label: 'MM', value: 'MM'}, {label: 'NA', value: 'NA'}, {label: 'NR', value: 'NR'}, {label: 'NP', value: 'NP'}, {label: 'NL', value: 'NL'}, {label: 'AN', value: 'AN'}, {label: 'NC', value: 'NC'}, {label: 'NZ', value: 'NZ'}, {label: 'NI', value: 'NI'}, {label: 'NE', value: 'NE'}, {label: 'NG', value: 'NG'}, {label: 'NU', value: 'NU'}, {label: 'NF', value: 'NF'}, {label: 'MP', value: 'MP'}, {label: 'NO', value: 'NO'}, {label: 'OM', value: 'OM'}, {label: 'PK', value: 'PK'}, {label: 'PW', value: 'PW'}, {label: 'PS', value: 'PS'}, {label: 'PA', value: 'PA'}, {label: 'PG', value: 'PG'}, {label: 'PY', value: 'PY'}, {label: 'PE', value: 'PE'}, {label: 'PH', value: 'PH'}, {label: 'PN', value: 'PN'}, {label: 'PL', value: 'PL'}, {label: 'PT', value: 'PT'}, {label: 'PR', value: 'PR'}, {label: 'QA', value: 'QA'}, {label: 'RE', value: 'RE'}, {label: 'RO', value: 'RO'}, {label: 'RU', value: 'RU'}, {label: 'RW', value: 'RW'}, {label: 'SH', value: 'SH'}, {label: 'KN', value: 'KN'}, {label: 'LC', value: 'LC'}, {label: 'MF', value: 'MF'}, {label: 'PM', value: 'PM'}, {label: 'VC', value: 'VC'}, {label: 'WS', value: 'WS'}, {label: 'SM', value: 'SM'}, {label: 'ST', value: 'ST'}, {label: 'SA', value: 'SA'}, {label: 'SN', value: 'SN'}, {label: 'RS', value: 'RS'}, {label: 'SC', value: 'SC'}, {label: 'SL', value: 'SL'}, {label: 'SG', value: 'SG'}, {label: 'SX', value: 'SX'}, {label: 'SK', value: 'SK'}, {label: 'SI', value: 'SI'}, {label: 'SB', value: 'SB'}, {label: 'SO', value: 'SO'}, {label: 'ZA', value: 'ZA'}, {label: 'GS', value: 'GS'}, {label: 'ES', value: 'ES'}, {label: 'LK', value: 'LK'}, {label: 'SD', value: 'SD'}, {label: 'SR', value: 'SR'}, {label: 'SJ', value: 'SJ'}, {label: 'SZ', value: 'SZ'}, {label: 'SE', value: 'SE'}, {label: 'CH', value: 'CH'}, {label: 'SY', value: 'SY'}, {label: 'TW', value: 'TW'}, {label: 'TJ', value: 'TJ'}, {label: 'TZ', value: 'TZ'}, {label: 'TH', value: 'TH'}, {label: 'TL', value: 'TL'}, {label: 'TG', value: 'TG'}, {label: 'TK', value: 'TK'}, {label: 'TO', value: 'TO'}, {label: 'TT', value: 'TT'}, {label: 'TN', value: 'TN'}, {label: 'TR', value: 'TR'}, {label: 'TM', value: 'TM'}, {label: 'TC', value: 'TC'}, {label: 'TV', value: 'TV'}, {label: 'UG', value: 'UG'}, {label: 'GB', value: 'GB'}, {label: 'UA', value: 'UA'}, {label: 'AE', value: 'AE'}, {label: 'US', value: 'US'}, {label: 'UM', value: 'UM'}, {label: 'UY', value: 'UY'}, {label: 'UZ', value: 'UZ'}, {label: 'VU', value: 'VU'}, {label: 'VE', value: 'VE'}, {label: 'VN', value: 'VN'}, {label: 'VG', value: 'VG'}, {label: 'VI', value: 'VI'}, {label: 'WF', value: 'WF'}, {label: 'EH', value: 'EH'}, {label: 'YE', value: 'YE'}, {label: 'ZM', value: 'ZM'}, {label: 'ZW', value: 'ZW'}]
      }
    }),
    postalCode: Property.ShortText({
      displayName: 'Postal Code',
      description: 'The postal code of the business for which sub-account is created',
      required: false
    }),
    website: Property.ShortText({
      displayName: 'Website',
      description: 'The website of the business for which sub-account is created',
      required: false
    }),
    timezone: Property.ShortText({
      displayName: 'Timezone',
      description: 'The timezone of the business for which sub-account is created',
      required: false
    }),
    prospectInfo: Property.Json({
      displayName: 'Prospect Info',
      description: 'Check the API Docs',
      required: false,
    }),
    settings: Property.Json({
      displayName: 'Settings',
      description: 'Check the API Docs',
      required: false,
    }),
    social: Property.Json({
      displayName: 'Social',
      description: 'Check the API Docs',
      required: false,
    }),
    twilio: Property.Json({
      displayName: 'Twilio',
      description: 'Check the API Docs',
      required: false,
    }),
    mailgun: Property.Json({
      displayName: 'Mailgun',
      description: 'Check the API Docs',
      required: false,
    }),
    snapshot: Property.Json({
      displayName: 'Snapshot',
      description: 'Check the API Docs',
      required: false,
    })
  },
  async run(context) {
    //https://highlevel.stoplight.io/docs/integrations/cc00a2e3e4d70-put-sub-account-formerly-location
    const setting = defaultSetting(context);
    const parameters = (context.propsValue as any);

    const build_body = {
      ...{companyId: parameters.auth.companyId},
      ...(parameters.name == undefined ? {} : {name: parameters.name}),
      ...(parameters.phone == undefined ? {} : {phone: parameters.phone}),
      ...(parameters.address == undefined ? {} : {address: parameters.address}),
      ...(parameters.city == undefined ? {} : {city: parameters.city}),
      ...(parameters.state == undefined ? {} : {state: parameters.state}),
      ...(parameters.country == undefined ? {} : {country: parameters.country}),
      ...(parameters.postalCode == undefined ? {} : {postalCode: parameters.postalCode}),
      ...(parameters.website == undefined ? {} : {website: parameters.website}),
      ...(parameters.timezone == undefined ? {} : {timezone: parameters.timezone}),
      ...((parameters.prospectInfo == undefined || Object.keys(parameters.prospectInfo).length < 1) ? {} : {prospectInfo: parameters.prospectInfo}),
      ...((parameters.settings == undefined || Object.keys(parameters.settings).length < 1) ? {} : {settings: parameters.settings}),
      ...((parameters.social == undefined || Object.keys(parameters.social).length < 1) ? {} : {social: parameters.social}),
      ...((parameters.twilio == undefined || Object.keys(parameters.twilio).length < 1) ? {} : {twilio: parameters.twilio}),
      ...((parameters.mailgun == undefined || Object.keys(parameters.mailgun).length < 1) ? {} : {mailgun: parameters.mailgun}),
      ...((parameters.snapshot == undefined || Object.keys(parameters.snapshot).length < 1) ? {} : {snapshot: parameters.snapshot})
    }
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.PUT,
      url: setting.baseUrl+'/locations/'+parameters.auth.locationId,
      body: build_body,
      headers: {
        Authorization: setting.headers.Authorization,
        Version: '2021-07-28'
      },
    });

    return {location: res.body};
  },
});
