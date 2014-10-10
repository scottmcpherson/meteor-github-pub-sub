reposPublishHandles = [];

Meteor.publish("gitHubRepos", function () {
  console.log("new connection userId" + this.userId);

  var self = this;
  var gitHubAPI = new GitHubAPI({ userId: this.userId });
  var timerId = null;

  reposPublishHandles = gitHubAPI.repos();

  if ( _.isArray(reposPublishHandles) && reposPublishHandles.length > 0 ) {
    _.each(reposPublishHandles, function (repo) {
      console.log(repo);
      self.added(/*collection=*/ 'gitHubRepos', /*id=*/ repo._id, {
        'full_name': repo.full_name
      });
    });
  }

  self.ready();

  self.onStop(function () {
    reposPublishHandles = _.without(reposPublishHandles, self);
    clearInterval(timerId);
  });

  // right now, gitHubAPI.compare() is hard coded to work with issues only

  // timerId = Meteor.setInterval(function () {
  //   var freshData = gitHubAPI.getFreshData();
  //   gitHubAPI.compare(self, freshData);
  // }, 3000);

});