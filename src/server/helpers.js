const moment = require('moment');
const helper = {};

helper.timeAgo = timestamp => {
  return  moment(timestamp).startOf('minute').fromNow();
};

module.exports = helper;