const Card = require("../../config/schemas/card.schema");
const formatDate = require("../helpers/formatDate");
const checkCards = require("../helpers/checkCards");
const moment = require("moment");

//  GET ALL AND REPEAT CARDS BY USER
const index = async (req, res) => {
  const user = req.user.user;

  try {
    await checkCards(user);
    const cardsForRepeat = await getCardsForRepeat(user);
    const cards = await Card.find({
      userRefId: user._id,
    });

    res.status(200).json({
      cards: cards,
      cardsForRepeat: cardsForRepeat,
    });
  } catch (error) {
    res.status(400).json({ message: "Cards finding error!" });
  }
};

// GET SINGLE CARD BY ID
const show = async (req, res) => {
  let id = req.params.id;

  try {
    const card = await Card.findById(id);

    res.status(200).json({ card: card });
  } catch (error) {
    res.status(400).json({ message: "Single Card finding error!" });
  }
};

// ADD NEW CARD
const newCard = async (req, res) => {
  let { word, translate } = req.body;
  const user = req.user.user;
  const today = moment().startOf("day");
  const endOfDay = moment(today).endOf("day");

  try {

    const cardsToday = await Card.find({
        userRefId: user._id,
        createdAt: {
          $gte: today.toDate(),
          $lte: endOfDay.toDate(),
        },
      });
    
      let countOfCardsToday = cardsToday.length;
    
      if (countOfCardsToday >= user.limit) {
        return res.json({
          message: "Sajnos ma már nem adhatsz többet hozzá elérted a napi limitet!",
        });
      }

    const expiresIn = formatDate(1);
    const cards = await new Card({
      word: word,
      translate: translate,
      expiresIn: expiresIn,
      state: 1,
      userRefId: user._id,
    });

    cards.save();

    res.status(200).json({ cards: cards });
  } catch (error) {
    res.status(400).json({ message: "Cards finding error!" });
  }
};

// COMPARE TRANSLATES

const compareCard = async (req, res) => {
  const id = req.params.id;
  const { translate } = req.body;

  try {
    const card = await Card.findById(id);
    const nextState = card.state + 1;

    const compareWord = translate === card.translate;

    if (!compareWord) {
      let expiresIn = formatDate(card.state);
      let updatedCard = await Card.findByIdAndUpdate(id, {
        expiresIn: expiresIn,
        isForRepeat: false,
      });

      return res.status(200).json({
        message: "Card expires reset because u did not remember!",
        card: updatedCard,
      });
    }

    let expiresIn = formatDate(nextState);

    if (nextState === 5) {
      await Card.findByIdAndDelete(id);
    }
    let updatedCard = await Card.findByIdAndUpdate(id, {
      expiresIn: expiresIn,
      isForRepeat: false,
      state: nextState,
    });

    return res.status(200).json({
      message: "Congratulations! U did remember that word!",
      card: updatedCard,
    });
  } catch (error) {
    res.status(400).json({ message: "Problem" });
  }
};

// GET CARDS FOR REPEAT BY USER

async function getCardsForRepeat(user) {
  const cardsForUpdate = await Card.find({
    userRefId: user._id,
    isForRepeat: true,
  });

  return cardsForUpdate;
}

module.exports = {
  index,
  show,
  newCard,
  compareCard,
};
