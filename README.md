BiMap
----------

A powerful, flexible and efficient JavaScript bidirectional map implementation. Enables fast insertion, search and retrieval of various kinds of data. A *BiMap* is like a two-sided Javascript object with equally immediate access to both the *keys* and the *values*.

Installation
-------------
Node:
```
npm install bimap
```

Browser:
link to bimap.js


Basic usage
-------------
```javascript
var bimap = new BiMap
bimap.push("key", "value");
console.log( bimap.key("key") ); // => "value"
console.log( bimap.val("value") ); // => "key"
```
