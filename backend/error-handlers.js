exports.serverErrorHandler = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({ message: `Server Error: ${err}`})
}