angular.module('newsFeed.everything', ['ngRoute'])
.config(function ($routeProvider) {
    $routeProvider.when('/everything', {
        templateUrl: "everything.route.html",
        controller: "EverythingNewsCtrl"
    })
})

.controller('EverythingNewsCtrl', function EverythingNewsCtrl($scope) {
    console.log('EverythingNewsCtrl')
})