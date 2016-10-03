const child_process = require('child_process');
const fs = require('fs');
const cli = require('bonny-cli-renderer');
const config = require('./bonny.config').parse();

const exec = child_process.exec;
const spawn = child_process.spawn;

class BonnyClient {

  constructor() {
    cli.log(`<title>🏁 The <highlight>Bonny Client Generator</highlight> is starting...</title>`);
    this.webpack();
    this.gulp();
  }

  webpack() {

    const webpack = spawn('webpack');

    cli.log(`<message>Webpack creates ${config.bundles.items.length} bundles in '${config.bundles.fullBuildPath}'</message>`);

/*
    webpack.stdout.on('data', (data) => {
      cli.log(`<message>WEBPACK: ${data}</message>`);
    });
*/

    webpack.stderr.on('data', (data) => {
      cli.log(`<error> WEBPACK: ${data} </error>`);
    });
  }

  gulp() {

    const that = this;

    const gulp = spawn('gulp');

    cli.log(`<message>Gulp creates several views in '${config.views.fullBuildPath}'</message>`);

/*
    gulp.stdout.on('data', (data) => {
      cli.log(`<message>GULP: ${data}</message>`);
    });
*/

    gulp.stderr.on('data', (data) => {
      cli.log(`<error> GULP: ${data} </error>`);
      cli.log(`<message>gulp will restart 5seconds later automatically...</message>`);
      setTimeout(()=>{
        that.gulp();
      }, 5000);
    });

  }

}

const app = new BonnyClient();
