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
router.delete('/alergia/:id',(req,res)=>{
    pool.query(`DELETE FROM Alergia WHERE id_alergia= ?`,[req.params.id],(error,rows)=>{
        if(error)throw res.status(400).send({error})
        res.status(200).send({result:"Eliminado",rows})
    })
})
router.get('/alergia',(req,res)=>{
    pool.query(`SELECT * FROM Alergia`,(error,rows,fields)=>{
        if(error) res.status(400).send({error})
        res.status(200).send({resultados:rows})
    })
})
router.put('/alergia/:id',(req,res)=>{
    const datos  = {
        id_alergia: req.params.id,
        Nombre:req.body.Nombre,
        Descripcion:req.body.Descripcion
    }
    const query =`UPDATE Alergia 
    SET Nombre = '${datos.Nombre}', 
    Descripcion = '${datos.Descripcion}'
    WHERE id_alergia = ${datos.id_alergia}`
    pool.query(query,(error,rows)=>{
        if(error) throw res.status(400).send({error})
        res.status(200).send({rows})
    })
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
router.delete('/alarma/:id',(req,res)=>{
    pool.query(`DELETE FROM Alarmas where id_alarma = ?`, [req.params.id],(error,rows)=>{
        if(error)throw res.status(400).send({error})
        res.status(200).send({result:"Eliminado",rows})
    })
})
router.put('/alarma/:id',(req,res)=>{
    const query = `
    UPDATE Alarmas SET
    Nombre  ='${req.body.Nombre}',
    Hora_de_Ingesta = '${req.body.Hora_de_Ingesta}',
    Tomo = '${req.body.Tomo}',
    Casilla = ${req.body.Casilla} where id_alarma = ${req.params.id}`
    pool.query(query,(error,rows)=>{
        if(error) throw res.status(400).send({error})
        res.status(200).send({result:"actualizado",rows})
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
router.delete('/medicina/:id',(req,res)=>{
    pool.query(`DELETE FROM Medicina WHERE id_medicina = ?`,[req.params.id],(error,rows)=>{
        if(error) throw res.status(400).send({error})
        res.status(200).send({result:"Elimindado",rows})
    })
})
router.put('/medicina/:id',(req,res)=>{
    const query = `
    UPDATE Medicina SET
    Nombre = '${req.body.Nombre}',
    Receta = '${req.body.Receta}',
    Dosis = '${req.body.Dosis}',
    Frecuencia = '${req.body.Frecuencia}'
    `
    pool.query(query,(error,rows)=>{
        if(error) throw res.status(400).send({error})
        res.status(200).send({result:"actualizado",rows})
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
router.put('/paciente/:id',async (req,res)=>{
    const contra = await helpers.encryptPassword(req.body.contrasena)
    console.log(req.body)
    const query = `UPDATE Paciente SET
        Nombre = '${req.body.Nombre}',
        Apellido = '${req.body.Apellido}',
        Edad = '${req.body.Edad}',
        Sexo = '${req.body.Sexo}',
        Email = '${req.body.Email}',
        contrasena = '${contra}',
        Telefono = ${req.body.Telefono}`
    pool.query(query,(error, rows)=>{
        if(error) throw res.status(400).send({error})
        res.status(200).send({result:"Actualizado",rows})
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
router.put('/encargado/:id',async(req,res)=>{
    const contra = await helpers.encryptPassword(req.body.contrasena)
    console.log(req.body)
    const query = `UPDATE Encargado SET
        Nombre = '${req.body.Nombre}',
        Apellido = '${req.body.Apellido}',
        Edad = '${req.body.Edad}',
        Sexo = '${req.body.Sexo}',
        Email = '${req.body.Email}',
        contrasena = '${contra}',
        Telefono = ${req.body.Telefono}`
    pool.query(query,(error, rows)=>{
        if(error) throw res.status(400).send({error})
        res.status(200).send({result:"Actualizado",rows})
    })
})
router.get('/encargado', (req,res)=>{
    pool.query('SELECT * FROM Encargado',(err,rows)=>{
        if(err) throw res.status(400).send({err})
        res.status(200).send({rows})
    })
})

module.exports = router