/**
 * the source code by: https://github.com/goto-bus-stop/qs-stringify/blob/master/index.js
 */
var has = Object.prototype.hasOwnProperty

/**
 * Stringify an object for use in a query string.
 *
 * @param {Object} obj - The object.
 * @param {string} prefix - When nesting, the parent key.
 *     keys in `obj` will be stringified as `prefix[key]`.
 * @returns {string}
 */

module.exports = function queryStringify(obj, prefix) {
  var pairs = []
  for (var key in obj) {
    if (!has.call(obj, key)) {
      continue
    }

    var value = obj[key]
    var enkey = encodeURIComponent(key)
    var pair
    if (typeof value === 'object') {
      pair = queryStringify(value, prefix ? prefix + '[' + enkey + ']' : enkey)
    } else {
      pair = (prefix ? prefix + '[' + enkey + ']' : enkey) + '=' + encodeURIComponent(value)
    }
    pairs.push(pair)
  }
  return pairs.join('&')
}