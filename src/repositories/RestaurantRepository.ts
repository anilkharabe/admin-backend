import BaseRepository from "./BaseRepository";
import ResturantModel from '../models/Restaurant.model';

class RestaurantRepository extends BaseRepository{
    constructor(){
        super(ResturantModel)
    }

}

export default RestaurantRepository;