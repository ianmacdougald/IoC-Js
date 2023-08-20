# IoC js

An implementation of an IoC container in JavaScript.

## Overview of IoCs

**IoC** stands for 'inversion of control' and represents an object-oriented design pattern where dependencies are _injected_ into a class, rather than defined within them.

This allows developers to organize business logic related to the use of services without having to be responsible for the behavior of the services themselves. When using an IoC framework, services are configured later based on their arbitrary needs and instantaited within a commonly compliant interface as established by framework.

## The library

The current library implements and provides a concise interface for incorporating IoC's into JavaScript runtime environemnts like Node.

The library is made up of a couple of classes:

1. The IoC Container - `IOCContainer`
2. The IoC Dependency - `IOCDependency`
3. The IoC Service - `IOCService`

`IOCContainer` automatically manages the lifecylce of dependencies, injecting and ejecting them based on the state of the application.

`IOCDependency` is a factory that produces an instance of an `IOCService`. Dependencies themselves are instantiated by an instance of `IOCContainer` based on information from a user-defined configuration file.

`IOCService` is the lower-level module that contains the actual business logic that to be injected by the `IOCContainer` instance. As it stands, the actual `IOCService` class is largely undefined (i.e. abstract). Developers working in this framework are charged with writing their own service classes, which **must** inherit from `IOCService` and, at minimum, should overload its `serve` method with custom logic.

## Configuring services

The constructor of `IOCContainer` expects either an `object` or a path to a module exporting an object. Each key of this object should be associated with a service, looking as follows:

```js
module.exports = {
  // This will be the name of the Service
  //as stored in the dependencies key of an IOCContainer object
  Service1: {
    // 'src' is a REQUIRED field pointing either to a module
    // exporting a class extending an IOCService
    // or simply to a class definition
    src: '/some/path/to/a/class',

    // 'parameters' is an optional object (and must be an object)
    // that will be made available to services upon their instantiation
    parameters: {
      // parameters themselves can be of any arbitrary type
      par1: 4,
      par2: () => 'hello world',
    },
  },

  Service2: {
    // Here is an example of a class definition being
    // written directly into the configuration of a service
    src: class Service2 extends IOCService {
      serve(...args) {
        // Note that serve can expect to have access to parameters defined
        // on the parameters object
        return 'The value of par1 is: ' this.par1
      }
    },
    parameters: {
        par1: 200000
    }
  },
};
```
