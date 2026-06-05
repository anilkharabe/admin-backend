interface RestaurantInterface {
  name: string;
  address:{
    city: string,
    state: string,
    pincode: number
  },
  cuisine:[string]
}

export default RestaurantInterface;