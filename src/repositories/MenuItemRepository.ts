import BaseRepository from "./BaseRepository";
import MenuItemModel from '../models/MenuItem.model';

class MenuItemRepository extends BaseRepository{
    constructor(){
        super(MenuItemModel)
    }
}

export default MenuItemRepository;