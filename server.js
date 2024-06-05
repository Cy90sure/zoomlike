const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
   res.render('home')
})

app.get('/generate-room-code', (req, res) => {
   const newRoomId = uuidV4()
   res.json({ roomCode: newRoomId })
})

app.post('/join-room', (req, res) => {
   const roomId = req.body.room_code
   res.redirect(`/${roomId}`)
})

app.get('/:room', (req, res) => {
   res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
   socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.broadcast.to(roomId).emit('user-connected', userId)

      socket.on('disconnect', () => {
         socket.broadcast.to(roomId).emit('user-disconnected', userId)
      })
   })
})

server.listen(3000, () => {
   console.log('Server is running on port 3000')
})

