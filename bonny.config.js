var fs = require('fs');
var path = require('path');


// ===============================================================
// -------------------- Configuration ----------------------------
// ===============================================================

var setting = {
  develop: {
    src: "./develop",
  },
  build: {
    src: "./build",
    bundles: {
      src: "/bundles",
    }
  }
}

var app = {
  title: "سلام بانی",
  lang: "fa",
  seo: {
    description: "This is a sample bonny website",
    keywords: "bonny, Boilerplate, jade, stylus, webpack, gulp, es6",
    author: "Alireza Sheikholmolouki",
    robots: "index, follow"
  }
}

var data = {

}

// ===============================================================
// ===============================================================




// ------------------------- Parser ------------------------------------

var getDirectories = function(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
var parse = function() {
  var parsingConfig = {
    develop: {
      src: config.setting.develop.src,
    },
    build: {
      src: config.setting.build.src,
    },
    bundles: {
      src: config.setting.build.bundles.src,
      fullBuildPath: config.setting.build.src + config.setting.build.bundles.src,
      items: [],
      webpackEntryObject: {}
    }
  };
  var bundleNames = getDirectories(parsingConfig.develop.src + "/bundles");
  var bundleUrl;
  for (bundleName of bundleNames) {
    bundleUrl = parsingConfig.develop.src + "/bundles/" + bundleName + "/index.js";
    parsingConfig.bundles.items.push({
      name: bundleName,
      url: bundleUrl
    });
    parsingConfig.bundles.webpackEntryObject[ bundleName ] = bundleUrl;
  }
  return parsingConfig;
}

// this is how data pases
var config = {
  setting: setting,
  app: app,
  data: data,
  parse: parse
}

module.exports = config;