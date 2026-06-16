import express from 'express';
const router = express.Router();

//import all the Routers
import restaurantRouter from './restaurants.routes';
import userRouter from './users.routes';

router.use('/restaurants', restaurantRouter);
router.use('/users', userRouter);

export default router;

