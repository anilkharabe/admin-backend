import BaseRepository from "./BaseRepository";
import ResturantModel from '../models/Restaurant.model';

class RestaurantRepository extends BaseRepository{
    constructor(){
        super(ResturantModel)
    }

    /**
     * This method returns Restaurant by restaurant name
     * @param name - Restaurant name
     * @returns - returning single restaurant
     */

    async findByName(name: string){
        return await ResturantModel.findOne({name})
    }
}

export default RestaurantRepository;