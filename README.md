# Hack-linguist

Simple wrapper on top of [atom-linguist](https://github.com/lee-dohm/atom-linguist)

## Installation  

```
npm i hack-linguist
```

# API  

```
var linguist = require("hack-linguist");
```

**walkIdentify**: walks through a directory and identifies each file  

```
...
var report = walkIdentifySync('YOUR_DIRECTORY');
```

**identify**

Identifies the programming language for a single file

```
...
linguist.identify('YOUR_FILE', function(err, language) {
	// error -> the possible error that occurred
	// language -> the identified language
});

var language = linguist.identify('YOUR_FILE');
```

**Report**

Report is the returned object when using walkIdentifySync
It holds some useful data

[Read more](https://github.com/jvhoven/hack-linguist/blob/master/lib/report.js)

# Todo

Create an asynchronous version of walkIdentifySync