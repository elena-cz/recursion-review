// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  var results = [];

  var startNode = document.body;
  
  var findNodes = function(node) {
    var classes = node.classList;
    
    if (classes && classes.contains(className)) {
      results.push(node);
    }
    
    if (node.hasChildNodes()) {
      var children = node.childNodes;
      children.forEach(function(el) {
        findNodes(el);
      });
    }
  };

  findNodes(startNode);

  return results;
};
