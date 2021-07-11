angular.module('newsFeed')
.component('message', {
  template: '<div class="mb-5" ng-if="$ctrl.show"><h1 class="container d-flex justify-content-center">{{$ctrl.message}}</h1></div>',
  controller: function messageCtrl($scope) {
    this.message = '';
    this.show = false;
    var self = this;

    $scope.$on('updateCards', function (event, args) {
      self.message = 'We dont have anything or was exception'
      console.log(args, self)
      self.show = args.length > 0 ? false : true
    })
  }
})