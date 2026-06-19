import BaseRepository from "./BaseRepository";
import RestaurantModel from '../models/Restaurant.model';

class RestaurantRepository extends BaseRepository{
    constructor(){
        super(RestaurantModel)
    }

}

export default RestaurantRepository;
