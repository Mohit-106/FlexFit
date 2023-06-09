const FooduserModel = require("../model/userModel");

async function profileController(req, res) {
    try {
        const userId = req.userId;
        const user = await FooduserModel.findById(userId);
        res.json({
            data: user,
            message: "Data about logged in user is sent"
        });
    }catch (err) {
        res.end(err.message);
    }
}

async function getAllUsersController(req, res) {
    try {
        let users = await FooduserModel.find();
        // to send json data ;
        res.json(users);
    } catch (err) {
        res.end(err.message);
    }
}

module.exports = {
    profileController: profileController,
    getAllUsersController: getAllUsersController
}