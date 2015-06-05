# Simple selector
Css selector that supports tag name, id and class names  
*E.g.: div#some_id.some_class*

##Details

The function works by first parsing the different selectors.

If only one selector was specified
- then a native function (e.g. getElementsByTagName) is used to retrieve the elements, 
- otherwise the previous result set is seed to the next selector function to avoid searching the entire DOM tree. 

IE8 compatiblity was resolved by adding a getElementsByClassName polyfill.
