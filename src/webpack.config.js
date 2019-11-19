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
