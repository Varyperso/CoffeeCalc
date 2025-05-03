const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const { verifyToken } = require('../middleware')
const Item = require('../models/Item')
const User = require('../models/User')

router.post('/items/:id/comments', verifyToken, async (req, res) => {
  const itemId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(400).json({ error: 'Invalid item ID format' })
  const { userId, comment, rating } = req.body
  if (!comment || !rating || rating < 1 || rating > 5) return res.status(400).json({ error: 'Invalid comment or rating' })

  try {
    const item = await Item.findById(itemId)
    if (!item) return res.status(404).json({ error: 'Item not found' })
    const user = await User.findById(userId)
    if (!user) return res.status(404).json({ error: 'User not found' })

    if (user.purchasedItems.filter(purchasedItem => purchasedItem.item.toString() === item._id.toString()).length === 0) {
      return res.status(400).json({ error: 'User must buy the product before commenting on it' })
    }

    if (item.comments.filter(comment => comment.userId.toString() === userId.toString()).length >= 1) {
      return res.status(400).json({ error: '1 Comment per product' })
    }

    item.comments.push({
      userId,
      comment,
      rating,
      createdAt: new Date()
    })

    const totalRatings = item.comments.length
    const sumRatings = item.comments.reduce((sum, commentObj) => sum + commentObj.rating, 0)
    const averageRating = sumRatings / totalRatings
    item.averageRating = averageRating

    await item.save()
    res.status(200).json({ message: 'success', data: item })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.delete('/items/:id/comments', verifyToken, async (req, res) => {
  const itemId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(400).json({ error: 'Invalid item ID format' })

  const { userId, commentId, admin } = req.body
  if (!userId || !commentId) return res.status(400).json({ error: 'User ID and Comment ID are required' })

  async function deleteComment() {
    const item = await Item.findById(itemId)
    if (!item) return res.status(404).json({ error: 'Item not found' })
    const comment = item.comments.id(commentId)
    if (!comment) return res.status(404).json({ error: 'Comment not found' })

    if (admin || String(comment.userId) === String(userId)) {
      item.comments.pull(commentId)
      const totalRatings = item.comments.length
      if (totalRatings > 0) {
        const sumRatings = item.comments.reduce((sum, comment) => sum + comment.rating, 0)
        const averageRating = sumRatings / totalRatings
        item.averageRating = averageRating
      } else item.averageRating = 0

      await item.save()
      return res.status(200).json({ message: 'Comment deleted successfully' })
    } else {
      return res.status(403).json({ error: 'You are not authorized to delete this comment' })
    }
  }

  try {
    const token = req.cookies.authToken
    if (admin) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Forbidden' })
        if (!decoded.admin) return res.status(403).json({ message: 'Forbidden: Admin access required' })
        req.user = decoded
        deleteComment()
      })
    } else deleteComment()
  } catch (error) {
    console.error('Error deleting comment:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
