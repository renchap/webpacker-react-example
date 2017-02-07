var webpack = require('webpack')
var merge   = require('webpack-merge')
var path    = require('path')

function configureHotMobuleReplacement(config)
{
  let webpackDevServerAddr = process.env['WEBPACK_DEV_SERVER_ADDR'] || 'http://localhost:8080/'
  config = merge(
    config,
    {
      output: {
        publicPath: webpackDevServerAddr // necessary for HMR to know where to load the hot update chunks
      },
      devServer: {
        contentBase: path.resolve('..', 'public', 'packs'),
        publicPath: webpackDevServerAddr
      },
      plugins: [
        new webpack.NamedModulesPlugin()
      ]
    }
  )

  config.module.rules = config.module.rules.map( rule => {
    if (rule.loader === 'babel-loader') {
      return merge(rule, {options: {plugins: ["react-hot-loader/babel"]}})
    } else {
      return rule
    }
  })

  for (let key of Object.keys(config.entry)) {
    config.entry[key] = [
       'react-hot-loader/patch',
       config.entry[key]
     ]
  }
  return config;
}

module.exports = configureHotMobuleReplacement;
