// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
/* Test objects

var test1 = {hey: ['sofie,', 'elena'], hack: {hrsf: 83}, funky: function(param) { return param; }, boo: true, notanum: undefined };

var test2 = {hello: undefined};

var test3 = ['example', ['nested1', undefined]];

var test4 = {keychain: {house: []}};

console.log(JSON.stringify(test1));
console.log(JSON.stringify(test2));
*/

var stringifyJSON = function(obj) {
  
  if ( typeof obj === 'string') {
    return '"' + obj + '"';  
  } else if ( typeof obj === 'boolean') {
    return '' + obj; 
  } else if ( typeof obj === 'number') {
    if (isNaN(obj)) {
      return 'null';
    } else {
      return '' + obj;
    }
  } else if (obj === null) {
    return 'null';
  } else if (obj === undefined) {
    return 'null';
  } else if ( Array.isArray(obj) ) {
    var objarr = [];
    for (var i = 0; i < obj.length; i++) {
      var stringobj = stringifyJSON(obj[i]);
      objarr.push(stringobj);
    }
    return '[' + objarr.join(',') + ']';
  } else { 
    var objarr = [];
    for (var prop in obj) {
      if ((obj[prop] !== undefined) && (typeof obj[prop] !== 'function')) {
        var stringobj = '"' + prop + '":' + stringifyJSON(obj[prop]);
        objarr.push(stringobj);
      }      
    }
    return '{' + objarr.join(',') + '}';
  }
  

};

