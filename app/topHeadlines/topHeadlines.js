'use strict';

var app = angular.module('newsFeed.topHeadlines', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/topHeadlines', {
    templateUrl: 'topHeadlines/topHeadlines.html',
    controller: 'TopHeadlinesCtrl'
  });
}])

app.controller('TopHeadlinesCtrl', function($http, $scope) {
  var url = 'https://newsapi.org/v2/top-headlines';
  var params = { page: 1, pageSize: 5, country: 'us' };

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

  $scope.prevParams = params

  $scope.getFilteredNews = function () {
    params.country = $scope.filterCountry;
    params.category = $scope.filterCategory;
    $scope.prevParams = params

    $scope.networkRequest(url, params) .then(function ({res}) {
      $scope.news = res
    })
  }

  /* get all news without params */
  $scope.networkRequest(url, params).then(function ({res}) {
    $scope.prevParams = params
    $scope.news = res
  })

  $scope.paginate = function (pageList) {
    $scope.prevParams = {...$scope.prevParams, page: pageList}
    $scope.networkRequest(url, $scope.prevParams).then(function ({res}) {
      $scope.news = res
    })
  }


})


app.directive('newsHeadlines', function ($http) {


  return {
    restrict: 'E',
    templateUrl: './directions/news-card.direction.html',
    link: function (scope, element, attrs){
    }
  }
})