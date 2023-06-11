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

      themes =  await findThemeByUserId(user)
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


  } catch (error) {
    return 'Problem in add new';
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