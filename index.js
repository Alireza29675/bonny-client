const child_process = require('child_process');
const fs = require('fs');
const RenderKid = require('renderkid');
const config = require('./bonny.config').parse();

const r = new RenderKid();
const exec = child_process.exec;
const spawn = child_process.spawn;

r.style({
  "title": {
    display: "block",
    margin: "1 0 1"
  },

  "highlight": {
    marginRight: "1",
    marginLeft: "1",
    color: "bright-yellow"
  },

  "error": {
    display: "block",
    color: "black",
    background: "red",
    bullet: '"  ❌ "'
  },

  "message": {
    display: "block",
    color: "bright-cyan",
    bullet: '"  👉 "',
    margin: "0 3 1"
  },

  "success": {
    display: "block",
    color: "bright-green",
    bullet: '"  ✅ "',
    margin: "0 3 1"
  }
});

class BonnyClient {

  constructor() {
    console.log(r.render(`
      <title>
        🏁 The <highlight>Bonny Client Generator</highlight> is starting...
      </title>
    `));
    this.webpack();
    this.gulp();
  }

  webpack() {

    const webpack = spawn('webpack');

    console.log(r.render(`<message>Webpack creates ${config.bundles.items.length} bundles in '${config.bundles.fullBuildPath}'</message>`))

/*
    webpack.stdout.on('data', (data) => {
      console.log(r.render(`<message>WEBPACK: ${data}</message>`));
    });
*/

    webpack.stderr.on('data', (data) => {
      console.log(r.render(`<error> WEBPACK: ${data} </error>`));
    });
  }

  gulp() {

    const that = this;

    const gulp = spawn('gulp');

    console.log(r.render(`<message>Gulp creates several views in '${config.views.fullBuildPath}'</message>`))

/*
    gulp.stdout.on('data', (data) => {
      console.log(r.render(`<message>GULP: ${data}</message>`));
    });
*/

    gulp.stderr.on('data', (data) => {
      console.log(r.render(`<error> GULP: ${data} </error>`));
      console.log(r.render(`<message>gulp will restart 5seconds later automatically...</message>`))
      setTimeout(()=>{
        that.gulp();
      }, 5000);
    });

  }

}

const app = new BonnyClient();
