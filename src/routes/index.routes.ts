import express from 'express';
const router = express.Router();

//import all the Routers
import restaurantRouter from './restaurants.routes';

router.use('/restaurants', restaurantRouter);

export default router;

