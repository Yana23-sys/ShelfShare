const endpoints = require('./endpoints')

exports.getEndpoints = (req, res) => {
    res.status(200).send({endpoints})
}