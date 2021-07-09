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

  var url = 'https://newsapi.org/v2/top-headlines';
  var params = { page: 1, pageSize: 5, country: 'us' };
  var prevParams = params

  $scope.getFilteredNews = function () {
    params.country = $scope.filterCountry;
    params.category = $scope.filterCategory;

    $scope.networkRequest(url, params) .then(function ({res, totalNews}) {
      $scope.news = res
    })
  }

  /* get all news without params */
  $scope.networkRequest(url, params).then(function ({res, totalNews}) {
    prevParams = params
    $scope.news = res
  })

  $scope.paginate = function (pageList) {
    var actualParams = {...prevParams, page: pageList}
    console.log(actualParams)
    $scope.networkRequest(url, actualParams).then(function ({res, totalNews}) {
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