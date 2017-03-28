module.exports = function (webpackConfig, env) {
  webpackConfig.module.loaders[0].exclude.push(/\.scss$/);
  if (env === 'development') {
    webpackConfig.module.loaders.push({
      test: /\.scss$/,
      loader: 'style!css?modules&localIdentName=[local]_[name]_[hash:base64:5]!postcss!sass?outputStyle=expanded',
      exclude: /node_modules/,
    });
  } else {
    webpackConfig.module.loaders.push({
      test: /\.scss$/,
      loader: 'style!css?modules&localIdentName=[hash:base64:5]!postcss!sass',
      exclude: /node_modules/,
    });
  }
  return webpackConfig;
};
