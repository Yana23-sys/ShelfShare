const express = require('express')

const app = express()
app.use(express.json())

app.all('*', (request, response, next) => {
    response.status(404).send({msg: 'path not found'})
})

module.exports = app