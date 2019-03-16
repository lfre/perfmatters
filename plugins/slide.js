const HtmlWebpackPlugin = require('html-webpack-plugin');
const fg = require('fast-glob');
const { readFile } = require('fs');
const { watch } = require('chokidar');

let output = [];

class SlidePlugin {
  constructor() {
    const paths = ['slides/**/*.html'];
    // read slides from directory
    fg(paths).then((files) => {
      // replace paths with promises to its contents
      const filemap = files.map(
        file => new Promise((done, reject) => {
          readFile(file, 'utf8', (err, contents) => {
            if (err) return reject();
            return done(contents);
          });
        }),
      );
      // resolve lookups, store in an array, and convert to strings for rendering
      Promise.all(filemap).then((contents) => {
        output = contents;
      });
    });

    const watcher = watch(paths, { ignoreInitial: true });
    watcher.on('change', (file) => {
      readFile(file, 'utf8', (err, contents) => {
        const index = file.match(/\d/).pop();
        output[index] = contents;
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.compilation.tap('SlidePlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
        'SlidePlugin',
        (data, callback) => {
          data.plugin.options.content = output.join();
          callback(null, data);
        },
      );
    });
  }
}

module.exports = SlidePlugin;
