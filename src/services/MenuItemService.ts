import MenuItemRepository from "../repositories/MenuItemRepository";
import ConflictError from '../utils/errors/ConflictError';
import NotFoundError from '../utils/errors/NotFoundError';
import MESSAGES from "../constants/Messages";

/**
 * Bussiness logic
 */

class MenuItemService{
    public menuItemRepository: MenuItemRepository;
    constructor(){
        this.menuItemRepository = new MenuItemRepository();
    }

    /**
     * create new Restaurant
     * @param {*} - Restaurant Data
     * @returns 
     */
    async createMenuItem(menuItemData: any){
        const existingMenuItem = await this.menuItemRepository.findByName(menuItemData.name);
        if(existingMenuItem){
            // throw new Error('Menu category with this name is already created');
            throw new ConflictError(MESSAGES.ALREADY_EXISTS);
        }

        const savedMenuItem = await this.menuItemRepository.create(menuItemData);
        return savedMenuItem;
       
    }

    async createBulkMenuItem(menuItemsData: any){
        const result: {
            created: any[];
            failed: { data: any; error: string }[];
            total: number;
        } = {
            created: [],
            failed: [],
            total: menuItemsData.length
        };

        for(const menuItem of menuItemsData){
            try {
                const createdMenuItem = await this.createMenuItem(menuItem);
                result.created.push(createdMenuItem);
            } catch (error: any) {
                result.failed.push({
                    data: menuItem,
                    error: error.message
                })
            }
        }
        return result;
    }

    async getAllMenuItems(filter: any={}, options: any={}){
        const menuItems = await this.menuItemRepository.findAll(filter, options);
        return menuItems;
    }

    async getMenuItemById(id: string){
        const menuItem = await this.menuItemRepository.findById(id);
        if(!menuItem){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return menuItem;
    }

    async updateMenuItem(id: string, updatedData:any){
        const menuItem = await this.menuItemRepository.updateById(id, updatedData);
        if(!menuItem){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return menuItem;
    }

    async deleteMenuItem(id: string){
        const menuItem = await this.menuItemRepository.deleteById(id);
        if(!menuItem){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return menuItem;
    }

    async deleteBulkMenuItems(ids: string[]){
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
                const deletedMenuItem = await this.deleteMenuItem(id)
                result.deleted.push(deletedMenuItem)
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

export default MenuItemService;
