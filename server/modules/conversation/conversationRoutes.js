const express = require('express');
const router = express.Router();

const middlewares = require('../../middleware/authentication');
const conversationController = require('./conversationController');

module.exports = () => {
    router.route(`/getConversation`)
        .get(middlewares.authenticateToken, conversationController.getConversation);
    return router;
}
