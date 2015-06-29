var graph = require('./lib/loadGraph.js')();
var layout = require('ngraph.offline.layout')(graph);

console.log('Starting layout. This will take a while...');
layout.run();

console.log('Done. Now export this to binary format:');
console.log('node toBinary.js');
