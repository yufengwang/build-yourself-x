// 之前写的辣鸡代码，拿来跑下用例试试
function isEqual(obj1, obj2) {
  // NaN 跟 NaN 是相等的 虽然 NaN === NaN return false
  if (isNaN(obj1) && isNaN(obj2)) {
    return true;
  }
  // 任意一个参数为值类型则直接用 === 比较
  if (!isObject(obj1) || !isObject(obj2)) {
    // 值类型
    return obj1 === obj2;
  }
  // 两个都是对象或数组，而且不相等
  const obj1key = Object.keys(obj1);
  const obj2key = Object.keys(obj2);

  // 对象属性长度不一致，直接return false
  if (obj1key.length !== obj2key.length) {
    return false;
  }

  // 遍历对象1，判断对象2跟对象1的某个key的值是否有不等的，有则return出false。
  for (let key of obj1key) {
    const res = isEqual(obj1[key], obj2[key]);
    if (!res) {
      return false;
    }
  }
  // 遍历结束，没有找到值不等的属性，则俩对象相等。
  return true;
}

module.exports = { isEqual };
