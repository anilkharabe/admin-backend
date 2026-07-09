const express = require("express");

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
  const start = Date.now();

  while (Date.now() - start < 10000) {
    // Busy wait
  }

  res.status(200).json({
    status: "ok",
    message: "Server is healthy after CPU blocking",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});