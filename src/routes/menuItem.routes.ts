import express from 'express';
import MenuItemController  from '../controllers/MenuItemController';
import validateMiddleware from '../middleware/validateMiddleware';
import menuItemValidatorSchema from '../validators/menuItemValidators';

const router = express.Router();

const menuItemController = new MenuItemController();

router.post('/create', validateMiddleware.validate(menuItemValidatorSchema) , menuItemController.createMenuItem);
router.post('/create/bulk', menuItemController.createBulkMenuItem)
router.put('/:id', validateMiddleware.validate(menuItemValidatorSchema) ,menuItemController.updateMenuItem);
router.delete('/delete/bulk', menuItemController.deleteBulkMenuItem)
router.delete('/delete/:id', menuItemController.deleteMenuItem);
router.get('/', menuItemController.getAllMenuItem)

export default router;
