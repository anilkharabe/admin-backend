import RestaurantRepository from "../repositories/RestaurantRepository";

/**
 * Bussiness logic
 */

class RestaurantService{
    constructor(){
        this.resturantRepository = new RestaurantRepository();
    }

    /**
     * create new Restaurant
     * @param {*} - Restaurant Data
     * @returns 
     */
    async createResturant(restaurantData: any){
        try {
            const existingResturant = await this.resturantRepository.findByName(restaurantData.name);
            if(existingResturant){
                throw new Error('Restuant with this name is already created');
            }

            const savedRestaurant = await this.resturantRepository.create(restaurantData);
            return savedRestaurant;
        } catch (error: any) {
                throw new Error('Failed to create new Restaurant:', error.message);
        }
    }

}