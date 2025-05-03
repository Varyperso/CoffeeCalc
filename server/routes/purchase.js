const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const { verifyToken } = require('../middleware')
const Item = require('../models/Item')
const User = require('../models/User')

router.post('/purchase/:id', verifyToken, async (req, res) => {
  const userId = req.params.id
  const purchasedItems = req.body
  let errorItemsArr = [] // if the user purchased more items then are currently in stock, error the specific item
  let validPurchasedItems = []
  try {
    const userToAddTheItemsTo = await User.findById(userId)
    if (!userToAddTheItemsTo) return res.status(404).json({ error: 'User not found' })
    for (let purchasedItem of purchasedItems) {
      const itemToUpdate = await Item.findById(purchasedItem._id)
      if (itemToUpdate.quantityLeft < purchasedItem.quantity) {
        errorItemsArr.push(purchasedItem) // if quantity ordered is more than there is in stock, push canceled item into error array
        continue // skip this item
      }
      itemToUpdate.quantityLeft -= purchasedItem.quantity
      await itemToUpdate.save()
      validPurchasedItems.push({
        item: purchasedItem._id,
        quantity: purchasedItem.quantity,
        purchaseDate: Date.now()
      })
    }
    userToAddTheItemsTo.purchasedItems.push(...validPurchasedItems)
    await userToAddTheItemsTo.save()
    if (errorItemsArr.length) return res.status(206).json({ purchasedItems: validPurchasedItems, error: errorItemsArr })
    return res.status(201).json(validPurchasedItems)
  } catch (error) {
    console.error('Error processing purchase:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
