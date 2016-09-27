var bonny = require('./bonny.config.json');
var fs = require('fs');
var path = require('path');

var getDirectories = function(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}

var developSrc = bonny.setting.develop.src;
var buildSrc = bonny.setting.build.src;
var bundlesSrc = bonny.setting.build.bundlesSrc;

// Initialize Object
var config = {
  developSrc: developSrc,
  buildSrc: buildSrc,
  bundles: {
    src: bundlesSrc,
    items: [],
    webpackEntryObject: {}
  }
};

// Bundle Things
var bundleNames = getDirectories(config.developSrc + "/bundles");
var bundleUrl;
for (bundleName of bundleNames) {
  bundleUrl = config.developSrc + "/bundles/" + bundleName + "/index.js";
  config.bundles.items.push({
    name: bundleName,
    url: bundleUrl
  });
  config.bundles.webpackEntryObject[ bundleName ] = bundleUrl;
}

module.exports = config;
