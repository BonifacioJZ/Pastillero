//Librerias
const express = require('express')
const router = express.Router()
const helpers = require('../lib/helpers')
//DataBase
const pool = require('../database')
router.get('/', (req,res)=>{
    res.send('Hello World');
})

router.post('/alergia', (req,res)=>{
    
    const datos ={
        Nombre:req.body.Nombre,
        Descripcion:req.body.Descripcion
    }
    pool.query(`INSERT INTO Alergia set ?`,[datos],(erro,result,field)=>{
        if(erro) res.status(400).send({error:erro})
        res.status(200).send({resultado:"insert",result,field})

    })
})
router.get('/alergia',(req,res)=>{
    pool.query(`SELECT * FROM Alergia`,(error,rows,fields)=>{
        if(error) res.status(400).send({error})
        res.status(200).send({resultados:rows})
    })
})
router.put('/alergia',(req,res)=>{
    pool.query('')
})
router.post('/alarma',(req,res)=>{
    
    const datos={
        Nombre: req.body.Nombre,
        Hora_de_Ingesta : req.body.Hora_de_Ingesta,
        Tomo :req.body.Tomo,
        Casilla : req.body.Casilla
    }
    pool.query(`INSERT INTO Alarmas set ?`,[datos],(error,result,field)=>{
        if(error) throw res.status(400).send({error})
        res.status(200).send({resultado:"insert",result,field})
    })
})
router.get('/alarma',(req,res)=>{
    pool.query(`SELECT * FROM Alarmas`, (error,rows,fields)=>{
        if(error) throw res.status(400).send({error})
        res.status(200).send({result:rows})
    })
})
router.post('/medicina',(req,res)=>{
    const datos ={
        Nombre:req.body.Nombre,
        Receta:req.body.Receta,
        Dosis:req.body.Dosis,
        Frecuencia:req.body.Frecuencia
    }
    pool.query(`INSERT INTO Medicina set ?`,[datos],(error,result,field)=>{
        if(error) throw res.status(400).send({error,result})
        res.status(200).send({resultado:"insert",result,field})
    })
})
router.get('/medicina',(req,res)=>{
    pool.query(`SELECT * FROM Medicina`,(error,rows)=>{
        if(error) throw res.status(400).send(error)
        res.status(200).send({rows})
    })
})
router.post('/paciente', async(req,res)=>{
    const datos ={
        Nombre: req.body.Nombre,
        Apellido:req.body.Apellido,
        Edad:req.body.Edad,
        Sexo:req.body.Sexo,
        Email:req.body.Email,
        contrasena:req.body.contrasena,
        Telefono:req.body.Telefono
    }
    datos.contrasena =  await helpers.encryptPassword(datos.contrasena)
        pool.query(`INSERT INTO Paciente set ?`, [datos],(error, result, fields)=>{
            if(error) throw res.status(400).send({error})
            res.status(200).send({resultado:"insert",result,fields})
        })
  
    
})

router.get('/paciente',(req,res)=>{
    pool.query(`SELECT * FROM Paciente`,(error,rows)=>{
        if(error)throw res.status(400).send({error})
        res.status(200).send({rows})
    })
})
router.post('/encargado', async(req,res)=>{
    const datos = {
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Edad: req.body.Edad,
        Sexo: req.body.Sexo,
        Email:req.body.Email,
        contrasena:req.body.contrasena,
        Telefono: req.body.Telefono
    }
    datos.contrasena = await helpers.encryptPassword(datos.contrasena)
    pool.query(`INSERT INTO Encargado set ?`, [datos],(error,result,fields)=>{
        if(error) throw res.status(400).send({error})
        res.status(200).send({resultado:"Insert",result,fields})
    })
    
})
router.get('/encargado', (req,res)=>{
    pool.query('SELECT * FROM Encargado',(err,rows)=>{
        if(err) throw res.status(400).send({err})
        res.status(200).send({rows})
    })
})

module.exports = router