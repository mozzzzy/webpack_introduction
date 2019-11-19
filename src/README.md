# Webpack tutorial
19.11.2019

## Install webpack
```sh
$ npm install webpack
```

## Bundle javascript files
### Source code (javascript)
* entry.js
```javascript
document.write(require("./content.js"));
```

* content.js
```javascript
module.exports = "It works!!";
```

### Source code (html)
* index.html
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>webpack tutorial</title>
  </head>
  <body>
    <script src="bundle.js"></script>
  </body>
</html>
```

### Install webpack
```sh
$ npm install webpack
```

### Bundle
1. Bundle simply...
```sh
$ ../node_modules/.bin/webpack-cli entry.js --output ./bundle.js --output-path ./ --mode development
Hash: bfa838f251151722f983
Version: webpack 4.41.2
Time: 64ms
Built at: 11/19/2019 8:56:18 PM
    Asset      Size  Chunks             Chunk Names
bundle.js  4.15 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./content.js] 31 bytes {main} [built]
[./entry.js] 92 bytes {main} [built]
```

Finaly, verify the artifucts.
```sh
$ open ./index.html
# -> It works!!
```

2. With configuration file...
* webpack.config.js
```js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './entry.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './')
  }
}
```

Then, bundle with configuration file.
```sh
$ ../node_modules/.bin/webpack-cli --config webpack.config.js
Hash: bfa838f251151722f983
Version: webpack 4.41.2
Time: 72ms
Built at: 11/19/2019 8:57:06 PM
    Asset      Size  Chunks             Chunk Names
bundle.js  4.15 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./content.js] 31 bytes {main} [built]
[./entry.js] 92 bytes {main} [built]
```

Finaly, verify the artifucts.
```sh
$ open ./index.html
# --> It works!!
```

## Use loader (to bundle stylesheet)
Webpack can bundle only javascript files.
So we should use loader to bundle css style sheets.

### Source code (css)
* style.css
```css
body {
  background: yellow;
}
```

### Modify Past Source code (javascript)
* entry.js
```javascript
require("!style-loader!css-loader!./style.css");
document.write(require("./content.js"));
```

### Install loader
```sh
$ npm install css-loader style-loader
```

### Bundle
```sh
$ ../node_modules/.bin/webpack-cli --config webpack.config.js
```

Finaly, verify the artifucts.
```sh
$ open ./index.html
# --> It works!! (with its background color is yellow.)
```

### Add loaders to webpack.config.js
We can write `require('./style.css');` to entry.js
if we add loader to webpack.config.js.
* webpack.config.js
```javascript
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './entry.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './')
  },
  module: {
    rules: [
      {
        // If file name matches to /.css$/, use css-loader.
        test: /\.css$/,
        use: ['style-loader','css-loader']
      }
    ]
  }
}
```
* entry.js
```javascript
require("./style.css");
document.write(require("./content.js"));
```

Then bundle them.
```sh
$ ../node_modules/.bin/webpack-cli --config webpack.config.js
Hash: 6b9bd915e881932ff5c6
Version: webpack 4.41.2
Time: 248ms
Built at: 11/19/2019 9:06:19 PM
    Asset      Size  Chunks             Chunk Names
bundle.js  16.3 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[../node_modules/css-loader/dist/cjs.js!./style.css] 172 bytes {main} [built]
[./content.js] 31 bytes {main} [built]
[./entry.js] 65 bytes {main} [built]
[./style.css] 403 bytes {main} [built]
    + 2 hidden modules
```
