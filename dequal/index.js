/**
 * @param {any} src
 * @param {any} src1
 * @returns {boolean}
 */

const deepEqual = (src, src1) => {
  if (typeof src !== typeof src1) {
    return false;
  }
  if (typeof src === "object" && typeof src1 === "object") {
    if (Array.isArray(src) && Array.isArray(src1)) {
      for (let key in src) {
        if (!deepEqual(src[key], src1[key])) {
          return false;
        }
        return true;
      }
    }
    if (isPlainObject(src) && isPlainObject(src1)) {
    }
  }
  return src === src1;
};

const isPlainObject = obj => {
  return Object.prototype.toString.call(obj) === "[object Object]";
};

module.exports = { deepEqual };
