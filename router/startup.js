const express = require('express')
const { join, dirname } = require('path')
const fs = require('fs')
const route = express.Router()

route.get('/',(req,res) => {
    const serverpath = dirname(__dirname)
    const batfilepath = join(serverpath,'server','start.bat')
    const inbat = fs.existsSync(batfilepath)
    if(inbat){
        fs.readFile(batfilepath,'utf8',(err ,data) => {
            if(err) console.log(err)

            res.render('pages/startup', { file:data })
        })
    }
})

module.exports = route;