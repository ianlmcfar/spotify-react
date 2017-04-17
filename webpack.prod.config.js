var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/index'
  ],
  
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [	  
	  new webpack.optimize.UglifyJsPlugin({
	    compress: {
	        drop_console: true,
	        warnings: false
	    },
	    output: {
	        comments: false // i don't remember which one of these works lols
	    },
	      comments: false
	  }),
	  new webpack.DefinePlugin({
	      "process.env": {
	         NODE_ENV: JSON.stringify("production")
	       }
	  })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
