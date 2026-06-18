import express from 'express';
import MenuCategoryController  from '../controllers/MenuCategoryController';
import validateMiddleware from '../middleware/validateMiddleware';
import restaurantValidateSchema from '../validators/restaurantValidators';

const router = express.Router();

const menuCategoryController = new MenuCategoryController();

router.post('/create', validateMiddleware.validate(restaurantValidateSchema) , menuCategoryController.createMenuCategory);
router.post('/create/bulk', menuCategoryController.createBulkMenuCategory)
router.put('/:id', validateMiddleware.validate(restaurantValidateSchema) ,menuCategoryController.updateMenuCategory);
router.delete('/delete/:id', menuCategoryController.deleteMenuCategory);
router.delete('/delete/bulk', menuCategoryController.deleteBulkMenuCategory)
router.get('/', menuCategoryController.getAllMenuCategory)

export default router;