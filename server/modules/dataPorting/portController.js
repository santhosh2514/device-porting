const bunyan = require("bunyan");
const { generateAccessToken } = require("../../middleware/authentication");
const { User } = require("../../models");

const logger = bunyan.createLogger({ name: "portController" });

const validate = async (req, res) => {
  logger.info(
    { method: "validatePort" },
    "Error in validating port"
  );
  try {
    const { otp, nickname, newDeviceId } = req.body;
    let isPorted = false;
    const userData = await User.findOne({
      name: nickname,
      "portDetails.status": "available",
      "portDetails.otp": otp,
    });

    if (userData === null) {
      res.json({ isPorted, message: "incorrect_otp" });
      return;
    }

    const { _id } = userData;
    await User.findOneAndUpdate(
      { _id },
      {
        $set: {
          uniqueId: newDeviceId,
          "portDetails.status": "ported",
        },
      }
    );

    isPorted = true;
    const token = generateAccessToken({ name: nickname, id: newDeviceId });
    res.json({ isPorted, token });
  } catch (error) {
    logger.error(
      { method: "updateOtp", err: error },
      "Error in validating port"
    );
  }
};

const updateOtp = async (req, res) => {
  logger.info({ method: "updateOtp" }, "updating otp");
  const { otp } = req.body;
  try {
    await User.findOneAndUpdate(
      { uniqueId: req.user.id },
      {
        $set: {
          portDetails: {
            otp: otp,
            status: "available",
          },
        },
      }
    );
    res.json({ message: "Otp updated" });
  } catch (error) {
    logger.error({ method: "updateOtp" }, "Error in updating otp");
  }
};

const invalidateOtp = async (req, res) => {
  logger.info({ method: "invalidateOtp" }, "Invalidating otp");
  try {
    await User.findOneAndUpdate(
      { uniqueId: req.user.id },
      {
        $set: {
          portDetails: {
            status: "expired",
          },
        },
      }
    );
    res.json({ message: "Otp invalidated" });
  } catch (error) {
    logger.error({ method: "invalidateOtp" }, "Error in removing otp");
  }
};

module.exports = {
  updateOtp,
  validate,
  invalidateOtp,
};
