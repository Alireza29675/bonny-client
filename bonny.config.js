var fs = require('fs');
var path = require('path');

// ===============================================================
// -------------------- Basis Setting ----------------------------
// ===============================================================

var setting = {
  develop: {
    src: "./develop",
    views: { src: "/views" },
    bundles: { src: "/views/bundles" },
    localization: { src: "/views/localization" }
  },
  build: {
    src: "./app",
    views: { src: "/" },
    bundles: { src: "/bundles" },
  }
}

// ===============================================================
// ------------------- Application Setting -----------------------
// ===============================================================

var app = {
  lang: "en",
}
var data = {
  seo: {
    keywords: "bonny, Boilerplate, jade, stylus, webpack, gulp, es6",
    robots: "index, follow"
  }
}


// ---------------------------------------------------------------
// -------------------------- Parser -----------------------------
// ---------------------------------------------------------------
var getDirectories = function(srcpath) {
  return fs.readdirSync(srcpath).filter(function(file) {
    return fs.statSync(path.join(srcpath, file)).isDirectory();
  });
}
var mergeObjects = function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  } return target;
}

var _data = {};
var localization_file = setting.develop.src + setting.develop.localization.src + "/" + app.lang + ".js";
try {
    fs.accessSync(localization_file, fs.F_OK);
    _data = eval( String( fs.readFileSync( localization_file ) ) );
} catch (e) {}
data = mergeObjects(data, _data);

var parse = function() {
  var parsingConfig = {
    develop: {
      src: config.setting.develop.src,
    },
    build: {
      src: config.setting.build.src,
    },
    bundles: {
      developSrc: config.setting.develop.bundles.src,
      fullDevelopPath: config.setting.develop.src + config.setting.develop.bundles.src,
      buildSrc: config.setting.build.bundles.src,
      fullBuildPath: config.setting.build.src + config.setting.build.bundles.src,
      items: [],
      webpackEntryObject: {}
    },
    views: {
      developSrc: config.setting.develop.views.src,
      fullDevelopPath: config.setting.develop.src + config.setting.develop.views.src,
      buildSrc: config.setting.build.views.src,
      fullBuildPath: config.setting.build.src + config.setting.build.views.src,
    }
  };
  var bundleNames = getDirectories( parsingConfig.bundles.fullDevelopPath );
  var bundleUrl;
  for (bundleName of bundleNames) {
    bundleUrl = parsingConfig.bundles.fullDevelopPath + "/" + bundleName + "/index.js";
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
