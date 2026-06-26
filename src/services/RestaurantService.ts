import RestaurantRepository from "../repositories/RestaurantRepository";
import ConflictError from '../utils/errors/ConflictError';
import NotFoundError from '../utils/errors/NotFoundError';
import MESSAGES from "../constants/Messages";
import redisClient from '../config/redis'

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
        
        // mongo db
        const savedRestaurant = await this.restaurantRepository.create(restaurantData);

        //redis db
         try {
            const restaurant = savedRestaurant.toObject();

            const { _id, ...data } = restaurant;

            const hash: Record<string, string> = {};

            Object.entries(data).forEach(([key, value]) => {
                hash[key] =
                    value === null || value === undefined
                        ? ""
                        : typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value);
            });

            await redisClient.hSet(`res:${_id}`, hash);
            await redisClient.expire(`res:${_id}`, 3600);

            console.log("Saved in Redis");
        } catch (err) {
            console.error("Redis Error:", err);
        }

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

    async getRestaurantById(id: string) {
        const cacheKey = `res:${id}`;

        // 1. Check Redis
        const cachedRestaurant = await redisClient.hGetAll(cacheKey);

        if (Object.keys(cachedRestaurant).length > 0) {
            console.log("Returning restaurant from Redis");

            // Convert JSON strings back to objects if needed
            Object.keys(cachedRestaurant).forEach((key) => {
                try {
                    cachedRestaurant[key] = JSON.parse(cachedRestaurant[key]);
                } catch {
                    // Keep primitive values as strings
                }
            });

            return {
                _id: id,
                ...cachedRestaurant,
            };
        }

        // 2. Cache miss - Fetch from MongoDB
        console.log("Cache miss. Fetching from MongoDB");

        const restaurant = await this.restaurantRepository.findById(id);

        if (!restaurant) {
            throw new NotFoundError(MESSAGES.NOT_FOUND);
        }

        // 3. Store in Redis
        const restaurantObj = restaurant.toObject
            ? restaurant.toObject()
            : restaurant;

        const { _id, ...fields } = restaurantObj;

        const hash: Record<string, string> = {};

        Object.entries(fields).forEach(([key, value]) => {
            hash[key] =
                value == null
                    ? ""
                    : typeof value === "object"
                    ? JSON.stringify(value)
                    : String(value);
        });

        await redisClient.hSet(cacheKey, hash);
        await redisClient.expire(cacheKey, 3600); // 1 hour

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
