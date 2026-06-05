import dotenv from "dotenv";

dotenv.config();

console.log("MONGO URL:", process.env.MONGODB_CONNECT_URL);

const config = {
    port: process.env.PORT || 5000,

    mongodb:{
        url: process.env.MONGODB_CONNECT_URL
    },

    api:{
        prefix: "/api",
        version: 'v1'
    },

    cors:{
        origin: "*",
    }
}

export default config;