/* eslint-disable no-restricted-globals */

let timerId = null;

self.onmessage = (event) => {
  if (event.data.type === "start") {
    if (!timerId) {
      timerId = setInterval(() => {
        self.postMessage({ type: "tick" });
      }, 1000);
    }
  } else if (event.data.type === "stop") {
    clearInterval(timerId);
    timerId = null;
  }
};
