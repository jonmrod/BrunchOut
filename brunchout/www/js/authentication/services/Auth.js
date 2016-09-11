function authService($window) {
  var self = this;
  //remove token
  self.logout = function() {
    $window.localStorage.removeItem(['currentAccount.firstName']);
    $window.localStorage.removeItem(['currentAccount.lastName']);
    $window.localStorage.removeItem(['currentAccount.email']);
    $window.localStorage.removeItem(['currentAccount.role']);
    $window.localStorage.removeItem(['currentAccount.img']);
    $window.localStorage.removeItem(['currentAccount.accountId']);
  }
}

services
  .service('auth', authService)


