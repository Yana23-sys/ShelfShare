const { findAllUsers } = require("../models/users");

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await findAllUsers();
        res.status(200).send({ users });
    } catch (error) {
        console.error("Error fetching users:", error);
        next(error);
    }
}