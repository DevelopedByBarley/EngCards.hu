const Theme = require('../../config/schemas/theme.schema');
const Card = require('../../config/schemas/card.schema');
const deleteImage = require('../helpers/deleteImage')

const index = async (req, res) => {
  const user = req.user.user;

  try {
    let themes = await findThemeByUserId(user)

    if (themes.length === 0) {
      const newTheme = new Theme({
        title: "Egyéb szavak",
        color: "hsla(332, 0%, 19%, 1)",
        userRefId: user._id
      })

      await newTheme.save();

      themes = await findThemeByUserId(user)
    }

    res.json({
      user: user,
      themes: themes
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ errorMessage: "Nem találtuk a user-t és a témákat!" })
  }
};


const show = async (req, res) => {
  const { id } = req.params

  try {
    const theme = await Theme.findOne({
      _id: id
    })


    return res.status(200).json({
      theme
    })

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      errorMessage: "Ez a téma nem található!"
    })
  }
}


const newTheme = async (req, res) => {
  const user = req.user.user;
  const { title, color } = req.body;

  try {
    const newTheme = new Theme({
      title: title,
      color: color,
      userRefId: user._id
    })

    await newTheme.save();

    return res.status(200).json({
      message: "Téma sikeresen létrehozva!",
      theme: newTheme
    })
  } catch (error) {
    return res.status(400).json({
      errorMessage: "Téma létrehozása sikertelen!"
    })
  }
}

const deleteTheme = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteTheme = await Theme.findOneAndDelete({ _id: id });
    if (deleteTheme) {

      const cardsForDelete = await Card.find({
        themeRefId: deleteTheme._id
      });

      cardsForDelete.forEach((card) => {
        deleteImage(card.imageName);
      });

      await Card.deleteMany({
        themeRefId: deleteTheme._id
      });

    }

    return res.status(200).json({
      message: "Téma törlése sikeres!",
      deleteTheme: deleteTheme
    });
  } catch (error) {
    return res.status(400).json({
      errorMessage: "Sikertelen téma létrehozás!"
    });
  }
}


const updateTheme = async (req, res) => {
  const id = req.params.id;
  const { title, color } = req.body;

  try {
    await Theme.findOneAndUpdate({ _id: id }, {
      title: title,
      color: color
    }, { new: true })
    return res.status(200).json({
      message: "Téma sikeresen frissitve!",
      theme: newTheme
    })

  } catch (error) {
    return res.status(400).json({
      errorMessage: "Téma frissitése sikertelen!"
    })
  }
}

async function findThemeByUserId(user) {
  const themes = await Theme.find({ userRefId: user._id })
    .populate('cards')
    .exec();

  return themes;
}


module.exports = {
  index,
  show,
  newTheme,
  deleteTheme,
  updateTheme
}