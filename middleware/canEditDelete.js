const postModel = require("../model/post");

module.exports = async (req, res, next) => {
  try {
    const post = await postModel.findById(req.params.id);
    const userId = req.user._id;
    const userPostbyId = post.postBy;
    if (userId.toString() === userPostbyId.toString()) {
      next();
    } else {
      return res.status(400).send("Unauthorized!!!!!");
    }
  } catch (error) {
    console.log(error);
  }
};
