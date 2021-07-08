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