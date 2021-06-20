const mongoose = require("mongoose");
const { Schema } = mongoose;

// mongoose.Promise = global.Promise;

const reqString = {
  type: String,
  trim: true,
  required: true,
};
const reqNumber = {
  type: Number,
};
const reqArray = {
  type: [String],
  required: true,
  
};

const UserSchema = new Schema({
  FirstName: reqString,
  password: reqString,
  NumberPhone: reqNumber,
  Points: reqNumber,
  TokenKeyRefresh: String,
  img: reqArray,
  date: {
    type: Date,
    default: Date.now,
  },
});


// UserSchema.pre('save', function (next) {
//     if (this.password) {
//         const salt = bcrypt.genSaltSync(10);//or your salt constant
//         this.password = bcrypt.hashSync(this.password, salt);
//     }
//     next();
// });

module.exports = mongoose.models.User || mongoose.model("User", UserSchema)