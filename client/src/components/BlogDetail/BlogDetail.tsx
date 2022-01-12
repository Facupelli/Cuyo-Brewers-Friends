import React from "react";
import { useParams } from "react-router-dom";
import { NavBar } from "../NavBar";

type BlogDetailParams = {
  id: string;
};

export const BlogDetail: React.FC = () => {
  const { id } = useParams<BlogDetailParams>();

  return (
    <div>
      <NavBar route="blogdetail" />
      <div>BLOG DETAIL</div>
    </div>
  );
};
