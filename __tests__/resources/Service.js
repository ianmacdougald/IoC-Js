const IOCService = require('../../index').IOCService;

// Service5 tests for an alternative configuration schema where Services are defined as paths rather than as class definitions
module.exports = class Service4 extends IOCService {
  serve(...args) {
    console.log('This is a Service');
    console.log(this.first_parameter);
    return this.second_parameter(args[0]);
  }
};
