module.exports = {
    books: require(`./${process.env.NODE_ENV || 'development'}/books.js`),
    users: require(`./${process.env.NODE_ENV || 'development'}/users.js`),
    genres: require(`./${process.env.NODE_ENV || 'development'}/genres.js`),
    messages: require(`./${process.env.NODE_ENV || 'development'}/messages.js`)
}