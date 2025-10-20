const cookieParser = require('cookie-parser')

const fs = require('fs')
const express = require('express')
const https = require('https')
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
    origin: 'https://localhost:3000', // only allows connections from this address
    credentials: true // allow the browser to send cookies or auth headers along with the request
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true })) // no need, no x-www-form-urlencoded in this project..
// app.use(express.static(path.join(__dirname, 'build'))) for serving in production
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

const options = {
  key: fs.readFileSync('../key.pem'), // ssl stuff for https
  cert: fs.readFileSync('../cert.pem')
};

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    https.createServer(options, app).listen(PORT, () => {
      console.log("HTTPS server running on https://localhost:5000");
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err)
  })
