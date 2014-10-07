// Set up login services
Meteor.startup( function () {
  // Add Github configuration entry
  ServiceConfiguration.configurations.insert({
    "service": "github",
    "clientId": "2020c7ab52864f582518",
    "secret": "d5d100d23e393bee264f0992840d06bfcdf27305"
  });
});