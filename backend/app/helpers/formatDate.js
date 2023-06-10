const moment = require('moment');


function formatDate(state = 0) {

   let date = moment();

   switch (state) {
      case 1:
         return date.add(1, 'days').format();
      case 2:
         return date.add(3, 'days').format();
      case 3:
         return date.add(7, 'days').format();
      case 4:
         return date.add(14, 'days').format();
      default:
         return date.format();
   }

}

module.exports = formatDate;