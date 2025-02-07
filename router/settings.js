const express = require('express')
const upload = require('../config/multer')
const route = express.Router()

route.get('/', (req,res) => {
    res.render('pages/settings', { message:null })
})

route.post('/', upload,(req,res) => {
    res.render('pages/settings', { message:true })
})

module.exports = route;