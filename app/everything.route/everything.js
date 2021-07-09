'use strict';

angular.module('newsFeed.everything', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/everything', {
    templateUrl: 'everything.route/everything.html',
    controller: 'EverythingNewsCtrl'
  });
}])

.controller('EverythingNewsCtrl', function EverythingNewsCtrl($scope, $http) {
  var url = 'https://newsapi.org/v2/everything'
  var params = { pageSize: 5, page: 1, q: 'it' }

  $scope.keyword = ''
  $scope.prevParams = params


  $scope.getKeywordsNews = function () {
    params.q = $scope.keyword
    $scope.networkRequest(url, params).then(function ({res, totalNews}) {
      $scope.prevParams = params
      $scope.news = res
    })
    $scope.keyword = ''
  }

  $scope.networkRequest(url, params, {q: 'it'}).then(function ({res, totalNews}) {
    $scope.news = res
  })

  $scope.paginate = function (pageList) {
    $scope.prevParams.page = pageList
    console.log($scope.prevParams)
    $scope.networkRequest(url, $scope.prevParams).then(function ({res, totalNews}) {
      $scope.news = res
    })
  }
})

.directive('newsEverything', function ($http) {
  return {
    restrict: 'E',
    templateUrl: './Components/News-card.component.html',
    link: function (scope, element, attrs){
    }
  }
})