import RestaurantService from "../services/ResturantService";
import { Request, Response } from "express";

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

      res.status(201).json({
        success: true,
        message: "Restaurant created successfully",
        data: restaurant,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  createBulkResturant = async (req: Request, res: Response) => {
    try {
      const { restaurants } = req.body;

      if (!Array.isArray(restaurants)) {
        return res.status(400).json({
          success: false,
          message: "Restaurants should be array",
        });
      }

      const result =
        await this.restaurantService.createBulkRestaurant(restaurants);
      const statusCode = result.failed.length === 0 ? 201 : 207;

      res.status(statusCode).json({
        success: true,
        message: `Bulk operation completed. ${result.created.length} created, ${result.failed.length} failed`,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
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

      res.status(201).json({
        success: true,
        message: "Restaurant updated successfully",
        data: restaurant,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  deleteRestaurant = async (req: Request, res: Response) => {
    try {
      const id: string = req.params.id as string;
      const restaurant = await this.restaurantService.deletRestaurant(id);

      res.status(200).json({
        success: true,
        message: "Restaurant deleted successfully",
        data: restaurant,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

  deleteBulkResturant = async (req: Request, res: Response) => {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids)) {
        return res.status(400).json({
          success: false,
          message: "IDs should be array",
        });
      }

      const result =
        await this.restaurantService.deleteBulkRestaurants(ids);
      const statusCode = result.failed.length === 0 ? 200 : 207;

      res.status(statusCode).json({
        success: true,
        message: `Bulk operation completed. ${result.deleted.length} deleted, ${result.failed.length} failed`,
        data: result,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };
}

export default RestaurantController;
