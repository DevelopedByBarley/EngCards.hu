const moment = require('moment');

function formatDate(state) {
  let date = moment();

  switch (state) {
    case 1:
      return date.add(1, 'days').format('YYYY-MM-DD');
    case 2:
      return date.add(2, 'days').format('YYYY-MM-DD');
    case 3:
      return date.add(3, 'days').format('YYYY-MM-DD');
    case 4:
      return date.add(7, 'days').format('YYYY-MM-DD');
    case 5:
      return date.add(14, 'days').format('YYYY-MM-DD');
    case 6:
      return date.add(28, 'days').format('YYYY-MM-DD');
    default:
      return date.format('YYYY-MM-DD');
  }
}


module.exports = formatDate;