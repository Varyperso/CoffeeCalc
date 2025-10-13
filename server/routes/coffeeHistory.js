const express = require('express')
const router = express.Router()

const CoffeeHistory = require('../models/CoffeeHistory')
const { verifyToken } = require('../middleware')

router.get('/:id', verifyToken, async (req, res) => {
  try {
    let coffeeHistory = await CoffeeHistory.findOne({ userId: req.params.id })
    if (!coffeeHistory) coffeeHistory = new CoffeeHistory({ userId: req.params.id, coffeeHistory: new Map() })
    coffeeHistory.save()
    res.status(200).json(coffeeHistory)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/:id', verifyToken, async (req, res) => {
  const coffeeEntry = req.body
  const userId = req.params.id
  try {
    const coffeeHistoryDoc = await CoffeeHistory.findOne({ userId })

    const timestamp = Object.keys(coffeeEntry)[0]
    const entry = coffeeEntry[timestamp]

    coffeeHistoryDoc.coffeeHistory.set(timestamp, entry)
    await coffeeHistoryDoc.save()
    res.status(200).send('Coffee entry added')
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  const timeId = req.body.timeId
  const userId = req.params.id
  try {
    const coffeeHistoryDoc = await CoffeeHistory.findOne({ userId })
    coffeeHistoryDoc.coffeeHistory.delete(timeId)
    await coffeeHistoryDoc.save()
    res.status(200).send('Coffee entry added')
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

module.exports = router