import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/RootReducer";
import { NavBar } from "../NavBar";
import { SearchArticle } from "./SearchArticle";

export const Blog: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.storeBlog.blogs);

  return (
    <div>
      <NavBar route="blog" />
      <div className="max-w-7xl mx-auto">
        <div className="mt-8">
          <SearchArticle />
        </div>
        <div className="mt-8">
          <p className="text-2xl">Latest Articles</p>
          <div className="md:w-1/2">
            {blogs &&
              blogs.map((el) => (
                <div className="flex gap-x-3 bg-blue-50 rounded shadow hover:shadow-none p-4 my-3">
                  <p>{el.blog_title}</p>
                  <p className="text-gray-400">by</p>
                  <p className="text-brown1">{el.blog_username}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
