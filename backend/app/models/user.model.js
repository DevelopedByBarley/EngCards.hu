
const bcrypt = require('bcrypt');
const User = require('../../config/schemas/user.schema');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../helpers/generateToken');

const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(409).json({ message: "User already exist!" });
        }

        const newUser = new User({
            userName: userName,
            email: email,
            password: hashedPw
        });

        await newUser.save();
        res.status(200).json({ message: "User registration done!" });

    } catch (error) {
        res.status(400).json({ message: "User registration error!" });
    }
}

const loginUser = async (req, res) => {


    const { userName, password } = req.body;

    const user = await User.findOne({
        userName: userName
    })

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) return res.sendStatus(403);

    const userForToken = { user: user };


    const accessToken = generateAccessToken(userForToken);
    const refreshToken = generateRefreshToken(userForToken)


    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        // itt további opciókat adhatsz meg a cookie-hoz, például expires, maxAge, stb.
    });
    res.json({ accessToken: accessToken })
}

const token = async (req,res) => {
    const refreshToken = req.body.token;
    if(refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        const accessToken = generateAccessToken({user: user.name});
        res.json({accessToken:  accessToken});
    })
}




module.exports = {
    registerUser,
    loginUser,
    token
}