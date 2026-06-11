import RestaurantRepository from "../repositories/RestaurantRepository";
import ConflictError from '../utils/errors/ConflictError';
import NotFoundError from '../utils/errors/NotFoundError';
import InternalServerError from '../utils/errors/InternalServerError';
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
    async createResturant(restaurantData: any){
        const existingResturant = await this.restaurantRepository.findByName(restaurantData.name);
        if(existingResturant){
            // throw new Error('Restuant with this name is already created');
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
                const createdResturant = await this.createResturant(restaurant);
                result.created.push(createdResturant);
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
        try {
            const restaurants = await this.restaurantRepository.findAll(filter, options);
            return restaurants;
        } catch (error: any) {
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }
    }

    async getRestaurantById(id: string){
        try {
            const resturant = await this.restaurantRepository.findById(id);
            if(!resturant){
                throw new NotFoundError(MESSAGES.NOT_FOUND);
            }
            return resturant;
        } catch (error: any) {
            throw new InternalServerError(MESSAGES.INTERNAL_SERVER_ERROR);
        }
    }

    async updateRestaurant(id: string, updatedData:any){
        try {
            const resturant = await this.restaurantRepository.updateById(id, updatedData);
            if(!resturant){
                throw new NotFoundError(MESSAGES.NOT_FOUND);
            }
            return resturant;
        } catch (error: any) {
            throw new InternalServerError(MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }

    async deletRestaurant(id: string){
        try {
            const restaurant = await this.restaurantRepository.deleteById(id);
            if(!restaurant){
                throw new NotFoundError(MESSAGES.NOT_FOUND);
            }
        } catch (error: any) {
            throw new InternalServerError(MESSAGES.INTERNAL_SERVER_ERROR)

        }
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
                const deletedResturant = await this.deletRestaurant(id)
                result.deleted.push(deletedResturant)
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