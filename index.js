var Crawler = require('crawler');
var fs = require('fs');
var chunkSize = 3000;
var total = 0;

var getAllPackages = require('./lib/getAllPackages');
var outFile = 'bower_files.json';

var results = [];
console.log('Downloading packages list...');
getAllPackages().then(crawlDependencies);

function crawlDependencies(index) {
  console.log('Loaded ' + index.length + ' packages to scan');

  var c = new Crawler({
    maxConnections: 10,
    // This will be called for each crawled page
    callback: indexPackage,
    onDrain: saveAndExit
  });

  queueChunk();

  function indexPackage(err, res) {
    total += 1;

    if (err) {
      console.log('ERROR: ' + err);
      return;
    }

    if (total % chunkSize === 0) {
      queueChunk();
    }

    if (res.body === 'Not Found') {
      console.log('Not found: ' + res.uri);
      return;
    }
    try {
      var body = JSON.parse(res.body);
      results.push(body);
    } catch (e) {
      console.log('IGNORING: Failed to parse response body: ' + res.body);
      console.log(e);
    }
  }

  function queueChunk() {
    if (!index.length) return;
    if (index.length < chunkSize) {
      console.log('Queueing last ' + index.length + ' packages');
      c.queue(index.splice(0, index.length));
    } else {
      console.log('Queueing next ' + chunkSize + ' packages.');
      c.queue(index.splice(0, chunkSize));
      console.log('Remaining: ' + index.length);
    }
  }

  function saveAndExit() {
    fs.writeFileSync(outFile, JSON.stringify(results), 'utf8');
    console.log('Done');
    console.log('Indexed ' + results.length + ' packages. Saved into ' + outFile);
    process.exit(0);
  }
}
