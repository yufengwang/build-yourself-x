/**
 * @param {any} src
 * @param {any} src1
 * @returns {boolean}
 */

const deepEqual = (src, src1) => {
  // 粗类型判断，不一致直接 false
  if (typeof src !== typeof src1) {
    return false;
  }
  if (typeof src === "object" && typeof src1 === "object") {
    if (Array.isArray(src) && Array.isArray(src1)) {
      if (src.length !== src1.length) {
        return false;
      }
      for (let i = 0, len = src.length; i < len; i++) {
        if (!deepEqual(src[i], src1[i])) {
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
