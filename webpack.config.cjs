const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    library: "EPComponent",
    libraryTarget: "umd",
    libraryExport: 'default',
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: /\.js/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  }
};