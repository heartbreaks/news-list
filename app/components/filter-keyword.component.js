angular.module('newsFeed')
.component('filterKeyword', {
    template: '<div>\n' +
              '     <h2 class="news__subheading">Search:</h2>\n' +
              '     <form novalidate class="news__search-input row mb-5" ng-submit="$ctrl.getKeywordsNews()">\n' +
              '       <div class="col">\n' +
              '         <input value="$ctrl.keyword" ng-model="$ctrl.keyword" class="form-control col mt-2" type="text" placeholder="Search..." aria-label="default input example">\n' +
              '       </div>\n' +
              '       <button type="submit" class="btn btn-primary mt-2 col-2">Filter</button>\n' +
              '     </form>\n' +
              '   </div>',
    controller: function filterKeywordCtrl(networkRequests) {
    var self = this
    var url = 'https://newsapi.org/v2/everything'

    self.keyword = ''

    self.getKeywordsNews = function () {
        networkRequests.get(url, {
          ...networkRequests.prevParams,
          ...{
            q: self.keyword,
            page: 1
          }
        })
        self.keyword = ''
      }

    }
})