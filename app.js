// Importar Express.js
const express = require('express')

const app = express()

app.get('/', (rep, res) => {

    res.send('Hello World')
})

const port = 5000

app.listen(port, () => {
    console.log(`Server running on ${port}`)
})