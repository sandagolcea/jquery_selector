
var $ = function (selector) {
  var elements = [];
  var tagName = "";
  var id = "";
  var classList = [];

  function isSubset(superSet, subSet) {
    superSet.sort();
    subSet.sort();
    var i, j;
    for (i=0,j=0; i<superSet.length && j<subSet.length;) {
        if (superSet[i] < subSet[j]) {
            i++;
        } else if (superSet[i] == subSet[j]) {
            i++;
            j++;
        } else {
            return false;
        }
    }
    return j == subSet.length;
  }

  function checkID(id, seed) {
    if (!seed || seed.length == 0) {
      var element = document.getElementById(id);
      if (element) {
        return [element];  
      }
    } else {
      for (var i=0; i < seed.length ; i++ ) { 
        if (seed[i].id === id) {
          return [seed[i]];
        }
      }
    }
    return [];
  }

  function checkClass(classList, seed) {
    var classElemList = [];
    if (!seed || seed.length == 0) {
      classElemList = document.getElementsByClassName(classList);
    } else {
      for (var i=0; i < seed.length ; i++ ) { 
        if ( isSubset(seed[i].className.split(" "),  classList) ) {
          classElemList.push(seed[i]);
        }
      }
    }
    return classElemList;
  }

  function checkTag(tagName) {
    return document.getElementsByTagName(tagName);
  }

  function parseTagName(selector) {
    var matches = selector.match(/^[a-zA-Z0-9_-]*/);
    if (matches) {
      return matches[0]
    }
    return null;
  }

  function parseID(selector) {
    var matches = selector.match(/#[a-zA-Z0-9_-]*/);
    if (matches) {
      return matches[0].slice(1);
    }
    return null;
  }

  function parseClassNames(selector) {
    var classList = selector.match(/\.[a-zA-Z0-9_-]*/g);

    if (classList) {
      for (var i=0; i < classList.length; i++ ) {
        classList[i] = classList[i].slice(1);
      }
    }

    return classList;
  }

  // Parse input
  tagName = parseTagName(selector);
  id = parseID(selector);
  classList = parseClassNames(selector);

  // Retrieve elements
  if (tagName) {
    elements = checkTag(tagName);
  }

  if (id) {
    elements = checkID(id, elements);
  }

  if (classList && classList.length > 0) {
    elements = checkClass(classList, elements);
  }

  return elements;
}

// IE8 getElementsByClassName Polyfill - taken from https://gist.github.com/eikes/2299607
if (!document.getElementsByClassName) {
  document.getElementsByClassName = function(search) {
  var elements, pattern, i, results = [];

  elements = document.getElementsByTagName("*");
  pattern = new RegExp("(^|\\s)" + search + "(\\s|$)");
  for (i = 0; i < elements.length; i++) {
    if ( pattern.test(elements[i].className) ) {
      results.push(elements[i]);
    }
  }

  return results;
  }
}