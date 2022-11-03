const express = require('express');
const router = express.Router();

const middlewares = require('../../middleware/authentication');
const portController = require('./portController');

module.exports = () => {
    router.route(`/validate`)
        .post(portController.validate);
    router.route(`/updateOtp`)
        .post(middlewares.authenticateToken, portController.updateOtp);
    router.route(`/invalidateOtp`)
        .post(middlewares.authenticateToken, portController.invalidateOtp);
    return router;
}
