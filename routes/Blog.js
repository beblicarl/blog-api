const router = require("express").Router();
const Blog = require("../models/Blog");
//create blog
router.post("/", async (req, res) => {
  console.log(req, "request");
  try {
    const saveBlog = await new Blog(req.body);
    const savedBlog = await saveBlog.save();
    res.status(200).json(savedBlog);
  } catch (error) {
    res.status(500).json(error);
  }
});
//update blog
router.put("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.userId === req.body.userId) {
      await Blog.updateOne({ $set: req.body });
      res.status(200).json("it has been updated");
    } else {
      res.status(403).json("you can only update your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//delete blog
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.userId === req.body.userId) {
      await Blog.delete();
      res.status(200).json("the post is deleted");
    } else {
      res.status(403).json("you can only delete your post");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
//get All blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json(error);
  }
});
//get one blog
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
