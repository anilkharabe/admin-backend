import RestaurantService from "../services/ResturantService";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import HTTP_STATUS from "../constants/HttpStatus";
import MESSAGES from "../constants/Messages";
import AsyncHandler from '../middleware/AsyncHandler';

class RestaurantController {
  private restaurantService: RestaurantService;

  constructor() {
    this.restaurantService = new RestaurantService();
  }

   createResturant = AsyncHandler(async (req: Request, res: Response) => {
      const restaurantData = req.body;
      const restaurant =
        await this.restaurantService.createResturant(restaurantData);

      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.CREATED,
        restaurant,
      );
  });

  createBulkResturant = AsyncHandler(async (req: Request, res: Response) => {
      const { restaurants } = req.body;

      if (!Array.isArray(restaurants)) {
        return ApiResponse.error(
          res,
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.INVALID_PAYLOAD,
        );
      }

      const result =
        await this.restaurantService.createBulkRestaurant(restaurants);
      const statusCode =
        result.failed.length === 0
          ? HTTP_STATUS.CREATED
          : HTTP_STATUS.PARTIAL_SUCCESS;

      return ApiResponse.success(res, statusCode, MESSAGES.CREATED, result);
  });

  // look this in later
  getAllRestaurant = AsyncHandler(async (req: Request, res: Response) => {
    
    await this.restaurantService.getAllRestaurants()
  });

  updateRestaurant = AsyncHandler(async (req: Request, res: Response) => {
      const id: string = req.params.id as string;
      const updateData = req.body;
      const restaurant = await this.restaurantService.updateRestaurant(
        id,
        updateData,
      );
      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.UPDATED,
        restaurant,
      );
  });

  deleteRestaurant = AsyncHandler( async (req: Request, res: Response) => {
      const id: string = req.params.id as string;
      const restaurant = await this.restaurantService.deletRestaurant(id);
      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.DELETED,
        restaurant,
      );
  });

  deleteBulkResturant = AsyncHandler(async (req: Request, res: Response) => {
      const { ids } = req.body;

      if (!Array.isArray(ids)) {
        return ApiResponse.error(
          res,
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.INVALID_IDS_ARRAY,
        );
      }

      const result = await this.restaurantService.deleteBulkRestaurants(ids);
      const statusCode =
        result.failed.length === 0
          ? HTTP_STATUS.OK
          : HTTP_STATUS.PARTIAL_SUCCESS;

      return ApiResponse.success(
        res,
        statusCode,
        MESSAGES.BULK_DELETED,
        result,
      );
  });
}

export default RestaurantController;
