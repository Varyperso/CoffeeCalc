const mongoose = require('mongoose')

const chatMessageSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
})

const ChatMessage = mongoose.model('Message', chatMessageSchema)

module.exports = ChatMessage