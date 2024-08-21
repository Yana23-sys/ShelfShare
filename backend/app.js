const express = require('express')
const { getAllBooks, postBook } = require('./controllers/books')
const { getEndpoints } = require('./controllers')
const { serverErrorHandler } = require('./error-handlers')

const app = express()
app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/books', getAllBooks)
app.post('/api/books', postBook)
 
app.all('*', (req, res, next) => {
    res.status(404).send({message: 'path not found'})
})

app.use(serverErrorHandler)

module.exports = app