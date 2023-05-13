var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var assignmentSchema = new Schema(
  {
    title: {type: String, required: true,unique: true},
    dueDate: {type: String, required: true},
    description: {type: String, required: true},
    submissionsId: {type: [mongoose.Schema.Types.ObjectId], required: false}
  },
  { timestamps: true }
);

var Assignment = mongoose.model("Assignment", assignmentSchema);

module.exports = Assignment;




