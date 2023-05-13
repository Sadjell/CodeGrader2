var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

var studentSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String,required: true,unique: true},
    coursesId: {type: [mongoose.Schema.Types.ObjectId],required: false,},
    admin: {type: Boolean, default: false,},
  }
);

studentSchema.plugin(passportLocalMongoose, { usernameField: "email" });
module.exports = mongoose.model("Student", studentSchema);
