const { flatten } = require("../flatten");

const toString = Object.prototype.toString;

/**
 * @param {import('./index.d').Param} params
 */
const clsx = (...params) => {
  let res = "";
  for (let el of params) {
    if (typeof el === "string" && el) {
      res += `${el} `;
    }
    if (Array.isArray(el)) {
      const arr = flatten(el);
      res += clsx(...arr);
    }
    if (toString.call(el) === "[object Object]") {
      Object.keys(el).forEach(e => {
        if (el[e]) {
          res += `${e} `;
        }
      });
    }
  }
  return res.trim();
};

const prefixClsx = (prefix, ...params) => {
  const res = clsx(...params);
  return prefix
    .concat(" ")
    .concat(
      res
        ? res
            .split(" ")
            .map(el => `${prefix}-${el}`)
            .join(" ")
        : ""
    )
    .trim();
};

module.exports = {
  clsx,
  prefixClsx
};
