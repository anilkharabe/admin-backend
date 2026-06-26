import RestaurantService from "../services/RestaurantService";
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

   createRestaurant = AsyncHandler(async (req: Request, res: Response) => {
      const restaurantData = req.body;
      const restaurant =
        await this.restaurantService.createRestaurant(restaurantData);

      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.CREATED,
        restaurant,
      );
  });

  createBulkRestaurant = AsyncHandler(async (req: Request, res: Response) => {
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
    
    const {
      page = '1', 
      limit = '10',
      search,
      city,
      isApproved,
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

    if(city){
      filter["address.city"] = city;
    }

    if(isApproved){
      filter.isApproved = isApproved;
    }

    const options = {
      skip:(Number(page) - 1 ) * Number(limit),
      limit: Number(limit),

      sort: { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 }
    }
    const restaurants =  await this.restaurantService.getAllRestaurants(filter, options);

    return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.FETCHED,
        restaurants,
      );
  });

  getRestaurant = AsyncHandler(async (req: Request, res: Response) => {
    
    const id: string = req.params.id as string;
    const restaurants =  await this.restaurantService.getRestaurantById(id);

    return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.FETCHED,
        restaurants,
      );
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
      const restaurant = await this.restaurantService.deleteRestaurant(id);
      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.DELETED,
        restaurant,
      );
  });

  deleteBulkRestaurant = AsyncHandler(async (req: Request, res: Response) => {
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
