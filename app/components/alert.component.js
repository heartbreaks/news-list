angular.module('newsFeed')
  .component('alert', {
    template: '' +
      '<div ng-if="$ctrl.alerts.length >= 0" ng-repeat="alert in $ctrl.alerts"  class="alert position-absolute col-3 alert-danger" role="alert">\n' +
      '    <p class="m-0">{{alert.body}}</p>\n' +
      '</div>',
    controller: function alertController(alertsManager) {
      var self = this;

      self.alerts = alertsManager.alerts

      setTimeout(function () {
        self.show = alertsManager.alerts.length > 0
        console.log(alertsManager.alerts.length > 0)
      }, 1600)
    }
  })