const { createConfig, babel, postcss, match, file } = require('webpack-blocks');
module.exports = {
  require: [
    'babel-polyfill'
  ],
  webpackConfig: createConfig(
    [ babel(),
      postcss(),
      match(['*.gif', '*.jpg', '*.jpeg', '*.png', '*.svg'], [file()])
    ]
  )
};




