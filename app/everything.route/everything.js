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
  $scope.currenPage = 1


  $scope.getKeywordsNews = function () {
    $scope.currenPage = 1

    networkRequests.get(url, {
      ...networkRequests.prevParams,
      ...{
        q: $scope.keyword,
        page: 1
      }
    }).then(function ({res}) {
      $scope.prevParams = params
      $scope.news = res
    })
    $scope.keyword = ''
  }

  networkRequests.get(url, { pageSize: 5, page: 1, q: 'it' }).then(function ({res}) {
    $scope.news = res
  })

  $scope.paginate = function (pageList) {
    $scope.currenPage = pageList

    networkRequests.get(url, {...networkRequests.prevParams, page: pageList}).then(function ({res, totalNews}) {
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