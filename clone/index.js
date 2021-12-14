// JSON 类型， object, array, string, number, true, false, null ; 详见 https://www.json.org/json-en.html
const deepClone = val => {
  let res;
  if (Array.isArray(val)) {
    res = [];
    val.forEach((el, idx) => {
      res[idx] = typeof el === "object" ? deepClone(el) : el;
    });
    return res;
  }
  if (typeof val === "object") {
    res = {};
    for (let key in val) {
      res[key] = typeof val[key] === "object" ? deepClone(val[key]) : val[key];
    }
    return res;
  }
  return res;
};

module.exports = {
  deepClone
};
