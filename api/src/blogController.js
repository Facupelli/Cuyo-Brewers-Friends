const { ObjectId } = require("mongodb");
const Blog = require("../dao/blogDAO");
const dayjs =  require ('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


class BlogController {
  static async postBlog(req, res, next) {
    try {
      const blog = req.body.blog;
      const userInfo = {
        _id: req.body.user_id,
      };
      const date = dayjs().format("DD/MM/YYYY");

      const blogResponse = await Blog.postBlog(blog, userInfo, date);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = BlogController;
