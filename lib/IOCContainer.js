const fs = require('fs');
const IOCDependency = require('./IOCDependency');
/********************************
The IOCContainer is responsible for managing the lifecycle of both services (IOCService instances) and dependencies (IOCDependency instances).

As organized here, the IOCDependency objects act as factories for services, and the container caches the dependencies.

This allows for a modularized separation of concerns:
  1.0 The IOCContainer will have access to all possible services
  2.0 The IOCDependency will make sure that the configuration of services is correct
  3.0 The IOCService expresses business logic through a consistently enforced 'serve' method; it is made available to the surrounding application through the container's 'inject' method
********************************/
class IOCContainer {
  // The constructor performs typechecking on the configuration input, ensuring that it is either an object or a string that points to an object
  constructor(configuration = {}) {
    // String case
    if (typeof configuration == 'string' && fs.existsSync(configuration))
      this.configuration = require(configuration);
    else throw Error('Configuration not found');
    // A container for holding dependencies
    this.dependencies = {};
    // Instantiate IOCDependency instances based on each key of the configuration object
    for (const key in this.configuration) {
      this.dependencies[key] = new IOCDependency(
        this.configuration[key].src,
        this.configuration[key].parameters,
        this
      );
    }
  }

  //The injection method makes the service available to the surrounding application via a callback, which is passed a newly instantiated service as an argument
  inject(key, callback) {
    const service = this.dependencies[key].makeService();
    callback(service);
    return service;
  }
}

module.exports = IOCContainer;
