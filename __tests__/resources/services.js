const IOCService = require('../../index').IOCService;

module.exports = {
  // Service1 covers the base case where a dependency instantiates a Service
  Service1: class Service1 extends IOCService {
    serve(...args) {
      console.log('This is Service 1');
      return [this.first_parameter, this.second_parameter(args[0])];
    }
  },

  // Service2 covers the case where a new dependency is injected after a first is instantiated
  Service2: class Service2 extends IOCService {
    serve(...args) {
      console.log('This is Service 2');
      return [this.first_parameter, this.second_parameter(args[0])];
    }
  },

  // Service3 covers the case where there are no paramters declared in the configuration
  Service3: class Service3 extends IOCService {
    serve(...args) {
      return [this.first_parameter];
    }
  },
};
