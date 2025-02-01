const express = require('express')
const { spawn, exec } = require('child_process')
const { join, dirname } = require('path')
const route = express.Router()

const basePath = dirname(__dirname)
const StartBatPath = join(basePath,'server','start.bat')

module.exports = function(io) {
    let server = null
    route.get('/start', (req,res) => {
        server = spawn(StartBatPath,[],{ shell:true })
        server.stdout.on('data', data => {
            const message = data.toString()
            io.emit('server-log',message)
        })
        server.stderr.on('data', data => {
            const message = data.toString()
            io.emit('server-log',message)
        })
        res.json('Start')
    })

    route.get('/restart', async (req,res) => {
        if (server) {
            console.log('Stopping Minecraft server...');
            await new Promise((resolve) => {
                exec('taskkill /f /t /im java.exe', (err) => {
                    if (err) {
                        console.error(`Error stopping server: ${err}`);
                        return res.status(500).json({ message: 'Failed to stop the server' });
                    }
                    server = null;
                    io.emit('server-log', 'Server has been stopped.');
                    resolve();
                });
            });
        }

        server = spawn(StartBatPath,[],{ shell:true })
        server.stdout.on('data', data => {
            const message = data.toString()
            io.emit('server-log',message)
        })
        server.stderr.on('data', data => {
            const message = data.toString()
            io.emit('server-log',message)
        })
        res.json('Start')
    })

    route.get('/stop', (req,res) => {
        if(server){
            exec('taskkill /f /t /im java.exe', (err) => {
                if (err) {
                    console.error(`Error stopping server: ${err}`);
                    return res.status(500).json({ message: 'Failed to stop the server' });
                }
                io.emit('server-log', 'Server has been stopped.');
                serverProcess = null;
                res.json({ message: 'Minecraft Server Stopped.' });
            });
        }
    })

    return route;
}