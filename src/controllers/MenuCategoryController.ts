import MenuCategoryService from "../services/MenuCategoryService";
import { Request, Response } from "express";
import ApiResponse from "../utils/ApiResponse";
import HTTP_STATUS from "../constants/HttpStatus";
import MESSAGES from "../constants/Messages";
import AsyncHandler from '../middleware/AsyncHandler';

class MenuCategoryController {
  private menuCategoryService: MenuCategoryService;

  constructor() {
    this.menuCategoryService = new MenuCategoryService();
  }

   createMenuCategory = AsyncHandler(async (req: Request, res: Response) => {
      const menuCategoryData = req.body;
      const menuCategory =
        await this.menuCategoryService.createMenuCategory(menuCategoryData);

      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.CREATED,
        menuCategory,
      );
  });

  createBulkMenuCategory = AsyncHandler(async (req: Request, res: Response) => {
      const { menuCategorys } = req.body;

      if (!Array.isArray(menuCategorys)) {
        return ApiResponse.error(
          res,
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.INVALID_PAYLOAD,
        );
      }

      const result =
        await this.menuCategoryService.createBulkMenuCategory(menuCategorys);
      const statusCode =
        result.failed.length === 0
          ? HTTP_STATUS.CREATED
          : HTTP_STATUS.PARTIAL_SUCCESS;

      return ApiResponse.success(res, statusCode, MESSAGES.CREATED, result);
  });

  // look this in later
  getAllMenuCategory = AsyncHandler(async (req: Request, res: Response) => {
    
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
    const menuCategorys =  await this.menuCategoryService.getAllMenuCategories(filter, options);

    return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.FETCHED,
        menuCategorys,
      );
  });

  updateMenuCategory = AsyncHandler(async (req: Request, res: Response) => {
      const id: string = req.params.id as string;
      const updateData = req.body;
      const menuCategory = await this.menuCategoryService.updateMenuCategory(
        id,
        updateData,
      );
      return ApiResponse.success(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.UPDATED,
        menuCategory,
      );
  });

  deleteMenuCategory = AsyncHandler( async (req: Request, res: Response) => {
      const id: string = req.params.id as string;
      const menuCategory = await this.menuCategoryService.deleteMenuCategory(id);
      return ApiResponse.success(
        res,
        HTTP_STATUS.OK,
        MESSAGES.DELETED,
        menuCategory,
      );
  });

  deleteBulkMenuCategory = AsyncHandler(async (req: Request, res: Response) => {
      const { ids } = req.body;

      if (!Array.isArray(ids)) {
        return ApiResponse.error(
          res,
          HTTP_STATUS.BAD_REQUEST,
          MESSAGES.INVALID_IDS_ARRAY,
        );
      }

      const result = await this.menuCategoryService.deleteBulkMenuCategories(ids);
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

export default MenuCategoryController;
