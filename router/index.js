const express = require('express')
const fs = require('fs')
const { join, dirname } = require('path')
const util = require('minecraft-server-util');
const route = express.Router()

module.exports = function (io) {
  route.get('/', async (req, res) => {
    let mcport = 25565
    let serverIP = 'localhost'

    const base = dirname(__dirname)
    const PortPath = join(base, 'server', 'server.properties')

    if (fs.existsSync(PortPath)) {
      fs.readFile(PortPath, 'utf8', (err, data) => {
        if (err) {
          return console.log(err)
        }
        const lines = data.split('\n');
        const portLine = lines.find(line => line.startsWith('server-port='));
        if (portLine) {
          const port = portLine.split('=')[1].trim();
          mcport = port
          // console.log('Minecraft Server Port:', port);
        } else {
          console.log('Port not found in server.properties');
        }
      })
    }

    function getPlayerCount() {
      util.status(serverIP)
        .then((response) => {
          io.emit('server-status', 'online');
          io.emit('players', response.players.online);
        })
        .catch((error) => {
          io.emit('server-status', 'offline');
          // if (error.code === 'ECONNREFUSED') {
          //   console.error('Connection refused: Unable to reach the server.');
          // } else if (error.code === 'ENOTFOUND') {
          //   console.error('Server not found: Please check the server address.');
          // } else {
          //   // console.error('Error fetching server status:', error.message);
          // }
        });
    }
    setInterval(getPlayerCount,1000)
    res.render('pages/console', { mcport, serverIP })
  })
  return route;
}