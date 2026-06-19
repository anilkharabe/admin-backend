import express from 'express';
import RestaurantController from '../controllers/RestaurantController';
import validateMiddleware from '../middleware/validateMiddleware';
import restaurantValidateSchema from '../validators/restaurantValidators';
import authMiddleware from '../middleware/authMiddleware';
import roleMiddleware from '../middleware/roleMiddleware'

const router = express.Router();

const restaurantController = new RestaurantController();

router.post('/create',  authMiddleware, roleMiddleware('RES_OWNER'), validateMiddleware.validate(restaurantValidateSchema) , restaurantController.createRestaurant);
router.post('/create/bulk', restaurantController.createBulkRestaurant)
router.put('/:id', validateMiddleware.validate(restaurantValidateSchema) ,restaurantController.updateRestaurant);
router.delete('/delete/bulk', restaurantController.deleteBulkRestaurant)
router.delete('/delete/:id', restaurantController.deleteRestaurant);
router.get('/', restaurantController.getAllRestaurant)

export default router;
