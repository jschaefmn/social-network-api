const date = require('date-and-time');
function dateFormat(now) {
  return date.format(now, 'ddd, MMM DD YYYY at hh:mm A');
};

module.exports = dateFormat