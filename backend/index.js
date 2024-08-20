const config = require('./config')
const { connectToMongo, disconnectFromMongo } = require('./db/mongodb-connection')
const app = require('./app')

connectToMongo(config.mongo.uri)

const server = app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`)
})

// gracefull shutdown hook
// when app receives termination signal, we close mongodb and server connections
const gracefulShutdown = () => {
    console.log('Received termination signal, shutting down...')
    server.close(() => {
        console.log('Server is now closed')
        disconnectFromMongo()
    })
}
process.on('SIGINT', gracefulShutdown) 
process.on('SIGTERM', gracefulShutdown) 

