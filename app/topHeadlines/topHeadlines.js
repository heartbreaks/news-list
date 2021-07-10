'use strict';

var app = angular.module('newsFeed.topHeadlines', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/topHeadlines', {
    templateUrl: 'topHeadlines/topHeadlines.html',
    controller: 'TopHeadlinesCtrl'
  });
}])

app.controller('TopHeadlinesCtrl', function($http, $scope, networkRequests, paginationManager) {
  var url = 'https://newsapi.org/v2/top-headlines';
  $scope.currentPage = 1
  $scope.news = networkRequests.currentNews
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

  // $scope.prevParams = params

  $scope.getFilteredNews = function () {
    $scope.currentPage = 1

    networkRequests.get(url, {
      ...networkRequests.prevParams,
      ...{
        country: $scope.filterCountry,
        category: $scope.filterCategory,
        page: $scope.currentPage,
      }
    }) .then(function ({res}) {
      $scope.news = res
    })
  //
  //   console.log(networkRequests.prevParams)
  }

  /* get all news without params */
  networkRequests.get(url, { page: 1, pageSize: 5, country: 'us' })
    .then(function ({res}) {
    $scope.news = res
  })

  $scope.paginate = function (pageList) {
    $scope.currentPage = pageList

    networkRequests.get(url, {...networkRequests.prevParams, page: pageList}).then(function ({res}) {
      $scope.news = res
    })
  }


})


app.directive('newsHeadlines', function ($http) {

  return {
    restrict: 'E',
    templateUrl: './directive/news-card.directive.html',
    link: function (scope, element, attrs){
    }
  }
})