GitHub = function (options) {
  this.options = options || {};
  this.gitProfile = {};
  this.data = [];
  this.url = null;
};

GitHub.prototype.gitSettings = function () {

  if (! this.options.userId )
    console.log("Must Provide userId");
  else
    this.gitProfile = Meteor.users.findOne(this.options.userId).services.github;

};

GitHub.prototype.mongoizeIds = function (apiData) {
  var tmpObj = {};
  var tmpArr = [];
  _.each(apiData.data, function(data) {
      tmpObj = {};
      for (prop in data) {
        if (prop !== 'id') {
          tmpObj[prop] = data[prop];
        } else {
          tmpObj['_id'] = data['id'];
        }
      }
      tmpArr.push(tmpObj);
  });
  return tmpArr;
};

GitHub.prototype.getData = function () {
  console.log("sweet!: ", this.url);
  var self = this;
  var tmpObj = {};
  var tmp = [];
  var apiData = HTTP.get(self.url, {
     headers: {
        'User-Agent': 'Meteor/1.0',
        'Authorization': 'token ' + this.gitProfile.accessToken
     }
  });
  console.log(apiData.data.length);
  this.data = self.mongoizeIds(apiData);
  return this.data;
};

GitHub.prototype.getFreshData = function () {
  var self = this;
  var apiData = HTTP.get(self.url, {
     headers: {
        'User-Agent': 'Meteor/1.0',
        'Authorization': 'token ' + this.gitProfile.accessToken
     }
  });
  return self.mongoizeIds(apiData);
};

GitHub.prototype.compare = function (self, freshData) {

  var doc = {};
  var tmpObj = {};

  _.each(freshData, function (issue) {
    doc = _.findWhere(issuesPublishHandles, { _id: issue._id });
    if (typeof doc === 'undefined') {
      self.added(/*collection=*/ 'gitHubIssues', /*id=*/ issue._id, { 'title': issue.title });
      console.log("add id: ", issue._id);
    }
  });

  _.each(issuesPublishHandles, function (issue) {
    doc = _.findWhere(freshData, { _id: issue._id });
    if (typeof doc === 'undefined') {
      self.removed(/*collection=*/ 'gitHubIssues', /*id=*/ issue._id);
      console.log("remove id: ", issue._id);
    }
  });

  _.each(freshData, function (issue) {
    doc = _.findWhere(issuesPublishHandles, { _id: issue._id }); // old doc
    issueFields = _.pick(issue, '_id', 'title')
    for (var prop in issueFields) {
      if (! _.isObject(issue[prop])) {
        if (doc.hasOwnProperty(prop)) {
          if (doc[prop] !== issue[prop]) {
            tmpObj[prop] = issue[prop];
            self.changed(/*collection=*/ 'gitHubIssues', /*id=*/ issue._id, tmpObj);
            tmpObj = {};
          }
        }
      } else {
        // must be an array or nested object
      }

    }
  });

};
