const config = require('./config')
const { connectDB, disconnectDB } = require('./db')

connectDB(config.mongo.uri)

// gracefull shutdown hook
// when app receives termination signal, we close mongodb connection
process.on('SIGINT', disconnectDB) 
