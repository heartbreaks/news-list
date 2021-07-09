'use strict';

// Declare app level module which depends on views, and core components
angular.module('newsFeed', [
  'ngRoute',
  'newsFeed.topHeadlines',
  'newsFeed.everything',
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/topHeadlines'});
}])

.controller('newsFeed', function ($scope,$http) {
  $scope.networkRequest = async function (url, params, ...args) {
    try {
      var answerFromApi = []

      params = args.length > 0 ? {...params, ...args[0]} : params

      var response = await $http.get(url, {
        headers: {'x-api-key': '694edb8d37b24bcab625941233b8356e'},
        params
      })

      answerFromApi = response.data.articles

      return answerFromApi
    } catch (err) {

    }
  }
})