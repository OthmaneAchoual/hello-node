const _ = require('lodash');

function greet(name) {
  const greeting = _.join(['Hello', name]);
  return greeting;
}

console.log(greet('John'));
console.log('baz');
