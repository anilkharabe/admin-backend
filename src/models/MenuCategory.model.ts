import mongoose from "mongoose";
import MenuCategoryInterface from '../interfaces/MenuCategory.interface';
// schema
const menuCategorySchema = new mongoose.Schema<MenuCategoryInterface>({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [40, "Name must be at exceed 40 characters"],
    required: [true, "Name is required"],
    trim: true
  },
  description:{
    type: String,
    minLength: [10, "Name must be at least 10 characters"],
    maxLength: [100, "Name must be at exceed 100 characters"],
  },
  category:{
    type: String
  },
  restaurantId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Restaurant',
    required: true
  }
});

const MenuCategory = mongoose.model<MenuCategoryInterface>("MenuCategory", menuCategorySchema);

export default MenuCategory;