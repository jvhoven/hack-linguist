# Hack-linguist

Simple wrapper on top of [atom-linguist]("https://github.com/lee-dohm/atom-linguist")
The only difference is that hack-linguist is used to loop through a project dir and find all major programming languages.

# Installation
soon

# How to

```
var url = "C:\\your-dir\\another-dir";
var linguist = require("hack-linguist");
var languages = linguist.detect(url);
```

# Todo

Only return major programming languages