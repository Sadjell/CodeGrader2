var express = require("express");
var assignmentsRouter = express.Router();
const mongoose = require("mongoose");
const assignments = require("../models/assignments");

assignmentsRouter
  .route("/")
  .get((req, res, next) => {
    assignments.find({}, (err, assignments) => {
      if (err) throw err;

      res.json(assignments);
    });
  })

  .post((req, res, next) => {
    assignments.create(req.body, (err, assignments) => {
      if (err) throw err;

      console.log("assignment created");
      let id = assignments._id;
      res.send("assignment added with id " + id);
    });
  });

assignmentsRouter
  .route("/:assignmentsId")
  .get((req, res, next) => {
    assignments.findById(`${req.params.assignmentsId}`, (err, assignments) => {
      console.log(err);
      console.log(assignments);
      if (err) throw err;
      res.json(assignments);
    });
  })

  .put((req, res, next) => {
    assignments.findByIdAndUpdate(
      `${req.params.assignmentsId}`,
      { $set: req.body },
      { new: true },
      (err, assignments) => {
        if (err) throw err;
        res.json(assignments);
      }
    );
  })

  .delete((req, res, next) => {
    assignments.findByIdAndRemove(
      `${req.params.assignmentsId}`,
      (err, assignments) => {
        if (err) throw err;
        res.json(assignments);
      }
    );
  });

assignmentsRouter.route("/:assignmentsId/submissions").get((req, res, next) => {
  assignments.findById(`${req.params.assignmentsId}`, (err, assignments) => {
    if (err) throw err;
    res.json(assignments.submissionsId);
  });
});

assignmentsRouter
  .route("/:assignmentsId/submissions/:submissionsId")
  .put((req, res, next) => {
    assignments.findById(`${req.params.assignmentsId}`, (err, assignments) => {
      if (err) throw err;
      assignments.submissionsId.push(req.params.submissionsId);
      assignments.save((err, assignments) => {
        if (err) throw err;
        console.log("Submission Id added");
        res.json(assignments);
      });
    });
  })

  .delete((req, res, next) => {
    assignments.findById(`${req.params.assignmentsId}`, (err, assignment) => {
      if (err) throw err;
      var newSubmissions = [];
      for (var submission of assignment.submissionsId) {
        if (submission != `${req.params.submissionsId}`) {
          newSubmissions.push(submission);
        }
      }
      assignment.submissionsId = newSubmissions;
      assignments.save((err, resp) => {
        if (err) throw err;
        res.json(resp);
      });
    });
  });

module.exports = assignmentsRouter;
