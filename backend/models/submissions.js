var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var submissionSchema = new Schema(
  {
    assignmentId: {type: String,required: true},
    studentId: {type: String,required: true,unique: true},
    grade: {type: String,required: false},
    files: {type: [String],required: false},
    completionStatus: {type: Boolean,required: true},
  },
  { timestamps: true }
);

var Submission = mongoose.model("Submission", submissionSchema);
module.exports = Submission;
