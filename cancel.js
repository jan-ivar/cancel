function CancelError() {
  return Object.assign(new Error("The operation was canceled."), {name: "CancelError"});
}

Promise.cancel = p => {
  let pair = x => [x, x];
  return Promise.resolve(p).then(...pair(() => Promise.reject(new CancelError())));
}

// Polyfill a fetch taking a promise as a {cancel} argument.

window._nativeFetch = window.fetch;

window.fetch = (url, init) =>
  Promise.race([window._nativeFetch(url, init),
                Promise.cancel(init.cancel || new Promise(() => {}))]);
