const express = require("express");
const Router = express.Router();
const passport = require("passport");

Router.get("/", function (req, res, next) {
  res.json({ name: "Token Expired" });
  console.log({name: "Token Expired"});
});

module.exports = Router;
