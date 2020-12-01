const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { genJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "User exists with the same email",
      });
    }

    user = new User(req.body);

    //Password Encrypting

    const salt = bcrypt.genSaltSync();

    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    //JWT

    const token = await genJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact administrator",
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Email does not exist",
      });
    }

    // Confirmar los passwords

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password is not correct",
      });
    }

    // Generate JWT

    const token = await genJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      email: user.email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact administrator",
    });
  }
};

const renewToken = async (req, res) => {
  const { uid, name } = req;

  const token = await genJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = { createUser, loginUser, renewToken };
