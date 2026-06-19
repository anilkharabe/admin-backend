import express from 'express';
const router = express.Router();

//import all the Routers
import restaurantRouter from './restaurants.routes';
import userRouter from './users.routes';
import menuCategoryRouter from './menuCategory.routes';
import menuItemRouter from './menuItem.routes';

router.use('/restaurants', restaurantRouter);
router.use('/users', userRouter);
router.use('/menuCategories', menuCategoryRouter);
router.use('/menuItems', menuItemRouter);

export default router;

