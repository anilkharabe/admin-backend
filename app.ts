import express from "express";
import apiRoutes from './src/routes/index.routes'
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

export default app;