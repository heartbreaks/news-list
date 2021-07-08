'use strict';

angular.module('newsFeed.topHeadlines', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/topHeadlines', {
    templateUrl: 'topHeadlines/topHeadlines.html',
    controller: 'TopHeadlinesCtrl'
  });
}])

.controller('TopHeadlinesCtrl', function($http, $scope) {
  var options = {
    headers: {
      'x-api-key': 'a45260bf68fe46daa784a7a257d35b28'
    },
    params: {
      country: 'us',
      pageSize: 5
    }
  }
  var response = $http.get('https://newsapi.org/v2/top-headlines', options);
  console.log(response, $scope)
});