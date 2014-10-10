
/*****************************************************************************/
/* MasterLayout: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.MasterLayout.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

GitHubRepos = new Meteor.Collection('gitHubRepos');

Template.MasterLayout.helpers({
  repos: function () {
    Meteor.subscribe('gitHubRepos', 'git-test-project');
    var repos = GitHubRepos.find();
    return repos;
  }
});

/*****************************************************************************/
/* MasterLayout: Lifecycle Hooks */
/*****************************************************************************/
Template.MasterLayout.created = function () {
};

Template.MasterLayout.rendered = function () {
};

Template.MasterLayout.destroyed = function () {
};


