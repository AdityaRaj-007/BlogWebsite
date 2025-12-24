import { Blog } from "../models/blogModel.js";

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

  return res.render("viewBlog", {
    user: req.user,
    blog: blog,
  });
};
