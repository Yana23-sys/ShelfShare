const express = require('express')
const { getAllBooks } = require('./controllers/books')

const app = express()
app.use(express.json())

app.get('/api/books', getAllBooks)

app.all('*', (request, response, next) => {
    response.status(404).send({msg: 'path not found'})
})

module.exports = app