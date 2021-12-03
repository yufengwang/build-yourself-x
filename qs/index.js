/**
 * @param {string} str
 * @param {import('./types').QsOpts} [opts]
 **/
const parse = (str, opts = {}) => {
  let obj = {};
  const { strictNullHandling } = opts;
  const defaultVal = strictNullHandling ? null : "";

  if (str.indexOf("&") === -1) {
    const el = str.split("=");
    obj[el[0]] = el[1] || defaultVal;
    return obj;
  }

  const arr = str.split("&");
  arr.forEach(el => {
    const arr1 = el.split("=");
    obj[arr1[0]] = arr1[1] || defaultVal;
  });

  return obj;
};

const stringify = () => {};

module.exports = {
  parse,
  stringify
};
