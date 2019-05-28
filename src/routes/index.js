//Librerias
const express = require('express')
const router = express.Router()
//DataBase
const pool = require('../database')
router.get('/', (req,res)=>{
    res.send('Hello World');
})

module.exports = router