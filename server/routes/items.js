const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const { adminMiddleware, verifyToken, multerUpload } = require('../middleware')
const Item = require('../models/Item')

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ _id: 1 }).populate('comments.userId', '_id avatar user email admin')
    if (items.length) res.status(200).json(items)
    else res.status(404).json({ error: 'Items not found!' })
  } catch (error) {
    console.error('Error fetching items:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.post('/items', adminMiddleware, multerUpload.single('image'), async (req, res) => {
  const { name, quantity, price, description } = req.body // only admin can add new items, hence adminMiddleware ^^
  if (!name || !quantity || !price || !description) return res.status(400).json({ error: 'fields missing' })

  const newItem = new Item({
    itemName: name,
    quantityLeft: quantity,
    price,
    image: `https://localhost:5000/public/items/${req.file.filename}`,
    description: description,
    comments: []
  })
  try {
    await newItem.save()
    return res.status(201).json(newItem)
  } catch (error) {
    console.error('Error adding item:', error)
    return res.status(500).json({ error: 'Internal server error.' })
  }
})

router.delete('/items/:id', adminMiddleware, async (req, res) => {
  const { id } = req.params
  try {
    const deletedItem = await Item.findByIdAndDelete(id) // only admin can delete new items, hence adminMiddleware ^^
    if (!deletedItem) return res.status(404).json({ error: 'Item not found' })
    console.log('Deleted item: ' + id)
    res.status(200).json(deletedItem)
  } catch (error) {
    console.error('Error deleting item:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

router.get('/items/:id', verifyToken, async (req, res) => {
  const itemId = req.params.id
  if (!mongoose.Types.ObjectId.isValid(itemId)) return res.status(400).json({ error: 'Invalid item ID format' })
  try {
    const item = await Item.findById(itemId).populate('comments.userId', '_id user email avatar')
    if (item) res.status(200).json(item)
    else res.status(404).json({ error: 'Item not found!' })
  } catch (error) {
    console.error('Error fetching item:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
