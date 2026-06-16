import express from 'express';
import UserController from '../controllers/UserController';
import validateMiddleware from '../middleware/validateMiddleware';
import userValidateSchema from '../validators/userValidator';

const router = express.Router();

const userController = new UserController();

router.post('/login', userController.login)
router.post('/create', validateMiddleware.validate(userValidateSchema) , userController.createUser);
router.put('/:id', validateMiddleware.validate(userValidateSchema) ,userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.get('/', userController.getAllUsers)

export default router;