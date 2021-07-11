angular.module('newsFeed')
  .component('alert', {
    template: '' +
      '<div ng-show="$ctrl.state" class="alert position-absolute col-3 alert-danger" role="alert">\n' +
      '    <p class="m-0">{{$ctrl.message}}</p>\n' +
      '</div>',
    controller: function alertController($scope, $timeout) {
      var self = this;


      $scope.$on('error', function (event, args) {
        self.message = args.alert
        self.state = args.state
        $timeout(function () {
          self.state = false
        }, 2500)
      })
    }
  })