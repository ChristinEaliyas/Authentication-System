const bcrypt = require('bcrypt');
const User = require("../models/user-model");
const jwt = require('jsonwebtoken')
require('dotenv').config();

const handleLogin = async (req, res) =>{
    const { user, pwd } = req.body;

    const nullStatus = Boolean(!user || !pwd);

    if (nullStatus) {
        res.status(301).send("Fill all the Fields");
    }
    try {
        const UserResult = await User.findOne({
            username: user,
            // password: pwd,
        });
        if (UserResult === null) {
        res.status(310).send("No User Found");
        } 

        //--- Evaluate Password ---
        const match  = await bcrypt.compare(pwd, UserResult.password)

        if (match) {
            //--- JWT ---
            const accessToken = jwt.sign(
                { "username": UserResult.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '40s' }
            );
            const refreshToken = jwt.sign(
                { "username": UserResult.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
            res.json({ accessToken });
            res.status(200).send();
        } else {
            res.status(311).send("Incorrect Password");
        }

    } catch (error) {
        res.status(500).send()
        console.log(error);
    }
}

module.exports = { handleLogin };