const { deepClone } = require("../clone");
class StateManage {
  constructor(state) {
    this.handlerId = 1;
    this.state = state || {};
    this.observers = [];
  }
  get state() {
    return deepClone(this.state);
  }
  on(event, handler) {
    let id = this.handlerId++;
    this.observers.push({
      type: event,
      handler,
      id
    });
    return () => {
      this.observers = this.observers.filter(el => el.id !== id);
    };
  }
  set(state, evt) {}

  // promise 的序列化执行
  dispatch(event, eventData) {
    const handlers = this.observers.filter(el => el.type === event);
  }

  listen(evt, subscriber) {}
}

/**
 * @returns {Promise<void>}
 */
const loopState = (handlers, state, eventData, idx) => {
  const fn = handlers[idx++];
  const res = fn(state, eventData);
  if (!fn) {
    return Promise.resolve();
  }
  if (!res) {
    // 没有返回值, mutable
    return loopState(handlers, state, eventData, idx);
  }
  if (typeof res.then === "function") {
    // return promise
    return res.then(val => loopState(handlers, state, eventData, idx));
  }
  if (typeof res === "object") {
    // return 对象
    return loopState(handlers, res, eventData, idx);
  }
};

const state = params => {
  return new StateManage(params);
};

module.exports = {
  state
};
