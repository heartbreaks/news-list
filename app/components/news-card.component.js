angular.module('newsFeed')
.component('cardNews', {
    template: '' +
    '<div ng-if="$ctrl.news.length > 0" ng-repeat="card in $ctrl.news" class="border news__news-card mb-3 rounded">\n' +
    '    <div class="border-bottom news__card-title">\n' +
    '     <h3 class="news__card-heading p-3 m-0">{{card.title}}</h3>\n' +
    '    </div>\n' +
    '   <div class="news__card-body row p-3">\n' +
    '     <div class="news__card-text col-9">\n' +
    '       <p>\n' +
    '         {{card.description}} \n'+
    '       </p>\n' +
    '       <a href="{{card.url}}">\n' +
    '         <button type="button" class="btn btn-primary">{{card.source.name}}</button>\n'+
    '       </a>\n'+
    '     </div>\n' +
    '     <img alt="Image of news" class="img-thumbnail p-1 news__card-image col-3" width="200" height="200" src="{{card.urlToImage}}"/>\n' +
    '   </div>\n' +
    '</div>\n',
    controller: function NewsCardController($scope) {
      var self = this
      self.news = []

      $scope.$on('updateCards', function(event, args) {
        self.news = args
      })
    }
})