import RestaurantRepository from "../repositories/RestaurantRepository";
import ConflictError from '../utils/errors/ConflictError';
import NotFoundError from '../utils/errors/NotFoundError';
import MESSAGES from "../constants/Messages";

/**
 * Bussiness logic
 */

class RestaurantService{
    public restaurantRepository: RestaurantRepository;
    constructor(){
        this.restaurantRepository = new RestaurantRepository();
    }

    /**
     * create new Restaurant
     * @param {*} - Restaurant Data
     * @returns 
     */
    async createRestaurant(restaurantData: any){
        const existingRestaurant = await this.restaurantRepository.findByName(restaurantData.name);
        if(existingRestaurant){
            // throw new Error('Restaurant with this name is already created');
            throw new ConflictError(MESSAGES.ALREADY_EXISTS);
        }

        const savedRestaurant = await this.restaurantRepository.create(restaurantData);
        return savedRestaurant;
       
    }

    async createBulkRestaurant(restaurantsData: any){
        const result: {
            created: any[];
            failed: { data: any; error: string }[];
            total: number;
        } = {
            created: [],
            failed: [],
            total: restaurantsData.length
        };

        for(const restaurant of restaurantsData){
            try {
                const createdRestaurant = await this.createRestaurant(restaurant);
                result.created.push(createdRestaurant);
            } catch (error: any) {
                result.failed.push({
                    data: restaurant,
                    error: error.message
                })
            }
        }
        return result;
    }

    async getAllRestaurants(filter: any={}, options: any={}){
        const restaurants = await this.restaurantRepository.findAll(filter, options);
        return restaurants;
    }

    async getRestaurantById(id: string){
        const restaurant = await this.restaurantRepository.findById(id);
        if(!restaurant){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return restaurant;
       
    }

    async updateRestaurant(id: string, updatedData:any){
        const restaurant = await this.restaurantRepository.updateById(id, updatedData);
        if(!restaurant){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return restaurant;
        
    }

    async deleteRestaurant(id: string){
        const restaurant = await this.restaurantRepository.deleteById(id);
        if(!restaurant){
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
        return restaurant;
    }

    async deleteBulkRestaurants(ids: string[]){
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
                const deletedRestaurant = await this.deleteRestaurant(id)
                result.deleted.push(deletedRestaurant)
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

export default RestaurantService;
