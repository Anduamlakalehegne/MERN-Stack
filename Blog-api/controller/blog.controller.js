import { customError } from "../middleware/customError.js";
import { Blog } from "../model/blog.model.js";

export const getAllBlog = async (req, res, next) => {
  try {
    const data = await Blog.find()
      .sort({ createdAt: 1 })
      .populate("author", ["username", "profile"])
      .lean()
      .exec();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  const { title, body } = req.body;

  // console.log(req.file);

  try {
    if (req.file) {
      const newBlog = await Blog.create({
        title,
        author: req.user.id,
        body,
        posture: req.file.filename ? req.file.filename : undefined,
      });
      if (!newBlog) {
        return res.status(400).send("Invalid blog data");
      }

      const data = await Blog.find()
        .sort({ createdAt: 1 })
        .populate("author", ["username", "profile"])
        .lean()
        .exec();
      return res.status(200).json(data);
    }
    const newBlog = await Blog.create({
      title,
      author: req.user.id,
      body,
    });
    if (!newBlog) {
      return res.status(400).send("Invalid blog data");
    }
    const data = await Blog.find()
      .sort({ createdAt: 1 })
      .populate("author", ["username", "profile"])
      .lean()
      .exec();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", ["firstname", "lastname", "profile"])
      .lean()
      .exec();

    if (!blog) return next(customError(404, "Blog not found."));

    return res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  const { title, body } = req.body;

  // Check for any changes in the fields
  try {
    if (req.file) {
      let blog = await Blog.findByIdAndUpdate(
        req.params.id,
        {
          title: title ? title : undefined,
          body: body ? body : undefined,
          posture: req.file.filename ? req.file.filename : undefined,
        },
        { new: true, runValidators: true }
      );
      if (!blog) return next(customError(404, "Blog Not found"));

      const data = await Blog.find()
        .sort({ createdAt: 1 })
        .populate("author", ["username", "profile"])
        .lean()
        .exec();
      return res.status(200).json(data);
    }

    let blog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: title ? title : undefined,
        body: body ? body : undefined,
      },
      { new: true, runValidators: true }
    );
    if (!blog) return next(customError(404, "Blog Not found"));

    const data = await Blog.find()
      .sort({ createdAt: 1 })
      .populate("author", ["username", "profile"])
      .lean()
      .exec();

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id);
    if (!result) return next(customError(404, "Blog not found to be deleted"));

    const data = await Blog.find()
      .sort({ createdAt: 1 })
      .populate("author", ["username", "profile"])
      .lean()
      .exec();

    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const searchBlog = async (req, res, next) => {
  const blogTtile = new RegExp(req.params?.title, "i");

  if (blogTtile !== "") {
    try {
      const data = await Blog.find({ title: blogTtile });
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  } else {
    return next(customError(404, "Title not found"));
  }
};
