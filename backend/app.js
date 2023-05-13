var express = require("express");
var path = require("path");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var index = require("./routes/index");
var courses = require("./routes/courses");
var student = require("./routes/student");
var professorRouter = require("./routes/professor");
var assignments = require("./routes/assignments");
var submissions = require("./routes/submissions");
const cors = require("cors");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;


var mongoose = require("mongoose");
var url ="mongodb+srv://ijcrawford:isaacpassword@codegrader-341.da0gq37.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, { useNewUrlParser: true });
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.json());
app.use(cors());

const localOptions = {
  usernameField: "email",
  passwordField: "password",
  session: false,
};

var professor = require("./models/professor");
app.use(passport.initialize());
passport.use(new LocalStrategy(localOptions, professor.authenticate()));
passport.serializeUser(professor.serializeUser());
passport.deserializeUser(professor.deserializeUser());


var student = require("./models/student");
app.use(passport.initialize());
passport.use(new LocalStrategy({ usernameField: "email" }, student.authenticate()));
passport.serializeUser(student.serializeUser());
passport.deserializeUser(student.deserializeUser());


app.use(express.static(path.join(__dirname, "public")));
app.use("/", index);
app.use("/courses", courses);
app.use("/student", student);
app.use("/professor", professorRouter);
app.use("/assignments", assignments);
app.use("/submissions", submissions);

app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;