// import "./src/config/env";
import DatabaseConfig from "./src/config/database";
// import config from "./src/config/index";
import app from "./app";


const startServer = async () => {
    try {
        await DatabaseConfig.connect();

        // console.log("Database connected", config.port);

        app.listen(5000, () => {
            console.log("Server running on port:", 5000);
        });
    } catch (error) {
        console.log("Failed to start a server", error);
    }
};

startServer()





