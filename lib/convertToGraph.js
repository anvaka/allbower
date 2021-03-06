var createGraph = require('ngraph.graph');
module.exports = convert;

function convert(pkgs) {
  var graph = createGraph({uniqueLinkIds: false});
  pkgs.forEach(addToGraph);
  return graph;

  function addToGraph(pkg) {
    if (!pkg.name) return;
    graph.addNode(pkg.name);
    if (pkg.dependencies && typeof pkg.dependencies === 'object') {
      var deps = Object.keys(pkg.dependencies);
      for (var i = 0; i < deps.length; ++i) {
        if (!graph.hasLink(pkg.name, deps[i])) {
          graph.addLink(pkg.name, deps[i]);
        }
      }
    }
  }
}
