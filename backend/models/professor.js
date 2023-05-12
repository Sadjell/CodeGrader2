var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require("passport-local-mongoose");

// Professor Schema w/ three properties
var professorSchema = new Schema(
  {
    name: {type: String, required: true},
    coursesId: {type: [mongoose.Schema.Types.ObjectId], required: false},
    isAdmin: {type: Boolean, default: true,}
  },
  //{ timestamps: true }
);

// Export schema as a model
//var Professor = mongoose.model("Professor", professorSchema);
professorSchema.plugin(passportLocalMongoose, { usernameField: "email" }); //adds the user hash and salt fileds to store the user name, the hashed password and salted value

module.exports = mongoose.model("Professor", professorSchema);
