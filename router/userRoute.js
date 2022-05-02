const router = require("express").Router();
const {
  otherUser,
  follow,
  unfollow,
  getFollowing,
} = require("../controller/user");
const authorization = require("../middleware/authorization");
const userModel = require("../model/user");

router.get("/user/:id", authorization, otherUser);
router.put("/follow", authorization, follow);
router.put("/unfollow", authorization, unfollow);
router.get("/getFollowing", authorization, getFollowing);
module.exports = router;
