import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
  },

  name:{
    type:String,
    required:true,
  }
});

const User=mongoose.model("User",userSchema);
export default User;
