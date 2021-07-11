angular.module('newsFeed')
.component('loader', {
    template: '<div ng-if="$ctrl.fetching" class="d-flex justify-content-center"><div style="width: 3rem; height: 3rem;" class="spinner-border m-5" role="status"></div></div>',
    controller: function LoaderController($scope) {
      var self = this
      self.fetching = true

      $scope.$on('fetchingUpdate', function (event, args) {
        self.fetching = args
      })
    }
})