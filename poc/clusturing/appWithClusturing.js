const cluster = require("cluster");
const os = require("os");
const express = require("express");

const PORT = process.env.PORT || 3000;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Starting ${numCPUs} workers...`);

  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Restart a worker if it exits
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died (code=${code}, signal=${signal}). Restarting...`
    );
    cluster.fork(); // restarting the instance
  });

} else {
  const app = express();

  // Logging middleware
  app.use((req, res, next) => {
    const start = Date.now();

    console.log(
      `[Worker ${process.pid}] --> ${req.method} ${req.originalUrl}`
    );

    res.on("finish", () => {
      console.log(
        `[Worker ${process.pid}] <-- ${req.method} ${req.originalUrl} ${res.statusCode} (${Date.now() - start}ms)`
      );
    });

    next();
  });

  app.get("/health", (req, res) => {
    const end = Date.now() + 10000;

    // Block this worker's event loop for 10 seconds
    while (Date.now() < end) {
    }

    res.json({
      status: "ok",
      worker: process.pid,
      timestamp: new Date().toISOString(),
    });
  });

  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening on port ${PORT}`);
  });
}