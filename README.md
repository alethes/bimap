BiMap
----------

A powerful, flexible and efficient JavaScript bidirectional map implementation. Enables fast insertion, search and retrieval of various kinds of data. A *BiMap* is like a two-sided Javascript object with equally immediate access to both the *keys* and the *values*.

Installation
-------------
Node: `npm install bimap`

Browser: link to bimap.js


Basic usage
-------------
```javascript
var bimap = new BiMap
bimap.push("key", "value");
bimap.key("key"); // => "value"
bimap.val("value"); // => "key"

bimap.push("France", ["Paris", "Lyon", "Marseille"]);
bimap.key("France"); // => ["Paris", "Lyon", "Marseille"]
bimap.val("Paris"); // => "France"
bimap.val("Lyon"); // => "France"
bimap.val("Marseille"); // => "France"

bimap.push(["UK", "England"], ["London", "Manchester", "Birmingham"]);
bimap.key("UK"); // => ["London", "Manchester", "Birmingham"]
bimap.val("London"); // => ["UK", "England"]

bimap.push("zero");
bimap.push("one");
bimap.key(0); // => "zero"
bimap.val("one"); // => 1

bimap.push({
  a: {
    b: 1,
    c: {
      d: 2
    }
  }
});
bimap.key("a.b"); // => 1
bimap.val(2); // => "a.c.d"
```
