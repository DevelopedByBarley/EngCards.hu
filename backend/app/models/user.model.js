
const bcrypt = require('bcrypt');
const User = require('../../config/schemas/user.schema');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../helpers/generateToken');

const registerUser = async (req, res) => {
    const { userName, email, password, limit } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPw = await bcrypt.hash(password, salt);

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            return res.status(409).json({
                errorMessage: "Hiba a regisztráció közben"
            });
        }

        const newUser = new User({
            userName: userName,
            email: email,
            password: hashedPw,
            limit: limit
        });

        await newUser.save();
        res.status(200).json({ message: "Sikeres regisztráció!" });

    } catch (error) {
        res.status(400).json({ errorMessage: "Sikertelen regisztráció!" });
    }
}

const loginUser = async (req, res) => {
    const { email, password, stayLogin } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(403).json({ errorMessage: "Nem megfelelő email vagy jelszó!" });
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.status(403).json({ errorMessage: "Nem megfelelő email vagy jelszó!" });
    }

    const userForToken = { user };

    const accessToken = generateAccessToken(userForToken);
    const refreshToken = generateRefreshToken(userForToken);
    const oneDay = 24 * 60 * 60 * 1000; 

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: stayLogin ? oneDay : undefined
    });

    res.json({ accessToken });
}



const getMe = (req, res) => {
    const { user } = req.user

    if (user) {
        res.status(200).json({ user: user, errorMessage: "Found User!" })
    } else {
        res.status(400).json({ user: false, errorMessage: "Error finding user!" })
    }
}


const token = async (req, res) => {
    let refreshToken;
    const cookie = req.headers.cookie;

    if (cookie) {
        refreshToken = req.headers.cookie
            .split('; ')
            .find(cookie => cookie.startsWith('refreshToken='))
            .split('=')[1];
    }

    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(403);
        const userForToken = { user: data.user };
        const accessToken = generateAccessToken(userForToken);
        res.json({ accessToken: accessToken });
    })
}







module.exports = {
    registerUser,
    loginUser,
    getMe,
    token
}