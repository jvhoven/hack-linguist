# Hack-linguist

Simple wrapper on top of [atom-linguist](https://github.com/lee-dohm/atom-linguist)

## Installation  

```
npm i hack-linguist
```
```
var linguist = require("hack-linguist");
```

# API  

**walkIdentify**: walks through a directory and identifies each file  
**identify**: Identifies the programming language for a single file  
**identifySync**: Identifies the programming language for a file synchronously


**Report**

Report is the returned object when using walkIdentifySync
It holds some useful data

[Read more](https://github.com/jvhoven/hack-linguist/blob/master/lib/report.js)

## Examples

```
...
linguist.identify('YOUR_FILE', function(err, language) {
	// error -> the possible error that occurred
	// language -> the identified language
});

var language = linguist.identify('YOUR_FILE');
```

```
...
var report = walkIdentifySync('YOUR_DIRECTORY');
```

# Todo

Create an asynchronous version of walkIdentifySync