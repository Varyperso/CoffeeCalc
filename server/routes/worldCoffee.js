const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/:fileName', (req, res) => {
  const { fileName } = req.params

  switch (fileName) {
    case 'domestic_consumption':
      res.sendFile(path.join(__dirname, '../coffeeInfoCSV/domestic_consumption.csv'))
      break
    case 'export':
      res.sendFile(path.join(__dirname, '../coffeeInfoCSV/export.csv'))
      break
    case 'import':
      res.sendFile(path.join(__dirname, '../coffeeInfoCSV/import.csv'))
      break
    case 'production':
      res.sendFile(path.join(__dirname, '../coffeeInfoCSV/production.csv'))
      break
    case 'green_coffee_inventorie':
      res.sendFile(path.join(__dirname, '../coffeeInfoCSV/green_coffee_inventorie.csv'))
      break
  }
})

module.exports = router
