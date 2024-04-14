const express = require('express')

const router = express.Router() // Creación de un  Express router

//Importamos todos los "controllers" que creamos
const {hellowWorld} = require('../controllers/holamundo')
const {SignUp, GetAllUsers, Login}=require('../controllers/accesos')
const {UpdateUser}=require('../controllers/Update')
const {deleteUser}=require('../controllers/Delete')

//Get 
router.get('/saludo', hellowWorld)
router.get('/GetAllUsers', GetAllUsers)

//Post
router.post('/registro', SignUp)
router.post('/Login', Login)

//Put
router.put('/update', UpdateUser)

//Delete
router.delete('/delete', deleteUser)

module.exports= router //Exportamos el router