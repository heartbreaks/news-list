angular.module('newsFeed')
.component('pagination', {
    template: '<div ng-if="$ctrl.totalPages && $ctrl.totalPages.length > 0" class="news__pagination  d-flex justify-content-center">\n' +
              '  <nav aria-label="Page navigation example">\n' +
              '    <ul class="pagination">\n' +
              '      <li class="page-item" ng-class="{disabled: $ctrl.currentPage === 1}">\n' +
              '        <a ng-click="$ctrl.paginate($ctrl.currentPage - 1)" class="page-link" aria-label="Previous">\n' +
              '          <span ng-click="$ctrl.paginate($ctrl.currentPage - 1)" aria-hidden="true">&laquo;</span>\n' +
              '        </a>\n' +
              '      </li>\n' +
              '      <li ng-repeat="pageTab in $ctrl.totalPages" ng-class="{active: $ctrl.currentPage === pageTab}"  class="page-item"><a ng-click="$ctrl.paginate(pageTab)" class="page-link">{{ pageTab }}</a></li>\n' +
              '      <li class="page-item" ng-class="{disabled: $ctrl.totalPages.length === $ctrl.currentPage}">\n' +
              '        <a ng-click="$ctrl.paginate($ctrl.currentPage + 1)" class="page-link" aria-label="Next">\n' +
              '          <span  aria-hidden="true">&raquo;</span>\n' +
              '        </a>\n' +
              '      </li>\n' +
              '    </ul>\n' +
              '  </nav>\n' +
              '</div>',
    controller: function paginationCtrl(networkRequests, $scope) {
        var self = this
        this.totalPages = false
        this.currentPage = 1
        this.show = true

        $scope.$on('updatePages', function (event, args){
          self.totalPages = args
        })

        $scope.$on('setFilteredPage', function (event, args){
          self.currentPage = args
        })

        this.paginate = function (pageList) {
          self.currentPage = pageList

          networkRequests.get(networkRequests.url, {...networkRequests.prevParams, page: pageList})
        }
    }
})