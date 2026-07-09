const { parentPort } = require("worker_threads");

const start = Date.now();

while (Date.now() - start < 10000) {
  // CPU intensive work
}

parentPort.postMessage({
  status: "ok",
  message: "Server is healthy after CPU blocking",
  timestamp: new Date().toISOString(),
});