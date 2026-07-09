const express = require("express");
const { Worker } = require("worker_threads");

const app = express();
const PORT = process.env.PORT || 3000;

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();

  console.log(
    `[${new Date().toISOString()}] --> ${req.method} ${req.originalUrl}`
  );

  res.on("finish", () => {
    const duration = Date.now() - start;

    console.log(
      `[${new Date().toISOString()}] <-- ${req.method} ${req.originalUrl} ${res.statusCode} (${duration}ms)`
    );
  });

  next();
});

// Health endpoint with an artificial 10-second delay
app.get("/health", (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (result) => {
    res.status(200).json(result);
  });

  worker.on("error", (err) => {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  });

  worker.on("exit", (code) => {
    console.log("exiting the worker thread")
    if (code !== 0) {
      console.error(`Worker stopped with exit code ${code}`);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});