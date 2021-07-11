'use strict';

angular.module('newsFeed.everything', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/everything', {
    templateUrl: 'routes/everything.route/everything.html',
    controller: 'EverythingNewsCtrl'
  });
}])

.controller('EverythingNewsCtrl', function EverythingNewsCtrl($scope, networkRequests, paginationManager) {
  var url = 'https://newsapi.org/v2/everything'

  networkRequests.get(url, { pageSize: 5, page: 1, q: 'it' })
})