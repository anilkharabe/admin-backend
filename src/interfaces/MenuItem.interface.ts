interface MenuItemInterface {
  name: string;
  description: string,
  price: number,
  imgURL: string,
  rating: number,
  isCustomisable: boolean,
  isAvailable: boolean,
  isVeg: boolean,
  calories: number,
  menuCategoryId: any,
}

export default MenuItemInterface;