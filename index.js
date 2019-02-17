/**
 * @module satoshi-rpgcoin
 */

var Big = require('big.js');

// @private
var conversion = 100000000;

// es6 polyfill
if (!Number.isInteger) {
  Number.isInteger = function(num) {
    return typeof num === 'number' && num % 1 === 0;
  }
}

// @private
function toNumber(notNum) {
  return Number(notNum);
}

module.exports = {

  /**
   * Convert Satoshi to Rpgcoin
   * @param {number|string} satoshi Amount of Satoshi to convert. Must be a whole number
   * @throws {TypeError} Thrown if input is not a number or string
   * @throws {TypeError} Thrown if input is not a whole number or string format whole number
   * @returns {number}
   */
  toRpgcoin: function(satoshi) {
    //validate arg
    var satoshiType = typeof satoshi;
    if (satoshiType === 'string') {
      satoshi = toNumber(satoshi);
      satoshiType = 'number';
    }
    if (satoshiType !== 'number'){
      throw new TypeError('toRpgcoin must be called on a number or string, got ' + satoshiType);
    }
    if (!Number.isInteger(satoshi)) {
      throw new TypeError('toRpgcoin must be called on a whole number or string format whole number');
    }

    var bigSatoshi = new Big(satoshi);
    return Number(bigSatoshi.div(conversion));
  },

  /**
   * Convert Rpgcoin to Satoshi
   * @param {number|string} rpgcoin Amount of Rpgcoin to convert
   * @throws {TypeError} Thrown if input is not a number or string
   * @returns {number}
   */
  toSatoshi: function(rpgcoin) {
    //validate arg
    var rpgcoinType = typeof rpgcoin;
    if (rpgcoinType === 'string') {
      rpgcoin = toNumber(rpgcoin);
      rpgcoinType = 'number';
    }
    if (rpgcoinType !== 'number'){
      throw new TypeError('toSatoshi must be called on a number or string, got ' + rpgcoinType);
    }

    var bigRpgcoin = new Big(rpgcoin);
    return Number(bigRpgcoin.times(conversion));
  }

};
