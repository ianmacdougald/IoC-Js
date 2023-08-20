# IoC js

An implementation of an IoC container in JavaScript.

## Overview of IoCs

**IoC** stands for 'inversion of control' and represents an object-oriented design pattern where dependencies are _injected_ into a class, rather than defined within them.

This allows for a more modular separation of concerns when developing classes. For instance, one can imagine a backend service, like a payment processor, designed using an IoC pattern, whereby the externally-oriented programmatic responses of the payment processing service are implemented but the internally ones are not explicitly defined in advance.

This feature allows developers to configure the explicit behavior of the payment processor in a more modular fashion, allowing behaviors to be swapped at run time or configured by an external file format.

One often sees IoC patterns used in backend servers implemented with Java, since Java Spring, a particularly popular framework, makes use of them, allowing developers to configure service behaviors from XML files, rather than hard coding them direclty into classes.

## This library

The current library implements and provides a concise interface for incorporating IoC's into JavaScript runtime environemnts like Node.

The library is made up of a couple of classes:

1. The IoC Container - `IOCContainer`
2. The IoC Dependency - `IOCDependency`
3. The IoC Service - `IOCService`
4. The IoC Configurable - `IOCConfiguration`

The container automatically manages the lifecylce of dependencies, injecting and ejecting them based on the state of the application.

The service is the class that is instantiated within a dependency; as such, IOCService enforces a common higher-levle interface for all dependencies, regardless of the details of their functionality.

The configuration class is responsible for managing dependency configurations. This library, taking inspiration from JavaSpring, requires developers to specify services within a `.json` file (or a folder of `.json` files). The container uses the configuration to implement and instantiate the details of each dependency.
