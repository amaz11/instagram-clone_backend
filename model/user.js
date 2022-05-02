const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
      maxlength: 16,
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    conpassword: { type: String, minlength: 6 },
    profileImage: {
      type: String,
      default: "Not Avaiable Now",
    },
    followers: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    followering: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const userModel = model("User", userSchema);

module.exports = userModel;
