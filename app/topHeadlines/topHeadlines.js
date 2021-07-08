'use strict';

var app = angular.module('newsFeed.topHeadlines', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/topHeadlines', {
    templateUrl: 'topHeadlines/topHeadlines.html',
    controller: 'TopHeadlinesCtrl'
  });
}])

app.controller('TopHeadlinesCtrl', function($http, $scope) {
  $scope.filterCountry = ''
  $scope.filterCategory = ''

  $scope.countries = [
    {title: 'Russian', value: 'ru'},
    {title: 'English', value: 'us'}
  ]

  $scope.categories = [
    {title: 'Business', value: 'business'},
    {title: 'Entertainment', value: 'entertainment'},
    {title: 'General', value: 'general'},
    {title: 'Health', value: 'health'},
    {title: 'Technology', value: 'technology'},
  ]

  /* declaring functions */
  $scope.networkRequest = function (country = 'ru', category = '') {
    $http.get('https://newsapi.org/v2/top-headlines', {
      headers: {'x-api-key': 'e7c33e246f004bbc9dc33a58762a1d53'},
      params: {
        pageSize: 5,
        country,
        category
      }
    }).then(function (response) {
      $scope.news = response.data.articles
    })
  }

  $scope.getFilteredNews = function () {
    $scope.networkRequest($scope.filterCountry, $scope.filterCategory)
  }

  /* get all news without params */
  $scope.networkRequest()


})


app.directive('newsHeadlines', function ($http) {


  return {
    restrict: 'E',
    templateUrl: './Components/News-card.component.html',
    link: function (scope, element, attrs){
    }
  }
})