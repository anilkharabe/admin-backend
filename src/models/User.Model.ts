import mongoose from "mongoose";
import UserInterface from '../interfaces/User.interface';
// schema
const userSchema = new mongoose.Schema<UserInterface>({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [40, "Name must be at exceed 40 characters"],
    required: [true, "Name is required"],
    trim: true
  },
  email:{
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter valid email']
  },
  password:{
    type: String,
    minLength: [6, "Name must be at least 6 characters"],
    maxLength: [20, "Name must be at exceed 20 characters"],
    required: [true, "Password is required"]
  },
  role:{
    type: String,
    enum:{
      values: ["ADMIN", "RES_OWNER"],
      message:"Role is not valid"
    },
  },
  status:{
    type: String,
    default: "INACTIVE",
    enum:{
      values: ["ACTIVE", "INACTIVE", "PENDING", 'BLOCKED'],
      message:"status is not valid"
    },
  },
  phone:{
    type: Number,
    match: [/^(?:\+91[\s-]?|91[\s-]?|0)?[6-9]\d{9}$/, 'Please enter valid phone number']
  },

});

// model
const User = mongoose.model<UserInterface>("User", userSchema);

export default User;