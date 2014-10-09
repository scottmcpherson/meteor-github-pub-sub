issuesPublishHandles = [];

Meteor.publish("gitHubIssues", function (repoName) {
  console.log("new connection " + repoName);
  console.log("new connection userId" + this.userId);

  var self = this;
  var gitHubAPI = new GitHubAPI({ userId: this.userId });
  var timerId = null;

  issuesPublishHandles = gitHubAPI.issuesForRepo(repoName);

  if ( _.isArray(issuesPublishHandles) && issuesPublishHandles.length > 0 ) {
    _.each(issuesPublishHandles, function (issue) {
      console.log(issue);
      self.added(/*collection=*/ 'gitHubIssues', /*id=*/ issue._id, {
        'title': issue.title
      });
    });
  }

  self.ready();

  self.onStop(function () {
    issuesPublishHandles = _.without(issuesPublishHandles, self);
    clearInterval(timerId);
  });

  timerId = Meteor.setInterval(function () {
    var freshData = gitHubAPI.getFreshData();
    gitHubAPI.compare(self, freshData);
  }, 3000);

});