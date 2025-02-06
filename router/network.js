const express = require('express')
const { join, dirname } = require('path')
const fs = require('fs')
const route = express.Router()

route.get('/', (req, res) => {
    const ip = '127.0.0.1'
    let mcport = 25565

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
                console.log('Minecraft Server Port:', port);
            } else {
                console.log('Port not found in server.properties');
            }
        })
    }

    res.render('pages/network', { ip, port:mcport })
})

module.exports = route;