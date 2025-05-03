const cookieParser = require('cookie-parser')
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

const usersRoutes = require('./routes/users.js')
const itemsRoutes = require('./routes/items.js')
const itemsCommentsRoutes = require('./routes/itemsComments.js')
const purchaseRoutes = require('./routes/purchase.js')
const loginRoutes = require('./routes/login.js')
const userInfoRoutes = require('./routes/userInfo.js')
const worldCoffeeRoutes = require('./routes/worldCoffee.js')
const userCoffeeHistoryRoutes = require('./routes/coffeeHistory.js')

const app = express()
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

app.use(cookieParser())
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(express.static(path.join(__dirname, 'build'))) for production
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/CoffeeInfoCSV', express.static(path.join(__dirname, 'coffeeInfoCSV')))

app.use('/', usersRoutes)
app.use('/', itemsRoutes)
app.use('/', itemsCommentsRoutes)
app.use('/', purchaseRoutes)
app.use('/', loginRoutes)
app.use('/', userInfoRoutes)
app.use('/WorldCoffeeInfo', worldCoffeeRoutes)
app.use('/UserCoffeeHistory', userCoffeeHistoryRoutes)

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err)
  })
