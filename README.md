# Hack-linguist

Simple wrapper on top of [atom-linguist](https://github.com/lee-dohm/atom-linguist)

The only difference is that hack-linguist is used to loop through a project dir and find all major programming languages.
Beware though, this module is specifically created for my other project.

USE AT OWN RISK

# Installation
```
npm i hack-linguist
```

# How to

```
var url = "C:\\your-dir\\another-dir";
var linguist = require("hack-linguist");
var languages = linguist.detect(url);
```

# Todo

Only return major programming languages