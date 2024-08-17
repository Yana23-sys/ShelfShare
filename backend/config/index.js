const dotenv = require('dotenv');

const ENV = process.env.NODE_ENV || '';

dotenv.config({
  path: `${__dirname}/../.env.${ENV}`,
});

// Extracting env vars
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoPort = process.env.MONGO_PORT;
const mongoDB = process.env.MONGO_DB;

// Building mongodb connection string depending on available env vars
let mongoUri = process.env.MONGO_HOST
// we generally don't need user/password for connecting to local mongodb instances
if (mongoUser && mongoPassword) {
    mongoUri = `${mongoUser}:${mongoPassword}@${mongoUri}`
}
// we don't need port for connecting to prod cluster, hence in prod env MONGO_PORT might not be available
if (mongoPort) {
    // for connecting to local cluster
    mongoUri = `mongodb://${mongoUri}:${mongoPort}/${mongoDB}`
} else {
    // production cluster uses mongodb+srv protocol
    mongoUri = `mongodb+srv://${mongoUri}/${mongoDB}`
}


module.exports = {
    server: {
        port: process.env.PORT || 3000
    },
    mongo: {
        uri: mongoUri
    }
}