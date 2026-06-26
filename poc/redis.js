const { createClient } = require("redis");

async function main() {
  const client = createClient({
    url: "redis://localhost:6379"
  });

  client.on("error", (err) => {
    console.error("Redis Client Error:", err);
  });

  await client.connect();

  console.log("Connected to Redis");

  // Store a string with TTL of 60 seconds
  await client.set("user:5", "Rahul", {
    EX: 60
  });

  console.log("Key saved");

  // Read the value
  const value = await client.get("user:2");
  console.log("Value:", value);

  // Check remaining TTL
  const ttl = await client.ttl("user:1");
  console.log("TTL:", ttl, "seconds");

  await client.quit();
}

main().catch(console.error);