const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  quantityLeft: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  description: { type: String, required: false },
  averageRating: { type: Number, default: 0 },
  comments: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      comment: { type: String, required: true },
      rating: { type: Number, required: true, min: 1, max: 5 },
      createdAt: { type: Date, default: Date.now }
    }
  ]
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item