import express from "express";
import apiRoutes from './src/routes/index.routes';
import errorMiddleware from './src/middleware/errorMiddleware';
// import cors from 'cors';

// import config from './src/config';

const app = express();

// app.use(cors())
app.use(express.json());
app.use('/', apiRoutes)

app.get('/health', (req, res)=>{
    res.json({
        success: true
    })
})

// handling non-existing routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(errorMiddleware);


// handling all the uncaught error in application
// app.use((err: any, req: any, res: any, next: any) => {
//     console.error(err);

//     res.status(500).json({
//         success: false,
//         message: "Internal Server Error handling by app level error"
//     });
// });

export default app;