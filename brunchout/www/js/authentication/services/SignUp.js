function signUpService($http, API, auth, $window) {

  var self = this;

  self.createUser = function(fName, lName, email, password) {
    return $http.post(API + '/createuser', {
      fName: fName,
      lName: lName,
      email: email,
      password: password,
      role: 'Hacker',
      img: 'default.jpg'
    })
  }
  self.saveUser = function(account){
    $window.localStorage['currentAccount.firstName'] = account.fName;
    $window.localStorage['currentAccount.lastName'] = account.lName;
    $window.localStorage['currentAccount.email'] = account.email;
    $window.localStorage['currentAccount.role'] = account.role;
    $window.localStorage['currentAccount.img'] = account.img;
    $window.localStorage['currentAccount.accountId'] = account._id;
  }
}

services
  .service('SignUp', signUpService)