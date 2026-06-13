import express from 'express';
import RestaurantController from '../controllers/RestaurantController';
import validateMiddleware from '../middleware/validateMiddleware';
import restaurantValidateSchema from '../validators/restaurantValidators';

const router = express.Router();

const restaurantController = new RestaurantController();

router.post('/create', validateMiddleware.validate(restaurantValidateSchema) , restaurantController.createResturant);
router.post('/create/bulk', restaurantController.createBulkResturant)
router.put('/:id', validateMiddleware.validate(restaurantValidateSchema) ,restaurantController.updateRestaurant);
router.delete('/delete/:id', restaurantController.deleteRestaurant);
router.delete('/delete/bulk', restaurantController.deleteBulkResturant)

export default router;