module.exports = {
    books: require(`./${process.env.NODE_ENV || 'development'}/books.js`)
}