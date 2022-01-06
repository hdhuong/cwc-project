const router = require("express").Router();
const postController = require("../controllers/postController");

//create a post

router.post("/", postController.newPost);

router.get("/list", postController.getAllPost);
//update a post

router.put("/:id", postController.updatePost);
//delete a post

router.delete("/:id/:userId", postController.deletePost);
//like / dislike a post

router.put("/:id/like", postController.likePost);
//get a post

router.get("/:id", postController.getPost);

//get by category
router.get("/find/:category", postController.getPostByCategory);

//get timeline posts

router.get("/timeline/all", postController.getTimeline);

module.exports = router;
