var express = require("express");
var coursesRouter = express.Router();
const mongoose = require("mongoose");
const courses = require("../models/courses");
const assignments = require("../models/assignments");
const Assignment = require("../models/assignments");
const Professor = require("../models/professor");
const ProfRouter = require("./professor");
const {ObjectId} = require('mongodb')

coursesRouter
  .route("/")
  .get((req, res, next) => {
    courses.find({}, (err, course) => {
      if (err) throw err;

      res.json(course);
    });
  })

  .post((req, res, next) => {
    courses.create(req.body, (err, course) => {
      if (err) throw err;

      console.log("Course created");
      let id = course._id;
      res.send("Course added with id " + id);
    });
  });

coursesRouter
  .route("/:courseId") 
  .get((req, res, next) => {
    courses.findById(`${req.params.courseId}`, (err, course) => {
      if (err) throw err;
      res.json(course);
    });
  })

  .put((req, res, next) => {
    courses.findByIdAndUpdate(
      `${req.params.courseId}`,
      { $set: req.body },
      { new: true },
      (err, course) => {
        if (err) throw err;
        res.json(course);
      }
    );
  })

  .delete((req, res, next) => {
    courses.findByIdAndRemove(`${req.params.courseId}`, (err, course) => {
      if (err) throw err;
      res.json(course);
    });
  });

coursesRouter
  .route("/:courseId/assignments")
  .get((req, res, next) => {
        courses.findById(`${req.params.courseId}`, (err, course) => {
      if (err) throw err;
      res.json(course.assignmentsId);
    });
  });

coursesRouter
  .route("/:courseId/assignments/:assignmentId")
  .get((req, res, next) => {
    assignments.findById(`${req.params.assignmentId}`, (err, assignment) => {
      if (err) throw err;
      res.json(assignment);
    });
  })

  .put((req, res, next) => {
    courses.findById(`${req.params.courseId}`, (err, course) => {
      if (err) throw err;
      course.assignmentsId.push(`${req.params.assignmentId}`);
      course.save((err, course) => {
        if (err) throw err;
        console.log("Assignment Id added");
        res.json(course);
      });
    });
  })

  .delete((req, res, next) => {
    courses.findById(`${req.params.courseId}`, (err, course) => {
      if (err) throw err;
      var newAssignments = [];
      for (var assignment of course.assignmentsId) {
        if (assignment != `${req.params.assignmentId}`) {
          newAssignments.push(assignment);
        }
      }
      course.assignmentsId = newAssignments;
      course.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });

coursesRouter
  .route("/:courseId/students")
  .get((req, res, next) => {
    courses.findById(`${req.params.courseId}`, (err, course) => {
      if (err) throw err;
      res.json(course.studentsId);
    });
  });

coursesRouter
  .route("/:courseId/students/:studentId")
  .put((req, res, next) => {
    courses.findById(`${req.params.courseId}`, (err, course) => {
      if (err) throw err;
      course.studentsId.push(`${req.params.studentId}`);
      course.save((err, course) => {
        if (err) throw err;
        console.log("Student Id added");
        res.json(course);
      });
    });
  })

  .delete((req, res, next) => {
    courses.findById(`${req.params.courseId}`, (err, course) => {
      if (err) throw err;
      var newStudents = [];
      for (var student of course.studentsId) {
        if (student != `${req.params.studentId}`) {
          newStudents.push(student);
        }
      }
      course.studentsId = newStudents;
      course.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });

module.exports = coursesRouter;
