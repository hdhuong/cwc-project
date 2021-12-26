const Post = require("../models/Post");
const User = require("../models/User");

class PostController {
  // post - create a post
  async newPost(req, res) {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save();
      res.status(200).json({ success: true, savedPost });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //update post
  async updatePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.updateOne({ $set: req.body });
        res
          .status(200)
          .json({ success: true, message: "Cập nhật bài viết thành công" });
      } else {
        res.status(403).json({
          success: false,
          message: "Bạn chỉ có thể cập nhật bài viết của mình",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // delete a post
  async deletePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.userId === req.body.userId) {
        await post.deleteOne();
        res
          .status(200)
          .json({ success: true, message: "Xoá bài viết thành công" });
      } else {
        res.status(403).json({
          success: false,
          message: "Bạn chỉ có thể xoá bài viết của mình",
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //like / dislike a post
  async likePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.likes.includes(req.body.userId)) {
        await post.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("Bài viết đã được thích");
      } else {
        await post.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("Đã bỏ thích");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //get a post
  async getPost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  //get timeline posts
  async getTimeline(req, res) {
    try {
      const currentUser = await User.findById(req.body.userId);
      const userPosts = await Post.find({ userId: currentUser._id });
      const friendPosts = await Promise.all(
        currentUser.followings.map((friendId) => {
          return Post.find({ userId: friendId });
        })
      );
      res.json(userPosts.concat(...friendPosts));
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = new PostController();
