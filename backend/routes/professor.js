var express = require("express");
var professorRouter = express.Router();
var passport = require("passport");
var Verify = require("./verify");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Professor = require("../models/professor");
const Courses = require("../models/courses");

professorRouter
  .route("/") //GOOD
  .all((req, res, next) => {
    console.log(req.body);
    next();
  })
  .get((req, res, next) => {
    Professor.find({}, (err, professors) => {
      if (err) throw err;

      res.json(professors);
    });
  });
professorRouter.post("/register", async function (req, res) {
  console.log(req.body);
  Professor.register(
    new Professor({ name: req.body.name, email: req.body.email }),
    req.body.password,
    function (err, professor) {
      console.log(err);
      if (err) return res.status(500).json({ err: err });
      passport.authenticate("local")(req, res, function () {
        console.log("authentication done");
        var token = Verify.getToken(professor);

        return res
          .status(200)
          .header("x-access-token", token)
          .header("access-control-expose-headers", "x-access-token")
          .json({ status: "Registration Successful !" });
      });
    }
  );
});
// 4- professor login
professorRouter.post("/login", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("local", function (err, professor, info) {
    console.log("authentication");
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!professor) {
      console.log("No professor information");
      return res.status(401).json({ err: info });
    }
    req.logIn(professor, function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ err: "Could not log in professor" });
      }
      console.log("Professor in professors: ", professor);
      Professor.findOne(
        { email: professor.email },
        function (err, dbProfessor) {
          if (err) {
            return done(err);
          }
          if (!professor) {
            return done(null, false);
          }
          console.log("DB professor:", dbProfessor);
          var token = Verify.getToken(dbProfessor);
          res.status(200);
          res.send(token);
        }
      );
    });
  })(req, res, next);
});

professorRouter.get("/logout", function (req, res) {
  req.logout();
  res.status(200).json({
    status: "Bye!",
  });
});

professorRouter
  .route("/:professorId")
  .get((req, res, next) => {
    Professor.findById(`${req.params.professorId}`, (err, professor) => {
      if (err) throw err;
      res.json(professor);
    });
  })

  .put((req, res, next) => {
    Professor.findByIdAndUpdate(
      `${req.params.professorId}`,
      { $set: req.body },
      { new: true },
      (err, professor) => {
        if (err) throw err;
        res.json(professor);
      }
    );
  })

  .delete((req, res, next) => {
    Professor.findByIdAndRemove(`${req.params.professorId}`, (err, professor) => {
      if (err) throw err;
      res.json(professor);
    });
  });

professorRouter.route("/:professorId/courses").get((req, res, next) => {
  Professor.findById(`${req.params.professorId}`, (err, professor) => {
    if (err) throw err;
    res.json(professor.coursesId);
  });
});

professorRouter
  .route("/:professorId/courses/:courseId")
  .put((req, res, next) => {
    Professor.findById(`${req.params.professorId}`, (err, professor) => {
      if (err) throw err;
      professor.coursesId.push(`${req.params.courseId}`);
      professor.save((err, professor) => {
        if (err) throw err;
        console.log("Course Id added");
        res.json(professor);
      });
    });
  })

  .delete((req, res, next) => {
    Professor.findById(`${req.params.professorId}`, (err, professor) => {
      if (err) throw err;
      var newCourses = [];
      for (var course of professor.coursesId) {
        if (course != `${req.params.courseId}`) {
          newCourses.push(course);
        }
      }
      professor.coursesId = newCourses;
      professor.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });

module.exports = professorRouter;
