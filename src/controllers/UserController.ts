import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import UserService from "../services/UserService";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import HTTP_STATUS from "../constants/HttpStatus";
import MESSAGES from "../constants/Messages";
import AsyncHandler from '../middleware/AsyncHandler';
const JWT_SECRET = "your-secret-key";


class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

   createUser = AsyncHandler(async (req: Request, res: Response) => {
      const userData = req.body;
      userData.password = await bcrypt.hash(userData.password, 10);
      console.log("userData", userData)
      const user = await this.userService.createUser(userData);

      console.log("Response:", user)

      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.CREATED,
        user,
      );
  });

  getAllUsers = AsyncHandler(async (req: Request, res: Response) => {
    
    const {
      page = '1', 
      limit = '10',
      search,
      status,
      sortBy = 'name',
      sortOrder = 'asc'
    } = req.query;

    const filter: any = {};
    
    if(search){
      filter.name = {
        $regex: search,
        $options: 'i'
      }
    }

    if(status){
      filter.status = status;
    }

    const options = {
      skip:(Number(page) - 1 ) * Number(limit),
      limit: Number(limit),

      sort: { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 }
    }
    const users =  await this.userService.getAllUsers(filter, options);

    return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.FETCHED,
        users,
      );
  });

  updateUser = AsyncHandler(async (req: Request, res: Response) => {
      const id: string = req.params.id as string;
      const updateData = req.body;
      const user = await this.userService.updateUser(
        id,
        updateData,
      );
      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.UPDATED,
        user,
      );
  });

  deleteUser = AsyncHandler( async (req: Request, res: Response) => {
      const id: string = req.params.id as string;
      const user = await this.userService.deleteUser(id);
      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.DELETED,
        user,
      );
  });

  login =  AsyncHandler(async (req: Request, res: Response) => {
    
    const {email, password} = req.body;

    const user =  await this.userService.getUserByEmail(email);

    const isMatch = await bcrypt.compare(password, user.password);

    if(isMatch){
      const token = jwt.sign(
          {
            userId: user._id,
             role: user.role
          },
          JWT_SECRET,
          {
            expiresIn: "1h"
          }
        );
      return ApiResponse.success(
          res,
          HTTP_STATUS.OK,
          MESSAGES.FETCHED,
          {token},
        );
    }else{
      res.status(400).json({
        message:"email / password is wrong"
      })
    }

  });

}

export default UserController;
