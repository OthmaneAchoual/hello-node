const { expect } = require('chai');
const { add } = require('../src/foo');

describe('test', () => {
  it('should work', () => {
    expect(add(1, 1)).to.equal(2);
  });
});
