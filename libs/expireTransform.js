const { createTransform } = require("redux-persist");

const ExpiredTransform = (expireInMinutes, whitelist) =>
  createTransform(
    inboundState => {
      if (inboundState.expirePersistTime) {
        return { ...inboundState };
      } else {
        var currentDate = new Date();
        currentDate.setMinutes(currentDate.getMinutes() + expireInMinutes);
        return { ...inboundState, expirePersistTime: currentDate };
      }
    },
    outboundState => {
      if (
        outboundState.expirePersistTime &&
        outboundState.expirePersistTime < new Date()
      ) {
        return {};
      } else {
        return { ...outboundState };
      }
    },
    // define which reducers this transform gets called for.
    { whitelist }
  );

module.exports = ExpiredTransform;
