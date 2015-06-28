var graph = require('./lib/loadGraph.js')();
var save = require('ngraph.tobinary');
save(graph, { outDir: './data' });

console.log('Done.');
console.log('Copy `links.bin`, `labels.bin` and last position file (e.g. `./data/100.pos`) into vis folder');
