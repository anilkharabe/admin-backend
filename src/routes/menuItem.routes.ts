import express from 'express';
import MenuItemController  from '../controllers/MenuItemController';
import validateMiddleware from '../middleware/validateMiddleware';
import restaurantValidateSchema from '../validators/restaurantValidators';

const router = express.Router();

const menuItemController = new MenuItemController();

router.post('/create', validateMiddleware.validate(restaurantValidateSchema) , menuItemController.createMenuItem);
router.post('/create/bulk', menuItemController.createBulkMenuItem)
router.put('/:id', validateMiddleware.validate(restaurantValidateSchema) ,menuItemController.updateMenuItem);
router.delete('/delete/:id', menuItemController.deleteMenuItem);
router.delete('/delete/bulk', menuItemController.deleteBulkMenuItem)
router.get('/', menuItemController.getAllMenuItem)

export default router;