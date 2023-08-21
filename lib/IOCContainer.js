const fs = require('fs');
const IOCDependencies = require('./IOCDependency');
const IOCDependency = require('./IOCDependency');

class IOCContainer {
  constructor(configuration = '') {
    if (fs.existsSync(configuration))
      this.dependencies = require(configuration);
    else throw Error('Configuration not found');
  }

  loadDependencies(configuration) {
    if (!this.dependencies) this.dependencies = {};
    const config = require(configuration);
    for (key in obj) {
      this.dependencies[key] = new IOCDependency(
        config[key].src,
        config[key].props
      );
    }
  }

  startService(key) {
    if (this.service != undefined) this.service.cleanup();
    this.service = this.dependencies[key].makeService();
  }

  serve(...args) {
    if (this.service) this.service.serve(...args);
    else throw Error('No service currently in use');
  }
}

module.exports = IOCContainer;
