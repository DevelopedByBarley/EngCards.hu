const Card = require('../../config/schemas/card.schema');
const formatDate = require('../helpers/formatDate');

async function checkCards(user) {
  const today = formatDate();
  const cards = await Card.updateMany(
    { userRefId: user._id, expiresIn: { $lte: today }, isItLearned: false },
    { $set: { isForRepeat: true } }
  );

  return cards;
}

module.exports = checkCards;