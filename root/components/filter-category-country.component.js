angular.module('newsFeed')
.component('filterCategoryCountry', {
    template: '<form ng-submit="$ctrl.getFilteredNews()" class="news__filters row mb-5">\n' +
              '      <h2 class="news__subheading m-0 col-1">Filters:</h2>\n' +
              '      <div class="col-2">\n' +
              '         <select required ng-model="$ctrl.filterCountry" class="form-select">\n' +
              '             <option value="" disabled selected>Country</option>\n' +
              '             <option ng-repeat="country in $ctrl.countries" value="{{country.value}}">{{country.title}}</option>\n' +
              '         </select>\n' +
              '      </div>\n' +
              '      <div required class="col-2">\n' +
              '          <select ng-model="$ctrl.filterCategory" class="form-select">\n' +
              '              <option value="" disabled selected>Category</option>\n' +
              '              <option ng-repeat="category in $ctrl.categories" value="{{category.value}}">{{category.title}}</option>\n' +
              '          </select>\n' +
              '      </div>\n' +
              '      <button type="submit" class="btn btn-primary col-2">Filter</button>\n' +
              '    </form>',
    controller: function filterCategoryCtrl(networkRequests, paginationManager, alertsManager) {
        var self = this;

        self.filterCountry = ''
        self.filterCategory = ''

        self.countries = [
          {title: 'Russian', value: 'ru'},
          {title: 'English', value: 'us'}
        ]

        self.categories = [
          {title: 'Business', value: 'business'},
          {title: 'Entertainment', value: 'entertainment'},
          {title: 'General', value: 'general'},
          {title: 'Health', value: 'health'},
          {title: 'Technology', value: 'technology'},
        ]

        self.getFilteredNews = function () {
          if (self.filterCountry && self.filterCategory) {
            paginationManager.setCurrentPage(1)
            networkRequests.get(networkRequests.url, {
              ...networkRequests.prevParams,
              ...{
                country: self.filterCountry,
                category: self.filterCategory,
                page: 1,
              }})
              return NaN
            }
            return alertsManager.addError('You must fill in both fields!')
          }
    }
})