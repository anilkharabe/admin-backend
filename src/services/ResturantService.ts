import RestaurantRepository from "../repositories/RestaurantRepository";

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
        try {
            const existingResturant = await this.restaurantRepository.findByName(restaurantData.name);
            if(existingResturant){
                throw new Error('Restuant with this name is already created');
            }

            const savedRestaurant = await this.restaurantRepository.create(restaurantData);
            return savedRestaurant;
        } catch (error: any) {
                throw new Error('Failed to create new Restaurant: '+ error.message);
        }
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
            throw new Error('Failed to fetch restaurants '+ error.message);
        }
    }

    async getRestaurantById(id: string){
        try {
            const resturant = await this.restaurantRepository.findById(id);
            if(!resturant){
                throw new Error("Restaurant not found")
            }
            return resturant;
        } catch (error: any) {
            throw new Error("Failed to fetch restaurant: "+ error.message)
        }
    }

    async updateRestaurant(id: string, updatedData:any){
        try {
            const resturant = await this.restaurantRepository.updateById(id, updatedData);
            if(!resturant){
                throw new Error("Restaurant not found")
            }
            return resturant;
        } catch (error: any) {
            throw new Error("Failed to update restaurant: "+ error.message)
        }
    }

    async deletRestaurant(id: string){
        try {
            const restaurant = await this.restaurantRepository.deleteById(id);
            if(!restaurant){
                throw new Error("Restaurant not found")
            }
        } catch (error: any) {
            throw new Error("Failed to delete restaurant: "+ error.message)

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