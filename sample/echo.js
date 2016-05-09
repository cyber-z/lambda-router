'use strict';

exports.handler = (event, context) => {
  context.done(null, event);
};

exports.hello = (event, context) => {
  context.done(null, 'hello');
};

exports.notAHandler = {
  isObject: true
};
