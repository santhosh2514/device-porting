const express = require('express');
const router = express.Router();

const middlewares = require('../../middleware/authentication');
const userController = require('./userController');

module.exports = () => {
    router.route(`/createUserData`)
        .post(userController.createUserData);
    router.route(`/getProfileData`)
        .get(middlewares.authenticateToken, userController.getProfileData);

    return router;
}