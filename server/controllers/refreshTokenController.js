const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefrshtoken = (req, res) => {
    const cookies = req.cookies
    if(!cookies?.jwt) return res.status(401).sned();
    console.log(cookies.jwt);

    const refreshToken = cookies.jwt;
}