import MenuItemService from "../services/MenuItemService";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import HTTP_STATUS from "../constants/HttpStatus";
import MESSAGES from "../constants/Messages";
import AsyncHandler from '../middleware/AsyncHandler';

class MenuItemController {
  private menuItemService: MenuItemService;

  constructor() {
    this.menuItemService = new MenuItemService();
  }

   createMenuItem = AsyncHandler(async (req: Request, res: Response) => {
      const menuItemData = req.body;
      const menuItem =
        await this.menuItemService.createMenuItem(menuItemData);

      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.CREATED,
        menuItem,
      );
  });

  createBulkMenuItem = AsyncHandler(async (req: Request, res: Response) => {
      const { menuItems } = req.body;

      if (!Array.isArray(menuItems)) {
        return ApiResponse.error(
          res,
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.INVALID_PAYLOAD,
        );
      }

      const result =
        await this.menuItemService.createBulkMenuItem(menuItems);
      const statusCode =
        result.failed.length === 0
          ? HTTP_STATUS.CREATED
          : HTTP_STATUS.PARTIAL_SUCCESS;

      return ApiResponse.success(res, statusCode, MESSAGES.CREATED, result);
  });

  // look this in later
  getAllMenuItem = AsyncHandler(async (req: Request, res: Response) => {
    
    const {
      page = '1', 
      limit = '10',
      search,
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

    const options = {
      skip:(Number(page) - 1 ) * Number(limit),
      limit: Number(limit),

      sort: { [sortBy as string]: sortOrder === 'asc' ? 1 : -1 }
    }
    const menuItems =  await this.menuItemService.getAllMenuItems(filter, options);

    return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.FETCHED,
        menuItems,
      );
  });

  updateMenuItem = AsyncHandler(async (req: Request, res: Response) => {
      const id: string = req.params.id as string;
      const updateData = req.body;
      const menuItem = await this.menuItemService.updateMenuItem(
        id,
        updateData,
      );
      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.UPDATED,
        menuItem,
      );
  });

  deleteMenuItem = AsyncHandler( async (req: Request, res: Response) => {
      const id: string = req.params.id as string;
      const menuItem = await this.menuItemService.deleteMenuItem(id);
      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.DELETED,
        menuItem,
      );
  });

  deleteBulkMenuItem = AsyncHandler(async (req: Request, res: Response) => {
      const { ids } = req.body;

      if (!Array.isArray(ids)) {
        return ApiResponse.error(
          res,
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.INVALID_IDS_ARRAY,
        );
      }

      const result = await this.menuItemService.deleteBulkMenuItems(ids);
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

export default MenuItemController;
