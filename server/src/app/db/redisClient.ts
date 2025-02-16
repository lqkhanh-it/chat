import { createClient, RedisClientType } from "redis";

const redisClient: RedisClientType = createClient({
  url: process.env.REDIS_HOST || "127.0.0.1"
});

redisClient.on("error", (err) => console.error("❌ Redis Error:", err));

(async () => {
  await redisClient.connect();
  console.log("✅ Connected to Redis");
})();

export default redisClient;
