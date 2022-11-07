const bunyan = require('bunyan');
const { Conversation } = require('../../models');
const { User } = require('../../models');
const { generateAccessToken } = require('../../middleware/authentication');

const logger = bunyan.createLogger({ name: 'userController' });

const createUserData = async (req, res) => {
    logger.info({ method: 'CreateUserData' }, "Creating a new user data");
    try {
      const { nickname, uniqueIdentifier } = req.body;
      const token = generateAccessToken({ name: nickname, id: uniqueIdentifier });
      const data = await User.create({ name: nickname, uniqueId: uniqueIdentifier });
  
      //creating dummy conversations for demo
      await Conversation.create({
        userId: data._id,
        conversation: [{
          from: "bot",
          body: `Hi ${data.name},How was your day`,
          dateTime: new Date()
        }, {
          from: data.name,
          body: "I felt happy",
          type: "Happy",
          dateTime: new Date()
        }, {
          from: "bot",
          body: "Thats amazing",
          dateTime: new Date()
        }]
      })
  
      res.json(token);
  
    } catch (error) {
      logger.error({ method: 'CreateUserData', err: error }, "Error in creating user data");
    }
}

const getProfileData = async (req, res) => {
    logger.info({ method: 'getProfileData' }, "Getting user profile data");
    try {
      const data = await User.findOne({ uniqueId: req.user.id }, 'name');
      if (data === null) {
        res.sendStatus(403)
      }
      res.json(data);
    } catch (error) {
      logger.error({ method: "getProfileData", err: error }, "Error in getting user profile data")
    }
  }

  module.exports = {
    getProfileData, 
    createUserData
  }
  