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
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const IndexRouter = require('./router/index')
const ControlsRouter = require('./router/controls_apis')
const FilesRouter = require('./router/files')
const NetworkRouter = require('./router/network')
const StartupRouter = require('./router/startup')
const SettingsRouter = require('./router/settings')

app.use('/',IndexRouter(io))
app.use('/controls', ControlsRouter(io))
app.use('/files', FilesRouter)
app.use('/network', NetworkRouter)
app.use('/startup', StartupRouter)
app.use('/settings', SettingsRouter)


const PORT = process.env.PORT || 3000;
server.listen(PORT,()=> console.log(`http://localhost:${PORT}/`))