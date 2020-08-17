export const webAPIUrl = 'https://localhost:44310';

export const authSettings = {
  domain: 'dev-0ib3-8bj.eu.auth0.com',
  client_id: 'LRSvVUMKn4Ipnod063ztBmWeyIXj0hSV',
  redirect_uri: window.location.origin + '/signin-callback',
  scope: 'openid profile QandAAPI email',
  audience: 'http://localhost:3000/',
};
