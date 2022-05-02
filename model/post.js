const { Schema, model } = require("mongoose");
const { ObjectId } = Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
    },
    postBody: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
      // default: "No Image Avaiable",
    },
    likes: [
      {
        type: ObjectId,
        ref: "User",
      },
    ],
    comment: [
      {
        commentText: String,
        commentBy: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    postBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const postModel = model("Post", postSchema);

module.exports = postModel;
