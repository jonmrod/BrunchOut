function AccountService($http, API, $window, $rootScope) {
  var self = this;

  self.editAccount = function (fName, lName, title, accountId) {
    return $http.post(API + '/api/account/edit', {
      firstName: fName,
      lastName: lName,
      title: title
    })
  }

  self.getCurrentAccount = function() {
    return {
      firstName: $window.localStorage['currentAccount.firstName'], 
      lastName: $window.localStorage['currentAccount.lastName'], 
      email: $window.localStorage['currentAccount.email'],
      role: $window.localStorage['currentAccount.role'],
      img: $window.localStorage['currentAccount.img'],
      accountId: $window.localStorage['currentAccount.accountId']
    }
  }

}
services
  .service('Account', AccountService)