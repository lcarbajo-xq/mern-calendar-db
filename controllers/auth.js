const { response } = require("express");
const User = require("../models/User");

const createUser = async (req, res = response) => {
  // const { name, email, password } = req.body;

  try {
    const user = new User(req.body);

    await user.save();

    res.status(201).json({
      ok: true,
      msg: "register",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Please contact administrator",
    });
  }
};

const loginUser = (req, res = response) => {
  const { mail, password } = req.body;

  res.json({
    ok: true,
    msg: "login",
    mail,
    password,
  });
};

const renewToken = (req, res) => {
  res.json({
    ok: true,
    msg: "Renew Token",
  });
};

module.exports = { createUser, loginUser, renewToken };
