const bunyan = require('bunyan');

const { User } = require('../../models');
const { Conversation } = require('../../models');

const logger = bunyan.createLogger({ name: 'conversationController' });

const getConversation = async (req, res) => {
    logger.info({ method: 'getConversation' }, "Getting user conversation");
    try {
      const data = await User.findOne({ uniqueId: req.user.id });
      if (data === null) {
        res.sendStatus(403)
      }
      const conversationData = await Conversation.findOne({ userId: data._id });
      res.json(conversationData.conversation);
    } catch (error) {
      logger.error({ method: "getConversation", err: error }, "Error in getting user conversation")
    }
  }

module.exports = {
    getConversation
}
