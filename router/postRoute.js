//Require Packeage
const express = require("express");
const formidable = require("express-formidable");

// Controller
const {
  createPost,
  getPosts,
  getPost,
  uploadPhoto,
  like,
  unlike,
  comments,
  deletePost,
} = require("../controller/post");

// Middelware
const authorization = require("../middleware/authorization");
const canEditDelete = require("../middleware/canEditDelete");

//All Router For Post
const router = express.Router();
router.post("/create-post", authorization, createPost);
router.get("/get-posts", authorization, getPosts);
router.get("/get-post-of-owner", authorization, getPost);
router.post(
  "/post-photo",
  authorization,
  formidable({ maxFileSize: 1024 * 1024 * 5 }),
  uploadPhoto
);
router.put("/like", authorization, like);

router.put("/unlike", authorization, unlike);
router.put("/comments", authorization, comments);
router.delete("/post-delete/:id", authorization, canEditDelete, deletePost);

module.exports = router;
