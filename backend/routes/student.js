var express = require("express");
var studentRouter = express.Router();
var passport = require("passport");
var Verify = require("./verify"); // verfication
const bcrypt = require("bcrypt");
/** 1- declare mongoose and student **/
const mongoose = require("mongoose");
const Student = require("../models/student");
const courses = require("../models/courses");

studentRouter
  .route("/")
  .get((req, res, next) => {//GOOD
    //chained into route(), no semi-colon after the all implementation
    // 2- implement get to return all students
    Student.find({}, (err, students) => {
      if (err) throw err;

      res.json(students);
    });
  })

  /*.post((req, res, next) => {
    // 3- implement post request to insert a student into database
    Student.create(req.body, (err, student) => {
      if (err) throw err;

      console.log("Student created");
      let id = student._id;
      res.send("Student added with id " + id);
    });
  });*/

  /*studentRouter.get("/", Verify.verifyAdmin, function (req, res, next) {
  Student.find({}, function (err, students) {
    if (err) {
      throw err;
    }
    res.json(students);
  });
});*/
// 3- register a new Student on end poitn register, info is sent as a json object
studentRouter.post("/register", async function (req, res) {
  Student.register(
    new Student({ name: req.body.name, email: req.body.email, coursesId: [] }),
    req.body.password,
    function (err, student) {
      console.log(err);
      if (err) return res.status(500).json({ err: err });
      passport.authenticate("local")(req, res, function () {
        var token = Verify.getToken(student);

        return res
          .status(200)
          .header("x-access-token", token)
          .header("access-control-expose-headers", "x-access-token")
          .json({ status: "Registration Successful !" });
      });
    }
  );
});
// 4- Student login
studentRouter.post("/login", (req, res, next) => {
  //req.body will have username and password

  passport.authenticate("local", function (err, student, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!student) {
      console.log("no student");
      return res.status(401).json({ err: info });
    }
    req.logIn(student, function (err) {
      if (err) return res.status(500).json({ err: "Could not log in student" });

      console.log("Student in students: ", student);
      student.findOne({ email: student.email }, function (err, dbStudent) {
        if (err) {
          return done(err);
        }
        if (!student) {
          return done(null, false);
        }
        console.log("DB Student:", dbStudent);
        var token = Verify.getToken(dbStudent);
        res.status(200);
        res.send(token);
        //res.header("Auth", token);
      });
    });
  })(req, res, next);
});

// 5- implementing logout
studentRouter.get("/logout", function (req, res) {
  req.logout();
  res.status(200).json({
    status: "Bye!",
  });
});

studentRouter
  .route("/:studentId")
  .get((req, res, next) => {
    // 4- find by id
    Student.findById(`${req.params.studentId}`, (err, student) => {
      if (err) throw err;
      res.json(student);
    });
  })

  .put((req, res, next) => {
    // 5- implement post request to update a specific student
    //This replaces everything about a student, perhaps make it more specific in the future
    Student.findByIdAndUpdate(
      `${req.params.studentId}`,
      { $set: req.body },
      { new: true },
      (err, student) => {
        if (err) throw err;
        res.json(student);
      }
    );
  })

  .delete((req, res, next) => {
    // 6- delete specific student in the collection
    Student.findByIdAndRemove(`${req.params.studentId}`, (err, student) => {
      if (err) throw err;
      res.json(student);
    });
  });

studentRouter.route("/:studentId/courses").get((req, res, next) => {
  Student.findById(`${req.params.studentId}`, (err, student) => {
    if (err) throw err;
    //return the ids of all the courses the student is in
    res.json(student.coursesId);
  });
});

studentRouter
  .route("/:studentId/courses/:courseId")
  //add a new course id to the list of course ids a student is in
  .put((req, res, next) => {
    Student.findById(`${req.params.studentId}`, (err, student) => {
      if (err) throw err;
      student.coursesId.push(`${req.params.courseId}`);
      student.save((err, student) => {
        if (err) throw err;
        console.log("Course Id added");
        res.json(student);
      });
    });
    // courses.findById(req.params.courseId,  (err, course)=>{
    //     console.log('Run test')
    //     if (err) throw err;
    //     course._studentsId.push(req.params.studentId)
    //     course.save((err, course)=>{
    //         if (err) throw err;
    //         console.log("Student Id added")
    //         res.json(course)
    //     })
    // });
  })

  //remove a specific course id from the list of ids
  .delete((req, res, next) => {
    Student.findById(`${req.params.studentId}`, (err, student) => {
      if (err) throw err;
      var newCourses = [];
      for (var course of student.coursesId) {
        if (course != `${req.params.courseId}`) {
          newCourses.push(course);
        }
      }
      student.coursesId = newCourses;
      student.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });

module.exports = studentRouter;
