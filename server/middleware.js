const jwt = require('jsonwebtoken')
const path = require('path')
const multer = require('multer')
require('dotenv').config()

function generateToken(user) {
  const payload = {
    id: user._id,
    admin: user.admin
  }
  const secretKey = process.env.JWT_SECRET
  const options = { expiresIn: '2h' }
  return jwt.sign(payload, secretKey, options)
}

const verifyToken = (req, res, next) => {
  const token = req.cookies.authToken
  if (!token) return res.status(401).json({ error: 'Token missing' })
  const secretKey = process.env.JWT_SECRET
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.sendStatus(403)
    req.user = decoded
    next()
  })
}

function adminMiddleware(req, res, next) {
  const token = req.cookies.authToken
  if (!token) return res.status(401).json({ message: 'Unauthorized' })
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Forbidden' })
    if (!decoded.admin) return res.status(403).json({ message: 'Forbidden: Admin access required' })
    req.user = decoded
    next()
  })
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const storagePath = req.body.id ? 'public' : path.join(__dirname, 'public', 'items') // user image or item image path
    cb(null, path.resolve(__dirname, storagePath))
  },
  filename: (req, file, cb) => {
    const filename = req.body.id ? req.body.id + path.extname(file.originalname) : file.originalname // user image or item image name
    cb(null, filename)
  }
})

const multerUpload = multer({ storage })

module.exports = { generateToken, verifyToken, adminMiddleware, multerUpload }
