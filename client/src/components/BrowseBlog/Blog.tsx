import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/reducers/RootReducer";
import { NavBar } from "../NavBar";
import { SearchArticle } from "./SearchArticle";

export const Blog: React.FC = () => {
  const blogs = useSelector((state: RootState) => state.storeBlog.blogs);

  return (
    <div>
      <NavBar route="blog" />
      <div className="max-w-7xl md:mx-auto mx-4 ">
        <div className="mt-8">
          <SearchArticle />
        </div>
        <div className="mt-8">
          <p className="text-2xl ">Latest Articles</p>
          <div className="md:w-1/2">
            {blogs &&
              blogs.map((el) => (
                <div
                  key={el._id}
                  className="flex gap-x-3 bg-mainC rounded shadow hover:shadow-none p-4 my-3"
                >
                  <Link to={`/blogdetail/${el._id}`}>
                    <p>{el.blog_title}</p>
                  </Link>
                  <p className="text-gray-100">by</p>
                  <Link to={`/userprofile/${el.blog_username}`}>
                    <p className="text-mainC2">{el.blog_username}</p>
                  </Link>
                  <p className="text-gray-50 ml-auto">{el.date}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
