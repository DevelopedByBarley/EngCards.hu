const Card = require("../../config/schemas/card.schema");
const Theme = require('../../config/schemas/theme.schema');

const deleteImage = require('../helpers/deleteImage');
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
    res.status(400).json({ errorMessage: "Cards finding error!" });
  }

};

const getCardsByTheme = async (req, res) => {

  const user = req.user.user;
  const themeId = req.params.id;

  try {
    await checkCards(user);
    const cards = await Card.find({
      themeRefId: themeId
    });

    res.status(200).json({
      cards: cards,
    });
  } catch (error) {

    res.status(400).json({ errorMessage: "Ezt a szókártyát sajnos nem találtuk téma alapján!" });
  }
}


// GET SINGLE CARD BY ID
const show = async (req, res) => {
  let id = req.params.id;

  try {
    const card = await Card.findById(id);
    const sectionForSearch = "______";


    if (card.sentence.includes(sectionForSearch)) {
      card.sentence = card.sentence.replace(/______/g, card.word);
    }

    res.status(200).json({ card: card });
  } catch (error) {
    res.status(400).json({ errorMessage: "Ezt a szókártyát sajnos nem találtuk!" });
  }
};

function replaceWordWithUnderscores(sentence, word) {
  const regex = new RegExp(`\\b${word}\\b`, 'gi');
  const replacedSentence = sentence.replace(regex, '______');
  return replacedSentence;
}

// ADD NEW CARD
const newCard = async (req, res) => {
  const user = req.user.user;
  const themeId = req.params.id;
  const word = req.body.word.toLowerCase();
  const translate = req.body.translate.toLowerCase();
  const sentence = req.body.sentence.toLowerCase();
  const replacedSentence = replaceWordWithUnderscores(sentence, word)
  const fileName = req.file ? req.file.filename : null;


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

    const isWordExist = await Card.findOne({
      word: word
    })

    if (isWordExist) {
      res.status(400).json({ errorMessage: "Ez az idegen szó már létezik!" });
      return;
    }

    const expiresIn = formatDate(1);
    const card = new Card({
      word: word,
      translate: translate,
      sentence: replacedSentence,
      expiresIn: expiresIn,
      state: 1,
      imageName: fileName,
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

    res.status(200).json({ message: "Kártya sikeresen hozzáadva!", card: card });
  } catch (error) {
    res.status(400).json({ errorMessage: "Kártya hozzáadási probléma!" });
  }
};

// COMPARE TRANSLATES

const compareCard = async (req, res) => {
  const id = req.params.id;
  const { word } = req.body;
  const stateLimit = 7;

  try {
    const card = await Card.findById(id);
    const nextState = card.state + 1;

    const compareWord = word.toLowerCase() === card.word;

    if (!compareWord) {
      let expiresIn = formatDate(card.state);
      let updatedCard = await Card.findByIdAndUpdate(id, {
        expiresIn: expiresIn,
        isForRepeat: false,
      });

      return res.status(200).json({
        message: "Sajnos nem találtad el, majd  legközelebb!",
        variant: 'danger',
        isSuccess: true,
        card: updatedCard,
      });
    }

    let expiresIn = formatDate(nextState);

    if (nextState === stateLimit) {
      await Card.findByIdAndUpdate(id, {
        isItLearned: true,
        isForRepeat: false
      });
    }

    let updatedCard = await Card.findByIdAndUpdate(id, {
      expiresIn: expiresIn,
      isForRepeat: false,
      state: nextState,
    });

    return res.status(200).json({
      message: "Ezt eltaláltad! Szép munka!",
      variant: "success",
      isSuccess: true,
      card: updatedCard,
    });
  } catch (error) {
    res.status(400).json({ errorMessage: "Kártya összevetési hiba!" });
  }
};


// DELETE CARD 

const deleteCard = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedCard = await Card.findOneAndDelete({
      _id: id
    })


    if (deletedCard.imageName) {
      deleteImage(deletedCard.imageName);
    }

    const theme = await Theme.findById(deletedCard.themeRefId);
    if (!theme) {
      return res.status(400).json({
        errorMessage: 'A kártya téma nem található!'
      });
    }

    // Keresd meg a kártyát a theme.cards tömbben
    const cardIndex = theme.cards.findIndex(card => card._id.toString() === id);
    if (cardIndex === -1) {
      return res.status(400).json({
        errorMessage: 'A kártya nem található a témában!'
      });
    }

    // Távolítsd el a kártyát a theme.cards tömbből
    theme.cards.splice(cardIndex, 1);

    await theme.save();


    res.status(200).json({ message: "Kártya törlése sikeres!", deletedCard: deletedCard });

  } catch (error) {
    return res.status(400).json({
      errorMessage: 'Kártya törlése sikertelen!'
    });

  }
}

// UPDATE CARD

const updateCard = async (req, res) => {

  const user = req.user.user;
  const id = req.params.id;
  const fileName = req.file ? req.file.filename : null;
  const word = req.body.word.toLowerCase();
  const translate = req.body.translate.toLowerCase();
  const sentence = req.body.sentence.toLowerCase();
  const replacedSentence = replaceWordWithUnderscores(sentence, word)

  const card = await Card.findById(id);


  if (fileName !== null) {
    deleteImage(card.imageName);
  }

  try {
    const updateCard = await Card.findOneAndUpdate({
      word: word,
      translate: translate.toLowerCase(),
      sentence: replacedSentence,
      expiresIn: card.expiresIn,
      state: card.state,
      imageName: fileName ? fileName : card.fileName,
      themeRefId: card.themeRefId,
      userRefId: user._id
    })

    res.status(200).json({ message: "Kárty frissitése sikeres!", updateCard: updateCard });
  } catch (error) {
    res.status(400).json({
      errorMessage: "Kártya frissitése sikertelen!"
    })
  }
}


const resetCard = async (req, res) => {
  try {
    const id = req.params.id;
    const expiresIn = formatDate(1);

    const updatedCard = await Card.findOneAndUpdate({ _id: id }, { $set: { state: 1, expiresIn: expiresIn, isItLearned: false } }, { new: true });
    res.status(200).json({ message: "Kártya sikeresen vissaállitva!", updatedCard: updatedCard });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      errorMessage: "Kártya vissaállitása sikertelen!"
    })
  }
};



// GET CARDS FOR REPEAT BY USER

async function getCardsForRepeat(user) {
  const cardsForUpdate = await Card.find({
    userRefId: user._id,
    isForRepeat: true,
    isItLearned: false
  });

  return cardsForUpdate;
}


module.exports = {
  index,
  show,
  newCard,
  compareCard,
  deleteCard,
  updateCard,
  getCardsByTheme,
  resetCard
};
