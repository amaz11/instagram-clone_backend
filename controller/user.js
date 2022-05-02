const userModel = require("../model/user");
const postModel = require("../model/post");

const otherUser = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ _id: req.params.id })
      .select("-password");
    const posts = await postModel
      .find({ postBy: req.params.id })
      .populate("postBy", "_id name");
    if (!user) {
      return res.status(400).json({ error: "Nothing Here" });
    } else {
      return res.status(200).json({ user, posts });
    }
  } catch (error) {
    return res.status(400).json({ error: "Something Wrong" });
  }
};

const follow = (req, res) => {
  userModel.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { followers: req.user._id },
    },
    { new: true },
    (error, result) => {
      if (error) {
        return res.status(400).json({ error: error });
      }
      //req.dbUser._id = userId of loggedin user
      userModel
        .findByIdAndUpdate(
          req.user._id,
          {
            $push: { followering: req.body.followId }, //push the userid of not loggedin user
          },
          { new: true }
        )
        .select("-password")
        .then((result) => res.json(result))
        .catch((error) => {
          return res.status(400).json({ error: error });
        });
    }
  );
};

const unfollow = (req, res) => {
  userModel.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { followers: req.user._id },
    },
    { new: true },
    (error, result) => {
      if (error) {
        return res.status(400).json({ error: error });
      }
      //req.dbUser._id = userId of loggedin user
      userModel
        .findByIdAndUpdate(
          req.user._id,
          {
            $pull: { followering: req.body.unfollowId }, //push the userid of not loggedin user
          },
          { new: true }
        )
        .select("-password")
        .then((result) => res.json(result))
        .catch((error) => {
          return res.status(400).json({ error: error });
        });
    }
  );
};

const getFollowing = async (req, res) => {
  try {
    const following = await postModel
      .find({ postBy: { $in: req.user.followering } })
      .populate("postBy", "_id name");
    return res.status(200).json({ following });
  } catch (error) {}
};
module.exports = { otherUser, follow, unfollow, getFollowing };
