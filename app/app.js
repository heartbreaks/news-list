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

  $scope.getTotalPages = paginationManager.getTotalPages
})

  .factory('alertsManager', function ($rootScope) {
    return {
      alerts: [],
      addError: function (body) {
        var self = this
        $rootScope.$broadcast('error', {alert: body, state: true})
      }
    }
  })

  .factory('paginationManager', function ($rootScope) {
    var totalPages = 0

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
        $rootScope.$broadcast('updatePages', this.getTotalPages())
      },
      setCurrentPage: function (page) {
        $rootScope.$broadcast('setFilteredPage', page)
      }
    }
    }
  )

.factory('networkRequests', function ($http, alertsManager, paginationManager, $rootScope) {
  return {
    get: function (url, params) {
      var self = this

      self.prevParams = params
      self.url = url

      self.setFetching(true)

      var answerFromApi = $http.get(url, {
        headers: {'x-api-key': 'a45260bf68fe46daa784a7a257d35b28'},
        params
      })
        .then(function (res) {
          paginationManager.setTotalPages(Math.round(res.data.totalResults / 5))
          $rootScope.$broadcast('updateCards', res.data.articles)
          self.setFetching(false)
        })
        .catch(function (err) {

          self.setFetching(false)
          alertsManager.addError(err?.data.message)
          $rootScope.$broadcast('updateCards', [])
        })

      return answerFromApi
    },
    url: '',
    prevParams: { page: 1, pageSize: 5, country: 'us' },
    setFetching: function (params) {
        $rootScope.$broadcast('fetchingUpdate', params)
    }
  }
})