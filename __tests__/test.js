const path = require('path');
const { IOCService, IOCDependency, IOCContainer } = require('..');

describe('#Unit Tests', () => {
  class TestService extends IOCService {
    serve(...args) {
      return [this.parameter, ...args];
    }
  }

  describe('#IOCContainer', () => {
    const config_path = path.resolve(__dirname, './resources/testConfig.js');

    it('IOCContainer should load dependencies from a configuration file', () => {
      const ioc = new IOCContainer(config_path);
      expect(ioc.dependencies.length).toEqual(require(config_path).length);
    });

    it('should be able to load dependencies directly form an object', () => {
      const obj = require(config_path);
      const ioc = new IOCContainer(config_path);
      expect(ioc.dependencies.length).toEqual(obj.length);
    });
  });

  describe('#IOCDependency', () => {
    it('should throw an error if the Service class does not extend IOCService', () => {
      let error = null;
      try {
        new IOCDependency(() => {});
      } catch (e) {
        error = e;
      }
      expect(error).not.toBe(null);
    });

    it('should create and return an instance of an IOCService on request', () => {
      expect(
        new IOCDependency(TestService).makeService() instanceof TestService
      ).toBe(true);
    });
  });

  describe('#IOCService', () => {
    it('should store a method "serve" on its prototype', () => {
      const service = new TestService();
      expect(typeof service.serve).toBe('function');
    });

    it('should throw an error if its first argument is not an object', () => {
      let error;
      try {
        new TestService(1, 2, 3);
      } catch (e) {
        error = e;
      }

      expect(error).not.toBe(undefined);
    });

    it('should map parameter object to its own keys', () => {
      const t = new TestService({ parameter: 1 });
      expect(t.serve()[0]).toEqual(1);
    });

    it('its service method should accept additional arguments', () => {
      const obj = { parameter: 1 };
      const array = [1, 2, 3, 4, 5];
      expect(new TestService(obj).serve(...array).length).toEqual(
        array.length + 1
      );
    });
  });
});

describe('#Integration tests', () => {
  describe('#IOCContainer', () => {
    let dependency;
    const ioc = new IOCContainer(
      path.resolve(__dirname, './resources/testConfig.js')
    );

    it('should be able to inject service dependencies', () => {
      ioc.inject('Service1', (service) => {
        dependency = service;
      });

      expect(dependency).not.toBe(undefined);
      expect(dependency.serve(0)).toEqual(['hello world', 1]);
    });

    it('should be able to inject a new service', () => {
      ioc.inject('Service2', (service) => {
        dependency = service;
      });

      expect(dependency.serve(0)).toEqual(['goodbye world', -1]);
    });
  });
});
