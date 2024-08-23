const express = require('express')
const { getAllBooks, createBook, getBookById } = require('./controllers/books')
const { getEndpoints } = require('./controllers')
const { serverErrorHandler } = require('./error-handlers')
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors())

app.get("/api", getEndpoints);

app.get('/api/books', getAllBooks)
app.post('/api/books', createBook)
app.get("/api/books/:bookId", getBookById)
 
app.all('*', (req, res, next) => {
    res.status(404).send({message: 'path not found'})
})

app.use(serverErrorHandler)

module.exports = app