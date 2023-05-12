var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

// Student Schema w/ three properties
var studentSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String,required: true,unique: true},
    password: {type: String,required: true,unique: true,},
    coursesId: {type: [String],required: false,},
    admin: {type: Boolean, default: false,},
  },
  { timestamps: true }
);


studentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Student", studentSchema);
