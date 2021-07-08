'use strict';

angular.module('newsFeed.everything', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/everything', {
    templateUrl: 'everything.route/everything.html',
    controller: 'EverythingNewsCtrl'
  });
}])

.controller('EverythingNewsCtrl', function EverythingNewsCtrl($scope, $http) {
  var headers = { headers: { 'x-api-key': 'e7c33e246f004bbc9dc33a58762a1d53'}}
  $scope.keyword = ''

  $scope.networkRequest = function (params = 'it') {
    $http.get('https://newsapi.org/v2/everything', {
      headers: { 'x-api-key': 'e7c33e246f004bbc9dc33a58762a1d53'},
      params: {
        language: 'ru',
        pageSize: 5,
        q: params
      }
    }).then(function (response) {
      console.log(response.data.articles)
      $scope.news = response.data.articles
    })
  }

  $scope.networkRequest()


  $scope.getKeywordsNews = function () {
    $scope.networkRequest($scope.keyword)
    $scope.keyword = ''
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