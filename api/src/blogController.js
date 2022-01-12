const { ObjectId } = require("mongodb");
const Blog = require("../dao/blogDAO");
const dayjs =  require ('dayjs');
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


class BlogController {

  static async getBlogs(req, res, next) {
    try{
      const article_username = req.query.username
      const article_title = req.query.title


      const blogs = await Blog.getBlogs(article_username, article_title);

      res.json(blogs);
    }catch(e){
      res.status(500).json({ error: e.message });
    }
  }

  static async postBlog(req, res, next) {
    try {
      const blog = req.body
      const date = dayjs().format("DD/MM/YYYY");

      const blogResponse = await Blog.postBlog(blog, date);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = BlogController;
