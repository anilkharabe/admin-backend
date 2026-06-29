import { createClient } from "redis";

const REDIS_URL = "redis://redis:6379";

const redisClient = createClient({
    url:  REDIS_URL
});

redisClient.on("connect", ()=>{
    console.log("Redis Connected!");
})

redisClient.on("error", (err) => {
    console.error("Redis Client Error:", err);
});

export const connectRedis = async()=>{
    await redisClient.connect();
}

export default redisClient;
