var url = require('url');
var glob = require("glob")
var fs = require('fs');

module.exports = getPackages;

function getPackages() {

  return new Promise((resolve, reject) => {
    glob("/Users/anvaka/projects/temp/components/packages/*",  (err, files) => {
      if (err) {
        console.error(err);
        reject(err)
        return;
      }
      var urls = files.map(toRequest).filter(x => x);
      resolve(urls);
    })
  })
}

function toRequest(fileName) {
  var content = JSON.parse(fs.readFileSync(fileName));
  var match = content.url.match(/^https:\/\/github.com\/(.+)\.git$/);
  if (match) {
    return 'https://raw.githubusercontent.com/' + match[1] + '/master/bower.json';
  }
  if ((match = content.url.match(/bitbucket.org\/(.+)(\.git)?$/))) {
    return 'https://bitbucket.org/' + match[1] + '/raw/master/bower.json';
  }
  if ((match = content.url.match(/^https:\/\/lolg\.it\/(.+)\.git$/))) {
    var url = 'https://lolg.it/' + match[1] + '/raw/master/bower.json';
    return url;
  }
  else {
    console.error('skipping ' + fileName + ' - not hosted on github')
  }
}

function reportError(err) {
  console.error(err);
  throw err;
}
