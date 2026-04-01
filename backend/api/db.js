const mongoose = require("mongoose");


if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is not defined in environment variables");
}
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
}
connectDB();
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 80,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true
  },
  firstname: {
    type: String,
    minlength: 2,
    required: true,
    trim: true
  },
  lastname: {
    type: String,
    minlength: 2,
    required: true,
    trim: true
  }
});


const accountschema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  balance:{
    type:Number,
    require:true,
  }

})


const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account",accountschema)

module.exports = { 
  User,
  Account
 };
