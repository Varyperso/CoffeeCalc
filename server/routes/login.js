const jwt = require('jsonwebtoken')
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const crypto = require('crypto')

const { generateToken } = require('../middleware')

const User = require('../models/User')

let verificationCodes = {}

const regexUsername = /^[A-Za-z0-9]{3,16}$/
const regexPassword = /^(?=[A-Za-z0-9]*[A-Z])(?=[A-Za-z0-9]*[0-9])[A-Za-z0-9]{8,16}$/

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: 'varyperso1@gmail.com', pass: process.env.EMAIL_PW }
})

router.post('/register', async (req, res) => {
  const { user, email, password } = req.body
  if (!regexUsername.test(user) || !email || !regexPassword.test(password)) return res.status(401).json({ message: 'Fields Invalid' })

  try {
    const existingUser = await User.findOne({ user })
    if (existingUser) return res.status(401).json({ message: 'Username taken' })
    const existingEmail = await User.findOne({ email })
    if (existingEmail) return res.status(401).json({ message: 'Email taken' })

    const verificationCode = crypto.randomBytes(3).toString('hex')
    verificationCodes[email] = verificationCode

    await transporter.sendMail({
      from: 'varyperso1@gmail.com',
      to: email,
      subject: 'Verify Your Email',
      text: `Your verification code is: ${verificationCode}`
    })

    return res.status(201).json({ email, isVerified: false })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/verify', async (req, res) => {
  const { email, verificationCode, password, user } = req.body
  if (!regexUsername.test(user) || !email || !regexPassword.test(password)) return res.status(401).json({ message: 'Fields Invalid' })
  try {
    if (verificationCodes[email] === verificationCode) {
      const hashedPassword = await bcrypt.hash(password, 10) // 10 = salt rounds
      const newUser = new User({
        user,
        password: hashedPassword,
        email,
        admin: false,
        avatar: `https://api.dicebear.com/9.x/personas/svg?seed=${user}&size=48`,
        joinDate: Date.now(),
        lastLogin: null,
        thisLogin: Date.now(),
        purchasedItems: []
      })

      await newUser.save()
      delete verificationCodes[email]

      const token = generateToken(newUser)

      res.cookie('authToken', token, {
        httpOnly: true, // javascript on the client cant read the cookie, its send only via http requests
        secure: process.env.NODE_ENV === 'production', // changes to true in production, only send via https in production
        maxAge: 120 * 60 * 1000, // 2 hours
        sameSite: 'Strict' // only sends the cookie from this address
      })

      return res.status(200).json({ _id: newUser._id })
    } else {
      return res.status(400).json({ message: 'Invalid verification code' })
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/login', async (req, res) => {
  const { user, password } = req.body
  if (!regexUsername.test(user) || !regexPassword.test(password)) return res.status(401).json({ message: 'Fields Invalid' })
  try {
    const existingUser = await User.findOne({ user })
    if (!existingUser) return res.status(401).json({ message: 'Username not found' })
    if (await bcrypt.compare(password, existingUser.password)) {
      existingUser.lastLogin = existingUser.thisLogin
      existingUser.thisLogin = Date.now()
      await existingUser.save()

      const token = generateToken(existingUser)
      res.cookie('authToken', token, {
        httpOnly: true, // protects from xss
        secure: process.env.NODE_ENV === 'production', // changes to true in production so that the cookie will be sent only via https
        maxAge: 120 * 60 * 1000, // 2 hours
        sameSite: 'Strict' // protects from csrf
      })

      return res.json({ _id: existingUser._id })
    } else return res.status(401).json({ message: 'invalid credentials' })
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'No user found with this email.' })

    const resetToken = crypto.randomBytes(20).toString('hex')
    user.resetToken = resetToken
    user.resetTokenExpiration = Date.now() + 3600000 // 1 hour expiration
    await user.save()

    await transporter.sendMail({
      from: 'varyperso1@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      text: `Click this link to reset your password: https://localhost:3000/reset-password?token=${resetToken}`
    })

    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' })
  }
})

router.post('/reset-password', async (req, res) => {
  const { token, newPassword } = req.body
  if (!regexPassword.test(newPassword)) return res.status(401).json({ message: 'Invalid password' })

  try {
    const user = await User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    if (!user) return res.status(400).json({ message: 'Invalid or expired token.' })

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    user.password = hashedPassword
    user.resetToken = undefined
    user.resetTokenExpiration = undefined
    await user.save()

    res.sendStatus(200)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error.' })
  }
})

router.post('/refresh-token', (req, res) => {
  const refreshToken = req.cookies.authToken

  if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' })

  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.clearCookie('authToken')
      return res.status(401).json({ message: 'Invalid or expired refresh token' })
    }

    const newAccessToken = generateToken(decoded)

    res.cookie('authToken', newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // false for now
      maxAge: 120 * 60 * 1000, // 2 hours
      sameSite: 'Strict' // protects from csrf
    })

    return res.sendStatus(200)
  })
})

module.exports = router
