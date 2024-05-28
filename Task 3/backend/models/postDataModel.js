const mongoose = require("mongoose");

//Create Schema
const postDataSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserData",
    },
  },
  { timestamps: true },
  {
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

//Create Model
const postData = mongoose.model("PostData", postDataSchema);

module.exports = postData;
