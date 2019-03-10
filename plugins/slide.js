const HtmlWebpackPlugin = require('html-webpack-plugin');

class SlidePlugin {
  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.compilation.tap('SlidePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'SlidePlugin',
        (data, callback) => {
          data.plugin.options.content = '<section>foo</section><section>bar</section>';
          callback(null, data);
        },
      );
    });
  }
}

module.exports = SlidePlugin;
