'use strict';

angular.module('newsFeed.everything', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/everything', {
    templateUrl: 'everything.route/everything.html',
    controller: 'EverythingNewsCtrl'
  });
}])

.controller('EverythingNewsCtrl', function EverythingNewsCtrl($scope, $http) {
  $scope.keyword = ''
  var url = 'https://newsapi.org/v2/everything'
  var params = { pageSize: 5, pageList: 1 }


  $scope.getKeywordsNews = function () {
    params.q = $scope.keyword
    $scope.networkRequest(url, params).then(function (res) {
      $scope.news = res
    })
    $scope.keyword = ''
  }

  $scope.networkRequest(url, params, {q: 'it'}).then(function (res) {
    $scope.news = res
  })
})

.directive('newsEverything', function ($http) {
  return {
    restrict: 'E',
    templateUrl: './Components/News-card.component.html',
    link: function (scope, element, attrs){
    }
  }
})