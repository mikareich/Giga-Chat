class Context {
  static context = {};

  constructor(context) {
    Context.context = { ...context };
  }

  addToContext(key, value) {
    Context.context[key] = value;
    console.log(Context.context);
  }
}

export function withContext(callback) {
  return function (...args) {
    callback({ ...Context.context }, ...args);
  };
}

export default Context;
