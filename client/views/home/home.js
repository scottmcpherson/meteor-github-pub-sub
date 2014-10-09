/*****************************************************************************/
/* Home: Event Handlers and Helpersss .js*/
/*****************************************************************************/
Template.Home.events({
  /*
   * Example:
   *  'click .selector': function (e, tmpl) {
   *
   *  }
   */
});

GitHubIssues = new Meteor.Collection('gitHubIssues');
Template.Home.helpers({
  issues: function () {
    Meteor.subscribe('gitHubIssues', 'git-test-project');
    var issues = GitHubIssues.find();
    console.log("issues", issues);
    return issues;
  },
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {
};

Template.Home.destroyed = function () {
};


