const Theme = require('../../config/schemas/theme.schema');

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
    return 'Problem';
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
      message: "Theme created successfully!",
      theme: newTheme
    })
  } catch (error) {
    return res.status(400).json({
      message: "Theme creating problem!"
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
  newTheme
}