const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  admin: { type: Boolean, required: true },
  avatar: { type: String, required: true },
  image: { type: String, required: false },
  joinDate: { type: Number, required: true },
  lastLogin: { type: Number, default: null },
  thisLogin: { type: Number, required: true },
  purchasedItems: [
    {
      item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
      quantity: { type: Number, required: true },
      purchaseDate: { type: Date, required: true }
    }
  ],
  resetToken: { type: String, default: null },
  resetTokenExpiration: { type: Date, default: null }
})

const User = mongoose.model('User', userSchema)
module.exports = User
