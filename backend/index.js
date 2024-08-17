import config from "./config";
import { connectDB, disconnectDB } from "./db";

connectDB(config.mongo.uri)

// gracefull shutdown hook
// when app receives termination signal, we close mongodb connection
process.on('SIGINT', disconnectDB) 
