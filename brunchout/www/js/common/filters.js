angular.module('app.filters', [])

//convert time format to time ago
.filter('timeAgo', 
  ['$interval', 
  function($interval) {
    //update time ago every 60 seconds
    $interval(function() {}, 60000);

    //get time ago from moments js
    function fromNowFilter(time) {
      var timeApart = moment(time).max().fromNow();
      //minutes format
      if (timeApart.includes('minutes')) {
        formatDate = timeApart.replace(' minutes ago', 'm');
        return formatDate;
      }
      if (timeApart.includes('a minute ago')) {
        formatDate = timeApart.replace('a minute ago', '1m');
        return formatDate;
      }
      if (timeApart.includes('a few seconds ago')) {
        formatDate = timeApart.replace('a few seconds ago', 'few secs');
        return formatDate;
      }
      if (timeApart.includes('in a few seconds')) {
        formatDate = timeApart.replace('in a few seconds', 'few secs');
        return formatDate;
      }      
      //hour format
      if (timeApart.includes('an hour ago')) {
        formatDate = timeApart.replace('an hour ago', '1h');
        return formatDate;
      }
      //2+ hour format
      if (timeApart.includes('hours')) {
        formatDate = timeApart.replace(' hours ago', 'h');
        return formatDate;
      }
      //days format
      if (timeApart.includes('days')) {
        formatDate = timeApart.replace(' days ago', 'd');
        return formatDate;
      }
      if (timeApart.includes('a day ago')) {
        formatDate = timeApart.replace('a day ago', '1d');
        return formatDate;
      }
      //month format
      if (timeApart.includes('a month ago')) {
        formatDate = timeApart.replace('a month ago', '1m');
        return formatDate;
      }
      //2+ month format
      if (timeApart.includes('months')) {
        formatDate = timeApart.replace(' months ago', 'm');
        return formatDate;
      }
      //year format
      if (timeApart.includes('a year ago')) {
        formatDate = timeApart.replace('a year ago', '1y');
        return formatDate;
      }
      if (timeApart.includes('years')) {
        formatDate = timeApart.replace(' years ago', 'y');
        return formatDate;
      }
      else {
        return moment(time).fromNow();
      }
    }
    //flag function as stateful
    fromNowFilter.$stateful = true;
    return fromNowFilter;
}])

//convert time format to time ago (long format)
.filter('FulltimeAgo', 
  [ 
  function() {
    function fromNowFilter(time) {
      //return full date
      return moment(time).format("MMM M, YYYY h:mm A");
    }
    //flag function as stateful
    fromNowFilter.$stateful = true;
    return fromNowFilter;
}])

//pluralization filter
.filter('Pluralize', 
  [ 
  function() {
    function checkIfPlural(number, word) {
      //return formatted word
      //if 1 item returned
      if (word.includes('s') && number === 1) {
        return number + ' ' + word.slice(0, -1);
      }
      else {
        return number + ' ' + word;
      }
    }
    //flag function as stateful
    checkIfPlural.$stateful = true;
    return checkIfPlural;
}])