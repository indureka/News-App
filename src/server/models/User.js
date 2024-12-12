// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   name: { type: String, required: true },
// });

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  categories: [String], // Array of categories user is subscribed to
  notificationChannels: [String], // Array of notification channels, e.g. ['email', 'sms']
  subscribed: { type: Boolean, default: false }, // Whether the user is subscribed
});


// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next(); // Skip if the password field is not modified
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare plaintext password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const User = mongoose.model("User", userSchema);

export default User;
