var webpack = require('webpack');

module.exports = {
    entry: {
      loader: "./develop/bundles/loader/index.js",
      template: "./develop/bundles/template/index.js",
      index: "./develop/bundles/index/index.js",
    },
    output: {
      path: __dirname,
      filename: "./build/bundles/[name].bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
            { test: /\.styl$/, loader: "style!css!stylus" },
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel',
              query: {
                presets: ['es2015']
              }
            },
            { test: /\.jade$/, loader: "jade"},
            { test: /\.html$/, loader: "html"},
            { test: /\.coffee$/, loader: "babel?presets[]=es2015!coffee"},
            { test: /\.(png|jpg|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=1000000' },
        ]
    },
    plugins: [
      //  new webpack.optimize.UglifyJsPlugin({minimize: true}) // minify bundle
    ]
};
