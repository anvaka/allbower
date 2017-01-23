var url = require('url');
var rp = require('request-promise');
// TODO: This is not working anymore
var query = 'https://bower-component-list.herokuapp.com/';

module.exports = getPackages;

function getPackages() {
  return rp(query)
    .then(convertToPackagesList)
    .catch(reportError);
}

function convertToPackagesList(res) {
  return JSON.parse(res).map(toRequest);
}

function toRequest(x) {
  var parsed = url.parse(x.website);
  return 'https://raw.githubusercontent.com' + parsed.pathname + '/master/bower.json';
}

function reportError(err) {
  console.error(err);
  throw err;
}
