GitHubAPI.prototype.repos = function () {
  this.gitSettings();
  console.log("username: ", this.gitProfile.username);
  this.url = 'https://api.github.com/user/repos';
  return this.getData();
}