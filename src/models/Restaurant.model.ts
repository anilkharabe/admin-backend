import mongoose from "mongoose";
import RestaurantInterface from '../interfaces/Restaurant.interface';
// schema
const restaurantSchema = new mongoose.Schema<RestaurantInterface>({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [40, "Name must be at exceed 40 characters"],
    required: [true, "Name is required"],
    trim: true
  },
  address:{
    addressLane:{
      type: String,
      minLength: [3, "City must be at least 3 characters"],
      maxLength: [40, "City must be at exceed 40 characters"],
      trim: true
    },
    city:{
      required:[true, 'City is required'],
      type: String,
      minLength: [3, "City must be at least 3 characters"],
      maxLength: [40, "City must be at exceed 40 characters"],
      trim: true
    },
    state:{
      type: String,
      minLength: [3, "State must be at least 3 characters"],
      maxLength: [40, "State must be at exceed 40 characters"],
      trim: true
    },
    pincode:{
      type: Number
    },
    latitude:{
      type: Number,
      required: true
    },
    longitude:{
      type: Number,
      required: true
    }
  },
  cuisine:{
    type: [ String ],
    required: true
  },
  phone:{
    type: Number,
    match: [/^(?:\+91[\s-]?|91[\s-]?|0)?[6-9]\d{9}$/, 'Please enter valid phone number'],
    required: true
  },
  rating:{
    type: Number,
    min: 0,
    max: 5
  },
  description:{
    type: String,
    minLength: [10, "Name must be at least 10 characters"],
    maxLength: [100, "Name must be at exceed 100 characters"],
    required: true
  },
  offers:{
    type: String
  },
  ETA: {
    type: Number
  },
  openingTime:{
    type: Date,
    required: true
  },
  closingTime:{
    type: Date,
    required: true
  },
  isApproved:{
    type: Boolean,
    default: false,
  },
  category:{
    type: String
  },
  ownerId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true
  }
});

const Restaurant = mongoose.model<RestaurantInterface>("Restaurant", restaurantSchema);

export default Restaurant;
