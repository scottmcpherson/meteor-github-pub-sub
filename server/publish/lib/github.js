GitHubAPI = function (user, url, lapseTime) {
  this.user = user || {};
  this.url = url || '';
  this.lapseTime = lapseTime || 4000;
  this.timerId = null;
  this.data = [];
}
GitHubAPI.prototype = {
  constructor: GitHubAPI,

  getData: function () {
    var self = this;
    var apiData = HTTP.get(self.url, {
       headers: {
          'User-Agent': 'Meteor/1.0',
          'Authorization': 'token ' + self.user.services.github.accessToken
       }
    });
    this.data = apiData.data;
    return this.data;
  },

  getFreshData: function () {
    var self = this;
    var apiData = HTTP.get(self.url, {
       headers: {
          'User-Agent': 'Meteor/1.0',
          'Authorization': 'token ' + self.user.services.github.accessToken
       }
    });
    return apiData.data;
  },

  compare: function (self, freshData) {
    _.each(freshData, function(data) {
      var doc = _.findWhere(issuesPublishHandles, { id: data.id });
      if (typeof doc === 'undefined') {
        self.added(/*collection=*/ 'gitHubIssues', /*id=*/ data.id, {
        'title': data.title
      });
      } else {
        console.log("no new doc");
      }
    }, this);
  },
};