import mongoose from "mongoose";

class DatabaseConfig {
  static async connect(): Promise<void> {
    try {
        const mongoURL = process.env.MONGODB_CONNECT_URL || 'mongodb://localhost:27017/studentDB';
        if(!mongoURL){
            throw new Error('Mongo connection URL is not defined in environment variables')
        }

        const options = {
            maxPoolSize : 10, // maintain up to 10 socket connection
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 50000
        }

        await mongoose.connect(mongoURL, options);
        console.log("DB connected successfully");
      
    } catch (error) {
      console.log("Mongo DB connection error:", error);
      process.exit(1)
    }
  }

  static async disconnect(){
    try {
        await mongoose.disconnect();
        console.log("DB disconnected successfully");
    } catch (error) {
        console.log("Mongo DB error during disconnections:", error);
        process.exit(1)
    }
  }
}

 export default DatabaseConfig;