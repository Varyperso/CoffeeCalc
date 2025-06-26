const mongoose = require('mongoose')

const coffeeHistorySchema = new mongoose.Schema({
  userId: { type: String, required: true, immutable: true },
  coffeeHistory: {
    type: Map,
    of: {
      name: { type: String, required: true },
      cost: { type: Number, required: true },
      servingSize: { type: Number, required: true },
      mood: { type: String, required: false },
      location: { type: String, required: false }
    },
    default: {}
  }
})

const CoffeeHistory = mongoose.model('CoffeeHistory', coffeeHistorySchema)
module.exports = CoffeeHistory