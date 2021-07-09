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

  $scope.getTotalPages = function () {
    var arr = []

    if ($scope.totalPages < 20) {
      for (var i = 1; i <= $scope.totalPages; i++) {
        arr.push(i)
      }
      return arr
    }

    for (var i = 1; i <= 18; i++) {
      arr.push(i)
    }

    arr.push('...', $scope.totalPages)

    return arr
  }
})