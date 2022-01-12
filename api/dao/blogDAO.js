const mongodb = require("mongodb");
const { blogModel } = require("../models/blog");
const {userModel} = require("../models/user")
const ObjectId = mongodb.ObjectId;

class Blog {

  static async getBlogs(article_username, article_title){
    try{

      if(article_username){
        return await blogModel.find({blog_username: {$regex: article_username}})
      }

      if(article_title){
        return await blogModel.find({blog_title: {$regex: article_title}})
      }
      

      return await blogModel.find();
    }catch(e){
      console.error(`Unable to get blogs: ${e}`);
      return { error: e };
    }
  }

  static async postBlog(blog, date) {
    try {
      const blogDoc = {
        blog_author: blog.blog_author,
        blog_username: blog.blog_username,
        blog_title: blog.blog_title,
        blog_body: blog.blog_body,
        date: date,
      };
      const response = await blogModel.create(blogDoc);
      // const addAuthor = await userModel.findOneAndUpdate(
      //   { _id: user._id },
      //   { $push: { ownBlogs: response._id } }
      // );

      console.log("MONGO CREATE", response);

      // return await recipes.insertOne(reviewDoc);
    } catch (e) {
      console.error(`Unable to post recipe: ${e}`);
      return { error: e };
    }
  }
}

module.exports = Blog;
