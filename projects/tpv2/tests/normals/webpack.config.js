var path = require('path');

module.exports = {
  devServer: {
    host: '0.0.0.0'
  },
  entry: './ramps.js',
  output: {
    filename: 'ramps-bundle.js',
    library: 'App'
  },
  devtool: "eval-source-map",
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: [
      path.resolve(__dirname),
      'node_modules'
    ],
    extensions: ['.js'],
  }
};
