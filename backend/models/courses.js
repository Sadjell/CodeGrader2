var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var courseSchema = new Schema(
  {
    name: {type: String, required: true,unique: true},
    title: {type: String, required: true},
    assignmentsId: [{ type: [mongoose.Schema.Types.ObjectId], ref: 'assignments', required: false}],
    studentsId: {type: [String], required: false},
    professorId: {type: String, required: true},
  },
 
);
var Course = mongoose.model("Course", courseSchema);

module.exports = Course;
