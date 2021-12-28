/**
 * @param {any} src
 * @param {any} src1
 * @returns {boolean}
 */
const deepEqual = (src, src1) => {
  // 真值，且同类型
  // 假值，有且只有 6 个; null undefined '' 0 false NaN
  if (src && src1 && src.constructor === src1.constructor) {
    // 校验一个参数的类型即可
    if (typeof src === "object") {
      const keys = Object.keys(src);
      const keys1 = Object.keys(src1);
      if (keys.length !== keys1.length) {
        return false;
      }
      for (let key in src) {
        if(key === undefined) {
          return true
        }
        if (has(src, key) && !keys1.includes(key)) {
          return false;
        }
        return deepEqual(src[key], src1[key]);
      }
    }
    return src === src1;
  }
 
  return src === src1;
};

const isPlainObject = (obj) => {
  return (
    Object.prototype.toString.call(obj) === "[object Object]" && obj !== null
  );
};

const has = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

module.exports = { deepEqual };
