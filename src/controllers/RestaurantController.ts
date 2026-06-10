import RestaurantService from "../services/ResturantService";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import HTTP_STATUS from "../constants/HttpStatus";
import MESSAGES from "../constants/Messages";

class RestaurantController {
  private restaurantService: RestaurantService;

  constructor() {
    this.restaurantService = new RestaurantService();
  }

  createResturant = async (req: Request, res: Response) => {
    try {
      const restaurantData = req.body;
      const restaurant =
        await this.restaurantService.createResturant(restaurantData);

      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.CREATED,
        restaurant,
      );
    } catch (error: any) {
      return ApiResponse.error(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  };

  createBulkResturant = async (req: Request, res: Response) => {
    try {
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
    } catch (error: any) {
      return ApiResponse.error(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  };

  // look this in later
  getAllRestaurant = async (req: Request, res: Response) => {
    // try {
    //     const {limit, skip}
    // } catch (error) {
    // }
  };

  updateRestaurant = async (req: Request, res: Response) => {
    try {
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
    } catch (error: any) {
      return ApiResponse.error(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  };

  deleteRestaurant = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id as string;
      const restaurant = await this.restaurantService.deletRestaurant(id);
      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.DELETED,
        restaurant,
      );
    } catch (error: any) {
      return ApiResponse.error(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  };

  deleteBulkResturant = async (req: Request, res: Response) => {
    try {
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
    } catch (error: any) {
      return ApiResponse.error(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGES.INTERNAL_SERVER_ERROR,
      );
    }
  };
}

export default RestaurantController;
