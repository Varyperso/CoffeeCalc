const express = require('express')
const PrivateMessage = require('../models/PrivateMessage')

const router = express.Router()

router.get('/:userId1/:userId2', async (req, res) => {
  const { userId1, userId2 } = req.params // FUTURE ME ADD verifyToken as middleware!!!

  console.log('Fetching messages for users:', userId1, userId2)

  try {
    const messages = await PrivateMessage.find({
      $or: [
        { userId: userId1, toUser: userId2 },
        { userId: userId2, toUser: userId1 }
      ]
    }).sort({ timestamp: 1 })

    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve messages' })
  }
})

module.exports = router
