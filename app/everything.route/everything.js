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
  var params = { pageSize: 5, page: 1, q: 'it' }
  $scope.totalPages = paginationManager.getTotalPages()

  $scope.keyword = ''
  $scope.prevParams = params


  $scope.getKeywordsNews = function () {
    params.q = $scope.keyword
    networkRequests.get(url, params).then(function ({res}) {
      $scope.prevParams = params
      $scope.news = res
    })
    $scope.keyword = ''
  }

  networkRequests.get(url, params, {q: 'it'}).then(function ({res}) {
    $scope.news = res
  })

  $scope.paginate = function (pageList) {
    $scope.prevParams = {...$scope.prevParams, page: pageList}
    networkRequests.get(url, $scope.prevParams).then(function ({res, totalNews}) {
      $scope.news = res

    }).catch(function (e) {$scope.news = []})
  }
})

.directive('newsEverything', function ($http) {
  return {
    restrict: 'E',
    templateUrl: './directive/news-card.directive.html',
    link: function (scope, element, attrs){
    }
  }
})

.directive('paginationEverything', function () {
  return {
    restrict: 'E',
    templateUrl: './directive/pagination.directive.html',
    link: function (scope, element, attrs){
    }
  }
})