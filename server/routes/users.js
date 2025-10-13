const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const { verifyToken } = require('../middleware')
const User = require('../models/User')

router.get('/users', async (req, res) => {
  try {
    // const user = await User.find({ thisLogin: { $gt: Date.now() - 120 * 60 * 1000 } }) // last 2 hours only, for chatroom, optional
    const user = await User.find()
    if (user) {
      const userToReturn = user.map(user => ({
        _id: user._id,
        user: user.user,
        avatar: user.avatar,
        admin: user.admin,
        lastLogin: user.lastLogin,
        joinDate: user.joinDate,
        image: user.image,
        isOnline: true
      }))
      res.status(200).json(userToReturn)
    } else res.status(404).json({ message: 'Users not found!?' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error.' })
  }
})

router.get('/users/:user', verifyToken, async (req, res) => {
  const userName = req.params.user // fetch user by name for UserPage
  try {
    const user = await User.findOne({ user: userName })
    if (user)
      res.status(200).json({
        _id: user._id,
        user: user.user,
        avatar: user.avatar,
        admin: user.admin,
        lastLogin: user.lastLogin,
        image: user.image,
        joinDate: user.joinDate,
        isOnline: user.thisLogin > Date.now() - 60 * 60 * 1000
      })
    else res.status(404).json({ message: 'User not found!' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.get('/user/:id', verifyToken, async (req, res) => {
  const userIdFromParams = req.params.id
  if (!mongoose.Types.ObjectId.isValid(userIdFromParams)) return res.status(400).json({ message: 'Invalid user ID format' }) // security measure
  try {
    const user = await User.findById(userIdFromParams).populate('purchasedItems.item', 'itemName image price description')
    if (user) res.status(200).json(user)
    else res.status(404).json({ message: 'User not found!' })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router