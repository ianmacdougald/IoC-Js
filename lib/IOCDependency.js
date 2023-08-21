const fs = require('fs');
const IOCService = require('./IOCService');

class IOCDependency {
  constructor(classPath, parameters) {
    if (!fs.existsSync(classPath))
      throw Error('No class found at path: ' + classPath);

    this.classDef = require(classPath);
    if (typeof this.classDef != 'function')
      throw Error(
        'Expected function/class definition from module at path: ' + classPath
      );

    if (!(this.classDef.prototype instanceof IOCService))
      throw Error('Class definition must be of type IOCService');

    this.parameters = parameters;
    if (typeof this.parameters != 'object')
      throw Error(
        'Expected parameters to be of type object. Received: ' + parameters
      );
  }

  makeService() {
    return new this.classDef(...this.parameters);
  }
}

module.exports = IOCDependency;
