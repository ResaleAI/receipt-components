const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd",
    umdNamedDefine: true,
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