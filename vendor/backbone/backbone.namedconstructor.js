(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'underscore', 'backbone'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS.
    factory(exports, require('underscore'), require('backbone'));
  } else {
    // Browser globals.
    factory((root.NamedConstructor = {}), root._, root.Backbone);
  }
}(this, function(exports, _, Backbone) {

  var originalExtend = Backbone.Model.extend;
  var nameProp = 'constructorName';

  var createNamedConstructor = function(name, constructor) {
    var fn = new Function(
      'constructor',
      'return function ' + name + '() {\n' +
      '  return constructor.apply(this, arguments);\n' +
      '};'
    );
    return fn(constructor);
  };

  var newExtend = function(protoProps, classProps) {
    var parent = this;
    if (protoProps && _.has(protoProps, nameProp)) {
      var constructor = _.has(protoProps, 'constructor') ? protoProps.constructor : parent;
      protoProps = _.extend(protoProps, {
        constructor: createNamedConstructor(protoProps[nameProp], constructor)
      });
    }
    return originalExtend.call(parent, protoProps, classProps);
  };

  Backbone.Model.extend = Backbone.Collection.extend = Backbone.Router.extend = Backbone.View.extend = newExtend;

}));
