function authInterceptor(API, auth, $location) {
}

services
  .factory('AuthInterceptor', authInterceptor)
  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  }])

