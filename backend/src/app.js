
const express = require('express') // Importa el módulo Express
const cors = require('cors') // Importa el módulo CORS 

const MyApp = express(); // Crea una instancia de Express

MyApp.use(express.json()) //para analizar los cuerpos de las solicitudes en formato JSON
MyApp.use(cors()) //para permitir solicitudes CORS (Cross-Origin Resource Sharing) esto desde el frontend

const Router= require('./routers/routes')
MyApp.use(Router) //Usamos el router importado

const port = 5000; // Puerto 

MyApp.listen(port, () => {
    console.log(`The API is listening at http://localhost:${port}`);
  });