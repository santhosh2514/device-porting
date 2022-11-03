
'use strict';

const express = require('express');

const conversationRoutes = require('./modules/conversation/conversationRoutes');
const userRoutes = require('./modules/user/userRoutes');
const portRoutes = require('./modules/dataPorting/portRoutes');

const apiRouter = express.Router();

module.exports = () =>
  apiRouter
    .use('/user', userRoutes())
    .use('/port', portRoutes())
    .use('/conversation', conversationRoutes())
    .all('*', () => {
      throw new NotFoundError();
    });
