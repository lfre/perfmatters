const HtmlWebpackLoader = require('html-webpack-plugin/lib/loader');
const loaderUtils = require('loader-utils');
const fg = require('fast-glob');
const { readFile, writeFile } = require('fs');
const { watch } = require('chokidar');

const paths = ['slides/**/*.html'];
let output = [];
let result = '';
let watching = false;
let defaultContent = '';

// return a promise to read each slide content
const readSlideContent = file => new Promise((done, reject) => {
  readFile(file, 'utf8', (err, contents) => {
    if (err) return reject();
    return done(contents);
  });
});
// process filepaths
const processSlides = files => files.map(readSlideContent);
// read slides from directory
const getSlides = () => fg(paths)
  .then(processSlides)
  .then(files => Promise.all(files));

getSlides().then((contents) => {
  output = contents;
});

const startWatching = (template) => {
  watching = true;
  const watcher = watch(paths, { ignoreInitial: true });
  watcher.on('change', (file) => {
    readFile(file, 'utf8', (err, contents) => {
      if (err) return;
      const index = file.match(/\d/).pop();
      output[index] = contents;
      result = output.join();
      writeFile(template, defaultContent, () => {});
    });
  });
};

module.exports = function loader(content) {
  const options = this.query !== '' ? loaderUtils.getOptions(this) : {};
  const defaultLoader = HtmlWebpackLoader.bind(this);
  if (content !== defaultContent) {
    defaultContent = content;
  }
  if (options.isDev && !watching) {
    startWatching(options.template);
  }
  if (!result && output.length) result = output.join();
  content = content.replace('<%= content %>', result);
  return defaultLoader(content);
};
