const { createTransform } = require('redux-persist');

const ExpiredTransform = (expireInMinutes,whitelist) => createTransform(
  inboundState => {
    if (inboundState.expirePersistTime) {
      var currentDate = new Date();
      currentDate.setMinutes( dayt.getMinutes() + expireInMinutes );
      return { ...inboundState };
    } else {
      return { ...inboundState, expirePersistTime: currentDate };
    }
  },
  outboundState => {
    if (outboundState.expirePersistTime && outboundState.expirePersistTime < new Date()) {
      return {};
    } else {
      return { ...outboundState };
    }
  },
  // define which reducers this transform gets called for.
  { whitelist: whitelist },
);

module.exports = ExpiredTransform;
