const express = require('express')
const fs = require('fs')
const { join, dirname } = require('path')
const route = express.Router()

route.get('/', async (req, res) => {
    let files = []
    const base = dirname(__dirname)
    const path = join(base, 'server')
    try {
        const data = await fs.promises.readdir(path, 'utf-8');
        for (let x in data) {
            const itempath = join(path, data[x])
            const status = await fs.promises.stat(itempath)
            if (status.isDirectory()) files.push({ item: data[x], file: false })
            else if (status.isFile()) files.push({ item: data[x], file: true })
        }
    } catch (error) {
        console.log(error)
    }
    res.render('pages/files', { files })
})

route.get('/:path', async (req, res) => {
    const { path } = req.params;
    const base = dirname(__dirname)
    const dir = path.replace(/\$/g,'/')
    const sppath = join(base, 'server', dir)
    let files = []
    try {
        const data = await fs.promises.readdir(sppath)
        for (let x in data) {
            const itempath = join(sppath, data[x])
            const status = await fs.promises.stat(itempath)
            if (status.isDirectory()) files.push({ item: data[x], file: false })
            else if (status.isFile()) files.push({ item: data[x], file: true })
        }
    } catch (error) {
        console.log(error)
    }
    res.render('pages/files', { files })
})

route.get('/file/:path', (req,res) => {
    const { path } = req.params;
    const base = dirname(__dirname)
    const filepath = path.replace(/\$/g,'/')
    const serverpath = join(base, 'server' , filepath)
    let filename = path.split('$').pop()
    
    fs.readFile(serverpath,'utf8', (err,data) => {
        if(err){
            return console.log(err)
        }
        res.render('pages/sp_file', { file:data, filename, serverpath, message:false })
    })
})

route.post('/save-file', (req,res) => {
    const { path, file } = req.body;
    const filename = path.split("\\").pop()
    fs.writeFile(path,file, (err) => {
        if(err){
            return console.log(err)
        }
        res.render('pages/sp_file', { file , filename, serverpath:path, message:true  })
    })
})

module.exports = route;