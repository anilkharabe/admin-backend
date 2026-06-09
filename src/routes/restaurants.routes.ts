import express from 'express';
import RestaurantController from '../controllers/RestaurantController';
const router = express.Router();

const restaurantController = new RestaurantController();

router.post('/create', restaurantController.createResturant);
router.post('/create/bulk', restaurantController.createBulkResturant)
router.put('/:id', restaurantController.updateRestaurant);
router.delete('/delete/:id', restaurantController.deleteRestaurant);
router.delete('/delete/bulk', restaurantController.deleteBulkResturant)

export default router;