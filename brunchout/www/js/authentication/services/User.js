function userService($http, API, $window, auth) {

  var self = this;

  self.login = function(email, password) {
    return $http.post(API + '/authenticate', {
        email: email,
        password: password
    })
  }
  self.saveUser = function(account){
    $window.localStorage['currentAccount.firstName'] = account[0].fName;
    $window.localStorage['currentAccount.lastName'] = account[0].lName;
    $window.localStorage['currentAccount.email'] = account[0].email;
    $window.localStorage['currentAccount.role'] = account[0].role;
    $window.localStorage['currentAccount.img'] = account[0].img;
    $window.localStorage['currentAccount.accountId'] = account[0]._id;
  }

  self.logout = function(){
    return auth.logout();
  }    
}

services
  .service('User', userService)


