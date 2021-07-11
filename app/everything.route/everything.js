'use strict';

angular.module('newsFeed.everything', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/everything', {
    templateUrl: 'everything.route/everything.html',
    controller: 'EverythingNewsCtrl'
  });
}])

.controller('EverythingNewsCtrl', function EverythingNewsCtrl($scope, networkRequests, paginationManager) {
  var url = 'https://newsapi.org/v2/everything'
  $scope.totalPages = paginationManager.getTotalPages()

  $scope.keyword = ''
  $scope.currentPage = 1


  networkRequests.get(url, { pageSize: 5, page: 1, q: 'it' })

  $scope.paginate = function (pageList) {
  $scope.currentPage = pageList

    networkRequests.get(url, {...networkRequests.prevParams, page: pageList})
  }
})