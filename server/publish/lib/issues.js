GitHubAPI.prototype.issuesForRepo = function (repoName) {
  this.gitSettings();
  console.log("username: ", this.gitProfile.username);
  console.log("repoName: ", repoName);
  this.url = 'https://api.github.com/repos/'+ this.gitProfile.username + '/' + repoName + '/issues';
  return this.getData();
}