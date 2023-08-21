const path = require('path');
const services = require('./services');

module.exports = {
  // Service1 covers the base case where a dependency instantiates a Service
  Service1: {
    src: services['Service1'],
    parameters: {
      first_parameter: 'hello world',
      second_parameter: (n) => n + 1,
    },
  },
  Service2: {
    // Service2 covers the case where a new dependency is injected after a first is instantiated
    src: services['Service2'],
    parameters: {
      first_parameter: 'goodbye world',
      second_parameter: (n) => n - 1,
    },
  },
  Service3: {
    // Service3 covers the case where there are no paramters declared in the configuration
    src: services['Service3'],
  },
  // Service4 tests for configurations loaded as strings representing paths to classes
  Service4: {
    src: path.resolve(__dirname, './Service.js'),
  },
};
