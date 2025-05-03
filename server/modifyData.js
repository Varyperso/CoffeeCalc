// update all items with a common property
require('dotenv').config()
const mongoose = require('mongoose')
const CoffeeHistory = require('./models/CoffeeHistory')

const MONGO_URI = process.env.MONGO_URI

const coffeeHistory = {
  1727579064032: { name: 'Americano', cost: 5.52, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727629263026: { name: 'Rockstar Energy (16oz)', cost: 6.78, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727571485301: { name: 'Macchiato', cost: 6.93, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727585485245: { name: 'Instant Coffee (1 tsp)', cost: 4.9, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727614392214: { name: 'Irish Coffee', cost: 4.88, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727642088808: { name: 'Flat White', cost: 5.04, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727600684481: { name: 'Latte', cost: 3.99, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727615806680: { name: 'Drip Coffee (12oz)', cost: 3.59, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727609623836: { name: 'Bang Energy (16oz)', cost: 3.43, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727647449961: { name: 'Monster Java (15oz)', cost: 4.44, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727595771504: { name: 'Red Eye', cost: 3.45, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727586709242: { name: '5-hour Energy (2oz)', cost: 5.6, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727592250322: { name: 'Cortado', cost: 4.48, servingSize: 1.5, mood: 'good', location: 'earth' },
  1727630731059: { name: 'NOS Energy Drink (16oz)', cost: 3.71, servingSize: 1.5, mood: 'good', location: 'earth' }
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB')

    // Check if the document exists for this user
    const existingUserHistory = await CoffeeHistory.findOne({ userId: '67618e1a3ca6885e3898a291' })

    if (!existingUserHistory) {
      console.log('No document found for this user. Creating a new entry.')
      // If the document doesn't exist, create a new document with the coffeeHistory
      const newUserHistory = new CoffeeHistory({
        userId: '67618e1a3ca6885e3898a291',
        coffeeHistory: coffeeHistory // Set the coffeeHistory directly
      })
      await newUserHistory.save()
      console.log('New coffee history document created.')
    } else {
      console.log('Existing document found. Updating coffee history.')

      // If the document exists, update the coffeeHistory field
      const result = await CoffeeHistory.updateOne(
        { userId: userIdString }, // Use userId to filter the document
        {
          $set: {
            coffeeHistory: coffeeConsumptionHistory // Set the coffeeConsumptionHistory object
          }
        }
      )

      console.log('Update result:', result) // Log the result of the update
    }

    mongoose.disconnect() // Disconnect after updates
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err)
    mongoose.disconnect() // Ensure disconnect in case of error
  })
