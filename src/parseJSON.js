// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// var test1 = '{"hey":["sofie,","elena"],"hack":{"hrsf":83},"boo":true}';
// var test2 = '"stringy"';
//var test3 = '["this", {"hello":"billy"}, 0 , false, NaN, undefined,   -1 ]';
// var test4 = '{ "hi"  : "bob", "poop":{"hello":"billy"} } ';

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var pointer = 0;
  var end = json.length;

  var parser = function() {

    var parseString = function() {
      var string = '';
      pointer++;
      while (json[pointer] !== '"' && pointer < end) {
        string += json[pointer];
        pointer++;
      }
      pointer++;
      return string;
    };

    var parseObject = function() {
      var object = {};
      pointer++;
      while (json[pointer] !== '}' && pointer < end) {        
        var key = parser();
        var value = parser();
        object[key] = value;
        nextNonWhite();
      }
      pointer++;
      return object;
    };

    var parseArray = function() {
      var array = [];
      pointer++;
      while (json[pointer] !== ']' && pointer < end) {        
        var value = parser();
        array.push(value);
        nextNonWhite();
      }
      pointer++;
      return array;
    };
    
    var parseBoolean = function() {
      if (json[pointer] === 't') {
        pointer += 4;
        return true;
      } else {
        pointer += 5;
        return false;
      }
    };

    var parseNumber = function() {
      debugger;
      var stringNum = '';
      while (nums.includes(json[pointer]) || json[pointer] === '.') {
        stringNum += json[pointer];
        pointer++;
      }
      return Number(stringNum);
    };

    var parseFalsey = function() {
      if (json[pointer] === 'n') {
        pointer += 4;
        return null;
      } else if (json[pointer] === 'u') {
        pointer += 9;
        return undefined;
      } else if (json[pointer] === 'N') {
        pointer += 3;
        return NaN;
      }
    };

    var nextNonWhite = function() {
      while (json[pointer] === ' ' || json[pointer] === ':' || json[pointer] === ',') {
        pointer++;
      }
    };

    nextNonWhite();

    var nums = '0123456789-'.split('');
    
    if (json[pointer] === '"') {
      return parseString(); 
    } else if (json[pointer] === '{') {
      return parseObject();
    } else if (json[pointer] === '[') {
      return parseArray();
    } else if (json[pointer] === 't' || json[pointer] === 'f') {
      return parseBoolean();
    } else if (nums.includes(json[pointer])) {
      return parseNumber();
    } else if (json[pointer] === 'n' || json[pointer] === 'u' || json[pointer] === 'N') {
      return parseFalsey();
    } else {
      return;
    }


  };

  return parser();

  

};

// console.log(parseJSON(test3));
// console.log(JSON.parse(test3));
// // console.log(Boolean(Number('a')));

