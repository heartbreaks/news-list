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
  var totalPages = []

  $scope.networkRequest = function (url, params, ...args) {
    try {
      var answerFromApi = $http.get(url, {
        headers: {'x-api-key': '53220362b5044a9a9cbdf73bde56d0b8'},
        params: args.length > 0 ? {...params, ...args[0]} : params
      }).then(function (res) {
        $scope.totalPages = Math.round(res.data.totalResults / 5)
        return {
          res: res.data.articles,
          totalPages: $scope.getTotalPages()
        }
      })

      return answerFromApi
    } catch (err) {
      console.log(err)
    }
  }

  $scope.getTotalPages = function (start = 1) {
    var arr = []

    if ($scope.totalPages < 20) {
      for (start; start <= $scope.totalPages; start++) {
        arr.push(start)
      }
      return arr
    }

    for (start; start <= 18; start++) {
      arr.push(start)
    }

    arr.push('...', $scope.totalPages)

    return arr
  }
})