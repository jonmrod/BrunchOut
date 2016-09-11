function heroService($http, API, Account, $rootScope, $window){

  var self = this;

  self.getHeroes = function(teamId,type){
    return $http.get(API + '/api/heroes/team/' + teamId + "?type=" + type);
  };

  self.getSortedHeroes = function(teamId, sort){
    return $http.get(API + '/api/heroes/team/' + teamId + "?sortBy=" + sort);
  };

  self.submitNewHero = function(teamId, heroAccountId, content, isPublic) {
    return $http.post(API + '/api/heroes/new', {
      teamId: teamId,
      heroAccountId: heroAccountId,
      content: content,
      isPublic: isPublic
    })
  }

  self.searchHeroes = function(teamId, keyword) {
    return $http.get(API + '/api/heroes/team/' + teamId + "?search=" + keyword);
  }

  self.editHero = function(teamId, heroId, heroAccountId, content, isPublic) {
    return $http.post(API + '/api/heroes/edit', {
      teamId: teamId,
      heroId: heroId,
      heroAccountId: heroAccountId,
      content: content,
      isPublic: isPublic
    })
  }

  self.getHeroById = function(id) {
    return $http.get(API + '/api/heroes/' + id);  
  };

  self.deleteHero = function(id) {
    return $http.delete(API + '/api/heroes/' + id);  
  };

  self.likeHero = function(heroId) {
    return $http.post(API + '/api/heroes/like/' + heroId);  
  };

  self.unlikeHero = function(heroId) {
    return $http.post(API + '/api/heroes/unlike/' + heroId);  
  };     

  self.setCurrentHeroTeamId = function(name){
    if(name == "Team"){
      $window.localStorage['heroes.currentTeamId'] = Account.getCurrentTeamId();
    }
    if(name == "Organization"){
      $window.localStorage['heroes.currentTeamId'] = Account.getCurrentTeamOrganizationId();
    }
    if(name == "My Activity"){
      $window.localStorage['heroes.currentTeamId'] = Account.getCurrentTeamId();
    }
  }

  self.getCurrentHeroTeamId = function(){
    return $window.localStorage['heroes.currentTeamId'];
  }

}

services
  .service('Hero', heroService)



