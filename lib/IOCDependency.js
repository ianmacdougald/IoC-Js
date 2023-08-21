const fs = require('fs');
const IOCService = require('./IOCService');
/********************************
IOCDependency is factory for IOCService instances. 
It is responsible for three primary tasks:
    1.0 Performing error checking on configuration arguments passed from the IOCContainer
    2.0 Storing the instantiated class definition in the case where it was configured with a string-based path (reducing require statements)
    3.0 Returning new instances of IOCServices upon request
********************************/
class IOCDependency {
  // The constructor for the dependency is largely responsible for error checking
  // The src can be either of type string or function (a.k.a class)
  constructor(src, parameters) {
    // If it is a string...
    if (typeof src == 'string') {
      // ...make sure the path it points to exists
      if (!fs.existsSync(src))
        throw Error('No class definition found at path: ' + src);
      // ...in which case load whatever is at that path
      else this.classDef = require(src);
    } else this.classDef = src;

    // If the class definition is not a function (i.e. not a class)...
    if (typeof this.classDef != 'function')
      // ...throw an error
      throw Error(
        'Expected function/class definition from module at path: ' + src
      );

    // If it is a class that is not of the type IOCSerivce
    if (!(this.classDef.prototype instanceof IOCService))
      // ...throw an error
      throw Error('Class definition must be of type IOCService');

    // Enforce that if there are parameters, they are themselves stored within an object
    this.parameters = parameters;
    if (this.parameters != undefined && typeof this.parameters != 'object')
      throw Error(
        'Expected parameters to be of type object. Received: ' + parameters
      );
  }

  // Finally, it creates a new service based on the configuration parameters
  makeService() {
    return new this.classDef(this.parameters);
  }
}

module.exports = IOCDependency;
