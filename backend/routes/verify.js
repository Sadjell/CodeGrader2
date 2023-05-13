var Professor = require("../models/professor");
var Student = require("../models/student");
var jwt = require("jsonwebtoken");
var config = require("./config.js");

exports.getToken = function (user) {
  return jwt.sign(user.toJSON(), config.secretKey, {
    expiresIn: 3600
  });
};

exports.verifyOrdinaryUser = function (req, res, next) {
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (token) {
    jwt.verify(token, config.secretKey, function (err, decoded) {
      if (err) {
        var err = new Error("You are not authenticated !");
        err.status = 401;
        return next(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    var err = new Error("No token provided!");
    err.status = 403;
    return next(err);
  }
  console.log("user verified");
};

exports.verifyAdmin = function (req, res, next) {
  console.log(req.decoded);
  if (req.decoded._doc.username == "admin") {
    console.log("admin verified");
    next();
  } else {
    var err = new Error("You are not authorized!");
    err.status = 403;
    return next(err);
  }
};
