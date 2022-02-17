import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../redux/reducers/types";
import { getBlogById } from "../../utils/blogUtils";
import { NavBar } from "../NavBar";

type BlogDetailParams = {
  id: string;
};

type BlogState = {
  blog: Blog
}

export const BlogDetail: React.FC = () => {
  const { id } = useParams<BlogDetailParams>();
  
  const [blog, setBlog] = useState<BlogState>()

  useEffect(() => {
    getBlogById(id)
      .then((data) => setBlog({ blog: data }))
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <div>
      <NavBar route="blogdetail" />
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline gap-4 mt-8">
          <span className="font-semibold text-3xl border-b-2 border-mainC2">{blog?.blog.blog_title}</span>
          <p>by</p>
          <p className="text-2xl text-gray-600">{blog?.blog.blog_username}</p>
        </div>
        <div className="mt-2">
          <p>{blog?.blog.date}</p>
        </div>
        <div className="mt-8">
          <p>{blog?.blog.blog_body}</p>
        </div>
      </div>
    </div>
  );
};
