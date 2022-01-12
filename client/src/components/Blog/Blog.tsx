import React from "react";
import { NavBar } from "../NavBar";
import { SearchArticle } from "./SearchArticle";

export const Blog: React.FC = () => {
  return (
    <div>
      <NavBar route="blog" />
      <div className="max-w-7xl mx-auto">
          <div className="mt-8">
              <SearchArticle />
          </div>
          <div className="mt-8">
              <p className="text-2xl">Latest Articles</p>
          </div>
      </div>
    </div>
  );
};
