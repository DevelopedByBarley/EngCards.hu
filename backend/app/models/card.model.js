const Card = require("../../config/schemas/card.schema");
const Theme = require('../../config/schemas/theme.schema');

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

const getCardsByTheme = async (req, res) => {

  const user = req.user.user;
  const themeId = req.params.id;

  try {
    await checkCards(user);
    const cards = await Card.find({
      themeRefId: themeId,
    });

    res.status(200).json({
      cards: cards,
    });
  } catch (error) {

    res.status(400).json({ errorMessage: "Ezt a szókártyát sajnos nem találtuk téma alapján!"});
  }
}


// GET SINGLE CARD BY ID
const show = async (req, res) => {
  let id = req.params.id;

  try {
    const card = await Card.findById(id);

    res.status(200).json({ card: card });
  } catch (error) {
    res.status(400).json({ errorMessage: "Ezt a szókártyát sajnos nem találtuk!" });
  }
};

// ADD NEW CARD
const newCard = async (req, res) => {
  const themeId = req.params.id;
  const { word, translate } = req.body;
  const user = req.user.user;
  const today = moment().startOf("day");
  const endOfDay = moment(today).endOf("day");

  try {

    const cardsToday = await Card.find({
      createdAt: {
        $gte: today.toDate(),
        $lte: endOfDay.toDate(),
      },
    });

    let countOfCardsToday = cardsToday.length;

    if (countOfCardsToday >= user.limit) {
      return res.status(400).json({
        errorMessage: "Sajnos ma már nem adhatsz többet hozzá elérted a napi limitet!",
      });
    }


    // Check word is exist!

    const isWordExist = await Card.findOne({
      word: word
    })

    if(isWordExist) {
      res.status(400).json({ errorMessage: "Ez az angol szó már létezik!" });
      return;
    }

    const expiresIn = formatDate(1);
    const card = new Card({
      word: word,
      translate: translate,
      expiresIn: expiresIn,
      state: 1,
      themeRefId: themeId,
      userRefId: user._id
    });

    await card.save();

    // Hozzáadjuk az új kártyát a témához
    const theme = await Theme.findById(themeId);
    if (!theme) {
      return res.status(400).json({
        errorMessage: 'A téma nem található!'
      });
    }

    theme.cards.push(card);
    await theme.save();

    res.status(200).json({ card: card });
  } catch (error) {
    res.status(400).json({ errorMessage: "Kártya hozzáadási probléma!" });
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
  getCardsByTheme
};
