'use strict';

var app = angular.module('newsFeed.topHeadlines', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/topHeadlines', {
    templateUrl: 'topHeadlines/topHeadlines.html',
    controller: 'TopHeadlinesCtrl'
  });
}])

app.controller('TopHeadlinesCtrl', function($http, $scope, networkRequests, paginationManager) {
  var url = 'https://newsapi.org/v2/top-headlines';

  /* get all news without params */
  networkRequests.get(url, { page: 1, pageSize: 5, country: 'us' })
})