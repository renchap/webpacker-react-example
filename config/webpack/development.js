// Note: You must restart bin/webpack-watcher for changes to take effect

var path    = require('path')
var webpack = require('webpack')
var merge   = require('webpack-merge')

var config = require('./shared.js')

let enableHotModuleReload = true;
if (enableHotModuleReload) {
  let webpackDevServerAddr = 'http://localhost:8080/'
  config = merge(
    config,
    {
      output: {
        publicPath: webpackDevServerAddr // necessary for HMR to know where to load the hot update chunks
      },
      devServer: {
        hot: true,
        contentBase: path.resolve('..', 'public', 'packs'),
        publicPath: webpackDevServerAddr
      },
      plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
      ]
    }
  )

  for (let key of Object.keys(config.entry)) {
    config.entry[key] = ['react-hot-loader/patch',`webpack-dev-server/client?${webpackDevServerAddr}`,'webpack/hot/only-dev-server',config.entry[key]]
  }
}

module.exports = merge(config, {
  devtool: 'sourcemap',

  stats: {
    errorDetails: true
  },

  output: {
    pathinfo: true
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
})
