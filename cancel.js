function CancelError() {
  return Object.assign(new Error("The operation was canceled."), {name: "CancelError"});
}

Promise.cancel = p => {
  let pair = x => [x, x];
  return Promise.resolve(p).then(...pair(() => Promise.reject(new CancelError())));
}
