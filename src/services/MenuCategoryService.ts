import MenuCategoryRepository from "../repositories/MenuCategoryRepository";
import ConflictError from '../utils/errors/ConflictError';
import NotFoundError from '../utils/errors/NotFoundError';
import MESSAGES from "../constants/Messages";

/**
 * Bussiness logic
 */

class MenuCategoryService{
    public menuCategoryRepository: MenuCategoryRepository;
    constructor(){
        this.menuCategoryRepository = new MenuCategoryRepository();
    }

    /**
     * create new Restaurant
     * @param {*} - Restaurant Data
     * @returns 
     */
    async createMenuCategory(menuCategoryData: any){
        const existingmenuCategory = await this.menuCategoryRepository.findByName(menuCategoryData.name);
        if(existingmenuCategory){
            // throw new Error('Menu category with this name is already created');
            throw new ConflictError(MESSAGES.ALREADY_EXISTS);
        }

        const SavedMenuCategory = await this.menuCategoryRepository.create(menuCategoryData);
        return SavedMenuCategory;
       
    }

    async createBulkMenuCategory(menuCategoriesData: any){
        const result: {
            created: any[];
            failed: { data: any; error: string }[];
            total: number;
        } = {
            created: [],
            failed: [],
            total: menuCategoriesData.length
        };

        for(const menuCategory of menuCategoriesData){
            try {
                const createdMenuCategory = await this.createMenuCategory(menuCategory);
                result.created.push(createdMenuCategory);
            } catch (error: any) {
                result.failed.push({
                    data: menuCategory,
                    error: error.message
                })
            }
        }
        return result;
    }

    async getAllMenuCategories(filter: any={}, options: any={}){
        const restaurants = await this.menuCategoryRepository.findAll(filter, options);
        return restaurants;
    }

    async getMenuCategoryById(id: string){
        const menuCategory = await this.menuCategoryRepository.findById(id);
        if(!menuCategory){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return menuCategory;
    }

    async updateMenuCategory(id: string, updatedData:any){
        const menuCategory = await this.menuCategoryRepository.updateById(id, updatedData);
        if(!menuCategory){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return menuCategory;
    }

    async deleteMenuCategory(id: string){
        const restaurant = await this.menuCategoryRepository.deleteById(id);
        if(!restaurant){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
    }

    async deleteBulkMenuCategories(ids: string[]){
        const result: {
            deleted: any[];
            failed: { id: any; error: string }[];
            total: number;
        } = {
            deleted: [],
            failed: [],
            total: ids.length
        };

        for(const id of ids){
            try {
                const deletedMenuCategory = await this.deleteMenuCategory(id)
                result.deleted.push(deletedMenuCategory)
            } catch (error: any) {
                result.failed.push({
                    id,
                    error: error.message
                })
            }
        }

        return result;
    }
}

export default MenuCategoryService;