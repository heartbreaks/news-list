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
  .controller('newsFeed', function ($scope,$http, alertsManager) {
    // $scope.alerts = alertsManager.alerts // need to delete

    $scope.networkRequest = function (url, params, ...args) {
        var answerFromApi = $http.get(url, {
          headers: {'x-api-key': 'a45260bf68fe46daa784a7a257d35b28'},
          params: args.length > 0 ? {...params, ...args[0]} : params
        })
          .then(function (res) {
            console.log(res)
            $scope.totalPages = Math.round(res.data.totalResults / 5)
            return {
              res: res.data.articles,
              totalPages: $scope.getTotalPages()
          }
        }).
          catch(function (err) {
            alertsManager.addError(err.data.message)
        })

        return answerFromApi
  }

  $scope.getTotalPages = function (start = 1) {
    var arr = []

    if ($scope.totalPages < 20) {
      for (start; start <= $scope.totalPages; start++) {
        arr.push(start)
      }
      return arr
    }

    for (start; start <= 21; start++) {
      arr.push(start)
    }

    return arr
  }
})
  /*
  * need delete this shit
  * */

  // .directive('showAlert', function () {
  //   return {
  //     restrict: 'E',
  //     templateUrl: './directive/alert-danger.directive.html',
  //     link: function (scope, element, attrs){
  //     }
  //   }
  // })

  .factory('alertsManager', function () {
    return {
      alerts: [],
      addError: function (body) {
        var self = this
        self.alerts.push({body})
      },
      deleteError: function () {
        this.alerts.shift()
        return this.alerts
      }
    }
  })
