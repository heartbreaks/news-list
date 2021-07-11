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
  .controller('newsFeed', function ($scope,$http, alertsManager, paginationManager) {
    // $scope.alerts = alertsManager.alerts // need to delete

  $scope.getTotalPages = paginationManager.getTotalPages
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

  .factory('alertsManager', function ($rootScope) {
    return {
      alerts: [],
      addError: function (body) {
        var self = this
        $rootScope.$broadcast('error', {alert: body, state: true})
      }
    }
  })

  .factory('paginationManager', function () {
    var totalPages = 1

    return {
      getTotalPages: function (start = 1) {
        var arr = []

        if (totalPages < 20) {
          for (start; start <= totalPages; start++) {
            arr.push(start)
          }
          return arr
        }

        for (start; start <= 21; start++) {
          arr.push(start)
        }

        return arr
      },
      setTotalPages: function (newPages) {
        totalPages = newPages
      },
    }
    }
  )

.factory('networkRequests', function ($http, alertsManager, paginationManager, $rootScope) {
  return {
    get: function (url, params, ...args) {
      var self = this

      self.prevParams = params

      var answerFromApi = $http.get(url, {
        headers: {'x-api-key': '694edb8d37b24bcab625941233b8356e'},
        params: args.length > 0 ? {...params, ...args[0]} : params
      })
        .then(function (res) {
          paginationManager.setTotalPages(Math.round(res.data.totalResults / 5))
          self.currentNews = res.data.articles
          console.log(self)
          return { res: res.data.articles, }
        })
        .catch(function (err) {
          alertsManager.addError(err?.data.message)
        })

      return answerFromApi
    },
    prevParams: { page: 1, pageSize: 5, country: 'us' }
  }
})