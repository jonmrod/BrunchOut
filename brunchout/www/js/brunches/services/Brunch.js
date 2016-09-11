function BrunchService($http, API, Account, $rootScope, $window){

  var self = this;

  self.getBrunches = function(){
    return $http.get(API + '/api/brunches');
  };

  self.getBrunchById = function(brunchId) {
    return $http.get(API + '/api/brunches/' + brunchId);
  }

  self.deleteBrunch = function(id) {
    return $http.delete(API + '/api/brunches/' + id);  
  };

  self.submitBrunch = function(type, title, content, location, firstName, accountId, img) {
    return $http.post(API + '/api/brunches', {
      type: type,
      title: title,
      content: content,
      location: location,
      createdBy: firstName,
      idOfCreator: accountId,
      imgOfCreator: img
    })
  }

  self.addNewComment = function(brunchId, comment, userName, img) {
    return $http.post(API + '/api/comment/new', {
      brunchId: brunchId,
      comment: comment,
      userName: userName,
      img: img
    })
  }

  self.upvoteBrunch = function(brunchId) {
    return $http.post(API + '/api/upvoteBrunch/' + brunchId);  
  };

  self.getTeamMates = function(){
    return $http.get(API + '/api/users'); 
  }

}

services
  .service('Brunch', BrunchService)



