const Card = require('../../config/schemas/card.schema');

const index = async (req, res) => {
    const user = req.user.user

    try {
        const cards = await Card.find({
            userRefId: user._id
        });
        res.state(200).json({ cards: cards });
    } catch (error) {
        res.state(400).json({ message: "Cards finding error!" });
    }

}

const newCard = async (req, res) => {
    let { word, translate, expiresIn, state, userRefId } = req.body;
    const user = req.user.user



    try {
        const cards = await new Card({
            word: word,
            translate: translate,
            expiresIn: expiresIn,
            state: state,
            userRefId: user._id
        });
        
        res.state(200).json({ cards: cards });
    } catch (error) {
        res.state(400).json({ message: "Cards finding error!" });
    }
}

module.exports = {
    index,
    newCard
}