var should = require('chai').should();
var sb = require('../index.js');

describe('#toRpgcoin', function() {
  it('converts simple integer amounts', function() {
    sb.toRpgcoin(100000000).should.equal(1);
    sb.toRpgcoin(123456789012345).should.equal(1234567.89012345);
  });
  it('converts simple string amounts', function() {
    sb.toRpgcoin('100000000').should.equal(1);
    sb.toRpgcoin('123456789012345').should.equal(1234567.89012345);
  });

  it('converts to Rpgcoin, not to Satoshi', function() {
    sb.toRpgcoin(98765).should.not.equal(9876500000000);
  });

  it('converts and handles corner case rounding', function() {
    sb.toRpgcoin(46).should.equal(.00000046);
  });

  it('handles TypeError input', function() {
    sb.toRpgcoin.bind(this, true).should.throw('toRpgcoin must be called on a number or string');
    sb.toRpgcoin.bind(this, 1.1).should.throw('toRpgcoin must be called on a whole number or string format whole number');
  });
});

describe('#toSatoshi', function() {
  it('converts simple integer amounts', function() {
    sb.toSatoshi(0.00000001).should.equal(1);
    sb.toSatoshi(98765).should.equal(9876500000000);
  });
  it('converts simple string amounts', function() {
    sb.toSatoshi('0.00000001').should.equal(1);
    sb.toSatoshi('98765').should.equal(9876500000000);
  });

  it('converts to Satoshi, not to Rpgcoin', function() {
    sb.toSatoshi(123456789012345).should.not.equal(1234567.89012345);
  });

  it('converts and handles corner case rounding', function() {
    sb.toSatoshi(4.6).should.equal(460000000);
  });

  it('handles TypeError input', function() {
    sb.toSatoshi.bind(this, true).should.throw('toSatoshi must be called on a number or string');
  });
});
