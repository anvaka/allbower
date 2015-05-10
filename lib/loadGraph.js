var fs = require('fs');
var convert = require('./convertToGraph.js');
module.exports = loadGraph;

function loadGraph() {
  var content = fs.readFileSync(process.argv[2] || './bower_files.json');
  return convert(JSON.parse(content));
}
