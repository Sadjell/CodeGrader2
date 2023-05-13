var express = require('express');
var submissionsRouter = express.Router();
const mongoose = require('mongoose')
const submissions = require('../models/submissions')

submissionsRouter.route('/') 
.get((req,res,next)=>{
      submissions.find({},(err, submissions) => {
        if (err) throw err

        res.json(submissions)
     })
})

.post((req, res, next)=>{
    submissions.create(req.body,(err, submissions) => {
        if (err) throw err;

        console.log("submission created")
        let id = submissions._id
        res.send("submission added with id " +id)
    })
})

submissionsRouter.route('/:submissionsId')
.get((req,res,next)=>{
    submissions.findById(`${req.params.submissionsId}`, (err, submissions) => {
          if (err) throw err;
          res.json(submissions)
      })
   })

.put((req, res, next)=>{
  submissions.findByIdAndUpdate(`${req.params.submissionsId}`, 
      {$set:req.body}, 
      {new: true}, 
      (err, submissions) => {
          if (err) throw err;
          res.json(submissions)
      }
  );
})

.delete((req, res, next)=>{
    submissions.findByIdAndRemove(`${req.params.submissionsId}`,  (err, submissions)=>{        
              if (err) throw err;
              res.json(submissions);
      });
});

submissionsRouter.route('/:submissionsId/assignment')
.get((req, res, next)=>{
    submissions.findById(`${req.params.submissionsId}`,  (err, submissions)=>{
        if (err) throw err;
        res.json(submissions.assignmentId)
    });
})

submissionsRouter.route('/:submissionsId/student')
.get((req, res, next)=>{
    submissions.findById(`${req.params.submissionsId}`,  (err, submissions)=>{
        if (err) throw err;
        res.json(submissions.studentId)
    });
})

module.exports = submissionsRouter;
