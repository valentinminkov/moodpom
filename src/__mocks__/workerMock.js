class WorkerMock {
  constructor() {
    this.onmessage = null;
  }

  postMessage(message) {
    if (this.onmessage) {
      this.onmessage({ data: { ...message, type: "tick" } });
    }
  }

  terminate() {
    this.onmessage = null;
  }
}

export default WorkerMock;
