var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Assignment Schema w/ four properties
var assignmentSchema = new Schema(
  {
    title: {type: String, required: true,unique: true},
    dueDate: {type: String, required: true},
    description: {type: String, required: true},
    submissionsId: {type: [String], required: false}
  },
  { timestamps: true }
);

// Export schema as a model
var Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;




