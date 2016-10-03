const fs = require('fs');
const cli = require('bonny-cli-renderer');
const config = require('./bonny.config').parse();

class BonnyClient {

  constructor() {
    cli.log(`<title>🏁 The <highlight>Bonny Client Generator</highlight> is starting...</title>`);
    this.webpack();
    this.gulp();
  }

  webpack() {
    cli.log(`<message>Webpack creates ${config.bundles.items.length} bundles in '${config.bundles.fullBuildPath}'</message>`);
    cli.runtimeExec({
      command: 'webpack',
      ondata: (data)=>{},
      onerror: (error)=>{
        cli.log(`<error> WEBPACK: ${data} </error>`);
      }
    });
  }

  gulp() {
    const that = this;
    cli.log(`<message>Gulp creates several views in '${config.views.fullBuildPath}'</message>`);
    cli.runtimeExec({
      command: 'webpack',
      ondata: (data)=>{},
      onerror: (error)=>{
        cli.log(`<error> GULP: ${data} </error>`);
        cli.log(`<message>gulp will restart 5seconds later automatically...</message>`);
        setTimeout(()=>{
          that.gulp();
        }, 5000);
      }
    });
  }

}

const app = new BonnyClient();
