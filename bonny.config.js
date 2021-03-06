var fs = require('fs');
var path = require('path');

// ==================================================================
// ==================================================================
// ===-----=====-----===== Basis Setting =====-----=====-----=====---
// ==================================================================
// ==================================================================

var app = {

  defaultLang: "en",

  lang: "fa"

}

var data = {

  seo: {

    discription: "", // no neccessary to enter it because it's on eng.js

    keywords: "bonny, Boilerplate, jade, stylus, webpack, gulp, es6",

    robots: "index, follow",

    author: "",  // no neccessary to enter it because it's on eng.js

  }

}

var setting = {

  server: "laravel",

  develop: {

    src: "./develop",

    views: { src: "/views" },

    bundles: { src: "/views/bundles" },

    localization: { src: "/views/localization" }

  },

  build: {

    src: "../bonny-laravel-server",

    views: { src: "/resources/views/" },

    bundles: { src: "/public/bundles/" },

  }

}









































// -------------------------- Parser -----------------------------

var someRTL = ['fa', 'persian', 'ar', 'arabic'];

app.lang = app.lang ? app.lang : app.defaultLang;
app.direction = app.direction ? app.direction : ( someRTL.indexOf( app.lang ) != -1 ? 'rtl': 'ltr' );

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
        if( typeof target[key] == 'object' && typeof source[key] == 'object' ) target[key] = mergeObjects( target[key] , source[key]);
        else target[key] = source[key];
      }
    }
  } return target;
}

var _data = {};
var localization_folder = setting.develop.src + setting.develop.localization.src;
var localization_default_file = localization_folder + "/" + app.defaultLang + ".js";
var localization_file = localization_folder + "/" + app.lang + ".js";

_defaultData = eval( String( fs.readFileSync( localization_default_file ) ) );

try {
    fs.accessSync(localization_file, fs.F_OK);
    _data = eval( String( fs.readFileSync( localization_file ) ) );
} catch (e) {
  console.warn("We cant't find or open " + app.lang + ".js file in " + localization_folder)
}

data = mergeObjects(data, _defaultData, _data);

var parse = function() {
  var parsingConfig = {
    original: config,
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
    },
    localization: {
      fullDevelopPath: config.setting.develop.src + config.setting.develop.localization.src
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
