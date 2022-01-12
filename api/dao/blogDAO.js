const mongodb = require("mongodb");
const { blogModel } = require("../models/blog");
const {userModel} = require("../models/user")
const ObjectId = mongodb.ObjectId;

class Blog {
  static async postBlog(blog, user, date) {
    try {
      const blogDoc = {
        blog_author: user._id,
        blog_title: blog.title,
        blog_body: blog.body,
        date: date,
      };
      const response = await blogModel.create(blogDoc);
      const addAuthor = await userModel.findOneAndUpdate(
        { _id: user._id },
        { $push: { ownBlogs: response._id } }
      );

      console.log("MONGO CREATE", response);

      // return await recipes.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post recipe: ${e}`);
      return { error: e };
    }
  }
}

module.exports = Blog;
