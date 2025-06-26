const express = require('express')
const router = express.Router()
const path = require('path')

const { multerUpload } = require('../middleware')

const User = require('../models/User')

router.post('/api/form', multerUpload.single('image'), async (req, res) => {
  try {
    const user = await User.findById(req.body.id)
    if (!user) return res.status(404).json({ error: 'User not found.' })

    if (req.file) user.image = `https://localhost:5000/public/${user._id}${path.extname(req.file.originalname)}`

    if (req.body.user) {
      let userNameAlreadyExists = await User.findOne({ user: req.body.user })
      if (!userNameAlreadyExists) {
        user.user = req.body.user
        await user.save()

        return res.json({
          message: req.file ? 'Image uploaded successfully, username changed' : 'Username changed',
          imageUrl: user.image,
          user: user.user
        })
      } else if (req.file) {
        return res.json({
          message: 'Username already exists, image uploaded successfully',
          imageUrl: user.image,
          user: user.user
        })
      } else {
        return res.json({
          message: 'Username already exists, no changes made',
          imageUrl: user.image,
          user: user.user
        })
      }
    }

    return res.json({
      message: 'Image uploaded successfully',
      imageUrl: user.image
    })
  } catch (error) {
    console.error('Error adding image:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
