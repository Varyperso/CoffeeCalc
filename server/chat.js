const mongoose = require('mongoose')
const WebSocket = require('ws')
const PrivateMessage = require('./models/PrivateMessage')
const ChatMessage = require('./models/ChatMessage')

const wss = new WebSocket.Server({ port: 8080 })

const userConnections = new Map()

wss.on('connection', (ws, req) => {
  console.log('User connected')

  let currentUserId = null

  ws.on('message', async data => {
    const message = JSON.parse(data)
    const { userId, content, privateChat, event } = message

    if (event === 'handshake' && userId) {
      userConnections.set(userId, ws)
      currentUserId = userId
      console.log(`User ${userId} connected`)

      if (privateChat) {
        console.log(`Private chat connection established with chat ID: ${privateChat}`)
        const pendingMessages = await PrivateMessage.find({
          $and: [{ $or: [{ toUser: privateChat }, { userId: privateChat }] }, { $or: [{ userId: userId }, { toUser: userId }] }]
        }).sort({ timestamp: 1 })
        ws.send(
          JSON.stringify({
            event: 'history',
            messages: pendingMessages
          })
        )
      } else {
        console.log('General chat connection')
        const generalMessages = await ChatMessage.find().sort({ timestamp: 1 })
        ws.send(
          JSON.stringify({
            event: 'history',
            messages: generalMessages
          })
        )
      }
    }

    let savedMessage

    if (event === 'message') {
      if (privateChat) {
        savedMessage = new PrivateMessage({ userId, toUser: privateChat, message: content })
        await savedMessage.save()

        ws.send(
          JSON.stringify({
            event: 'newMessage',
            message: savedMessage
          })
        )

        const recipientWs = userConnections.get(privateChat)
        if (recipientWs && recipientWs.readyState === WebSocket.OPEN)
          recipientWs.send(
            JSON.stringify({
              event: 'newMessage',
              message: savedMessage
            })
          )
        else console.log(`User ${privateChat} is not connected`)
      } else {
        savedMessage = new ChatMessage({ userId, message: content })
        await savedMessage.save()
        wss.clients.forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                event: 'newMessage',
                message: savedMessage
              })
            )
          }
        })
      }
    }
  })

  ws.on('close', () => {
    if (currentUserId) {
      userConnections.delete(currentUserId)
      console.log(`User ${currentUserId} disconnected`)
    }
  })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))
