const config = require('./config')
const { connectDB, disconnectDB } = require('./db')
const app = require('./app')

connectDB(config.mongo.uri)

const server = app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`)
})

// gracefull shutdown hook
// when app receives termination signal, we close mongodb and server connections
const gracefulShutdown = () => {
    console.log('Received termination signal, shutting down...')
    server.close(() => {
        console.log('Server is now closed')
        disconnectDB()
    })
}
process.on('SIGINT', gracefulShutdown) 
process.on('SIGTERM', gracefulShutdown) 

