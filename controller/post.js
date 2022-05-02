// Model
const postModel = require("../model/post");
const clodinary = require("cloudinary").v2;

clodinary.config({
  cloud_name: process.env.ClOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// Create Post
const createPost = async (req, res) => {
  const { title, postBody, image } = req.body;
  const { _id } = req.user;

  if (!postBody) {
    return res.status(400).json({ error: "Write Something to Share" });
  }
  try {
    const post = new postModel({
      title,
      postBody,
      image,
      postBy: _id,
    });
    await post.save();
    return res.status(201).json({ post, message: "Post Succesfull" });
  } catch (err) {
    return res.status(500).json({ error: "Something went Wrong" });
  }
};

//Get Posts
const getPosts = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postBy", "_id name email profileImage")
      .populate("comment.commentBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: "Something Wrong" });
  }
};

//Get Post
const getPost = async (req, res) => {
  try {
    const loginUser = req.user._id;
    const post = await postModel
      .find({ postBy: loginUser })
      .populate("postBy", "_id name email profileImage")
      .populate("comment.commentBy", "_id name");
    return res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ error: "Something Wrong" });
  }
};

//Uploade Photo
const uploadPhoto = async (req, res) => {
  const image = req.files.image.path;
  // console.log(image);
  try {
    const result = await clodinary.uploader.upload(image, {
      folder: "instagram-photo",
    });
    return res.status(201).json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    return res.status(400).json({ error: "Internal Error" });
  }
};

const like = (req, res) => {
  postModel
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: { likes: req.user._id },
      },
      {
        new: true, //return updated record
      }
    )
    .populate("postBy", "_id name")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({ error: error });
      } else {
        res.json(result);
      }
    });
};

const unlike = (req, res) => {
  postModel
    .findByIdAndUpdate(
      req.body.postId,
      {
        $pull: { likes: req.user._id },
      },
      {
        new: true, //return updated record
      }
    )
    .populate("postBy", "_id name")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({ error: error });
      } else {
        res.json(result);
      }
    });
};

const comments = (req, res) => {
  const comment = {
    commentText: req.body.commentText,
    commentBy: req.user._id,
  };
  postModel
    .findByIdAndUpdate(
      req.body.postId,
      {
        $push: { comment },
      },
      {
        new: true, //return updated record
      }
    )
    .populate("comment.commentBy", "_id name")
    .populate("postBy", "_id name email profileImage")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({ error: error });
      } else {
        res.json(result);
      }
    });
};

const deletePost = async (req, res) => {
  try {
    const postDelete = await postModel.findByIdAndDelete(req.params.id);
    if (postDelete.image && postDelete.image.public_id) {
      await clodinary.uploader.destroy(postDelete.image.public_id);
    }
    return res.json({ message: "Delete Sussesfull" });
  } catch (error) {
    return res.json({ error: "Something Went Wrong" });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  uploadPhoto,
  like,
  unlike,
  comments,
  deletePost,
};
