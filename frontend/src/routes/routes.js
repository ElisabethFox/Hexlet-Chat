const apiPath = '/api/v1';

const chatContextRoutes = {
  login: () => [apiPath, 'login'].join('/'),
  signup: () => [apiPath, 'signup'].join('/'),
  data: () => [apiPath, 'data'].join('/'),
};

const appRoutes = {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signupPagePath: () => '/signup',
};

export { chatContextRoutes, appRoutes };
