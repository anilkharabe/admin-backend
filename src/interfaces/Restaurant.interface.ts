interface RestaurantInterface {
  name: string;
  address:{
    city: string,
    state: string,
    pincode: number
  },
  cuisine:[string],
  phone: number,
  rating: number,
  description: string,
  offers: string,
  ETA: number,
  openingTime: Date,
  closingTime: Date,
  isApproved: boolean,
  category: string,
  ownerId: any
}

export default RestaurantInterface;