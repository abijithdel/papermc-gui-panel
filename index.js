const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const expressLayouts = require('express-ejs-layouts')
const path = require('path')

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(express.static('public'))
app.use(expressLayouts)
app.set('layout', './layouts/layout')
app.set('view engine','ejs')  

const IndexRouter = require('./router/index')
const ControlsRouter = require('./router/controls_apis')
app.use('/',IndexRouter(io))
app.use('/controls', ControlsRouter(io))

const PORT = process.env.PORT || 3001;
server.listen(PORT,()=> console.log(`http://localhost:${PORT}/`))