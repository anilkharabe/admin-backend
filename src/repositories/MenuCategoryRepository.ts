import BaseRepository from "./BaseRepository";
import MenuCategoryModel from '../models/MenuCategory.model';

class MenuCategoryRepository extends BaseRepository{
    constructor(){
        super(MenuCategoryModel)
    }
}

export default MenuCategoryRepository;