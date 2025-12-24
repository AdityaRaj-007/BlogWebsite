import { Blog } from "../models/blogModel.js";
import { Comment } from "../models/commentModel.js";

export const addBlog = async (req, res) => {
  const { title, content } = req.body;

  const blog = await Blog.create({
    title,
    content,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.user._id}/${req.file.filename}`,
  });

  return res.redirect("/");
};

export const viewBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  console.log(blog);
  const comments = await Comment.find({ blogId: blog._id }).populate(
    "createdBy"
  );

  return res.render("viewBlog", {
    user: req.user,
    blog: blog,
    comments: comments,
  });
};

export const addComment = async (req, res) => {
  console.log(req.body.content);
  const comment = await Comment.create({
    content: req.body.content,
    createdBy: req.user._id,
    blogId: req.params.blogId,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
};
