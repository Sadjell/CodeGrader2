var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var professorSchema = new Schema(
  {
    name: {type: String, required: true},
    coursesId: {type: [mongoose.Schema.Types.ObjectId], required: false},
    isAdmin: {type: Boolean, default: true}
  }
);

professorSchema.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model("Professor", professorSchema);
