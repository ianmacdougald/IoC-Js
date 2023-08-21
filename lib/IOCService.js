class IOCService {
  constructor(dependencies) {
    // Load dependencies into service instance
    Object.keys(dependencies).forEach((key) => {
      const val = dependencies[key];
      // If it is a function, invoke it
      if (typeof val === 'function') this[key] = val();
      else this[key] = val;
    });
  }
  // This is the method to overload with subclasses, representing the bespoke business logic of each service.
  serve(...args) {}
}

module.exports = IOCService;
