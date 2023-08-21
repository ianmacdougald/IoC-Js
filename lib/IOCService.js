/********************************
The IOCService is responsible for performing bespoke business logic that is injected into an application by the IOCContainer. 

As it stands, it is an abstract class meant to be extended by subclasses overloading its 'serve' method, providing users of many IOCContainer services with a consistent interface for accessing diverse
********************************/
class IOCService {
  constructor(parameters) {
    // Copy parameters into class
    if (parameters) {
      if (typeof parameters != 'object')
        throw Error('IOCService can only accept an object as a parameter');
      Object.keys(parameters).forEach((key) => {
        this[key] = parameters[key];
      });
    }
  }
  // This is the method to overload with subclasses, representing the bespoke business logic of each service.
  serve(...args) {}
}

module.exports = IOCService;
