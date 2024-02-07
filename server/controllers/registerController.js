const bcrypt = require('bcrypt');
const User = require("../models/user-model");

const handleNewRegistration = async (req, res) =>{
    const { user, pwd, matchPwd, email } = req.body;

  if (!user || !pwd || !matchPwd || !email) return res.status(301).send("Fill all the Fields");

  // Encrypt Password
  const hash = await bcrypt.hash(pwd, 13)

  try {
    const result = await User.create({
      username: user,
      email: email,
      password: hash,
    });

    res.status(201).send();
  } catch (error) {
    if (error.code === 11000) {
      res.status(302).send("Email Already Exist");
    } else {
        res.status(500).send()
      console.log(error);
    }
  }
}

module.exports = { handleNewRegistration };