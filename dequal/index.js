/**
 * 所用到的知识点：
 * 递归，分类讨论，NaN !== NaN
 * 针对集合，不全等有两个特征
 * 1. 数量不一致
 * 2. 数量一致，有差集
 * @param {any} src
 * @param {any} src1
 * @returns {boolean}
 */
const deepEqual = (src, src1) => {
  let ctor, len;
  // 如果 src, src1 严格等， return true
  if (src === src1) {
    return true;
  }
  // 假值，有且只有 6 个; null undefined '' 0 false NaN

  // 真值，且同类型
  if (src && src1 && (ctor = src.constructor) === src1.constructor) {
    if (ctor === Array) {
      // 两个参数都是数组类型
      len = src.length;
      // 数组长度不一致，直接 return false
      if (src.length !== src1.length) {
        return false;
      }
      // 这里注意 a-- 这种用法，很骚，不建议模仿
      // while (len-- && deepEqual(src[len], src1[len])) {}
      for (let i = 0; i < len; i++) {
        // 如果有一个不等，即 return false
        if (!deepEqual(src[i], src1[i])) {
          return false;
        }
      }
      // 遍历完毕，return true
      return true;
    }
    if (typeof src === "object") {
      const keys = Object.keys(src);
      const keys1 = Object.keys(src1);
      if (keys.length !== keys1.length) {
        return false;
      }
      for (let key in src) {
        if (has(src, key) && !has(src1, key)) {
          return false;
        }
        if (!deepEqual(src[key], src1[key])) {
          return false;
        }
      }
      return true;
    }
  }
  // NaN !== NaN，当且仅当 src, src1 均为 NaN 时 return true，其余均 return false；
  // 校验任一参数为假值  或 ctor 不一致的场景
  return src !== src && src1 !== src1;
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
