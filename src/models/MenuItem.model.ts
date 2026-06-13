import mongoose from "mongoose";
import MenuItemInterface from '../interfaces/MenuItem.interface';
// schema
const menuItemSchema = new mongoose.Schema<MenuItemInterface>({
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
  rating:{
    type: Number,
    min: 0,
    max: 5
  },
  price:{
    type: Number,
    min:1,
    max: 100000
  },
  imgURL:{
    type: String
  },
  isCustomisable: {
    type: Boolean,
    default: false
  },
  isAvailable: {
    type: Boolean,
    default: false
  },
  isVeg: {
    type: Boolean,
    default: false
  },
  calories: {
    type: Number,
    min:0,
    max: 1000
  },
  menuCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'MenuCategory',
    required: true
  },
});

const MenuItem = mongoose.model<MenuItemInterface>("MenuItem", menuItemSchema);

export default MenuItem;