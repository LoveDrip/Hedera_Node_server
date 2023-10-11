const express = require("express");
const { v4: uuidv4 } = require("uuid");
const sessions = require("./sessions.js");
const User = require("./Model/user.js");
const WalletInfo = require("./Model/WalletInfo.js");
const alldata = {
  Alldata: [
    {
      url: "https://media.istockphoto.com/id/517188688/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D0%BE%D1%80%D0%BD%D1%8B%D0%B9-%D0%BB%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82.jpg?s=2048x2048&w=is&k=20&c=BmMwfGRywKjGY5NNnVxTmxt9UfKPOFklMDOpmScHmxg=",
      balance: "20000$",
    },
    {
      url: "https://storage.googleapis.com/pai-images/e7d923346606406cb827cd7021448cdd.jpeg",
      balance: "10000$",
    },
    {
      url: "https://media.istockphoto.com/id/517188688/ru/%D1%84%D0%BE%D1%82%D0%BE/%D0%B3%D0%BE%D1%80%D0%BD%D1%8B%D0%B9-%D0%BB%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82.jpg?s=2048x2048&w=is&k=20&c=BmMwfGRywKjGY5NNnVxTmxt9UfKPOFklMDOpmScHmxg=",
      balance: "20000$",
    },
    {
      url: "https://storage.googleapis.com/pai-images/e7d923346606406cb827cd7021448cdd.jpeg",
      balance: "10000$",
    },
  ],
};
const arraydata = [
  "https://storage.googleapis.com/pai-images/e7d923346606406cb827cd7021448cdd.jpeg",
  "https://storage.googleapis.com/pai-images/e7d923346606406cb827cd7021448cdd.jpeg",
];
const Test = async (req, res) => {
  res.send(alldata);
};
const Register = async (req, res) => {
  console.log("register...");
  console.log(req.body);
  // return;
  // Mandatory fields
  // return;
  if (
    !req.body.email ||
    !req.body.username ||
    !req.body.password ||
    req.body.email === "" ||
    req.body.username === "" ||
    req.body.password === ""
  ) {
    res.status(400).json({ message: "Invalid user request" });
    return;
  }

  const existingUser = await User.find({
    UserName: req.body.username,
    Email: req.body.email,
  })
    .maxTimeMS(30000)
    .exec();
  if (!existingUser || existingUser !== "" || existingUser !== undefined) {
    // console.log(existingUser);
    // console.log("WWW1213123")
    const user = new User({
      UserId: uuidv4(),
      UserName: req.body.username,
      Password: req.body.password,
      Email: req.body.email,
      // Data: req.body.,
    });
    user.save();
    // console.log(user)
    res.send({ message: "User created" });
    return;
  } else if (existingUser) {
    // console.lig("www")
    res.status(400).json({ message: "User already exists" });
  }
};
const Login = async (req, res) => {
  console.log(req.body);
  try {
    const existingUser = await User.findOne({
      Email: req.body.user,
      Password: req.body.password,
    });

    if (!existingUser) {
      res.status(401).json({ message: "Wrong login or password" });
      return;
    }

    const token = uuidv4();
    sessions[token] = existingUser;

    WalletInfo.find()
      .then((wallInfo) => {
        console.log(wallInfo);
      })
      .catch((err) => {
        console.log(err);
        // res.send("error")
      });
    // console.log("sfsdfaf");
    res.status(200).json({ message: "Login successful", auth_token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
const Logout = async (req, res) => {
  if (sessions[req.params.token]) {
    delete sessions[req.params.token];
  }
  res.sendStatus(200);
};
const WalletConnect = async (req, res) => {
  console.log(req.body);
  const wallet = new WalletInfo({
    WalletAddress: req.body.newAccount,
    WalletNet: req.body.newNetwork,
    WalletBalance: req.body.newBalance,
  });
  wallet.save();
};
module.exports = { Register, Login, Logout, WalletConnect, Test };
