const express = require('express')

const router = express.Router() 

//Importando todas uestras clases que estan en la carpeta controllers
const {hellowWorld} = require('../controllers/holamundo')
const {SignUp, GetAllUsers, Login, CargaMasiva}=require('../controllers/accesos')
const {UpdateUser}=require('../controllers/Update')
const {deleteUser}=require('../controllers/Delete')
const {nuevaPublicacion, getPublicaciones} = require('../controllers/Publicacion')

//Get 
router.get('/saludo', hellowWorld)
router.get('/GetAllUsers', GetAllUsers)
router.get('/getPublicaciones', getPublicaciones)

//Post
router.post('/registro', SignUp)
router.post('/Login', Login)
router.post('/createPost', nuevaPublicacion)
router.post('/CargaMasiva', CargaMasiva)

//Put
router.put('/update', UpdateUser)

//Delete
router.delete('/delete', deleteUser)

module.exports= router 
